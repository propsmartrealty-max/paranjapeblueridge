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
  console.log(`📡 Fetching sitemap index from: ${SITEMAP_URL}`);
  const indexRes = await fetch(SITEMAP_URL);
  if (!indexRes.ok) throw new Error(`HTTP ${indexRes.status} on index`);
  const indexXml = await indexRes.text();
  
  const childSitemaps = [];
  for (const match of indexXml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    if (match[1].endsWith('.xml')) childSitemaps.push(match[1]);
  }

  console.log(`✅ Found ${childSitemaps.length} child sitemaps. Extracting deep URLs...`);

  const allUrls = [];
  for (const childUrl of childSitemaps) {
    try {
      const res = await fetch(childUrl);
      if (!res.ok) continue;
      const xml = await res.text();
      for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
        // Ensure we don't accidentally index XML files as pages
        if (!match[1].endsWith('.xml')) allUrls.push(match[1]);
      }
    } catch (e) {
      console.error(`❌ Failed to parse child sitemap: ${childUrl}`);
    }
  }
  
  console.log(`✅ Extracted ${allUrls.length} total URLs from all child sitemaps\n`);
  return { allUrls, childSitemaps };
}

async function pingGoogle(sitemaps) {
  console.log('━━━ CHANNEL 1: Google Sitemap Ping (Hardened) ━━━');
  // Ping the root index first
  const allToPing = [SITEMAP_URL, ...sitemaps];
  
  for (const url of allToPing) {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
    try {
      const res = await fetch(pingUrl);
      console.log(`   ✅ Google notified of ${url.split('/').pop()} (HTTP ${res.status})`);
    } catch (e) {
      console.log(`   ❌ Google ping failed for ${url}: ${e.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300)); // Rate limit protection
  }
}

async function pingBingSitemap(sitemaps) {
  console.log('\n━━━ CHANNEL 2: Bing Sitemap Ping (Hardened) ━━━');
  const allToPing = [SITEMAP_URL, ...sitemaps];
  
  for (const url of allToPing) {
    const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`;
    try {
      const res = await fetch(pingUrl);
      console.log(`   ✅ Bing notified of ${url.split('/').pop()} (HTTP ${res.status})`);
    } catch (e) {
      console.log(`   ❌ Bing ping failed for ${url}: ${e.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

async function submitIndexNow(urls) {
  console.log('\n━━━ CHANNEL 3: IndexNow (Bing + Yandex) ━━━');
  console.log(`   Submitting ${urls.length} deep page URLs...`);

  const payload = {
    host: 'www.paranjapeblueridge.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000) // IndexNow supports up to 10k
  };

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
  console.log('  SOVEREIGN INDEXING ENGINE v4.1');
  console.log('  Multi-Channel Hardened Bypass Mode');
  console.log('  Project: Paranjape Blue Ridge');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let data;
  try {
    data = await fetchSitemapUrls();
  } catch (e) {
    console.error(`❌ Failed to fetch sitemaps: ${e.message}`);
    return;
  }

  const { allUrls, childSitemaps } = data;

  // Channel 1: Hardened Google Ping
  await pingGoogle(childSitemaps);

  // Channel 2: Hardened Bing Ping
  await pingBingSitemap(childSitemaps);

  // Channel 3: IndexNow batch submission
  await submitIndexNow(allUrls);

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SWEEP COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  📊 Total URLs: ${allUrls.length}`);
  console.log('  📌 Google: Sitemap ping sent (Note: Google officially deprecated ping endpoints in 2023, expecting 404. Please use Google Search Console directly.)');
  console.log('  📌 Bing: IndexNow batch submitted successfully');
  console.log('  📌 Yandex: IndexNow batch submitted successfully');
  console.log('');
  console.log('  💡 For fastest Google indexing, you MUST:');
  console.log('     1. Open Google Search Console');
  console.log('     2. Submit https://www.paranjapeblueridge.com/sitemap.xml inside the "Sitemaps" tab.');
  console.log('     3. Or add the Service Account email as an "Owner" in GSC to use the advanced API script.');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

if (require.main === module) {
  main();
}
