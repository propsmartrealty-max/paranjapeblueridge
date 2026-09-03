/**
 * IndexNow Instant Search Engine Indexing Edge Function
 * Paranjape Blue Ridge - Cloudflare Pages Function
 */

const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';
const HOST = 'paranjapeblueridge.com';

const URL_LIST = [
  'https://paranjapeblueridge.com/',
  'https://paranjapeblueridge.com/blue-ridge/ongoing-projects',
  'https://paranjapeblueridge.com/paranjape-blue-ridge-promenade-hinjewadi-pune',
  'https://paranjapeblueridge.com/paranjape-blue-ridge-the-altius-hinjewadi-pune',
  'https://paranjapeblueridge.com/paranjape-blue-ridge-41-hinjewadi-pune',
  'https://paranjapeblueridge.com/blue-ridge/2-bhk',
  'https://paranjapeblueridge.com/blue-ridge/3-bhk',
  'https://paranjapeblueridge.com/blue-ridge/4-bhk',
  'https://paranjapeblueridge.com/why-paranjape',
  'https://paranjapeblueridge.com/journal',
  'https://paranjapeblueridge.com/hinjewadi-micro-market',
  'https://paranjapeblueridge.com/nri-investment'
];

export async function onRequestPost(context) {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: URL_LIST
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Instant IndexNow notification submitted successfully to Bing, Yahoo, Yandex, Baidu & AI Crawlers.',
      submittedUrlsCount: URL_LIST.length,
      status: response.status
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    service: 'Paranjape Blue Ridge IndexNow Edge API',
    endpoint: '/api/indexnow',
    totalTrackedUrls: URL_LIST.length,
    keyRegistered: true
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
