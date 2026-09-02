import type { APIRoute } from 'astro';

export const prerender = false;

const DOMAIN = 'paranjapeblueridge.com';
const SITE_URL = `https://${DOMAIN}`;
const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const queryKey = url.searchParams.get('key');

  if (authHeader !== `Bearer ${INDEXNOW_KEY}` && queryKey !== INDEXNOW_KEY) {
    return new Response('Unauthorized: Invalid IndexNow Key', { status: 401 });
  }

  try {
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
    const bingPingResult = await fetch(bingPingUrl)
      .then(res => res.status === 200)
      .catch(() => false);

    const indexNowPayload = {
      host: DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [
        `${SITE_URL}/`,
        `${SITE_URL}/directory`,
        `${SITE_URL}/directory/1`,
        `${SITE_URL}/insights`,
        `${SITE_URL}/hinjewadi-micro-market`,
        `${SITE_URL}/paranjape-blue-ridge-promenade-hinjewadi-pune`,
        `${SITE_URL}/paranjape-blue-ridge-the-altius-hinjewadi-pune`,
        `${SITE_URL}/paranjape-blue-ridge-41-hinjewadi-pune`,
        `${SITE_URL}/nri-investment`
      ]
    };

    const indexNowResult = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(indexNowPayload)
    }).then(res => res.status === 200 || res.status === 202).catch(() => false);

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Cloudflare & IndexNow Edge Instant Indexing Triggered Successfully.',
        stats: {
          bingSitemapPing: bingPingResult ? 'Success' : 'Failed',
          indexNowNetworkStatus: indexNowResult ? 'Accepted' : 'Failed',
          submittedUrlsCount: indexNowPayload.urlList.length
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('[Cloudflare/IndexNow] Indexing Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to trigger indexing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async (ctx) => {
  return GET(ctx);
};
