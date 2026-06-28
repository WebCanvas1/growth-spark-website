const allowedOrigins = [
  'https://webstarter.com.au',
  'https://www.webstarter.com.au',
  'http://localhost:8080',
  'http://localhost:5173',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';

  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin)
      ? origin
      : 'https://webstarter.com.au',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const OWNER_EMAIL = 'pharelrohit1992@gmail.com';

interface InquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessDescription: string;
  plan: string;
  website?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');

    const body = (await req.json()) as Partial<InquiryPayload>;

    // Honeypot spam field
    const website = String(body.website ?? '').trim();
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const firstName = String(body.firstName ?? '').trim().slice(0, 100);
    const lastName = String(body.lastName ?? '').trim().slice(0, 100);
    const email = String(body.email ?? '').trim().slice(0, 255);
    const phone = String(body.phone ?? '').trim().slice(0, 50);
    const businessDescription = String(body.businessDescription ?? '').trim().slice(0, 2000);
    const plan = String(body.plan ?? '').trim().slice(0, 50);

    if (!firstName || !lastName || !email || !phone || !businessDescription || !plan) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = `
      <h2>New Plan Inquiry — ${escapeHtml(plan)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        <tr><td><b>Plan Selected</b></td><td>${escapeHtml(plan)}</td></tr>
        <tr><td><b>First Name</b></td><td>${escapeHtml(firstName)}</td></tr>
        <tr><td><b>Last Name</b></td><td>${escapeHtml(lastName)}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td valign="top"><b>Business</b></td><td>${escapeHtml(businessDescription).replace(/\n/g, '<br/>')}</td></tr>
      </table>
    `;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'WebStarter <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `New ${plan} Plan Inquiry from ${firstName} ${lastName}`,
        html,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error('Resend error:', resp.status, data);
      throw new Error('Email provider failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('send-plan-inquiry error:', message);

    return new Response(JSON.stringify({
      success: false,
      error: 'Unable to send enquiry right now.',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
