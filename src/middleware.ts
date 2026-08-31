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
  // Block vulnerability scanners, directory traversal, and exploit probes
  const maliciousPathPatterns = [
    '/wp-admin', '/wp-login', '/wp-content', '/wp-includes', '/xmlrpc.php', '/phpmyadmin',
    '/.env', '/.git', '/.aws', '/config.json', '/eval-stdin.php', '/autodiscover',
    '/actuator', '/solr', '/cgi-bin', '/telescope', '/phpunit', '/server-status',
    '/vendor/composer', '/debug/default/view', '/.ds_store', '/etc/passwd', '/proc/self'
  ];
  const lowerPath = pathname.toLowerCase();
  if (maliciousPathPatterns.some(p => lowerPath.startsWith(p) || lowerPath.includes(p)) || lowerPath.includes('..') || lowerPath.includes('%2e%2e')) {
    return new NextResponse('Access Denied: Security Violation.', { status: 403 });
  }

  // ── 2b. Query String Attack Injection Defense ──────────────────────────────
  const queryString = req.nextUrl.search.toLowerCase();
  if (queryString) {
    const maliciousQueryPatterns = [
      '<script', '%3cscript', 'javascript:', 'union%20select', 'union+select',
      'concat(', 'eval(', 'base64_decode', '${jndi:', '<!entity', 'document.cookie'
    ];
    if (maliciousQueryPatterns.some(p => queryString.includes(p))) {
      return new NextResponse('Access Denied: Malicious Query Signature Detected.', { status: 403 });
    }
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
  // Extract comprehensive geographical data from Cloudflare ('cf-ipcountry', 'cf-ipcity', etc.) or Vercel Edge.
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    req.geo?.country ||
    'IN';
  
  const city = req.headers.get('cf-ipcity') || req.geo?.city || '';
  const region = req.headers.get('cf-region') || req.geo?.region || '';
  const timezone = req.headers.get('cf-timezone') || '';
  const cfRay = req.headers.get('cf-ray') || '';

  // Define high-value NRI hubs (USA, UAE, UK, Singapore, Australia, Canada)
  const isNRIHub = ['US', 'AE', 'GB', 'SG', 'AU', 'CA'].includes(country);

  // Dynamic Cache-Tag assignment for granular Cloudflare Edge Purging
  let cacheTag = 'blueridge-core';
  if (pathname === '/') {
    cacheTag = 'blueridge-core,blueridge-home';
  } else if (pathname.includes('promenade') || pathname.includes('altius') || pathname.includes('41')) {
    cacheTag = 'blueridge-core,blueridge-cluster';
  } else if (pathname.includes('insights') || pathname.includes('blog')) {
    cacheTag = 'blueridge-core,blueridge-insights';
  } else if (pathname.includes('directory') || pathname.includes('flats') || pathname.includes('bhk')) {
    cacheTag = 'blueridge-core,blueridge-pseo';
  }

  // Clone the request headers and inject custom tracking data
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-user-city', city);
  requestHeaders.set('x-user-region', region);
  requestHeaders.set('x-user-timezone', timezone);
  requestHeaders.set('x-is-nri-traffic', isNRIHub ? 'true' : 'false');
  requestHeaders.set('x-pathname', pathname);
  if (cfRay) requestHeaders.set('x-cf-ray', cfRay);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // ── 6. Global Enterprise Cloudflare & Security Headers ─────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Origin-Agent-Cluster', '?1');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), display-capture=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Enterprise Content Security Policy
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://www.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com https://maps.googleapis.com https://maps.gstatic.com https://*.google.com https://*.googleapis.com",
    "frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://www.youtube.com https://youtube.com",
    "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://script.google.com https://formsubmit.co https://api.indexnow.org https://www.bing.com https://maps.googleapis.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://challenges.cloudflare.com https://formsubmit.co",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests"
  ].join('; ');
  response.headers.set('Content-Security-Policy', cspHeader);

  // Cloudflare Edge Cache & Cache-Tag directives
  response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=86400, stale-if-error=604800');
  response.headers.set('CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=86400');
  response.headers.set('Surrogate-Control', 'max-age=86400, stale-while-revalidate=86400');
  response.headers.set('Cache-Tag', cacheTag);

  // Advanced Edge Preloading: HTTP 103 Early Hints for LCP Hero Assets
  response.headers.set('Link', '</assets/images/real-township-day.jpg>; rel=preload; as=image; fetchpriority=high, </assets/images/blue-ridge-logo.png>; rel=preload; as=image');

  // Enterprise telemetry verification headers
  response.headers.set('x-edge-canonical-host', 'paranjapeblueridge.com');
  response.headers.set('x-edge-geo-country', country);
  response.headers.set('x-edge-geo-city', city || 'Unknown');
  response.headers.set('x-edge-waf-status', isVerifiedCrawler ? 'Whitelisted' : 'Protected');
  response.headers.set('x-edge-cache-tag', cacheTag);

  return response;
}

// Config ensures the middleware ONLY runs on actual pages and API routes,
// skipping static files, images, and the _next internal folder to preserve 0.0s caching speeds.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)$).*)',
  ],
};
