import type { APIRoute } from 'astro';

export const prerender = false;

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycby2dfeDEMYGEo7HIWGTUebqeFYAZBw60AOzbtKHblZZxR2L7-gBbONd3o_u5dalwffq_A/exec';

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/propsmartrealty@gmail.com';

const rateLimitMap = new Map<string, number>();

function sanitize(str: any, maxLen: number = 200): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().slice(0, maxLen);
}

async function sha256Hex(str: string): Promise<string> {
  if (!str) return '';
  try {
    const buffer = new TextEncoder().encode(str.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return '';
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const origin = request.headers.get('origin');
    const isLocal = origin?.includes('localhost') || origin?.includes('127.0.0.1');
    const isProd = origin === 'https://paranjapeblueridge.com' || origin === 'https://www.paranjapeblueridge.com';

    if (process.env.NODE_ENV === 'production' && origin && !isProd) {
      return new Response(JSON.stringify({ success: false, error: 'Forbidden: Invalid Origin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawText = await request.text();
    if (rawText.length > 5000) {
      return new Response(JSON.stringify({ success: false, error: 'Payload Too Large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (body.bot_field) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const turnstileToken = body.turnstileToken;
    const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken && turnstileToken !== 'mock-turnstile-token-dev-passed') {
      try {
        const cfFormData = new FormData();
        cfFormData.append('secret', turnstileSecret);
        cfFormData.append('response', turnstileToken);
        cfFormData.append('remoteip', ip);

        const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: cfFormData,
          signal: AbortSignal.timeout(5000),
        });
        const cfData: any = await cfRes.json();
        if (!cfData.success) {
          return new Response(JSON.stringify({ success: false, error: 'Security challenge failed. Please refresh and try again.' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } catch (err) {
        console.warn('[Cloudflare Turnstile] Warning:', err);
      }
    }

    const lastSubmit = rateLimitMap.get(ip);
    if (lastSubmit && Date.now() - lastSubmit < 60_000) {
      return new Response(JSON.stringify({ success: false, error: 'Please wait 60 seconds before submitting again.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    rateLimitMap.set(ip, Date.now());

    const leadPayload = {
      name: sanitize(body.name, 100),
      phone: sanitize(body.phone, 20),
      email: sanitize(body.email, 100),
      bhk: sanitize(body.bhk, 50),
      budget: sanitize(body.budget, 50),
      intent: sanitize(body.intent, 200),
      visitDate: sanitize(body.visitDate, 50),
      visitTime: sanitize(body.visitTime, 50),
      message: sanitize(body.message, 1000),
      source: sanitize(body.source, 100) || 'Website',
      behavioralFingerprint: sanitize(body.behavioralFingerprint, 500) || 'None',
      utm_source: sanitize(body.utms?.utm_source, 100),
      utm_medium: sanitize(body.utms?.utm_medium, 100),
      utm_campaign: sanitize(body.utms?.utm_campaign, 100),
      utm_term: sanitize(body.utms?.utm_term, 100),
      utm_content: sanitize(body.utms?.utm_content, 100),
      timestamp: new Date().toISOString(),
    };

    if (!leadPayload.name || !leadPayload.phone) {
      return new Response(JSON.stringify({ success: false, error: 'Name and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let leadScore = 50;
    const isNri = request.headers.get('x-is-nri-traffic') === 'true';
    if (isNri) leadScore += 25;
    if (leadPayload.visitDate) leadScore += 15;
    leadScore = Math.min(leadScore, 99);

    const hashedEmail = await sha256Hex(leadPayload.email);
    const hashedPhone = await sha256Hex(leadPayload.phone.replace(/\D/g, ''));
    const googleAdsAttribution = {
      sha256_email: hashedEmail,
      sha256_phone: hashedPhone,
      event_time: leadPayload.timestamp,
    };

    const enhancedPayload = {
      ...leadPayload,
      leadScore,
      userCountry: request.headers.get('x-user-country') || 'IN',
      isVip: leadScore >= 80,
      googleAdsAttribution,
    };

    // Dual-channel non-blocking delivery
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enhancedPayload),
      }).catch(e => console.error('Webhook error:', e));

      fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...enhancedPayload,
          _subject: `💎 [Paranjape Blue Ridge] New Lead: ${leadPayload.name} (${leadPayload.phone})`,
        }),
      }).catch(e => console.error('FormSubmit error:', e));
    } catch {}

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead received successfully.',
        leadId: `BR-${Date.now().toString(36).toUpperCase()}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Lead processing error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
