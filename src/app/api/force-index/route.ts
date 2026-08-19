import { NextResponse } from 'next/server';

const DOMAIN = 'paranjapeblueridge.com';
const SITE_URL = `https://${DOMAIN}`;
const INDEXNOW_KEY = '8f8b8849b3c4456ea7eaef1b4279eaeb';

export async function GET(req: Request) {
  // Simple Authorization Header Check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${INDEXNOW_KEY}`) {
    const url = new URL(req.url);
    if (url.searchParams.get('key') !== INDEXNOW_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  try {
    // 1. Bing Sitemap Ping (Safe, Single Request)
    // We only ping the main index. Bing will automatically crawl the 140+ sub-sitemaps.
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
    const bingPingResult = await fetch(bingPingUrl)
      .then(res => res.status === 200)
      .catch(() => false);

    // 2. IndexNow API (POST Request - The Modern Standard for Bing/Yandex/Seznam)
    // We submit only the core routing nodes to trigger a deep crawl without hitting the 10k URL limit.
    const indexNowPayload = {
      host: DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [
        `${SITE_URL}/`,
        `${SITE_URL}/directory`,
        `${SITE_URL}/directory/1`,
        `${SITE_URL}/insights`,
        `${SITE_URL}/hinjewadi-micro-market`
      ]
    };

    const indexNowResult = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(indexNowPayload)
    }).then(res => res.status === 200 || res.status === 202).catch(() => false);

    return NextResponse.json({
      success: true,
      message: 'Global Instant Indexing Ping Triggered Successfully. (Google Ping removed due to official deprecation)',
      stats: {
        bingSitemapPing: bingPingResult ? 'Success' : 'Failed',
        indexNowNetworkStatus: indexNowResult ? 'Accepted' : 'Failed'
      }
    });

  } catch (error) {
    console.error('Indexing Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to trigger indexing.' }, { status: 500 });
  }
}
