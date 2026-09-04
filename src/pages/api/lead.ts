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

    // Background delivery promise — TRIPLE REDUNDANT DISPATCH TO propsmartrealty@gmail.com
    const dispatchPromises = [
      // 1. FormSubmit AJAX email notification to propsmartrealty@gmail.com
      fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(emailTablePayload),
      }).catch(e => console.error('FormSubmit error:', e)),

      // 2. Google Apps Script Webhook (MailApp.sendEmail to propsmartrealty@gmail.com + Sheets logging)
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

      // 3. Direct MailChannels Edge Delivery to propsmartrealty@gmail.com
      fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: NOTIFICATION_EMAIL, name: 'PropSmart Realty' }]
            }
          ],
          from: {
            email: 'leads@paranjapeblueridge.com',
            name: 'Paranjape Blue Ridge VIP Desk'
          },
          subject: `💎 [Paranjape Blue Ridge] New VIP Lead: ${leadPayload.name} (${chosenConfig})`,
          content: [
            {
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #070D1A; color: #FAF9F6; border-radius: 16px; overflow: hidden; border: 1px solid #C5A880;">
                  <div style="background: linear-gradient(135deg, #131F37 0%, #070D1A 100%); padding: 24px; border-bottom: 2px solid #C5A880;">
                    <h2 style="margin: 0; color: #C5A880; font-size: 20px; font-weight: 700;">PARANJAPE BLUE RIDGE</h2>
                    <p style="margin: 4px 0 0; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">VIP Lead Intelligence</p>
                  </div>
                  <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B; width: 40%;">Buyer Name</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E293B;">${leadPayload.name}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Phone Number</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="tel:${leadPayload.phone}" style="color: #38BDF8; font-weight: 700;">${leadPayload.phone}</a></td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Email Address</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="mailto:${leadPayload.email}" style="color: #38BDF8;">${leadPayload.email || 'Not Provided'}</a></td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Configuration</td><td style="padding: 8px 0; color: #C5A880; font-weight: 600; border-bottom: 1px solid #1E293B;">${chosenConfig}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Budget</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.budget}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Intent</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.intent}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Site Visit Date</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.visitDate}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Site Visit Slot</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.visitTime}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Source</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.source}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Message</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadPayload.message}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Lead ID</td><td style="padding: 8px 0; color: #94A3B8; font-family: monospace; border-bottom: 1px solid #1E293B;">${leadId}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8;">Submission Time</td><td style="padding: 8px 0; color: #94A3B8; font-size: 12px;">${leadPayload.timestamp}</td></tr>
                    </table>
                  </div>
                </div>
              `
            }
          ]
        })
      }).catch(e => console.warn('MailChannels error:', e)),
    ];

    const allSettledPromise = Promise.allSettled(dispatchPromises);

    // Register with waitUntil if Cloudflare runtime is present, otherwise wait with 4000ms safety window
    const runtime = (locals as any)?.runtime;
    if (runtime?.waitUntil) {
      runtime.waitUntil(allSettledPromise);
    } else {
      await Promise.race([
        allSettledPromise,
        new Promise(resolve => setTimeout(resolve, 4000)),
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
