import { google } from 'googleapis';
import { projects, articles } from '../src/data/master-data';
import { generatePseoUrls } from '../src/data/seo-matrix';

const SITE_URL = 'https://www.paranjapeblueridge.com';

function resolveCredentials() {
  const envCred = process.env.GCP_SERVICE_ACCOUNT;
  if (!envCred) {
    return null;
  }
  try {
    return JSON.parse(envCred);
  } catch (e) {
    console.error('Error: GCP_SERVICE_ACCOUNT environment variable is not valid JSON.');
    return null;
  }
}

async function triggerIndexing() {
  console.log('⚡ Starting postbuild Google Indexing Sweep...');

  // 1. Resolve GCP Service Account Credentials
  const credentials = resolveCredentials();
  if (!credentials) {
    console.warn('⚠️  GCP_SERVICE_ACCOUNT is not configured. Skipping automated indexing sweep.');
    process.exit(0);
  }

  // 2. Generate URLs list (same logic as sitemap.ts)
  const urls: string[] = [
    SITE_URL,
    `${SITE_URL}/hinjewadi-micro-market`,
    `${SITE_URL}/feed.xml`,
  ];

  // Add projects and configurations
  projects.forEach((p) => {
    urls.push(`${SITE_URL}/${p.slug}`);
    urls.push(`${SITE_URL}/brochure/${p.slug}`);
    if (p.configurations) {
      p.configurations.forEach((c) => {
        urls.push(`${SITE_URL}/${p.slug}/${c.slug}`);
      });
    }
  });

  // Add articles
  articles.forEach((a) => {
    urls.push(`${SITE_URL}/insights/${a.slug}`);
  });

  // Add PSEO URLs
  const pseoUrls = generatePseoUrls();
  pseoUrls.forEach((u) => {
    urls.push(`${SITE_URL}/${u.slug}`);
  });

  const uniqueUrls = Array.from(new Set(urls));
  console.log(`📡 Collected ${uniqueUrls.length} total URLs for Google Indexing API submission.`);

  try {
    // 3. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    const authClient = await auth.getClient();
    google.options({ auth: authClient as any });

    // 4. Batch trigger url notifications
    console.log(`📤 Submitting URLs to Google Indexing API...`);
    
    // We process in small chunks with a delay to prevent rate limits
    const chunkSize = 15;
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

      if (i + chunkSize < uniqueUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    console.log(`✅ Indexing sweep complete. Success: ${successUrls.length}/${uniqueUrls.length}`);
    if (failedUrls.length > 0) {
      console.warn(`⚠️ Failed to submit ${failedUrls.length} URLs. Sample error: ${failedUrls[0].error}`);
    }

  } catch (error: any) {
    console.error('❌ Failed to run Google Indexing sweep:', error.message);
  }
}

triggerIndexing();
