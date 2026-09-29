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
  '/explore/hinjewadi': '/hinjewadi-micro-market',
  '/explore/wakad': '/flats-in-wakad-near-hinjewadi-flyover',
  '/explore/baner': '/flats-near-baner-and-balewadi-high-street-pune'
};

async function handleRequest(request) {
  const url = new URL(request.url);

  // 1. Enforce Non-WWW Apex Domain
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Exact Match Redirects
  const normalizedPath = url.pathname.toLowerCase().replace(/\/$/, '');
  if (EDGE_REDIRECTS[normalizedPath]) {
    const target = EDGE_REDIRECTS[normalizedPath];
    return Response.redirect(new URL(target, url.origin).toString(), 301);
  }

  // 3. Catch & 301 Redirect ALL 6,300+ Legacy PSEO URLs to Eliminate 404s
  if (
    normalizedPath.endsWith('-paranjape-schemes-blue-ridge-hinjewadi') ||
    normalizedPath.endsWith('-paranjape-blue-ridge-township-hinjewadi') ||
    normalizedPath.endsWith('-blue-ridge-hinjewadi')
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

  // If origin returns 404 for an old keyword URL, catch and redirect to home
  if (response.status === 404 && (normalizedPath.includes('-hinjewadi') || normalizedPath.includes('/explore/'))) {
    return Response.redirect(new URL('/', url.origin).toString(), 301);
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

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
