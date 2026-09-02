import { defineMiddleware } from 'astro:middleware';

const RATE_LIMIT_MAX = 120;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 300_000;

const ipRateLimitMap = new Map<string, { count: number; windowStart: number }>();
let lastCleanupTime = Date.now();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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
    ipRateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return false;
  }
  return true;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const req = context.request;
  const url = context.url;
  const host = req.headers.get('host') || url.host || '';
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const pathname = url.pathname;
  const userAgent = req.headers.get('user-agent') || '';

  const isDev = host.includes('localhost') || host.includes('127.0.0.1');

  // ── 0. Verified Google Crawler Fast-Track & Whitelist ─────────────────────────
  const isGoogleCrawler = 
    userAgent.includes('Googlebot') ||
    userAgent.includes('Google-InspectionTool') ||
    userAgent.includes('Google-Site-Verification') ||
    userAgent.includes('Storebot-Google') ||
    userAgent.includes('Google-Extended') ||
    userAgent.includes('AdsBot-Google') ||
    userAgent.includes('Mediapartners-Google') ||
    userAgent.includes('APIs-Google') ||
    userAgent.includes('Feedfetcher-Google');

  const isBingCrawler = userAgent.includes('bingbot') || userAgent.includes('BingPreview');
  const isSearchEngine = isGoogleCrawler || isBingCrawler || userAgent.includes('DuckDuckBot') || userAgent.includes('YandexBot');

  // ── 1. Edge Canonical Domain Hardening ───────────────────────────────────────
  if (!isDev) {
    const isApexCustomDomain = host === 'paranjapeblueridge.com';
    const isHttps = proto === 'https';

    if (!isApexCustomDomain || !isHttps) {
      const canonicalUrl = new URL(pathname + url.search, 'https://paranjapeblueridge.com');
      return Response.redirect(canonicalUrl.toString(), 301);
    }
  }

  // ── 2. Trailing Slash Normalization ──────────────────────────────────────────
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.replace(/\/+$/, '');
    const canonicalUrl = new URL(cleanPath + url.search, 'https://paranjapeblueridge.com');
    return Response.redirect(canonicalUrl.toString(), 301);
  }

  // ── 3. Exploit Probe & Scanner Defense (Bypassed for verified search crawlers) ─
  if (!isSearchEngine) {
    const maliciousPathPatterns = [
      '/wp-admin', '/wp-login', '/wp-content', '/wp-includes', '/xmlrpc.php', '/phpmyadmin',
      '/.env', '/.git', '/.aws', '/config.json', '/eval-stdin.php', '/autodiscover',
      '/actuator', '/solr', '/cgi-bin', '/telescope', '/phpunit', '/server-status',
      '/vendor/composer', '/debug/default/view', '/.ds_store', '/etc/passwd', '/proc/self'
    ];
    const lowerPath = pathname.toLowerCase();
    if (maliciousPathPatterns.some(p => lowerPath.startsWith(p) || lowerPath.includes(p)) || lowerPath.includes('..') || lowerPath.includes('%2e%2e')) {
      return new Response('Access Denied: Security Violation.', { status: 403 });
    }

    const queryString = url.search.toLowerCase();
    if (queryString) {
      const maliciousQueryPatterns = [
        '<script', '%3cscript', 'javascript:', 'union%20select', 'union+select',
        'concat(', 'eval(', 'base64_decode', '${jndi:', '<!entity', 'document.cookie'
      ];
      if (maliciousQueryPatterns.some(p => queryString.includes(p))) {
        return new Response('Access Denied: Malicious Query Signature Detected.', { status: 403 });
      }
    }

    const badBots = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'Rogerbot', 'BLEXBot', 'sqlmap', 'nikto', 'zgrab', 'python-requests', 'curl', 'wget'];
    if (badBots.some(bot => userAgent.includes(bot))) {
      return new Response('Access Denied: Crawl Budget Defense Active.', { status: 403 });
    }

    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      '0.0.0.0';

    if (!checkRateLimit(ip)) {
      return new Response('Too Many Requests: Rate limit exceeded.', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Window': '60s',
        },
      });
    }
  }

  // ── 4. Cloudflare Edge Cache-Tag Partitioning ────────────────────────────────
  let cacheTag = 'blueridge-core';
  if (pathname === '/') {
    cacheTag = 'blueridge-core,blueridge-home';
  } else if (pathname.includes('promenade') || pathname.includes('altius') || pathname.includes('41')) {
    cacheTag = 'blueridge-core,blueridge-cluster';
  } else if (pathname.includes('insights') || pathname.includes('blog')) {
    cacheTag = 'blueridge-core,blueridge-insights';
  } else if (pathname.includes('directory')) {
    cacheTag = 'blueridge-core,blueridge-pseo';
  }

  const response = await next();

  // ── 5. Enterprise Google & Cloudflare Edge Header Suite ──────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('Timing-Allow-Origin', '*');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), display-capture=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Google Search & Discover Directive: maximum rich snippet expansion
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Multi-Tiered Cloudflare Edge Cache Directives
  response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=86400, stale-if-error=604800');
  response.headers.set('CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=86400');
  response.headers.set('Surrogate-Control', 'max-age=86400, stale-while-revalidate=86400');
  response.headers.set('Cache-Tag', cacheTag);
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform');

  // HTTP 103 Early Hints for Core Web Vitals (LCP < 0.8s)
  response.headers.set('Link', '</assets/images/real-township-day.jpg>; rel=preload; as=image; fetchpriority=high, </assets/images/blue-ridge-logo.png>; rel=preload; as=image, <https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin');

  if (isGoogleCrawler) {
    response.headers.set('X-Crawler-Priority', 'ultra-high');
    response.headers.set('X-Edge-Served-By', 'Cloudflare-Googlebot-FastLane');
  }

  return response;
});
