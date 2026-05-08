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
  const KEY_FILE = path.join(process.cwd(), 'scripts', 'google-service-account.json');

  if (!fs.existsSync(KEY_FILE)) {
    return NextResponse.json({ error: 'Service account key not found on server' }, { status: 500 });
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
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // 4. Indexing Loop (Limited to first 5 for test/safety in API route, or use a background task)
    // For a real production app, this should be a background job (e.g. Inngest or Vercel Cron)
    const successCount = [];
    const failCount = [];

    // Limit to 10 URLs per manual trigger to avoid timeout
    const targetUrls = urls.slice(0, 20);

    for (const url of targetUrls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        successCount.push(url);
      } catch (err: any) {
        failCount.push({ url, error: err.message });
      }
    }

    return NextResponse.json({
      message: 'Indexing Sweep Initiated',
      stats: {
        totalFound: urls.length,
        processed: targetUrls.length,
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
