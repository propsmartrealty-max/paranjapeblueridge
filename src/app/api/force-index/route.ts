import { NextResponse } from 'next/server';
import { generateSitemaps } from '@/data/sitemap-logic';

export const runtime = 'edge';

const DOMAIN = 'paranjapeblueridge.com';
const SITE_URL = `https://${DOMAIN}`;
const INDEXNOW_KEY = '8f8b8849b3c4456ea7eaef1b4279eaeb';

export async function GET(req: Request) {
  // Simple Authorization Header Check (Optional but recommended for cron jobs)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${INDEXNOW_KEY}`) {
    // We can also allow it to be triggered via browser for testing if a query param matches
    const url = new URL(req.url);
    if (url.searchParams.get('key') !== INDEXNOW_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  try {
    const sitemaps = await generateSitemaps();
    const sitemapUrls = sitemaps.map(s => `${SITE_URL}/sitemap/${s.id}.xml`);

    // 1. Google Ping API (GET Request)
    // Note: Google recently deprecated the Ping API for sitemaps in favor of GSC, 
    // but we ping it anyway as a legacy fallback, and they still accept the request.
    const googlePingPromises = sitemapUrls.map(url =>
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`)
        .then(res => res.status === 200)
        .catch(() => false)
    );

    // 2. Bing Ping API (GET Request)
    const bingPingPromises = sitemapUrls.map(url =>
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`)
        .then(res => res.status === 200)
        .catch(() => false)
    );

    // 3. IndexNow API (POST Request - The Modern Standard for Bing/Yandex/Seznam)
    // IndexNow allows sending the sitemap index or individual URLs. 
    // We will submit the main index to Bing's IndexNow endpoint.
    const indexNowPayload = {
      host: DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [
        `${SITE_URL}/sitemap.xml`,
        `${SITE_URL}/sitemap-images.xml`,
        `${SITE_URL}/sitemap-news.xml`,
        ...sitemapUrls
      ]
    };

    const indexNowPromise = fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(indexNowPayload)
    }).then(res => res.status === 200 || res.status === 202).catch(() => false);

    // Wait for all pings to complete
    const [googleResults, bingResults, indexNowResult] = await Promise.all([
      Promise.all(googlePingPromises),
      Promise.all(bingPingPromises),
      indexNowPromise
    ]);

    const successGoogle = googleResults.filter(Boolean).length;
    const successBing = bingResults.filter(Boolean).length;

    return NextResponse.json({
      success: true,
      message: 'Global Instant Indexing Ping Triggered Successfully.',
      stats: {
        totalSitemapsPinged: sitemapUrls.length,
        googlePingsSuccess: `${successGoogle} / ${sitemapUrls.length}`,
        bingPingsSuccess: `${successBing} / ${sitemapUrls.length}`,
        indexNowNetworkStatus: indexNowResult ? 'Accepted' : 'Failed'
      }
    });

  } catch (error) {
    console.error('Indexing Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to trigger indexing.' }, { status: 500 });
  }
}
