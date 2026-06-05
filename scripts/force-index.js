/**
 * SOVEREIGN INDEXING ENGINE v4.0 — Multi-Channel
 * Bypasses Google Indexing API by using:
 * 1. Google Sitemap Ping (notifies Google of sitemap changes)
 * 2. Bing/Yandex IndexNow Protocol (instant indexing)
 * 3. Search Engine Sitemap Submission pings
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.paranjapeblueridge.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// IndexNow key — also needs to be served at /{key}.txt on the site
const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';

async function fetchSitemapUrls() {
  console.log(`📡 Fetching live sitemap from: ${SITEMAP_URL}`);
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [];
  for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    urls.push(match[1]);
  }
  console.log(`✅ Found ${urls.length} URLs\n`);
  return urls;
}

async function pingGoogle() {
  console.log('━━━ CHANNEL 1: Google Sitemap Ping ━━━');
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(pingUrl);
    console.log(`   ✅ Google notified (HTTP ${res.status})`);
    return true;
  } catch (e) {
    console.log(`   ❌ Google ping failed: ${e.message}`);
    return false;
  }
}

async function pingBingSitemap() {
  console.log('\n━━━ CHANNEL 2: Bing Sitemap Ping ━━━');
  const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(pingUrl);
    console.log(`   ✅ Bing notified (HTTP ${res.status})`);
    return true;
  } catch (e) {
    console.log(`   ❌ Bing ping failed: ${e.message}`);
    return false;
  }
}

async function submitIndexNow(urls) {
  console.log('\n━━━ CHANNEL 3: IndexNow (Bing + Yandex) ━━━');
  console.log(`   Submitting ${urls.length} URLs...`);

  const payload = {
    host: 'www.paranjapeblueridge.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000) // IndexNow supports up to 10k
  };

  // Submit to Bing's IndexNow endpoint
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log(`   ✅ IndexNow accepted (HTTP ${res.status}) — ${urls.length} URLs queued`);
    return true;
  } catch (e) {
    console.log(`   ❌ IndexNow failed: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SOVEREIGN INDEXING ENGINE v4.0');
  console.log('  Multi-Channel Bypass Mode');
  console.log('  Project: Paranjape Blue Ridge');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Fetch all URLs from live sitemap
  let urls;
  try {
    urls = await fetchSitemapUrls();
  } catch (e) {
    console.error(`❌ Failed to fetch sitemap: ${e.message}`);
    return;
  }

  // Channel 1: Google Sitemap Ping
  await pingGoogle();

  // Channel 2: Bing Sitemap Ping
  await pingBingSitemap();

  // Channel 3: IndexNow batch submission
  await submitIndexNow(urls);

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SWEEP COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  📊 Total URLs: ${urls.length}`);
  console.log('  📌 Google: Sitemap ping sent');
  console.log('  📌 Bing:   Sitemap ping + IndexNow batch');
  console.log('  📌 Yandex: IndexNow batch');
  console.log('');
  console.log('  💡 For fastest Google indexing, also:');
  console.log('     1. Open Google Search Console');
  console.log('     2. Paste your homepage URL in the URL Inspection bar');
  console.log('     3. Click "Request Indexing"');
  console.log('     4. Repeat for your top 10 priority pages');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

if (require.main === module) {
  main();
}
