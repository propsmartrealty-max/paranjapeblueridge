import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { generatePseoUrls } from '../src/data/seo-matrix';
import { projects, articles } from '../src/data/master-data';
import { getAllPosts } from '../src/utils/mdxUtils';

const SITE_URL = 'https://www.paranjapeblueridge.com';
const CACHE_FILE = path.join(process.cwd(), '.google-index-cache.json');
const MAX_URLS_PER_RUN = 190;
const REFRESH_DAYS = 30; // Resubmit after 30 days

async function runGoogleIndexing() {
  console.log("🚀 Starting Google Indexing API Intelligent State Machine...");
  
  const serviceAccountJsonStr = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJsonStr) {
    console.error("⚠️ GOOGLE_SERVICE_ACCOUNT_JSON not found in environment. Skipping Indexing API.");
    process.exit(0); // Graceful exit
  }

  let credentials;
  try {
    credentials = JSON.parse(serviceAccountJsonStr);
  } catch (e) {
    console.error("❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Invalid JSON.");
    process.exit(1);
  }

  const jwtClient = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({
    version: 'v3',
    auth: jwtClient,
  });

  // Load state cache
  let cache: Record<string, string> = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch (err) {
      console.warn("⚠️ Cache file corrupt, starting fresh.");
      cache = {};
    }
  }

  console.log("🗺️ Fetching dynamic URLs from master data...");
  const allUrls: string[] = [SITE_URL, `${SITE_URL}/mr`, `${SITE_URL}/hinjewadi-micro-market`, `${SITE_URL}/mr-hinjewadi-micro-market`];

  projects.forEach(p => {
    allUrls.push(`${SITE_URL}/${p.slug}`);
    allUrls.push(`${SITE_URL}/mr-${p.slug}`);
    p.configurations?.forEach(c => {
      allUrls.push(`${SITE_URL}/${p.slug}/${c.slug}`);
    });
  });

  articles.forEach(a => allUrls.push(`${SITE_URL}/insights/${a.slug}`));
  getAllPosts().forEach(p => allUrls.push(`${SITE_URL}/insights/${p.slug}`));
  generatePseoUrls().forEach(p => allUrls.push(`${SITE_URL}/${p.slug}`));

  // Filter URLs based on cache
  const now = new Date();
  const urlsToSubmit: string[] = [];

  for (const url of allUrls) {
    const lastSubmitted = cache[url];
    if (!lastSubmitted) {
      urlsToSubmit.push(url);
    } else {
      const daysSince = (now.getTime() - new Date(lastSubmitted).getTime()) / (1000 * 3600 * 24);
      if (daysSince > REFRESH_DAYS) {
        urlsToSubmit.push(url);
      }
    }
  }

  console.log(`📡 Found ${urlsToSubmit.length} URLs needing indexing.`);
  if (urlsToSubmit.length === 0) {
    console.log("✅ All URLs are up-to-date in Google's queue! Exiting.");
    process.exit(0);
  }

  const batch = urlsToSubmit.slice(0, MAX_URLS_PER_RUN);
  console.log(`⚡ Slicing to exactly ${batch.length} URLs to respect Google's daily 200 quota limit.`);

  let successCount = 0;
  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      cache[url] = now.toISOString();
      successCount++;
    } catch (error: any) {
      if (error.code === 429 || (error.errors && error.errors[0]?.reason === 'rateLimitExceeded')) {
        console.log("⚠️ Google Indexing API Daily Quota reached.");
        break; // Stop completely
      } else if (error.code === 403) {
        console.error("❌ 403 Forbidden: The Service Account does not have 'Owner' permission.");
        break; // Stop completely
      } else {
        console.error(`❌ Error submitting ${url}:`, error.message);
      }
    }
    // Small delay to prevent rapid-fire blocking
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Save the state file back to disk
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

  console.log(`🎉 Google Indexing API push complete! Successfully submitted: ${successCount}`);
  console.log(`💾 State committed to ${CACHE_FILE}. GitHub Action will push this to the repo.`);
}

runGoogleIndexing().catch(console.error);
