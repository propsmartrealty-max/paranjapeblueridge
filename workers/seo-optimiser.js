// workers/seo-optimiser.js
// Cloudflare Edge Worker for Paranjape Blue Ridge
// High-Performance Zero-Conflict Edge Optimizer

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const CANONICAL_HOST = 'paranjapeblueridge.com';

const EDGE_REDIRECTS = {
  '/promenade': '/paranjape-blue-ridge-promenade-hinjewadi-pune',
  '/altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/the-altius': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/paranjape-blue-ridge-altius-hinjewadi-pune': '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  '/ridges41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/ridges-41': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/41-ridge': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/41ridge': '/paranjape-blue-ridge-41-hinjewadi-pune',
  '/sez': '/blue-ridge-sez-tech-park',
  '/blue-ridge-sez': '/blue-ridge-sez-tech-park',
  '/golf': '/blue-ridge-golf-course',
  '/school': '/blue-ridge-public-school',
  '/boat-club': '/blue-ridge-boat-club',
  '/marina': '/blue-ridge-boat-club',
  '/amenities': '/#lifestyle',
  '/masterplan': '/#masterplan',
  '/specifications': '/#specifications',
  '/nri': '/nri-investment',
  '/nri-desk': '/nri-investment',
  '/construction': '/construction-updates',
  '/rera': '/construction-updates',
  '/brochure': '/#enquiry',
  '/download-brochure': '/#enquiry',
  '/cost-sheet': '/#enquiry',
  '/floor-plans': '/#residences',
  '/floorplans': '/#residences',
  '/plans': '/#residences',
  '/pricing': '/#residences',
  '/sitemap': '/sitemap-index.xml',
  '/sitemap.xml': '/sitemap-index.xml',
  '/rss': '/feed.xml',
  '/llm.txt': '/llms.txt',
  '/llm.json': '/llms.json',
  '/explore/hinjewadi': '/hinjewadi-micro-market',
  '/explore/wakad': '/flats-in-wakad-near-hinjewadi-flyover',
  '/explore/baner': '/flats-near-baner-and-balewadi-high-street-pune'
};

const VERIFIED_SEARCH_BOTS = [
  'googlebot',
  'bingbot',
  'duckduckbot',
  'yandexbot',
  'baiduspider',
  'applebot',
  'applebot-extended',
  'gptbot',
  'oai-searchbot',
  'perplexitybot',
  'claudebot',
  'claude-web',
  'cohere-ai',
  'amazonbot',
  'meta-externalagent',
  'facebookexternalhit',
  'whatsapp',
  'twitterbot',
  'linkedinbot'
];

