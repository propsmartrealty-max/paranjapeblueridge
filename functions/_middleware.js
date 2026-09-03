/**
 * Cloudflare Pages Global Edge Middleware
 * Paranjape Blue Ridge Hinjewadi - Ultra Advanced Edge Infrastructure
 */

export async function onRequest(context) {
  const { request, next } = context;
  const userAgent = request.headers.get('user-agent') || '';
  const country = request.headers.get('cf-ipcountry') || 'IN';
  const colo = request.cf?.colo || 'BOM';

  // 1. Detect Search Engine & AI Crawlers
  const isSearchEngine = /googlebot|bingbot|yandex|baiduspider|applebot|duckduckbot/i.test(userAgent);
  const isAiSearchEngine = /chatgpt-user|gptbot|perplexitybot|claudebot|anthropic-ai|bytespider/i.test(userAgent);
  
  // 2. NRI & Global Currency Edge Localization
  let currencyCode = 'INR';
  let currencySymbol = '₹';
  if (['US', 'CA'].includes(country)) {
    currencyCode = 'USD';
    currencySymbol = '$';
  } else if (['AE', 'SA', 'QA', 'KW', 'OM'].includes(country)) {
    currencyCode = 'AED';
    currencySymbol = 'AED ';
  } else if (['GB'].includes(country)) {
    currencyCode = 'GBP';
    currencySymbol = '£';
  } else if (['SG', 'AU', 'NZ'].includes(country)) {
    currencyCode = 'SGD';
    currencySymbol = 'S$';
  }

  // 3. Process Request
  const response = await next();

  // If 304 Not Modified or 204 No Content, return directly
  if (response.status === 204 || response.status === 304) {
    return response;
  }

  const newHeaders = new Headers(response.headers);

  // 4. Inject Edge SEO & Telemetry Headers
  newHeaders.set('X-Edge-Datacenter', colo);
  newHeaders.set('X-Edge-Geo-Country', country);
  newHeaders.set('X-Edge-Currency', currencyCode);
  newHeaders.set('X-Edge-Currency-Symbol', currencySymbol);
  newHeaders.set('X-Crawler-Type', isAiSearchEngine ? 'AI-Search' : isSearchEngine ? 'Search-Engine' : 'Client');
  newHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  
  // 5. Early Hints Link Header for HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    newHeaders.set('Link', '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://images.unsplash.com>; rel=preconnect');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
