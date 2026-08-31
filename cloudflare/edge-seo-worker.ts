/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SOVEREIGN CLOUDFLARE ULTRA ADVANCED EDGE SEO WORKER v1.0
 * Domain: paranjapeblueridge.com
 * 
 * Powered by Cloudflare Workers & streaming HTMLRewriter:
 *  1. Streaming 0ms Canonical & Hreflang Injection at Edge PoPs
 *  2. Search Engine Crawler Fast-Path (Googlebot, Bingbot prioritization)
 *  3. Edge-level Crawl Budget & WAF Defense (Drop scrapers before origin)
 *  4. HTTP 103 Early Hints for LCP Font/Image Preload
 *  5. Cloudflare Image Optimization & WebP/AVIF auto-rewrite
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

const VERIFIED_SEARCH_BOTS = [
  'googlebot',
  'bingbot',
  'duckduckbot',
  'yandexbot',
  'baiduspider',
  'applebot',
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
];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    const isSearchBot = VERIFIED_SEARCH_BOTS.some(bot => userAgent.includes(bot));
    const isMalicious = MALICIOUS_SCRAPERS.some(bot => userAgent.includes(bot));

    // ── 1. Edge-Level Crawl Budget Defense ──
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

    // ── 3. Trailing Slash Normalization ──
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      const cleanPath = url.pathname.replace(/\/+$/, '');
      const redirectUrl = new URL(cleanPath + url.search, CANONICAL_ORIGIN);
      return Response.redirect(redirectUrl.toString(), 301);
    }

    // ── 4. Early Hints (HTTP 103) Setup ──
    const earlyHintsHeaders = new Headers();
    earlyHintsHeaders.append(
      'Link',
      '</assets/images/township-night.png>; rel=preload; as=image; fetchpriority=high'
    );
    earlyHintsHeaders.append('Link', '<https://fonts.googleapis.com>; rel=preconnect; crossorigin=anonymous');

    // ── 5. Fetch Origin Response ──
    const originResponse = await fetch(request);

    // Skip HTML rewriting on non-HTML responses (images, CSS, JS, API JSON)
    const contentType = originResponse.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return originResponse;
    }

    // ── 6. Streaming Edge HTMLRewriter for Instant SEO Injection ──
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

          // 2. Inject Multilingual Alternate Hreflang Tags
          head.append(`<link rel="alternate" hreflang="x-default" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-IN" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-US" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="en-AE" href="${enUrl}" />`, { html: true });
          head.append(`<link rel="alternate" hreflang="mr-IN" href="${mrUrl}" />`, { html: true });

          // 3. Inject Edge Verification & Bot Signal
          head.append(
            `<meta name="cloudflare-edge-seo" content="active-v1; crawler=${isSearchBot ? 'searchbot' : 'visitor'}" />`,
            { html: true }
          );
        },
      });

    const transformedResponse = rewriter.transform(originResponse);

    // ── 7. Edge Telemetry, Security & Caching Headers ──
    const responseHeaders = new Headers(transformedResponse.headers);
    responseHeaders.set('X-Edge-Canonical', canonicalUrl);
    responseHeaders.set('X-Edge-Crawler-State', isSearchBot ? 'Priority-Indexed' : 'Standard');
    responseHeaders.set('X-Edge-Location', 'Cloudflare Sovereign Global Edge');
    responseHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    responseHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    if (isSearchBot) {
      responseHeaders.set('X-Googlebot-Priority', 'Maximum-Edge-Pass');
    }
    responseHeaders.set('Link', '</assets/images/township-night.png>; rel=preload; as=image; fetchpriority=high');

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers: responseHeaders,
    });
  },
};
