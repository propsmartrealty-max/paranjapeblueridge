// Cloudflare Pages Serverless Function - IndexNow Instant Submission API
// Endpoint: POST /api/indexnow

interface Env {
  INDEXNOW_KEY?: string;
}

const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';
const HOST = 'paranjapeblueridge.com';
const KEY_LOCATION = `https://${HOST}/37ed22dc3eab4b13b1cd3f21975e533c.txt`;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<{ urlList?: string[] }>();
    const urlList = body.urlList && body.urlList.length > 0 
      ? body.urlList 
      : [
          `https://${HOST}/`,
          `https://${HOST}/mr`,
          `https://${HOST}/paranjape-blue-ridge-promenade-hinjewadi-pune`,
          `https://${HOST}/paranjape-blue-ridge-the-altius-hinjewadi-pune`,
          `https://${HOST}/paranjape-blue-ridge-41-hinjewadi-pune`,
          `https://${HOST}/hinjewadi-micro-market`,
          `https://${HOST}/construction-updates`,
          `https://${HOST}/nri-investment`
        ];

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return new Response(
      JSON.stringify({
        success: true,
        status: response.status,
        submittedUrls: urlList.length,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
