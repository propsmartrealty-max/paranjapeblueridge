// Cloudflare Pages Serverless Function - Lead Capture API
// Endpoint: POST /api/enquiry

interface Env {
  LEAD_NOTIFICATION_EMAIL?: string;
  CRM_WEBHOOK_URL?: string;
}

interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  configuration?: string;
  source?: string;
  unitInterest?: string;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const payload = await context.request.json<EnquiryPayload>();

    // Input validation
    if (!payload.name || !payload.phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Name and a valid 10-digit mobile number are required.'
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const cleanedPhone = payload.phone.replace(/[^\d+]/g, '');
    if (cleanedPhone.length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please enter a valid phone number.'
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const leadRecord = {
      timestamp: new Date().toISOString(),
      name: payload.name.trim(),
      phone: cleanedPhone,
      email: payload.email ? payload.email.trim() : 'Not provided',
      interest: payload.unitInterest || payload.configuration || 'Paranjape Blue Ridge Master Township Inquiry',
      sourceUrl: payload.source || 'https://paranjapeblueridge.com',
      clientIp: context.request.headers.get('cf-connecting-ip') || 'Unknown',
      country: context.request.headers.get('cf-ipcountry') || 'IN',
      status: 'RECEIVED'
    };

    // Forward lead asynchronously to propsmartrealty@gmail.com across triple redundant channels
    const crmWebhookUrl = context.env?.CRM_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycby2dfeDEMYGEo7HIWGTUebqeFYAZBw60AOzbtKHblZZxR2L7-gBbONd3o_u5dalwffq_A/exec';

    try {
      // 1. FormSubmit AJAX Relay
      await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `💎 [Paranjape Blue Ridge] New Lead: ${leadRecord.name} (${leadRecord.interest})`,
          _template: 'table',
          _captcha: 'false',
          Project: 'Paranjape Blue Ridge, Hinjewadi Phase 1, Pune',
          Name: leadRecord.name,
          Phone: leadRecord.phone,
          Email: leadRecord.email,
          Interest: leadRecord.interest,
          Source: leadRecord.sourceUrl,
          Country: leadRecord.country,
          Time: leadRecord.timestamp
        })
      }).catch(relayErr => console.warn('FormSubmit relay warning:', relayErr));

      // 2. Google Apps Script Webhook (MailApp.sendEmail to propsmartrealty@gmail.com)
      await fetch(crmWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadRecord.name,
          phone: leadRecord.phone,
          email: leadRecord.email,
          bhk: leadRecord.interest,
          source: leadRecord.sourceUrl,
          country: leadRecord.country,
          timestamp: leadRecord.timestamp
        })
      }).catch(hookErr => console.warn('CRM webhook warning:', hookErr));

      // 3. MailChannels Direct Edge Delivery to propsmartrealty@gmail.com
      await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: 'propsmartrealty@gmail.com', name: 'PropSmart Realty' }]
            }
          ],
          from: {
            email: 'leads@paranjapeblueridge.com',
            name: 'Paranjape Blue Ridge Concierge'
          },
          subject: `💎 [Paranjape Blue Ridge] New Lead: ${leadRecord.name} (${leadRecord.interest})`,
          content: [
            {
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #070D1A; color: #FAF9F6; border-radius: 16px; overflow: hidden; border: 1px solid #C5A880;">
                  <div style="background: linear-gradient(135deg, #131F37 0%, #070D1A 100%); padding: 24px; border-bottom: 2px solid #C5A880;">
                    <h2 style="margin: 0; color: #C5A880; font-size: 20px; font-weight: 700;">PARANJAPE BLUE RIDGE</h2>
                    <p style="margin: 4px 0 0; color: #94A3B8; font-size: 12px; text-transform: uppercase;">Lead Notification</p>
                  </div>
                  <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B; width: 40%;">Name</td><td style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E293B;">${leadRecord.name}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="tel:${leadRecord.phone}" style="color: #38BDF8; font-weight: 700;">${leadRecord.phone}</a></td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #1E293B;"><a href="mailto:${leadRecord.email}" style="color: #38BDF8;">${leadRecord.email}</a></td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Interest</td><td style="padding: 8px 0; color: #C5A880; font-weight: 600; border-bottom: 1px solid #1E293B;">${leadRecord.interest}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Source URL</td><td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${leadRecord.sourceUrl}</td></tr>
                      <tr><td style="padding: 8px 0; color: #94A3B8;">Time</td><td style="padding: 8px 0; color: #94A3B8; font-size: 12px;">${leadRecord.timestamp}</td></tr>
                    </table>
                  </div>
                </div>
              `
            }
          ]
        })
      }).catch(mcErr => console.warn('MailChannels relay warning:', mcErr));
    } catch (relayErr) {
      console.warn('Lead relay warning:', relayErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your inquiry has been successfully received. A senior residential advisor from Paranjape Blue Ridge will connect with you shortly.',
        data: {
          referenceId: `PBR-${Date.now().toString(36).toUpperCase()}`,
          phone: leadRecord.phone
        }
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process lead inquiry.',
        details: err.message
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};