async function handleRequest(request) {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const isSearchBot = VERIFIED_SEARCH_BOTS.some(bot => userAgent.includes(bot));

  // 1. Enforce Canonical Host (redirect www, pages.dev, or any non-canonical host to apex domain)
  if (url.hostname !== CANONICAL_HOST && !url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
    const targetUrl = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
    return Response.redirect(targetUrl.toString(), 301);
  }

  // 2. Exact Match Redirects
  const normalizedPath = url.pathname.toLowerCase().replace(/\/$/, '');
  if (EDGE_REDIRECTS[normalizedPath]) {
    const target = EDGE_REDIRECTS[normalizedPath];
    return Response.redirect(new URL(target, url.origin).toString(), 301);
  }

  // 3. Catch & 301 Redirect Known Legacy Bulk PSEO Suffixes at Edge
  if (
    normalizedPath.endsWith('-paranjape-schemes-blue-ridge-hinjewadi') ||
    normalizedPath.endsWith('-paranjape-blue-ridge-township-hinjewadi')
  ) {
    if (
      normalizedPath.includes('duplex') ||
      normalizedPath.includes('penthouse') ||
      normalizedPath.includes('altius') ||
      normalizedPath.includes('4-bhk') ||
      normalizedPath.includes('5-bhk') ||
      normalizedPath.includes('sky-villa')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-the-altius-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (
      normalizedPath.includes('promenade') ||
      normalizedPath.includes('river-facing') ||
      normalizedPath.includes('3-bhk')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-promenade-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (
      normalizedPath.includes('ridges-41') ||
      normalizedPath.includes('ridges41') ||
      normalizedPath.includes('41-ridge') ||
      normalizedPath.includes('2-bhk') ||
      normalizedPath.includes('smart-homes') ||
      normalizedPath.includes('mivan')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-41-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('school') || normalizedPath.includes('icse')) {
      return Response.redirect(new URL('/blue-ridge-public-school', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('golf')) {
      return Response.redirect(new URL('/blue-ridge-golf-course', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('boat') || normalizedPath.includes('marina') || normalizedPath.includes('kayak')) {
      return Response.redirect(new URL('/blue-ridge-boat-club', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('sez') || normalizedPath.includes('tech-park') || normalizedPath.includes('commercial')) {
      return Response.redirect(new URL('/blue-ridge-sez-tech-park', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('nri') || normalizedPath.includes('fema')) {
      return Response.redirect(new URL('/nri-investment', url.origin).toString(), 301);
    }

    return Response.redirect(new URL('/', url.origin).toString(), 301);
  }

  // 4. Trailing Slash Normalization
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url.toString(), 301);
  }

  // 5. Fetch Origin Response
  const response = await fetch(request);
  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // If origin returns 404, catch and 301 redirect to relevant cluster or home (0ms 404 crawl penalty)
  if (response.status === 404) {
    if (
      normalizedPath.includes('duplex') ||
      normalizedPath.includes('penthouse') ||
      normalizedPath.includes('altius') ||
      normalizedPath.includes('4-bhk') ||
      normalizedPath.includes('5-bhk') ||
      normalizedPath.includes('sky-villa')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-the-altius-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (
      normalizedPath.includes('promenade') ||
      normalizedPath.includes('river-facing') ||
      normalizedPath.includes('3-bhk')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-promenade-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (
      normalizedPath.includes('ridges-41') ||
      normalizedPath.includes('ridges41') ||
      normalizedPath.includes('41-ridge') ||
      normalizedPath.includes('2-bhk') ||
      normalizedPath.includes('smart-homes') ||
      normalizedPath.includes('mivan')
    ) {
      return Response.redirect(new URL('/paranjape-blue-ridge-41-hinjewadi-pune', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('school') || normalizedPath.includes('icse')) {
      return Response.redirect(new URL('/blue-ridge-public-school', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('golf')) {
      return Response.redirect(new URL('/blue-ridge-golf-course', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('boat') || normalizedPath.includes('marina') || normalizedPath.includes('kayak')) {
      return Response.redirect(new URL('/blue-ridge-boat-club', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('sez') || normalizedPath.includes('tech-park') || normalizedPath.includes('commercial')) {
      return Response.redirect(new URL('/blue-ridge-sez-tech-park', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('nri') || normalizedPath.includes('fema')) {
      return Response.redirect(new URL('/nri-investment', url.origin).toString(), 301);
    }
    if (normalizedPath.includes('-hinjewadi') || normalizedPath.includes('/explore/')) {
      return Response.redirect(new URL('/', url.origin).toString(), 301);
    }
  }

  // 6. Enterprise Edge Security & Performance Headers
  const headers = new Headers(response.headers);

  if (url.pathname === '/' || url.pathname === '/mr') {
    headers.set(
      'Link',
      '</assets/images/pscl-blue-ridge-aerial-drone.webp>; rel=preload; as=image; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    );
  } else {
    headers.set(
      'Link',
      '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    );
  }

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  if (isSearchBot) {
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }

  // 7. Edge HTMLRewriter Transformation (Zero-Latency Rust/C++ Streaming Parser)
  const rewriter = new HTMLRewriter()
    .on('img', {
      element(el) {
        const src = el.getAttribute('src') || '';
        if (src.includes('drone') || el.getAttribute('fetchpriority') === 'high') {
          el.setAttribute('fetchpriority', 'high');
          el.removeAttribute('loading');
        } else {
          if (!el.hasAttribute('loading')) el.setAttribute('loading', 'lazy');
          if (!el.hasAttribute('decoding')) el.setAttribute('decoding', 'async');
        }
      }
    })
    .on('a', {
      element(el) {
        const href = el.getAttribute('href') || '';
        if (href.startsWith('http://') || href.startsWith('https://')) {
          if (!href.includes('paranjapeblueridge.com')) {
            const rel = el.getAttribute('rel') || '';
            if (!rel.includes('noopener')) {
              el.setAttribute('rel', (rel ? rel + ' ' : '') + 'noopener noreferrer');
            }
          }
        }
      }
    });

  return rewriter.transform(new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  }));
}
