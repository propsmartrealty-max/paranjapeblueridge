import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { projects, articles } from '../src/data/master-data';
import { generatePseoUrls } from '../src/data/seo-matrix';

const SITE_URL = 'https://www.paranjapeblueridge.com';

async function triggerIndexing() {
  console.log('⚡ Starting Google Indexing API Sweep...');

  const credPath = path.join(process.cwd(), 'google-credentials.json');
  if (!fs.existsSync(credPath)) {
    console.error('❌ Error: google-credentials.json not found in the root directory.');
    console.error('Please download the Service Account JSON key and save it as google-credentials.json');
    process.exit(1);
  }

  // 1. Generate URLs list
  const urls: string[] = [
    SITE_URL,
    `${SITE_URL}/hinjewadi-micro-market`,
  ];

  projects.forEach((p) => {
    urls.push(`${SITE_URL}/${p.slug}`);
    urls.push(`${SITE_URL}/brochure/${p.slug}`);
    if (p.configurations) {
      p.configurations.forEach((c) => {
        urls.push(`${SITE_URL}/${p.slug}/${c.slug}`);
      });
    }
  });

  articles.forEach((a) => {
    urls.push(`${SITE_URL}/insights/${a.slug}`);
  });

  const pseoUrls = generatePseoUrls();
  pseoUrls.forEach((u) => {
    urls.push(`${SITE_URL}/${u.slug}`);
  });

  const uniqueUrls = Array.from(new Set(urls));
  console.log(`📡 Collected ${uniqueUrls.length} total URLs for Google Indexing API submission.`);

  try {
    // 2. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      keyFile: credPath,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    const authClient = await auth.getClient();
    google.options({ auth: authClient as any });

    console.log(`📤 Submitting URLs to Google Indexing API...`);
    
    // Process in small chunks to prevent rate limits
    const chunkSize = 10;
    const successUrls: string[] = [];
    const failedUrls: { url: string; error: string }[] = [];

    for (let i = 0; i < uniqueUrls.length; i += chunkSize) {
      const chunk = uniqueUrls.slice(i, i + chunkSize);
      
      const results = await Promise.allSettled(
        chunk.map(async (url) => {
          await indexing.urlNotifications.publish({
            requestBody: { url, type: 'URL_UPDATED' },
          });
          return url;
        })
      );

      results.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
          successUrls.push(result.value);
        } else {
          const err = result.reason as any;
          failedUrls.push({
            url: chunk[idx] || 'unknown',
            error: err?.message || 'Unknown error',
          });
        }
      });

      console.log(`Progress: ${Math.min(i + chunkSize, uniqueUrls.length)} / ${uniqueUrls.length}`);
      
      if (i + chunkSize < uniqueUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit buffer
      }
    }

    console.log(`✅ Indexing API sweep complete. Successfully submitted: ${successUrls.length}/${uniqueUrls.length}`);
    if (failedUrls.length > 0) {
      console.warn(`⚠️ Failed to submit ${failedUrls.length} URLs. Check API Quotas. Sample error: ${failedUrls[0].error}`);
    }

  } catch (error: any) {
    console.error('❌ Failed to run Google Indexing sweep. Ensure the Web Search Indexing API is enabled in GCP.', error.message);
  }
}

triggerIndexing();
