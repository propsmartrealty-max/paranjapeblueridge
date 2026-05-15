/**
 * SOVEREIGN API ENABLER & SITE VERIFIER v1.0
 * 
 * Programmatically enables required Google APIs and verifies
 * site ownership for the service account — fully automated.
 * 
 * Flow:
 *   1. Enable Site Verification API on the GCP project
 *   2. Enable Indexing API on the GCP project (if not already)
 *   3. Get verification token
 *   4. Create verification file in /public
 *   5. (User deploys)
 *   6. Complete verification
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, 'google-service-account.json');
const SITE_URL = 'https://www.paranjapeblueridge.com/';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function loadCredentials() {
  const credentials = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`🔑 Service Account: ${credentials.client_email}`);
  console.log(`📦 Project ID: ${credentials.project_id}`);
  return credentials;
}

async function getAuthClient(credentials, scopes) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes,
  });
  return auth.getClient();
}

async function enableAPI(credentials, apiName) {
  console.log(`\n⚙️  Enabling ${apiName}...`);
  
  const authClient = await getAuthClient(credentials, [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/service.management',
  ]);

  const projectId = credentials.project_id;
  
  try {
    const serviceUsage = google.serviceusage({ version: 'v1', auth: authClient });
    const response = await serviceUsage.services.enable({
      name: `projects/${projectId}/services/${apiName}`,
    });
    console.log(`   ✅ ${apiName} — enabled (or already active)`);
    return response.data;
  } catch (error) {
    // Try alternative approach using the REST API directly
    if (error.code === 403 || error.message.includes('permission')) {
      console.log(`   ⚠️  Service account lacks serviceusage permissions.`);
      console.log(`   📋 Attempting via Service Management API...`);
      
      try {
        const serviceManagement = google.servicemanagement({ version: 'v1', auth: authClient });
        await serviceManagement.services.enable({
          serviceName: apiName,
          requestBody: {
            consumerId: `project:${projectId}`,
          },
        });
        console.log(`   ✅ ${apiName} — enabled via Service Management`);
      } catch (err2) {
        console.error(`   ❌ Cannot enable API automatically: ${err2.message}`);
        console.error(`   👉 Please enable manually: https://console.developers.google.com/apis/api/${apiName}/overview?project=${projectId}`);
        return null;
      }
    } else {
      console.error(`   ❌ ${error.message}`);
      return null;
    }
  }
}

async function getVerificationToken(credentials) {
  console.log('\n📡 Requesting verification token...');
  
  const authClient = await getAuthClient(credentials, [
    'https://www.googleapis.com/auth/siteverification',
  ]);

  const siteVerification = google.siteVerification({ version: 'v1', auth: authClient });

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
  console.log(`   ✅ Token: ${token}`);
  return token;
}

async function createVerificationFile(token) {
  const filePath = path.join(PUBLIC_DIR, token);
  fs.writeFileSync(filePath, `google-site-verification: ${token}`);
  console.log(`   📄 Created: public/${token}`);
  return filePath;
}

async function completeVerification(credentials) {
  console.log('\n🔒 Completing site verification...');
  
  const authClient = await getAuthClient(credentials, [
    'https://www.googleapis.com/auth/siteverification',
  ]);

  const siteVerification = google.siteVerification({ version: 'v1', auth: authClient });

  const response = await siteVerification.webResource.insert({
    verificationMethod: 'FILE',
    requestBody: {
      site: {
        type: 'SITE',
        identifier: SITE_URL,
      },
    },
  });

  console.log('   ✅ SITE OWNERSHIP VERIFIED!');
  console.log(`   Site: ${response.data.site?.identifier}`);
  console.log(`   Owners: ${JSON.stringify(response.data.owners)}`);
  return response.data;
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--setup';

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SOVEREIGN API ENABLER & SITE VERIFIER v1.0');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const credentials = loadCredentials();

  if (mode === '--setup') {
    // Step 1: Enable APIs
    await enableAPI(credentials, 'siteverification.googleapis.com');
    await enableAPI(credentials, 'indexing.googleapis.com');
    
    console.log('\n⏳ Waiting 10 seconds for API propagation...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Step 2: Get token & create file
    try {
      const token = await getVerificationToken(credentials);
      await createVerificationFile(token);
      
      // Save the token for the --verify step
      fs.writeFileSync(path.join(__dirname, '.verification-token'), token);
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  ✅ SETUP COMPLETE — NOW DEPLOY:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  npx vercel --prod');
      console.log('  Then run: node scripts/enable-apis-and-verify.js --verify');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (error) {
      console.error(`\n❌ Token retrieval failed: ${error.message}`);
      if (error.response) {
        console.error('   Response:', JSON.stringify(error.response.data, null, 2));
      }
      console.error('\n👉 The API may still be propagating. Wait 60 seconds and re-run:');
      console.error('   node scripts/enable-apis-and-verify.js --setup');
      process.exit(1);
    }

  } else if (mode === '--verify') {
    try {
      const result = await completeVerification(credentials);
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  🏆 OWNERSHIP VERIFIED — READY TO INDEX');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  Run: node scripts/sovereign-indexing.js');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (error) {
      console.error(`\n❌ Verification failed: ${error.message}`);
      if (error.response) {
        console.error('   Response:', JSON.stringify(error.response.data, null, 2));
      }
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
