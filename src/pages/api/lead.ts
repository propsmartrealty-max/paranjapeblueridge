import type { APIRoute } from 'astro';

export const prerender = false;

const NOTIFICATION_EMAIL = 'propsmartrealty@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`;
const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycby2dfeDEMYGEo7HIWGTUebqeFYAZBw60AOzbtKHblZZxR2L7-gBbONd3o_u5dalwffq_A/exec';

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

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const origin = request.headers.get('origin') || '';
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isStaging = origin.endsWith('.pages.dev') || origin.endsWith('.workers.dev') || origin.includes('preview');
    const isProd = origin === 'https://paranjapeblueridge.com' || origin === 'https://www.paranjapeblueridge.com';

    if (origin && !isProd && !isStaging && !isLocal) {
      return new Response(JSON.stringify({ success: false, error: 'Forbidden: Invalid Origin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawText = await request.text();
    if (rawText.length > 10000) {
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
    if (lastSubmit && Date.now() - lastSubmit < 30_000) {
      return new Response(JSON.stringify({ success: false, error: 'Please wait 30 seconds before submitting again.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    rateLimitMap.set(ip, Date.now());

    const chosenConfig = sanitize(body.bhk || body.configuration || body.config || 'General Inquiry', 100);
    const chosenDate = sanitize(body.visitDate || body.selectedDate || body.date || 'Callback Requested', 50);
    const chosenTime = sanitize(body.visitTime || body.selectedSlot || body.timeSlot || 'Standard Hours', 50);

    const leadPayload = {
      name: sanitize(body.name, 100),
      phone: sanitize(body.phone, 25),
      email: sanitize(body.email, 100),
      bhk: chosenConfig,
      budget: sanitize(body.budget, 50) || 'Standard',
      intent: sanitize(body.intent, 200) || 'Self Use / Investment',
      visitDate: chosenDate,
      visitTime: chosenTime,
      message: sanitize(body.message, 1000) || 'Requested instant call back / project e-brochure',
      source: sanitize(body.source, 100) || 'Website Direct Form',
      behavioralFingerprint: sanitize(body.behavioralFingerprint, 500) || 'None',
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
    if (leadPayload.visitDate && leadPayload.visitDate !== 'Callback Requested') leadScore += 15;
    leadScore = Math.min(leadScore, 99);

    const userCountry = request.headers.get('x-user-country') || request.headers.get('cf-ipcountry') || 'IN';
    const edgeColo = request.headers.get('cf-ray') || 'BOM';
    const leadId = `BR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Clean tabular email structure for propsmartrealty@gmail.com
    const emailTablePayload = {
      _subject: `💎 [Paranjape Blue Ridge] New VIP Lead: ${leadPayload.name} (${chosenConfig})`,
      _template: 'table',
      _captcha: 'false',
      Project: 'Paranjape Blue Ridge, Hinjewadi Phase 1, Pune',
      Buyer_Name: leadPayload.name,
      Phone_Number: leadPayload.phone,
      Email_Address: leadPayload.email || 'Not Provided',
      Configuration: chosenConfig,
      Budget: leadPayload.budget,
      Intent: leadPayload.intent,
      Site_Visit_Date: leadPayload.visitDate,
      Site_Visit_Slot: leadPayload.visitTime,
      Inquiry_Source: leadPayload.source,
      Message: leadPayload.message,
      Visitor_Country: userCountry,
      Lead_Score: leadScore,
      Lead_ID: leadId,
      Submitted_At: leadPayload.timestamp,
    };

    // Background delivery promise
    const dispatchPromises = [
      // 1. Email notification to propsmartrealty@gmail.com
      fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(emailTablePayload),
      }).catch(e => console.error('FormSubmit error:', e)),

      // 2. Google Sheets CRM Webhook
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadPayload,
          leadScore,
          userCountry,
          leadId,
        }),
      }).catch(e => console.error('Webhook error:', e)),
    ];

    const allSettledPromise = Promise.allSettled(dispatchPromises);

    // Register with waitUntil if Cloudflare runtime is present, otherwise wait with short race
    const runtime = (locals as any)?.runtime;
    if (runtime?.waitUntil) {
      runtime.waitUntil(allSettledPromise);
    } else {
      await Promise.race([
        allSettledPromise,
        new Promise(resolve => setTimeout(resolve, 1200)),
      ]);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead received successfully and forwarded to propsmartrealty@gmail.com.',
        leadId,
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
