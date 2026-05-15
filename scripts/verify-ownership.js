/**
 * SOVEREIGN OWNERSHIP VERIFIER v1.0
 * 
 * Programmatically verifies the service account as a site owner
 * via the Google Site Verification API — bypasses the GSC UI limitation.
 * 
 * Usage:
 *   Step 1: node scripts/verify-ownership.js --get-token
 *           (Creates the verification HTML file in /public)
 *   Step 2: Deploy the site (vercel deploy --prod)
 *   Step 3: node scripts/verify-ownership.js --verify
 *           (Completes verification)
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, 'google-service-account.json');
const SITE_URL = 'https://www.paranjapeblueridge.com/';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function getAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`🔑 Service Account: ${credentials.client_email}`);
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/siteverification',
      'https://www.googleapis.com/auth/indexing',
    ],
  });
  
  return auth.getClient();
}

async function getVerificationToken() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  STEP 1: GET VERIFICATION TOKEN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const authClient = await getAuthClient();
  const siteVerification = google.siteVerification({ version: 'v1', auth: authClient });

  try {
    const response = await siteVerification.webResource.getToken({
      requestBody: {
        site: {
          type: 'SITE',
          identifier: SITE_URL,
        },
        verificationMethod: 'FILE',
      },
    });

    const token = response.data.token;
    console.log(`✅ Verification token received: ${token}`);

    // Create the verification file in /public
    const filePath = path.join(PUBLIC_DIR, token);
    fs.writeFileSync(filePath, `google-site-verification: ${token}`);
    console.log(`📄 Verification file created: public/${token}`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  NEXT STEPS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  1. Deploy to production: vercel deploy --prod');
    console.log(`  2. Verify file is live: curl ${SITE_URL}${token}`);
    console.log('  3. Run: node scripts/verify-ownership.js --verify');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return token;
  } catch (error) {
    console.error(`❌ Failed to get token: ${error.message}`);
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

async function verifyOwnership() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  STEP 3: VERIFY OWNERSHIP');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const authClient = await getAuthClient();
  const siteVerification = google.siteVerification({ version: 'v1', auth: authClient });

  try {
    const response = await siteVerification.webResource.insert({
      verificationMethod: 'FILE',
      requestBody: {
        site: {
          type: 'SITE',
          identifier: SITE_URL,
        },
      },
    });

    console.log('✅ OWNERSHIP VERIFIED SUCCESSFULLY!');
    console.log(`   Site: ${response.data.site?.identifier}`);
    console.log(`   Owners: ${JSON.stringify(response.data.owners)}`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  SERVICE ACCOUNT IS NOW A VERIFIED OWNER');
    console.log('  You can now run the indexing sweep:');
    console.log('  node scripts/sovereign-indexing.js');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error(`❌ Verification failed: ${error.message}`);
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    
    if (error.message.includes('not found') || error.message.includes('404')) {
      console.error('\n⚠️  The verification file is not accessible on the live site.');
      console.error('   Make sure you deployed after Step 1.');
      console.error(`   Test: curl -s -o /dev/null -w "%{http_code}" ${SITE_URL}google*.html`);
    }
    process.exit(1);
  }
}

// Main
const args = process.argv.slice(2);

if (args.includes('--get-token')) {
  getVerificationToken();
} else if (args.includes('--verify')) {
  verifyOwnership();
} else {
  console.log('Usage:');
  console.log('  node scripts/verify-ownership.js --get-token   (Step 1: Get token & create file)');
  console.log('  node scripts/verify-ownership.js --verify      (Step 3: Complete verification)');
}
