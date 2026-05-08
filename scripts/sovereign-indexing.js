/**
 * SOVEREIGN INDEXING ENGINE v5.0 — Google Indexing API
 * 
 * This script notifies Google about sitemap changes using the 
 * official Google Indexing API for instantaneous indexing.
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.paranjapeblueridge.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const KEY_FILE = path.join(__dirname, 'google-service-account.json');
const MAX_URLS_PER_RUN = 200; // Google Indexing API daily limit

async function fetchSitemapUrls() {
  console.log(`📡 Fetching live sitemap from: ${SITEMAP_URL}`);
  try {
    const response = await fetch(SITEMAP_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    const urls = [];
    const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    for (const match of matches) {
      urls.push(match[1]);
    }
    console.log(`✅ Found ${urls.length} URLs in sitemap`);
    return urls;
  } catch (error) {
    console.error(`❌ Error fetching sitemap: ${error.message}`);
    process.exit(1);
  }
}

async function indexUrls(urls) {
  const serviceAccountEnv = process.env.GCP_SERVICE_ACCOUNT;
  let credentials;

  if (serviceAccountEnv) {
    try {
      credentials = JSON.parse(serviceAccountEnv);
      console.log(`🔑 Using GCP_SERVICE_ACCOUNT from environment variables`);
    } catch (e) {
      console.error(`❌ GCP_SERVICE_ACCOUNT environment variable is not valid JSON`);
      process.exit(1);
    }
  } else {
    if (!fs.existsSync(KEY_FILE)) {
      console.error(`❌ Service account key not found at: ${KEY_FILE} and GCP_SERVICE_ACCOUNT env var is missing`);
      process.exit(1);
    }
    credentials = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    console.log(`🔑 Using local key file: ${KEY_FILE}`);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing('v3');
  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  console.log(`🚀 Starting indexing sweep for ${urls.length} URLs...`);
  
  let successCount = 0;
  let failCount = 0;

  for (const url of urls) {
    if (successCount >= MAX_URLS_PER_RUN) {
      console.log(`\n⚠️  Reached maximum of ${MAX_URLS_PER_RUN} URLs for this run to respect standard Google quotas.`);
      break;
    }

    try {
      // We use URL_UPDATED to notify Google of new or modified content
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`   ✅ [SUCCESS] ${url}`);
      successCount++;
      
      // Dynamic delay to prevent burst triggers
      await new Promise(resolve => setTimeout(resolve, 500)); 
    } catch (error) {
      console.error(`   ❌ [FAILED]  ${url}: ${error.message}`);
      failCount++;
      
      if (error.code === 403) {
        console.error('\n🚫 PERMISSION DENIED (403): Ensure the service account is an OWNER of the property in Search Console.');
        process.exit(1);
      }
      
      if (error.code === 429) {
        console.error('\n⚠️  QUOTA EXCEEDED (429): Google Indexing API daily limit reached.');
        break;
      }
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  INDEXING SWEEP COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  📊 Total URLs:   ${urls.length}`);
  console.log(`  ✅ Successful:   ${successCount}`);
  console.log(`  ❌ Failed:       ${failCount}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SOVEREIGN INDEXING ENGINE v5.0');
  console.log('  Channel: Google Indexing API (Official)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const urls = await fetchSitemapUrls();
  await indexUrls(urls);
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
