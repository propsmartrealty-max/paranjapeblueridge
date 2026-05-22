import { NextRequest, NextResponse } from 'next/server';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SOVEREIGN LEAD DISPATCH — SERVER-SIDE API
// Dual-channel delivery to propsmartrealty@gmail.com
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycby2dfeDEMYGEo7HIWGTUebqeFYAZBw60AOzbtKHblZZxR2L7-gBbONd3o_u5dalwffq_A/exec';

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/propsmartrealty@gmail.com';

// Simple server-side rate-limit map (per IP, 60s cooldown)
const rateLimitMap = new Map<string, number>();

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 500);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Honeypot check ──
    if (body.bot_field) {
      return NextResponse.json({ success: true }); // Silent discard
    }

    // ── Rate Limiting (1 submit per 60s per IP) ──
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const lastSubmit = rateLimitMap.get(ip);
    if (lastSubmit && Date.now() - lastSubmit < 60_000) {
      return NextResponse.json(
        { success: false, error: 'Please wait 60 seconds before submitting again.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, Date.now());

    // Cleanup old entries every 100 requests
    if (rateLimitMap.size > 500) {
      const cutoff = Date.now() - 120_000;
      rateLimitMap.forEach((val, key) => {
        if (val < cutoff) rateLimitMap.delete(key);
      });
    }

    // ── Sanitize payload ──
    const leadPayload = {
      name: sanitize(body.name || ''),
      phone: sanitize(body.phone || ''),
      email: sanitize(body.email || ''),
      bhk: sanitize(body.bhk || ''),
      budget: sanitize(body.budget || ''),
      intent: sanitize(body.intent || ''),
      visitDate: sanitize(body.visitDate || ''),
      visitTime: sanitize(body.visitTime || ''),
      message: sanitize(body.message || ''),
      source: sanitize(body.source || 'Website'),
      timestamp: new Date().toISOString(),
    };

    // ── AI Lead Scoring Engine ──
    let leadScore = 50; // Base score
    let vipTag = '';

    // 1. Geolocation Signal (from Edge Middleware)
    const userCountry = request.headers.get('x-user-country') || 'Unknown';
    const isNri = request.headers.get('x-is-nri-traffic') === 'true';
    if (isNri) leadScore += 25; // NRI investors get massive boost

    // 2. Configuration Intent Signal
    const intentLower = (leadPayload.bhk || leadPayload.intent).toLowerCase();
    if (intentLower.includes('4 bhk') || intentLower.includes('5 bhk') || intentLower.includes('penthouse') || intentLower.includes('altius')) {
      leadScore += 20;
    } else if (intentLower.includes('3 bhk')) {
      leadScore += 10;
    }

    // 3. Immediacy Signal
    if (leadPayload.visitDate) {
      leadScore += 15; // Buyers scheduling visits are high intent
    }

    // Cap score at 99
    leadScore = Math.min(leadScore, 99);

    // Apply VIP Tagging
    if (leadScore >= 80) {
      vipTag = ' [💎 URGENT VIP]';
    }

    // Append score to payload for webhook CRM
    const enhancedPayload = {
      ...leadPayload,
      leadScore,
      userCountry,
      isVip: leadScore >= 80
    };

    // ── Validate required fields ──
    if (!leadPayload.name || !leadPayload.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    // Phone validation (Indian 10-digit)
    const cleanPhone = leadPayload.phone.replace(/[\s\-\(\)\+]/g, '');
    const mobileOnly = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;
    if (!/^[6-9]\d{9}$/.test(mobileOnly)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }
    // ── Dual-Channel Dispatch (In Parallel) ──
    const visitTag = leadPayload.visitDate ? ` [Visit: ${leadPayload.visitDate}]` : '';

    const webhookPromise = (async () => {
      try {
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enhancedPayload),
          signal: AbortSignal.timeout(10_000), // 10s timeout
        });
        const webhookData = await webhookResponse.json();
        return !!webhookData.success;
      } catch (err) {
        console.error('[Lead API] Webhook dispatch failed:', err);
        return false;
      }
    })();

    const formsubmitPromise = (async () => {
      try {
        const fsResponse = await fetch(FORMSUBMIT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: leadPayload.name,
            phone: leadPayload.phone,
            email: leadPayload.email,
            bhk: leadPayload.bhk,
            budget: leadPayload.budget,
            intent: leadPayload.intent,
            visitDate: leadPayload.visitDate,
            visitTime: leadPayload.visitTime,
            message: leadPayload.message,
            source: leadPayload.source,
            timestamp: leadPayload.timestamp,
            _subject: `Blue Ridge Lead${vipTag} [Score: ${leadScore}] - ${leadPayload.name} - ${leadPayload.bhk || leadPayload.intent}${visitTag}`,
            _captcha: 'false',
          }),
          signal: AbortSignal.timeout(10_000),
        });
        const fsData = await fsResponse.json();
        return !!fsData.success;
      } catch (err) {
        console.error('[Lead API] FormSubmit dispatch failed:', err);
        return false;
      }
    })();

    const [webhookSuccess, formsubmitSuccess] = await Promise.all([
      webhookPromise,
      formsubmitPromise
    ]);

    const delivered = webhookSuccess || formsubmitSuccess;

    return NextResponse.json({
      success: true,
      delivered,
      channels: {
        webhook: webhookSuccess,
        formsubmit: formsubmitSuccess,
      },
    });
  } catch (err) {
    console.error('[Lead API] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
