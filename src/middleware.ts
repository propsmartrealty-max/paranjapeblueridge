import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Edge WAF: In-Memory Sliding Window Rate Limiter ─────────────────────────
// Tracks { count, windowStart } per IP. Max 120 req/min (2/s) for any visitor.
// Whitelisted bots (Google, Bing) bypass the rate limiter but still hit bot-UA filter.
const RATE_LIMIT_MAX = 120;           // max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000;  // 1-minute sliding window
const CLEANUP_INTERVAL_MS = 300_000;  // purge stale entries every 5 min

const ipRateLimitMap = new Map<string, { count: number; windowStart: number }>();
let lastCleanupTime = Date.now();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup to prevent memory bloat in long-running Edge instances
  if (now - lastCleanupTime > CLEANUP_INTERVAL_MS) {
    Array.from(ipRateLimitMap.entries()).forEach(([key, val]) => {
      if (now - val.windowStart > RATE_LIMIT_WINDOW_MS) {
        ipRateLimitMap.delete(key);
      }
    });
    lastCleanupTime = now;
  }

  const entry = ipRateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    ipRateLimitMap.set(ip, { count: 1, windowStart: now });
    return true; // allowed
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return false; // blocked
  }
  return true; // allowed
}

// Extremely aggressive bots that drain crawl budget or scrape proprietary data
export function middleware(req: NextRequest) {
  // ── 0. Edge Canonical Host Redirect (www -> non-www) ─────────────────────────
  const host = req.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const canonicalHost = host.replace(/^www\./, '');
    const url = req.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = 'https';
    return NextResponse.redirect(url, { status: 301 });
  }

  const userAgent = req.headers.get('user-agent') || '';

  // ── 1. Crawl Budget Defense: Block aggressive useless scraping bots ──────────
  const badBots = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'Rogerbot', 'BLEXBot', 'sqlmap', 'nikto', 'zgrab', 'python-requests', 'curl', 'wget'];
  if (badBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Access Denied: Crawl Budget Defense Active.', { status: 403 });
  }

  // ── 2. WAF Rate Limiting: Block IP addresses exceeding 120 req/min ───────────
  // Whitelist verified search engine crawlers — they should NEVER be rate-limited
  const isVerifiedCrawler =
    userAgent.includes('Googlebot') ||
    userAgent.includes('Bingbot') ||
    userAgent.includes('vercel-edge-functions');

  if (!isVerifiedCrawler) {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '0.0.0.0';

    if (!checkRateLimit(ip)) {
      return new NextResponse('Too Many Requests: Rate limit exceeded. Please slow down.', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Window': '60s',
        },
      });
    }
  }

  // ── 3. NRI Geo Detection ─────────────────────────────────────────────────────
  // Extract geographical data from Vercel Edge/Next.js Edge Headers.
  // On Vercel, the header 'x-vercel-ip-country' is automatically populated.
  // We provide a fallback 'IN' (India) for local development or missing headers.
  const country = req.geo?.country || req.headers.get('x-vercel-ip-country') || 'IN';

  // Define high-value NRI hubs (USA, UAE, UK, Singapore, Australia, Canada)
  const isNRIHub = ['US', 'AE', 'GB', 'SG', 'AU', 'CA'].includes(country);

  // Clone the request headers and inject our custom tracking data
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-is-nri-traffic', isNRIHub ? 'true' : 'false');
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      // Pass the modified headers deeper into the Next.js routing tree
      headers: requestHeaders,
    },
  });

  // ── 4. Global Security Headers (Defense in Depth) ────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Advanced Edge Preloading: HTTP 103 Early Hints for LCP Image
  response.headers.set('Link', '</assets/images/township-night.png>; rel=preload; as=image; fetchpriority=high');

  // Inject response headers for verification tools
  response.headers.set('x-edge-geo-status', 'Active');
  response.headers.set('x-edge-waf-status', isVerifiedCrawler ? 'Whitelisted' : 'Protected');

  return response;
}

// Config ensures the middleware ONLY runs on actual pages and API routes,
// skipping static files, images, and the _next internal folder to preserve 0.0s caching speeds.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
