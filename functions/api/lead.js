/**
 * Cloudflare Pages Function: /api/lead
 * Ultra-low latency serverless lead capture across Cloudflare's 330+ global edge locations.
 * Automatically forwards all inquiries directly to propsmartrealty@gmail.com
 */

const NOTIFICATION_EMAIL = "propsmartrealty@gmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`;
const CRM_WEBHOOK_DEFAULT = 'https://script.google.com/macros/s/AKfycby2dfeDEMYGEo7HIWGTUebqeFYAZBw60AOzbtKHblZZxR2L7-gBbONd3o_u5dalwffq_A/exec';

function sanitize(str, maxLen = 200) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().slice(0, maxLen);
}

export async function onRequestPost(context) {
  try {
    const { request, env, waitUntil } = context;

    // Origin Check
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

    let body = {};
    try {
      body = JSON.parse(rawText);
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Honeypot bot protection
    if (body.bot_field) {
      return new Response(JSON.stringify({ success: true, message: 'Received' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const name = sanitize(body.name, 100);
    const phone = sanitize(body.phone, 25);
    const email = sanitize(body.email, 100);
    const chosenConfig = sanitize(body.bhk || body.configuration || body.config || 'General Inquiry', 100);
    const budget = sanitize(body.budget || 'Standard', 50);
    const intent = sanitize(body.intent || 'Self Use / Investment', 200);
    const visitDate = sanitize(body.visitDate || body.selectedDate || body.date || 'Callback Requested', 50);
    const visitTime = sanitize(body.visitTime || body.selectedSlot || body.timeSlot || 'Standard Hours', 50);
    const message = sanitize(body.message || 'Requested instant call back / project e-brochure', 1000);
    const source = sanitize(body.source || 'Website Direct Form', 100);

    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: 'Name and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const leadId = `BR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    const country = request.headers.get('cf-ipcountry') || 'IN';
    const edgeColo = request.cf?.colo || 'BOM';

    // Structured Table Format for propsmartrealty@gmail.com
    const emailTablePayload = {
      _subject: `💎 [Paranjape Blue Ridge] New VIP Lead: ${name} (${chosenConfig})`,
      _template: 'table',
      _captcha: 'false',
      Project: 'Paranjape Blue Ridge, Hinjewadi Phase 1, Pune',
      Buyer_Name: name,
      Phone_Number: phone,
      Email_Address: email || 'Not Provided',
      Configuration: chosenConfig,
      Budget: budget,
      Intent: intent,
      Site_Visit_Date: visitDate,
      Site_Visit_Slot: visitTime,
      Inquiry_Source: source,
      Message: message,
      Visitor_Country: country,
      Edge_Datacenter: edgeColo,
      Lead_ID: leadId,
      Submitted_At: timestamp
    };

    const crmWebhookUrl = env?.CRM_WEBHOOK_URL || CRM_WEBHOOK_DEFAULT;

    // Asynchronous background dispatch
    const backgroundTasks = (async () => {
      try {
        // 1. Dispatch formatted table email to propsmartrealty@gmail.com
        await fetch(FORMSUBMIT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(emailTablePayload),
        }).catch(err => console.error('FormSubmit Edge Error:', err));

        // 2. Dispatch to Google Sheets CRM Webhook
        await fetch(crmWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            bhk: chosenConfig,
            budget,
            intent,
            visitDate,
            visitTime,
            message,
            source,
            country,
            leadId,
            timestamp
          }),
        }).catch(err => console.error('CRM Webhook Edge Error:', err));
      } catch (e) {
        console.error('Edge lead background dispatch failed:', e);
      }
    })();

    if (typeof waitUntil === 'function') {
      waitUntil(backgroundTasks);
    } else if (context.waitUntil) {
      context.waitUntil(backgroundTasks);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your inquiry has been secured at the Cloudflare Edge and forwarded to propsmartrealty@gmail.com.',
        leadId,
        timestamp,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Edge lead handler error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal edge error processing lead' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
