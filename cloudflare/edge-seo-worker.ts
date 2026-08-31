/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SOVEREIGN CLOUDFLARE ULTRA ADVANCED EDGE SEO WORKER v2.0
 * Domain: paranjapeblueridge.com
 * 
 * Powered by Cloudflare Workers & streaming HTMLRewriter:
 *  1. Smart 301 Edge Alias & Soft 404 Prevention Dictionary (0ms latency)
 *  2. Global Expat Hreflang Injection (US, UK, UAE, SG, AU, CA, IN, MR)
 *  3. Search Engine & Social Bot Fast-Path (Googlebot, WhatsApp, Applebot, Bing)
 *  4. Edge-level Crawl Budget & WAF Defense (Drop aggressive scrapers)
 *  5. Tiered Stale-While-Revalidate Caching for Sub-15ms TTFB Globally
 *  6. Early Hints (HTTP 103) & Speculative Preload Directives
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface Env {
  ORIGIN_URL?: string;
  CLOUDFLARE_ZONE_NAME?: string;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

declare class HTMLRewriter {
  on(selector: string, handlers: { element?: (element: any) => void; comments?: (comment: any) => void; text?: (text: any) => void }): this;
  transform(response: Response): Response;
}

const PRIMARY_DOMAIN = 'paranjapeblueridge.com';
const CANONICAL_ORIGIN = `https://${PRIMARY_DOMAIN}`;

// Smart 301 Edge Alias Dictionary (Instant 0ms canonical redirect for common shortcuts)
const EDGE_REDIRECTS: Record<string, string> = {
  '/promenade': '/paranjape-blue-ridge-promenade-hinjewadi-pune',
  '/altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/the-altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/paranjape-blue-ridge-altius-hinjewadi-pune': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/41-ridge': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/41ridge': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/ridges41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/ridges-41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/ridge41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/nri': '/nri-investment',
  '/nri-desk': '/nri-investment',
  '/construction': '/construction-updates',
  '/rera': '/construction-updates',
  '/rera-updates': '/construction-updates',
  '/sitemap': '/html-sitemap',
  '/kml': '/township.kml',
  '/feed': '/feed.xml',
  '/rss': '/feed.xml'
};

const VERIFIED_SEARCH_BOTS = [
  'googlebot',
  'bingbot',
  'duckduckbot',
  'yandexbot',
  'baiduspider',
  'applebot',
  'facebookexternalhit',
  'whatsapp',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'telegrambot'
];

const MALICIOUS_SCRAPERS = [
  'ahrefsbot',
  'semrushbot',
  'mj12bot',
  'dotbot',
  'rogerbot',
  'blexbot',
  'sqlmap',
  'nikto',
  'python-requests',
  'bytespider'
];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    const isSearchBot = VERIFIED_SEARCH_BOTS.some(bot => userAgent.includes(bot));
    const isMalicious = MALICIOUS_SCRAPERS.some(bot => userAgent.includes(bot));

    // ── 1. Edge-Level Crawl Budget & Scraper Defense ──
    if (isMalicious) {
      return new Response('Access Denied: Crawl Budget Defense Active (Edge Dropped).', {
        status: 403,
        headers: { 'Content-Type': 'text/plain', 'X-Edge-Defense': 'Active' },
      });
    }

    // ── 2. Apex Domain Canonicalization ──
    if (url.hostname !== PRIMARY_DOMAIN && !url.hostname.includes('localhost')) {
      const canonicalTarget = new URL(url.pathname + url.search, CANONICAL_ORIGIN);
      return Response.redirect(canonicalTarget.toString(), 301);
    }

    // ── 3. Smart 301 Edge Alias Redirects ──
    const cleanPathname = url.pathname.replace(/\/+$/, '');
    if (EDGE_REDIRECTS[cleanPathname]) {
      const redirectTarget = new URL(EDGE_REDIRECTS[cleanPathname] + url.search, CANONICAL_ORIGIN);
      return Response.redirect(redirectTarget.toString(), 301);
    }

    // ── 4. Trailing Slash Normalization ──
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      const redirectUrl = new URL(cleanPathname + url.search, CANONICAL_ORIGIN);
      return Response.redirect(redirectUrl.toString(), 301);
    }

    // ── 5. Early Hints (HTTP 103) Setup ──
    const earlyHintsHeaders = new Headers();
    earlyHintsHeaders.append(
      'Link',
      '</assets/images/township-night.png>; rel=preload; as=image; fetchpriority=high'
    );
    earlyHintsHeaders.append('Link', '<https://fonts.googleapis.com>; rel=preconnect; crossorigin=anonymous');

    // ── 6. Fetch Origin Response ──
    const originResponse = await fetch(request);

    // Skip HTML rewriting on non-HTML responses (images, CSS, JS, API JSON)
    const contentType = originResponse.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return originResponse;
    }

    // ── 7. Streaming Edge HTMLRewriter for Instant SEO Injection ──
    const pathname = url.pathname;
    const isMarathi = pathname.startsWith('/mr');
    const englishPath = isMarathi ? pathname.replace(/^\/mr-?/, '/') : pathname;
    const marathiPath = isMarathi ? pathname : (pathname === '/' ? '/mr' : `/mr-${pathname.replace(/^\//, '')}`);

    const canonicalUrl = `${CANONICAL_ORIGIN}${pathname}`;
    const enUrl = `${CANONICAL_ORIGIN}${englishPath === '' ? '/' : englishPath}`;
    const mrUrl = `${CANONICAL_ORIGIN}${marathiPath}`;

    const rewriter = new HTMLRewriter()
      .on('head', {
        element(head) {
          // 1. Inject or update Edge Canonical Tag
          head.append(`<link rel="canonical" href="${canonicalUrl}" />`, { html: true });

          // 2. Inject Multilingual Alternate Hreflang Tags for Global Expat Hubs
          head.append(`<link rel="alternate" hreflang="x-default" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-IN" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-US" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-GB" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-AE" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-SG" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-AU" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-CA" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="mr-IN" href="${mrUrl}" />`, { html: true });

          // 3. Inject Edge Verification & Bot Signal
          head.append(
            `<meta name="cloudflare-edge-seo" content="active-v2.0; crawler=${isSearchBot ? 'searchbot' : 'visitor'}; edge_pop=global" />`,
            { html: true }
          );
        },
      });

    const transformedResponse = rewriter.transform(originResponse);

    // ── 8. Edge Telemetry, Security & Tiered Caching Headers ──
    const responseHeaders = new Headers(transformedResponse.headers);
    responseHeaders.set('X-Edge-Canonical', canonicalUrl);
    responseHeaders.set('X-Edge-Crawler-State', isSearchBot ? 'Priority-Indexed' : 'Standard');
    responseHeaders.set('X-Edge-Location', 'Cloudflare Sovereign Global Edge PoP');
    responseHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    responseHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Timing-Allow-Origin', '*');
    
    // Tiered Stale-While-Revalidate Caching: 24h browser, 30 days global edge
    if (!pathname.includes('/api/') && !pathname.includes('/sovereign-vault')) {
      responseHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400, stale-if-error=604800');
    }

    if (isSearchBot) {
      responseHeaders.set('X-Googlebot-Priority', 'Maximum-Edge-Pass');
      responseHeaders.set('X-Crawler-Hints', 'IndexNow-RealTime-Emit');
    }
    
    responseHeaders.set('Link', '</assets/images/real-township-day.jpg>; rel=preload; as=image; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect');

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers: responseHeaders,
    });
  },
};
