import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, Loader2, Lock, PackageCheck } from "lucide-react";

type HandoverData = {
  slug: string;
  project_name: string;
  client_name?: string | null;
  client_business?: string | null;
  description?: string | null;
  amount: number;
  currency: string;
  included_items: string[];
};

const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(amount / 100);

const Handover = () => {
  const { slug } = useParams();
  const [handover, setHandover] = useState<HandoverData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");

  const price = useMemo(() => {
    if (!handover) return "";
    return formatMoney(handover.amount, handover.currency);
  }, [handover]);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/handover/${encodeURIComponent(slug)}`, {
          headers: { Accept: "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Unable to load handover.");
        setHandover(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load handover.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleCheckout = async () => {
    if (!slug) return;
    try {
      setCheckoutLoading(true);
      setError("");
      const response = await fetch(`/api/handover/${encodeURIComponent(slug)}/checkout`, {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start secure checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start secure checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading secure handover…</p>
        </div>
      </main>
    );
  }

  if (!handover) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold">Handover unavailable</h1>
          <p className="mt-3 text-muted-foreground">{error || "This handover link is unavailable."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Lock className="h-4 w-4" /> Secure Webstarter Handover
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{handover.project_name}</h1>
          <p className="mt-3 text-xl text-muted-foreground">Complete Website Handover</p>
          {(handover.client_business || handover.client_name) && (
            <p className="mt-2 text-sm text-muted-foreground">
              Prepared for {handover.client_business || handover.client_name}
            </p>
          )}
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
          <div className="border-b pb-7 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">One-time handover fee</p>
            <div className="mt-2 text-5xl font-bold">{price}</div>
            <p className="mt-2 text-sm text-muted-foreground">{handover.currency.toUpperCase()} · One-time payment</p>
          </div>

          {handover.description && (
            <p className="pt-7 text-center text-muted-foreground leading-relaxed">{handover.description}</p>
          )}

          <div className="py-8">
            <h2 className="mb-5 text-xl font-semibold">Your handover includes</h2>
            <div className="space-y-4">
              {handover.included_items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-muted p-5 text-sm leading-relaxed">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <PackageCheck className="h-4 w-4" /> Project handover
            </div>
            <p className="text-muted-foreground">
              This purchase provides a clean copy of the current project and the files required to set it up independently under your own accounts.
            </p>
            <p className="mt-3 text-muted-foreground">
              Webstarter's existing GitHub repository, commit history, Cloudflare account, credentials and shared infrastructure are not included.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
          )}

          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening secure checkout…
              </>
            ) : (
              `Pay ${price} & Download`
            )}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Secure payment processed by Stripe. Your download is unlocked only after payment is confirmed.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Handover;
