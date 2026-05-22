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
  // We have ~950, so one batch is perfect.
  const payload = {
    host: 'www.paranjapeblueridge.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ SUCCESS: Bing, Yahoo, and DuckDuckGo have accepted all ${urls.length} URLs for instant indexing!`);
    } else {
      console.error(`❌ FAILED: IndexNow API responded with status: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (err) {
    console.error('❌ ERROR executing IndexNow submission:', err);
  }
}

triggerIndexNow();
