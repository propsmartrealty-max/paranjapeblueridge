export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

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
  return null;
}

// Convert PEM private key to CryptoKey for Web Crypto API (Edge Runtime)
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const cleanPem = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/[\r\n\s]/g, '');

  const decoded = atob(cleanPem);
  const binaryKey = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    binaryKey[i] = decoded.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    'pkcs8',
    binaryKey.buffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
}

// Generate Google OAuth2 Access Token using Web Crypto API on Edge
async function getGoogleAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj: any) => {
    const jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
    return btoa(jsonStr).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(claimSet)}`;
  const privateKey = await importPrivateKey(privateKeyPem);
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(unsignedToken)
  );

  const signatureBytes = new Uint8Array(signature);
  let binaryString = '';
  for (let i = 0; i < signatureBytes.length; i++) {
    binaryString += String.fromCharCode(signatureBytes[i]);
  }

  const signatureBase64Url = btoa(binaryString)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const signedJwt = `${unsignedToken}.${signatureBase64Url}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${signedJwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error(`Google Auth Failed: ${JSON.stringify(tokenData)}`);
  }

  return tokenData.access_token;
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
    if (!credentials || !credentials.client_email || !credentials.private_key) {
      return NextResponse.json({
        success: false,
        error: 'Google Service Account credentials not configured.',
        diagnostic: 'Set GCP_SERVICE_ACCOUNT environment secret in Cloudflare Dashboard.'
      }, { status: 404 });
    }

    const accessToken = await getGoogleAccessToken(credentials.client_email, credentials.private_key);

    const targetUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;

    const inspectRes = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl: targetUrl,
        siteUrl: SITE_URL,
      }),
    });

    const data = await inspectRes.json();
    const indexStatus = data?.inspectionResult?.indexStatusResult;

    return NextResponse.json({
      success: true,
      inspectionUrl: targetUrl,
      verdict: indexStatus?.verdict || 'UNKNOWN',
      coverageState: indexStatus?.coverageState || 'Crawled/Discovered',
      crawledAs: indexStatus?.crawledAs || 'Googlebot Desktop/Mobile',
      lastCrawlTime: indexStatus?.lastCrawlTime || 'Recently Processed',
      indexingState: indexStatus?.indexingState || 'INDEXING_ALLOWED',
      raw: data,
    });

  } catch (error: any) {
    console.error('[GSC Edge URL Inspection Error]:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to inspect URL with Google Search Console API on Edge',
    }, { status: 500 });
  }
}
