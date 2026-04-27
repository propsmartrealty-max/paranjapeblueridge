const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

/**
 * SOVEREIGN INDEXING ENGINE v2.0
 * Project: Paranjape Blue Ridge
 * Purpose: Force-indexing of all premium search nodes for Pune real estate dominance.
 */

const KEY_PATH = path.join(__dirname, 'google-service-account.json');
const REGISTRY_PATH = path.join(__dirname, '../data/seo-registry.json');
const DOMAIN = 'https://www.paranjapeblueridge.com';

async function triggerIndexing() {
    console.log('\n🚀 INITIATING SOVEREIGN INDEXING SWEEP...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (!fs.existsSync(KEY_PATH)) {
        console.warn('⚠️  CRITICAL: Google Service Account Key (google-service-account.json) missing in /scripts.');
        console.warn('   Please place your JSON key in the scripts folder to enable force-indexing.');
        return;
    }

    if (!fs.existsSync(REGISTRY_PATH)) {
        console.error('❌ ERROR: SEO Registry not found.');
        return;
    }

    const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
    const urlsToSubmit = Object.keys(registry).map(route => {
        // For single-page apps, we focus on the root but can suggest fragment indexing for Google.
        return route === "" ? DOMAIN : `${DOMAIN}/${route}`;
    });

    console.log(`📡 DISCOVERED: ${urlsToSubmit.length} high-intent search nodes identified.`);

    const jwtClient = new google.auth.JWT({
        keyFile: KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth: jwtClient });

    let successCount = 0;
    for (const url of urlsToSubmit) {
        try {
            await indexing.urlNotifications.publish({
                requestBody: { url, type: 'URL_UPDATED' },
            });
            console.log(`✅ [Force-Indexed] ${url}`);
            successCount++;
            
            // Throttle to respect API limits
            await new Promise(r => setTimeout(r, 250));
        } catch (error) {
            console.error(`❌ [Failed] ${url}: ${error.message}`);
            if (error.message.includes('403')) {
                console.error('   -> AUTH ERROR: Ensure service account is added as OWNER in Search Console.');
                break;
            }
        }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🏁 SWEEP COMPLETE. Successfully submitted ${successCount} nodes.`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Ensure googleapis is installed: npm install googleapis
if (require.main === module) {
    triggerIndexing();
}
