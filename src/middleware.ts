import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. URL Normalization (Remove trailing slashes)
  // Note: Next.js handles basic trailing slashes based on next.config.mjs,
  // but enforcing it here guarantees consistency for SEO.
  const url = request.nextUrl.clone();
  
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // 2. Clone headers and inject Geo-Enrichment data
  const requestHeaders = new Headers(request.headers);
  
  // Vercel provides these headers at the edge
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || 'IN';
  const city = request.geo?.city || request.headers.get('x-vercel-ip-city') || 'Pune';
  
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-user-city', city);
  
  // Create response and apply request headers so server components can read them
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 3. Apply Basic Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
};
