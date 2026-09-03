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

    // Forward lead asynchronously to FormSubmit / Email relay if configured
    try {
      await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead: ${leadRecord.name} (${leadRecord.interest})`,
          Name: leadRecord.name,
          Phone: leadRecord.phone,
          Email: leadRecord.email,
          Interest: leadRecord.interest,
          Source: leadRecord.sourceUrl,
          Country: leadRecord.country,
          Time: leadRecord.timestamp
        })
      });
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
