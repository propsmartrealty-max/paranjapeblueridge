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

        // 2. Dispatch to Google Sheets CRM Webhook (MailApp.sendEmail to propsmartrealty@gmail.com)
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

        // 3. Direct MailChannels Edge Delivery to propsmartrealty@gmail.com
        await fetch('https://api.mailchannels.net/tx/v1/send', {
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
              name: 'Paranjape Blue Ridge Concierge'
            },
            subject: `💎 [Paranjape Blue Ridge] New VIP Lead: ${name} (${chosenConfig})`,
            content: [
              {
                type: 'text/html',
                value: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #070D1A; color: #FAF9F6; border-radius: 16px; overflow: hidden; border: 1px solid #C5A880;">
                    <div style="background: linear-gradient(135deg, #131F37 0%, #070D1A 100%); padding: 24px; border-bottom: 2px solid #C5A880;">
                      <h2 style="margin: 0; color: #C5A880; font-size: 20px; font-weight: 700;">PARANJAPE BLUE RIDGE</h2>
                      <p style="margin: 4px 0 0; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Cloudflare Edge Lead Alert</p>
                    </div>
                    <div style="padding: 24px;">
                      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B; width: 40%;">Buyer Name</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E293B;">${name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Phone Number</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="tel:${phone}" style="color: #38BDF8; font-weight: 700;">${phone}</a></td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Email Address</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="mailto:${email}" style="color: #38BDF8;">${email || 'Not Provided'}</a></td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Configuration</td><td style="padding: 8px 0; color: #C5A880; font-weight: 600; border-bottom: 1px solid #1E293B;">${chosenConfig}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Budget</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${budget}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Intent</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${intent}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Site Visit Date</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${visitDate}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Site Visit Slot</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${visitTime}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Source</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${source}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Message</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${message}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Lead ID</td><td style="padding: 8px 0; color: #94A3B8; font-family: monospace; border-bottom: 1px solid #1E293B;">${leadId}</td></tr>
                        <tr><td style="padding: 8px 0; color: #94A3B8;">Submission Time</td><td style="padding: 8px 0; color: #94A3B8; font-size: 12px;">${timestamp}</td></tr>
                      </table>
                    </div>
                  </div>
                `
              }
            ]
          })
        }).catch(err => console.warn('MailChannels Edge send warning:', err));
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
