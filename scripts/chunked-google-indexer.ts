import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import xml2js from 'xml2js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Paths
const SITEMAP_URL = 'https://www.paranjapeblueridge.com/sitemap.xml';
const CACHE_PATH = path.join(process.cwd(), '.google-index-cache.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'google-credentials.json');
const MAX_URLS_PER_RUN = 190;

async function chunkedIndex() {
  console.log('⚡ Starting Chunked Google Indexing Sweep...');

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.warn('⚠️ service-account.json not found! Skipping indexing.');
    return;
  }

  // Load state
  let cache: Record<string, boolean> = {};
  if (fs.existsSync(CACHE_PATH)) {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
  }

  // Parse sitemap
  console.log(`🌐 Fetching sitemap from ${SITEMAP_URL}...`);
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    console.error(`❌ Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    process.exit(1);
  }
  const sitemapXml = await response.text();
  const parser = new xml2js.Parser();
  const parsed = await parser.parseStringPromise(sitemapXml);

  const urls: string[] = parsed.urlset.url.map((u: any) => u.loc[0]);
  
  // Filter unsubmitted URLs
  const pendingUrls = urls.filter(url => !cache[url]);
  console.log(`📊 Total URLs: ${urls.length} | Pending: ${pendingUrls.length}`);

  if (pendingUrls.length === 0) {
    console.log('✅ All URLs have been successfully submitted to Google!');
    return;
  }

  const batch = pendingUrls.slice(0, MAX_URLS_PER_RUN);
  console.log(`📤 Submitting ${batch.length} URLs in this run...`);

  // Setup Google API
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({
    version: 'v3',
    auth: auth,
  });

  let successCount = 0;

  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      cache[url] = true;
      successCount++;
    } catch (error: any) {
      console.error(`❌ Failed to submit ${url}:`, error.message);
      if (error.message.includes('Quota exceeded')) {
        console.warn('⚠️ Daily quota exhausted. Pausing until tomorrow.');
        break;
      }
    }
  }

  // Save state
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  console.log(`✅ Successfully submitted ${successCount} URLs today.`);
  console.log(`📈 Remaining URLs in queue: ${pendingUrls.length - successCount}`);
}

chunkedIndex().catch(console.error);
