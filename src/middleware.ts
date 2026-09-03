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
  const pathname = url.pathname;
  const userAgent = req.headers.get('user-agent') || '';

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

  // ── 1. Exploit Probe & Scanner Defense (Bypassed for verified search crawlers) ─
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

    // ── 2. Edge In-Memory Rate Limiting ─────────────────────────────────────────
    if (!pathname.startsWith('/_astro/') && !pathname.startsWith('/assets/')) {
      const clientIp = 
        req.headers.get('cf-connecting-ip') ||
        req.headers.get('x-real-ip') ||
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        '127.0.0.1';

      // Never rate limit localhost, build-time prerendering, or local development
      if (clientIp !== '127.0.0.1' && clientIp !== '::1' && clientIp !== 'localhost') {
        if (!checkRateLimit(clientIp)) {
          return new Response('Too Many Requests. Rate limit exceeded. Please wait a minute.', {
            status: 429,
            headers: {
              'Retry-After': '60',
              'Content-Type': 'text/plain'
            }
          });
        }
      }
    }
  }

  const response = await next();

  // ── 3. High-Performance Edge Cache-Tags & Telemetry Headers ──────────────────
  if (isGoogleCrawler) {
    response.headers.set('X-Crawler-Priority', 'ultra-high');
    response.headers.set('X-Edge-Served-By', 'Cloudflare-Googlebot-FastLane');
  }

  // Dynamic Cache-Tags
  if (pathname === '/' || pathname === '/mr') {
    response.headers.set('Cache-Tag', 'blueridge-home,blueridge-core');
  } else if (pathname.includes('/paranjape-blue-ridge-')) {
    response.headers.set('Cache-Tag', 'blueridge-cluster,blueridge-core');
  } else if (pathname.startsWith('/insights/')) {
    response.headers.set('Cache-Tag', 'blueridge-insights,blueridge-articles');
  } else if (pathname.startsWith('/directory/')) {
    response.headers.set('Cache-Tag', 'blueridge-directory,blueridge-pseo');
  } else {
    response.headers.set('Cache-Tag', 'blueridge-static,blueridge-core');
  }

  // Google Discover and Rich Media
  response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  response.headers.set('Timing-Allow-Origin', '*');

  return response;
});
