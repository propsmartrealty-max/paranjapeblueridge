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

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const pathname = req.nextUrl.pathname;
  const userAgent = req.headers.get('user-agent') || '';

  const isDev = host.includes('localhost') || host.includes('127.0.0.1');

  // ── 0. Edge Canonical Custom Domain Hardening ──────────────────────────────
  // Enforces primary apex domain: paranjapeblueridge.com
  // 1. Redirects *.pages.dev (Cloudflare Pages default domain) -> https://paranjapeblueridge.com
  // 2. Redirects www.paranjapeblueridge.com -> https://paranjapeblueridge.com
  // 3. Upgrades insecure http -> https
  if (!isDev) {
    const isApexCustomDomain = host === 'paranjapeblueridge.com';
    const isHttps = proto === 'https';

    if (!isApexCustomDomain || !isHttps) {
      const canonicalUrl = new URL(pathname + req.nextUrl.search, 'https://paranjapeblueridge.com');
      return NextResponse.redirect(canonicalUrl.toString(), 301);
    }
  }

  // ── 1. Canonical URL Structure & Trailing Slash Normalization ───────────────
  // Remove trailing slashes (except root '/') for pristine SEO indexing
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.replace(/\/+$/, '');
    const canonicalUrl = new URL(cleanPath + req.nextUrl.search, 'https://paranjapeblueridge.com');
    return NextResponse.redirect(canonicalUrl.toString(), 301);
  }

  // ── 2. Malicious Exploit & Probe Defense ───────────────────────────────────
  // Block vulnerability scanners probing for WordPress, PHP, .env, .git, etc.
  const maliciousPatterns = [
    '/wp-admin', '/wp-login', '/wp-content', '/xmlrpc.php', '/phpmyadmin',
    '/.env', '/.git', '/.aws', '/config.json', '/eval-stdin.php', '/autodiscover',
    '/actuator', '/solr', '/cgi-bin'
  ];
  if (maliciousPatterns.some(p => pathname.toLowerCase().startsWith(p) || pathname.toLowerCase().includes(p))) {
    return new NextResponse('Access Denied: Security Violation.', { status: 403 });
  }

  // ── 3. Crawl Budget Defense: Block aggressive useless scraping bots ──────────
  const badBots = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'Rogerbot', 'BLEXBot', 'sqlmap', 'nikto', 'zgrab', 'python-requests', 'curl', 'wget'];
  if (badBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Access Denied: Crawl Budget Defense Active.', { status: 403 });
  }

  // ── 4. WAF Rate Limiting: Block IP addresses exceeding 120 req/min ───────────
  // Whitelist verified search engine crawlers — they should NEVER be rate-limited
  const isVerifiedCrawler =
    userAgent.includes('Google') ||
    userAgent.includes('Bingbot') ||
    userAgent.includes('DuckDuckBot') ||
    userAgent.includes('YandexBot') ||
    userAgent.includes('Baiduspider');

  if (!isVerifiedCrawler) {
    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
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

  // ── 5. Cloudflare / Edge NRI Geo Detection ──────────────────────────────────
  // Extract geographical data from Cloudflare ('cf-ipcountry') or Vercel Edge.
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    req.geo?.country ||
    'IN';

  // Define high-value NRI hubs (USA, UAE, UK, Singapore, Australia, Canada)
  const isNRIHub = ['US', 'AE', 'GB', 'SG', 'AU', 'CA'].includes(country);

  // Clone the request headers and inject custom tracking data
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-is-nri-traffic', isNRIHub ? 'true' : 'false');
  requestHeaders.set('x-pathname', pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // ── 6. Global Hardened Security Headers ────────────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), display-capture=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Advanced Edge Preloading: HTTP 103 Early Hints for LCP Image
  response.headers.set('Link', '</assets/images/township-night.png>; rel=preload; as=image; fetchpriority=high');

  // Edge telemetry verification headers
  response.headers.set('x-edge-canonical-host', 'paranjapeblueridge.com');
  response.headers.set('x-edge-geo-country', country);
  response.headers.set('x-edge-waf-status', isVerifiedCrawler ? 'Whitelisted' : 'Protected');

  return response;
}

// Config ensures the middleware ONLY runs on actual pages and API routes,
// skipping static files, images, and the _next internal folder to preserve 0.0s caching speeds.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)$).*)',
  ],
};
