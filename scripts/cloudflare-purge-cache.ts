import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

async function purgeCloudflareCache() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ⚡ CLOUDFLARE ULTRA EDGE CACHE PURGE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    console.log('ℹ️  CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID not configured.');
    console.log('   Skipping Cloudflare Edge Cache Purge (Graceful pass).');
    return;
  }

  try {
    console.log(`🌐 Dispatching Purge Everything command to Cloudflare Zone: ${CLOUDFLARE_ZONE_ID}...`);

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purge_everything: true }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Cloudflare Edge Cache successfully purged across all global PoPs!');
    } else {
      console.warn('⚠️ Cloudflare API returned non-success response:', data.errors);
    }
  } catch (error: any) {
    console.error('❌ Failed to purge Cloudflare cache:', error.message);
  }
}

purgeCloudflareCache();
