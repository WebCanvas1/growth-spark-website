interface Env {
  DB: D1Database;
  HANDOVER_FILES: R2Bucket;
  STRIPE_SECRET_KEY: string;
  SITE_URL: string;
  ASSETS: Fetcher;
}

type HandoverRow = {
  id: string;
  slug: string;
  project_name: string;
  client_name: string | null;
  client_business: string | null;
  description: string | null;
  amount: number;
  currency: string;
  file_key: string;
  included_items: string;
  status: string;
  expires_at: string | null;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const getHandover = async (env: Env, slug: string) => {
  return env.DB.prepare(
    `SELECT id, slug, project_name, client_name, client_business, description,
            amount, currency, file_key, included_items, status, expires_at
     FROM handovers WHERE slug = ? LIMIT 1`,
  )
    .bind(slug)
    .first<HandoverRow>();
};

const isAvailable = (handover: HandoverRow) => {
  if (handover.status !== "active") return false;
  if (!handover.expires_at) return true;
  const expiry = new Date(handover.expires_at).getTime();
  return Number.isFinite(expiry) && expiry > Date.now();
};

const parseIncludedItems = (value: string) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
};

const stripeRequest = async (env: Env, path: string, init?: RequestInit) => {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${env.STRIPE_SECRET_KEY}`);
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    ...init,
    headers,
  });
  const body = await response.json<any>();
  if (!response.ok) {
    throw new Error(body?.error?.message || "Stripe request failed");
  }
  return body;
};

const verifyStripeSession = async (env: Env, handover: HandoverRow, sessionId: string) => {
  const session = await stripeRequest(
    env,
    `/checkout/sessions/${encodeURIComponent(sessionId)}`,
  );

  const valid =
    session.payment_status === "paid" &&
    session.status === "complete" &&
    Number(session.amount_total) === Number(handover.amount) &&
    String(session.currency || "").toLowerCase() === handover.currency.toLowerCase() &&
    session.metadata?.handover_id === handover.id &&
    session.metadata?.handover_slug === handover.slug;

  return { valid, session };
};

const handleApi = async (request: Request, env: Env, url: URL) => {
  const match = url.pathname.match(
    /^\/api\/handover\/([^/]+)(?:\/(checkout|verify|download))?$/,
  );

  if (!match) return json({ error: "Not found" }, 404);

  const slug = decodeURIComponent(match[1]);
  const action = match[2] || "details";
  const handover = await getHandover(env, slug);

  if (!handover || !isAvailable(handover)) {
    return json({ error: "This handover is unavailable." }, 404);
  }

  if (action === "details" && request.method === "GET") {
    return json({
      slug: handover.slug,
      project_name: handover.project_name,
      client_name: handover.client_name,
      client_business: handover.client_business,
      description: handover.description,
      amount: handover.amount,
      currency: handover.currency,
      included_items: parseIncludedItems(handover.included_items),
    });
  }

  if (action === "checkout" && request.method === "POST") {
    const successUrl = `${env.SITE_URL}/#/handover/${encodeURIComponent(
      handover.slug,
    )}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${env.SITE_URL}/#/handover/${encodeURIComponent(handover.slug)}`;

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", successUrl);
    body.set("cancel_url", cancelUrl);
    body.set("line_items[0][quantity]", "1");
    body.set("line_items[0][price_data][currency]", handover.currency.toLowerCase());
    body.set("line_items[0][price_data][unit_amount]", String(handover.amount));
    body.set("line_items[0][price_data][product_data][name]", `${handover.project_name} – Website Handover`);
    if (handover.description) {
      body.set("line_items[0][price_data][product_data][description]", handover.description.slice(0, 500));
    }
    body.set("metadata[handover_id]", handover.id);
    body.set("metadata[handover_slug]", handover.slug);

    const session = await stripeRequest(env, "/checkout/sessions", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });

    return json({ url: session.url });
  }

  if (action === "verify" && request.method === "GET") {
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId) return json({ paid: false, error: "Missing session_id" }, 400);

    const { valid } = await verifyStripeSession(env, handover, sessionId);
    return json({
      paid: valid,
      download_url: valid
        ? `/api/handover/${encodeURIComponent(handover.slug)}/download?session_id=${encodeURIComponent(sessionId)}`
        : null,
    });
  }

  if (action === "download" && request.method === "GET") {
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId) return json({ error: "Missing session_id" }, 400);

    const { valid } = await verifyStripeSession(env, handover, sessionId);
    if (!valid) return json({ error: "Payment has not been verified." }, 403);

    const object = await env.HANDOVER_FILES.get(handover.file_key);
    if (!object) return json({ error: "Handover file not found." }, 404);

    const filename = handover.file_key.split("/").pop() || "Website-Handover.zip";
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("content-type", headers.get("content-type") || "application/zip");
    headers.set("content-disposition", `attachment; filename="${filename.replace(/\"/g, "")}"`);
    headers.set("cache-control", "private, no-store");

    return new Response(object.body, { headers });
  }

  return json({ error: "Method not allowed" }, 405);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (url.pathname.startsWith("/api/handover/")) {
        return await handleApi(request, env, url);
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);
      return json({ error: error instanceof Error ? error.message : "Unexpected server error" }, 500);
    }
  },
};
