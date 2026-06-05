import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Extract geographical data from Vercel Edge/Next.js Edge Headers
  // On Vercel, the header 'x-vercel-ip-country' is automatically populated.
  // We provide a fallback 'IN' (India) for local development or missing headers.
  const country = req.geo?.country || req.headers.get('x-vercel-ip-country') || 'IN';
  
  // Define high-value NRI hubs (USA, UAE, UK, Singapore, Australia, Canada)
  const isNRIHub = ['US', 'AE', 'GB', 'SG', 'AU', 'CA'].includes(country);
  
  // Clone the request headers and inject our custom tracking data
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-country', country);
  requestHeaders.set('x-is-nri-traffic', isNRIHub ? 'true' : 'false');
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      // Pass the modified headers deeper into the Next.js routing tree
      headers: requestHeaders,
    },
  });

  // Also set a secure HTTP-only cookie so that client-side tracking or API routes 
  // (/api/lead) can capture if the lead originated from an NRI hub.
  response.cookies.set('nri_session', isNRIHub ? 'true' : 'false', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 Week
  });

  // Inject a header into the final response for verification tools
  response.headers.set('x-edge-geo-status', 'Active');
  
  return response;
}

// Config ensures the middleware ONLY runs on actual pages and API routes, 
// skipping static files, images, and the _next internal folder to preserve 0.0s caching speeds.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
