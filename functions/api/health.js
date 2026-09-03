/**
 * Cloudflare Pages Function: /api/health
 * Real-time health diagnostic for Paranjape Blue Ridge Edge
 */

export async function onRequestGet(context) {
  const { request } = context;
  const cf = request.cf || {};

  return new Response(
    JSON.stringify({
      status: "healthy",
      service: "Paranjape Blue Ridge Cloudflare Edge Gateway",
      timestamp: new Date().toISOString(),
      edgeDataCenter: cf.colo || "LOCAL",
      city: cf.city || "Pune",
      country: cf.country || "IN",
      httpProtocol: cf.httpProtocol || "HTTP/3",
      tlsVersion: cf.tlsVersion || "TLSv1.3",
      security: "MahaRERA Protected / SSL Secured"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
