const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// NOTE: This requires a service_account.json file with Google Indexing API access.
// Since we don't have the key file yet, this script provides the infrastructure.
const keyPath = path.join(__dirname, '../credentials/service_account.json');

async function forceIndex() {
  if (!fs.existsSync(keyPath)) {
    console.error('❌ Google Indexing Credentials (service_account.json) NOT FOUND in /credentials directory.');
    console.log('💡 Please provide the Google Service Account JSON to enable Force-Indexing.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  console.log('Fetching live sitemap from production...');
  let urls = [];
  try {
      const response = await fetch('https://paranjapeblueridge.com/sitemap.xml');
      const xml = await response.text();
      // Regex to extract all <loc> tags
      const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
      for (const match of matches) {
          urls.push(match[1]);
      }
      console.log(`✅ Found ${urls.length} URLs in sitemap.`);
  } catch (error) {
      console.error('❌ Failed to fetch sitemap:', error.message);
      return;
  }

  // Batch index to prevent rate limiting (we will add a slight delay)
  console.log('Initiating Google Indexing API dispatch...');
  let successCount = 0;
  
  for (const url of urls) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Success: Indexed ${url} (Status: ${res.status})`);
      successCount++;
      // Sleep for 100ms to avoid Google API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`❌ Error indexing ${url}:`, err.message);
    }
  }
  
  console.log(`\n🎉 Force-Indexing Complete! Successfully submitted ${successCount}/${urls.length} URLs to Google.`);
}

forceIndex();
