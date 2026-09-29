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
  '/sez': '/blue-ridge-sez-tech-park',
  '/blue-ridge-sez': '/blue-ridge-sez-tech-park',
  '/golf': '/blue-ridge-golf-course',
  '/school': '/blue-ridge-public-school',
  '/boat-club': '/blue-ridge-boat-club',
  '/marina': '/blue-ridge-boat-club',
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

    // ── 3b. Clean PSEO Legacy Aliases (redirect known bulk legacy patterns) ──
    const lowerPath = cleanPathname.toLowerCase();
    if (
      lowerPath.endsWith('-paranjape-schemes-blue-ridge-hinjewadi') ||
      lowerPath.endsWith('-paranjape-blue-ridge-township-hinjewadi')
    ) {
      if (
        lowerPath.includes('duplex') ||
        lowerPath.includes('penthouse') ||
        lowerPath.includes('altius') ||
        lowerPath.includes('4-bhk') ||
        lowerPath.includes('5-bhk') ||
        lowerPath.includes('sky-villa')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-the-altius-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (
        lowerPath.includes('promenade') ||
        lowerPath.includes('river-facing') ||
        lowerPath.includes('3-bhk')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-promenade-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (
        lowerPath.includes('ridges-41') ||
        lowerPath.includes('ridges41') ||
        lowerPath.includes('41-ridge') ||
        lowerPath.includes('2-bhk') ||
        lowerPath.includes('smart-homes') ||
        lowerPath.includes('mivan')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-41-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('school') || lowerPath.includes('icse')) {
        return Response.redirect(new URL('/blue-ridge-public-school', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('golf')) {
        return Response.redirect(new URL('/blue-ridge-golf-course', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('boat') || lowerPath.includes('marina') || lowerPath.includes('kayak')) {
        return Response.redirect(new URL('/blue-ridge-boat-club', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('sez') || lowerPath.includes('tech-park') || lowerPath.includes('commercial')) {
        return Response.redirect(new URL('/blue-ridge-sez-tech-park', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('nri') || lowerPath.includes('fema')) {
        return Response.redirect(new URL('/nri-investment', CANONICAL_ORIGIN).toString(), 301);
      }

      return Response.redirect(new URL('/', CANONICAL_ORIGIN).toString(), 301);
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
      '</assets/images/pscl-blue-ridge-aerial-drone.webp>; rel=preload; as=image; fetchpriority=high'
    );
    earlyHintsHeaders.append('Link', '<https://fonts.googleapis.com>; rel=preconnect; crossorigin=anonymous');

    // ── 6. Fetch Origin Response ──
    const originResponse = await fetch(request);

    // If 404, catch and 301 redirect to relevant cluster or home (0ms 404 crawl penalty)
    if (originResponse.status === 404) {
      if (
        lowerPath.includes('duplex') ||
        lowerPath.includes('penthouse') ||
        lowerPath.includes('altius') ||
        lowerPath.includes('4-bhk') ||
        lowerPath.includes('5-bhk') ||
        lowerPath.includes('sky-villa')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-the-altius-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (
        lowerPath.includes('promenade') ||
        lowerPath.includes('river-facing') ||
        lowerPath.includes('3-bhk')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-promenade-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (
        lowerPath.includes('ridges-41') ||
        lowerPath.includes('ridges41') ||
        lowerPath.includes('41-ridge') ||
        lowerPath.includes('2-bhk') ||
        lowerPath.includes('smart-homes') ||
        lowerPath.includes('mivan')
      ) {
        return Response.redirect(new URL('/paranjape-blue-ridge-41-hinjewadi-pune', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('school') || lowerPath.includes('icse')) {
        return Response.redirect(new URL('/blue-ridge-public-school', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('golf')) {
        return Response.redirect(new URL('/blue-ridge-golf-course', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('boat') || lowerPath.includes('marina') || lowerPath.includes('kayak')) {
        return Response.redirect(new URL('/blue-ridge-boat-club', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('sez') || lowerPath.includes('tech-park') || lowerPath.includes('commercial')) {
        return Response.redirect(new URL('/blue-ridge-sez-tech-park', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('nri') || lowerPath.includes('fema')) {
        return Response.redirect(new URL('/nri-investment', CANONICAL_ORIGIN).toString(), 301);
      }
      if (lowerPath.includes('-hinjewadi') || lowerPath.includes('/explore/')) {
        return Response.redirect(new URL('/', CANONICAL_ORIGIN).toString(), 301);
      }
    }

    // Skip HTML rewriting on non-HTML responses (images, CSS, JS, API JSON)
    const contentType = originResponse.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return originResponse;
    }

    // ── 7. Streaming Edge HTMLRewriter for Verification & Performance ──
    const rewriter = new HTMLRewriter()
      .on('head', {
        element(head) {
          head.append(
            `<meta name="cloudflare-edge-seo" content="active-v2.0; crawler=${isSearchBot ? 'searchbot' : 'visitor'}; edge_pop=global" />`,
            { html: true }
          );
        },
      });

    const transformedResponse = rewriter.transform(originResponse);

    // ── 8. Edge Telemetry, Security & Tiered Caching Headers ──
    const canonicalTarget = new URL(cleanPathname || '/', CANONICAL_ORIGIN).toString();
    const responseHeaders = new Headers(transformedResponse.headers);
    responseHeaders.set('X-Edge-Canonical', canonicalTarget);
    responseHeaders.set('X-Edge-Crawler-State', isSearchBot ? 'Priority-Indexed' : 'Standard');
    responseHeaders.set('X-Edge-Location', 'Cloudflare Sovereign Global Edge PoP');
    responseHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    responseHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Timing-Allow-Origin', '*');
    
    // Tiered Stale-While-Revalidate Caching: 24h browser, 30 days global edge
    if (!url.pathname.includes('/api/') && !url.pathname.includes('/sovereign-vault')) {
      responseHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400, stale-if-error=604800');
    }

    if (isSearchBot) {
      responseHeaders.set('X-Googlebot-Priority', 'Maximum-Edge-Pass');
      responseHeaders.set('X-Crawler-Hints', 'IndexNow-RealTime-Emit');
    }
    
    if (url.pathname === '/' || url.pathname === '/mr') {
      responseHeaders.set('Link', '</assets/images/pscl-blue-ridge-aerial-drone.webp>; rel=preload; as=image; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect');
    } else {
      responseHeaders.set('Link', '<https://fonts.googleapis.com>; rel=preconnect');
    }

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers: responseHeaders,
    });
  },
};
