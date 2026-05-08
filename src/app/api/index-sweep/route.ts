import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  // 1. Authorization Check (Simple PIN-based for demo, should be more robust)
  const authHeader = request.headers.get('authorization');
  const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1925';
  
  if (authHeader !== `Bearer ${adminPin}`) {
    return NextResponse.json({ error: 'Unauthorized Protocol' }, { status: 401 });
  }

  const SITE_URL = 'https://www.paranjapeblueridge.com';
  const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
  const serviceAccountEnv = process.env.GCP_SERVICE_ACCOUNT;
  let credentials;

  if (serviceAccountEnv) {
    try {
      credentials = JSON.parse(serviceAccountEnv);
    } catch (e) {
      return NextResponse.json({ error: 'GCP_SERVICE_ACCOUNT is not valid JSON' }, { status: 500 });
    }
  } else {
    const KEY_FILE = path.join(process.cwd(), 'scripts', 'google-service-account.json');
    if (fs.existsSync(KEY_FILE)) {
      credentials = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    } else {
      return NextResponse.json({ error: 'Service account credentials not found in environment or fallback file' }, { status: 500 });
    }
  }

  try {
    // 2. Fetch Sitemap
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) throw new Error(`Sitemap fetch failed: ${sitemapRes.status}`);
    const xml = await sitemapRes.text();
    const urls: string[] = [];
    const matches = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g));
    for (const match of matches) {
      urls.push(match[1]);
    }

    // 3. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    const authClient = await auth.getClient();
    google.options({ auth: authClient as any });

    // 4. Indexing Loop (Optimized Concurrent Batching for Serverless)
    const successCount = [];
    const failCount = [];

    // Process all URLs in chunks of 20 to avoid timeouts but respect Google quotas
    const chunkSize = 20;
    for (let i = 0; i < urls.length; i += chunkSize) {
      const chunk = urls.slice(i, i + chunkSize);
      
      const promises = chunk.map(async (url) => {
        try {
          await indexing.urlNotifications.publish({
            requestBody: { url: url, type: 'URL_UPDATED' },
          });
          successCount.push(url);
        } catch (err: any) {
          failCount.push({ url, error: err.message });
        }
      });
      
      await Promise.all(promises);
    }

    return NextResponse.json({
      message: 'Indexing Sweep Initiated',
      stats: {
        totalFound: urls.length,
        processed: urls.length,
        success: successCount.length,
        failed: failCount.length,
      },
      failures: failCount
    });

  } catch (error: any) {
    console.error('Indexing Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
