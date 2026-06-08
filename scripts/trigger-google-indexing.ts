import { google } from 'googleapis';
import sitemap from '../src/app/sitemap';

async function runGoogleIndexing() {
  console.log("🚀 Starting Google Indexing API push...");
  
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

  // Get all URLs directly from the sitemap generation function
  console.log("🗺️ Fetching dynamic URLs from sitemap engine...");
  const urls = sitemap().map(entry => entry.url);
  console.log(`📡 Found ${urls.length} URLs to submit.`);

  // Submit in batches (Google API has quota limits, usually 100/request, but here we'll submit sequentially to avoid rate limits or use a small batch)
  // To keep it simple and robust, we'll submit sequentially with a small delay.
  // Note: Standard daily quota is 200 URLs. If we have 2000+, it will hit quota limit quickly. 
  // We will submit up to the quota limit and catch the error.
  
  let successCount = 0;
  let quotaHit = false;

  for (const url of urls) {
    if (quotaHit) break;

    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      successCount++;
      if (successCount % 50 === 0) {
        console.log(`✅ Successfully submitted ${successCount} URLs so far...`);
      }
    } catch (error: any) {
      if (error.code === 429 || (error.errors && error.errors[0]?.reason === 'rateLimitExceeded')) {
        console.log("⚠️ Google Indexing API Daily Quota reached.");
        quotaHit = true;
      } else if (error.code === 403) {
        console.error("❌ 403 Forbidden: The Service Account does not have 'Owner' permission in Google Search Console for this domain.");
        quotaHit = true; // Stop trying
      } else {
        console.error(`❌ Error submitting ${url}:`, error.message);
      }
    }
  }

  console.log(`🎉 Google Indexing API push complete! Total successfully submitted today: ${successCount}`);
}

runGoogleIndexing().catch(console.error);
