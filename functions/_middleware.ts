// Cloudflare Pages Functions - Edge Middleware
// Domain: paranjapeblueridge.com

interface Env {
  ORIGIN_URL?: string;
}

const CANONICAL_HOST = 'paranjapeblueridge.com';

const EDGE_REDIRECTS: Record<string, string> = {
  '/promenade': '/paranjape-blue-ridge-promenade-hinjewadi-pune',
  '/altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/the-altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/ridges41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/ridges-41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/41-ridge': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/sez': '/#sez',
  '/golf': '/#golf',
  '/school': '/#lifestyle',
  '/amenities': '/#lifestyle',
  '/masterplan': '/#masterplan',
  '/specifications': '/#specifications',
  '/nri': '/nri-investment',
  '/nri-desk': '/nri-investment',
  '/construction': '/construction-updates',
  '/rera': '/construction-updates',
  '/brochure': '/sovereign-vault',
  '/cost-sheet': '/#enquiry',
  '/floor-plans': '/sovereign-vault',
  '/sitemap': '/sitemap-index.xml',
  '/sitemap.xml': '/sitemap-index.xml',
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
  'linkedinbot'
];

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const userAgent = (context.request.headers.get('user-agent') || '').toLowerCase();
  const isSearchBot = VERIFIED_SEARCH_BOTS.some(bot => userAgent.includes(bot));

  // 1. Enforce Canonical Host (redirect www to apex domain)
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Instant Zero-Latency 301 Edge Aliases
  const normalizedPath = url.pathname.toLowerCase().replace(/\/$/, '');
  if (EDGE_REDIRECTS[normalizedPath]) {
    const target = EDGE_REDIRECTS[normalizedPath];
    return Response.redirect(new URL(target, url.origin).toString(), 301);
  }

  // 3. Trailing Slash Normalization (strip trailing slashes except for root '/')
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url.toString(), 301);
  }

  // 4. Pass through to next handler / static asset
  const response = await context.next();

  // Clone headers for augmentation
  const headers = new Headers(response.headers);

  // 5. Early Hints / Link Preload Header for Hero Image and Styles
  if (response.headers.get('content-type')?.includes('text/html')) {
    headers.set(
      'Link',
      '</assets/images/pscl-blue-ridge-aerial-drone.webp>; rel=preload; as=image; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    );

    // Ensure search bots receive optimal crawler directive headers
    if (isSearchBot) {
      headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }
  }

  // 6. Enterprise Edge Security & Performance Headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};
