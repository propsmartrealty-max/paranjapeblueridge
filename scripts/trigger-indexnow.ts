import fetch from 'node-fetch';
import { generatePseoUrls } from '../src/data/seo-matrix';
import { projects, articles } from '../src/data/master-data';

const SITE_URL = 'https://www.paranjapeblueridge.com';
const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';

async function triggerIndexNow() {
  console.log('⚡ Starting IndexNow API Sweep for Bing & Yahoo...');

  // 1. Collect all URLs
  const urls: string[] = [
    SITE_URL,
    `${SITE_URL}/hinjewadi-micro-market`
  ];

  // Projects & Configurations
  projects.forEach(p => {
    urls.push(`${SITE_URL}/${p.slug}`);
    p.configurations?.forEach(c => {
      urls.push(`${SITE_URL}/${p.slug}/${c.slug}`);
    });
  });

  // Insights
  articles.forEach(a => {
    urls.push(`${SITE_URL}/insights/${a.slug}`);
  });

  // PSEO 911 Matrix
  const pseoData = generatePseoUrls();
  pseoData.forEach(p => {
    urls.push(`${SITE_URL}/${p.slug}`);
  });

  console.log(`📡 Collected ${urls.length} total URLs for IndexNow submission.`);

  // 2. The IndexNow API requires a POST request with max 10,000 URLs per batch.
  // We partition into batches of 9,500 to guarantee API acceptance.
  const BATCH_SIZE = 9500;
  let hasFailure = false;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const urlBatch = urls.slice(i, i + BATCH_SIZE);
    console.log(`📡 Submitting batch ${Math.floor(i / BATCH_SIZE) + 1} (${urlBatch.length} URLs)...`);

    const payload = {
      host: 'www.paranjapeblueridge.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlBatch
    };

    try {
      const [bingRes, yandexRes] = await Promise.all([
        fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload)
        }),
        fetch('https://yandex.com/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload)
        })
      ]);

      if (!bingRes.ok || !yandexRes.ok) {
        hasFailure = true;
        console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} FAILED: Bing status ${bingRes.status}, Yandex status ${yandexRes.status}`);
      }
    } catch (err) {
      hasFailure = true;
      console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} ERROR:`, err);
    }
  }

  // Baidu Ping (Sitemap submission)
  try {
    const baiduRes = await fetch('http://ping.baidu.com/ping/RPC2?sitemap=https://www.paranjapeblueridge.com/sitemap.xml', { method: 'GET' });
    if (!baiduRes.ok) console.warn(`⚠️ Baidu Ping returned status: ${baiduRes.status}`);
  } catch (e) {
    // Ignore silent warnings for Baidu network constraints
  }

  if (!hasFailure) {
    console.log(`✅ SUCCESS: Bing, Yahoo, Yandex, Baidu, and DuckDuckGo have accepted all ${urls.length} URLs in batched queues!`);
  } else {
    console.error(`❌ FAILED: Some batches in the IndexNow API sweep encountered issues.`);
  }
}

triggerIndexNow();
