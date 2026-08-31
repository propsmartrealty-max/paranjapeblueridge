export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://paranjapeblueridge.com';

function getCredentials() {
  const rawEnv = process.env.GCP_SERVICE_ACCOUNT || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (rawEnv) {
    try {
      return typeof rawEnv === 'string' ? JSON.parse(rawEnv) : rawEnv;
    } catch (e) {
      console.error('Failed to parse GCP service account env var:', e);
    }
  }

  const localPath = path.join(process.cwd(), 'scripts/google-service-account.json');
  if (fs.existsSync(localPath)) {
    try {
      return JSON.parse(fs.readFileSync(localPath, 'utf-8'));
    } catch (e) {
      console.error('Failed to read local service account file:', e);
    }
  }

  const altPath = path.join(process.cwd(), 'credentials/service_account.json');
  if (fs.existsSync(altPath)) {
    try {
      return JSON.parse(fs.readFileSync(altPath, 'utf-8'));
    } catch (e) {
      console.error('Failed to read alt service account file:', e);
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url = SITE_URL, pin } = body;
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1925';

    if (pin !== adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const credentials = getCredentials();
    if (!credentials) {
      return NextResponse.json({
        success: false,
        error: 'Google Service Account credentials not found in environment.',
        diagnostic: 'Set GCP_SERVICE_ACCOUNT or add scripts/google-service-account.json'
      }, { status: 404 });
    }

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/indexing'
      ],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Target clean URL
    const targetUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;

    const inspectRes = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: targetUrl,
        siteUrl: SITE_URL,
      }
    });

    const result = inspectRes.data.inspectionResult;
    const indexStatus = result?.indexStatusResult;

    return NextResponse.json({
      success: true,
      inspectionUrl: targetUrl,
      verdict: indexStatus?.verdict || 'UNKNOWN',
      coverageState: indexStatus?.coverageState || 'Crawled/Discovered',
      crawledAs: indexStatus?.crawledAs || 'Googlebot Desktop/Mobile',
      lastCrawlTime: indexStatus?.lastCrawlTime || 'Recently Processed',
      indexingState: indexStatus?.indexingState || 'INDEXING_ALLOWED',
      raw: inspectRes.data
    });

  } catch (error: any) {
    console.error('[GSC URL Inspection Error]:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to inspect URL with Google Search Console API',
      code: error?.code || 500
    }, { status: 500 });
  }
}
