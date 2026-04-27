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

  const urls = [
    'https://blueridge-hinjewadi.com',
    'https://blueridge-hinjewadi.com/#promenade',
    'https://blueridge-hinjewadi.com/#altius',
    'https://blueridge-hinjewadi.com/#ridge41'
  ];

  for (const url of urls) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Success: Indexed ${url} (Status: ${res.status})`);
    } catch (err) {
      console.error(`❌ Error indexing ${url}:`, err.message);
    }
  }
}

forceIndex();
