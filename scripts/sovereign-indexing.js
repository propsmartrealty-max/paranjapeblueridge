/**
 * SOVEREIGN INDEXING ENGINE v6.0 — Production Hardened
 * 
 * Features:
 *   - Exponential backoff with jitter for retry logic
 *   - Credential rotation (env var → local file fallback)
 *   - Concurrent batch processing with configurable chunk size
 *   - Comprehensive audit logging to JSON file
 *   - Rate-limit detection and graceful degradation
 *   - Sitemap validation and URL deduplication
 *   - Dry-run mode for testing
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONFIG = {
  SITE_URL: 'https://www.paranjapeblueridge.com',
  KEY_FILE: path.join(__dirname, 'google-service-account.json'),
  AUDIT_LOG: path.join(__dirname, '..', 'data', 'indexing-audit.json'),
  MAX_URLS_PER_RUN: 200,        // Google daily quota
  CHUNK_SIZE: 10,                // Concurrent batch size
  MAX_RETRIES: 3,                // Max retry attempts per URL
  BASE_DELAY_MS: 1000,           // Base delay between batches
  DRY_RUN: process.argv.includes('--dry-run'),
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREDENTIAL RESOLVER — Multi-source with fallback
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function resolveCredentials() {
  // Priority 1: Environment variable (CI/CD pipelines)
  const envCred = process.env.GCP_SERVICE_ACCOUNT;
  if (envCred) {
    try {
      const parsed = JSON.parse(envCred);
      console.log(`🔑 Credentials: Environment variable (${parsed.client_email})`);
      return parsed;
    } catch (e) {
      console.error('⚠️  GCP_SERVICE_ACCOUNT env var is not valid JSON, trying file fallback...');
    }
  }

  // Priority 2: Local key file
  if (fs.existsSync(CONFIG.KEY_FILE)) {
    const parsed = JSON.parse(fs.readFileSync(CONFIG.KEY_FILE, 'utf8'));
    console.log(`🔑 Credentials: Local file (${parsed.client_email})`);
    return parsed;
  }

  // Priority 3: Credentials directory
  const credDir = path.join(__dirname, '..', 'credentials', 'service_account.json');
  if (fs.existsSync(credDir)) {
    const parsed = JSON.parse(fs.readFileSync(credDir, 'utf8'));
    console.log(`🔑 Credentials: Credentials dir (${parsed.client_email})`);
    return parsed;
  }

  console.error('❌ FATAL: No valid credentials found in any location.');
  console.error('   Checked: GCP_SERVICE_ACCOUNT env, scripts/google-service-account.json, credentials/service_account.json');
  process.exit(1);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITEMAP FETCHER — With validation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function fetchSitemapUrls() {
  const sitemapUrl = `${CONFIG.SITE_URL}/sitemap.xml`;
  console.log(`📡 Fetching sitemap: ${sitemapUrl}`);
  
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await fetch(sitemapUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const xml = await response.text();
      
      const urls = [];
      const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
      for (const match of matches) {
        const url = match[1].trim();
        // Validate URL format
        if (url.startsWith('http') && url.includes(CONFIG.SITE_URL.replace('https://', ''))) {
          urls.push(url);
        }
      }
      
      // Deduplicate
      const uniqueUrls = [...new Set(urls)];
      console.log(`✅ Sitemap: ${uniqueUrls.length} unique URLs (${urls.length - uniqueUrls.length} duplicates removed)`);
      return uniqueUrls;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error(`❌ Sitemap fetch failed after 3 attempts: ${error.message}`);
        process.exit(1);
      }
      console.warn(`⚠️  Sitemap fetch failed (${3 - retries}/3), retrying in 2s...`);
      await sleep(2000);
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPONENTIAL BACKOFF WITH JITTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getBackoffDelay(attempt) {
  const exponentialDelay = CONFIG.BASE_DELAY_MS * Math.pow(2, attempt);
  const jitter = Math.random() * 500;
  return Math.min(exponentialDelay + jitter, 30000); // Cap at 30s
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDEXING ENGINE — With retry and batch processing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function indexUrl(indexing, url, attempt = 0) {
  try {
    if (CONFIG.DRY_RUN) {
      console.log(`   🔍 [DRY RUN] ${url}`);
      return { url, status: 'dry-run', attempts: 1 };
    }

    await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    });
    return { url, status: 'success', attempts: attempt + 1 };
  } catch (error) {
    // 429 = Rate limited or Quota Exceeded
    if (error.code === 429) {
      if (error.message && error.message.toLowerCase().includes('quota')) {
        console.warn(`   🛑 [QUOTA EXCEEDED] Daily limit reached. Skipping ${url}`);
        return { url, status: 'quota-exceeded', error: error.message, attempts: attempt + 1 };
      }
      if (attempt < CONFIG.MAX_RETRIES) {
        const delay = getBackoffDelay(attempt);
        console.warn(`   ⏳ [THROTTLED] ${url} — Retry ${attempt + 1}/${CONFIG.MAX_RETRIES} in ${Math.round(delay / 1000)}s`);
        await sleep(delay);
        return indexUrl(indexing, url, attempt + 1);
      }
    }

    // 403 = Permission denied — fatal, stop everything
    if (error.code === 403) {
      console.error(`\n🚫 PERMISSION DENIED (403): Service account is not an Owner in Search Console.`);
      console.error(`   Account: Check credentials. URL: ${url}`);
      process.exit(1);
    }

    // Other errors — retry up to MAX_RETRIES
    if (attempt < CONFIG.MAX_RETRIES) {
      const delay = getBackoffDelay(attempt);
      console.warn(`   ⚠️  [RETRY] ${url} — ${error.message} (${attempt + 1}/${CONFIG.MAX_RETRIES})`);
      await sleep(delay);
      return indexUrl(indexing, url, attempt + 1);
    }

    return { url, status: 'failed', error: error.message, attempts: attempt + 1 };
  }
}

async function runIndexingSweep(urls) {
  const credentials = resolveCredentials();
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing('v3');
  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  const urlsToProcess = urls.slice(0, CONFIG.MAX_URLS_PER_RUN);
  console.log(`\n🚀 Indexing ${urlsToProcess.length}/${urls.length} URLs (limit: ${CONFIG.MAX_URLS_PER_RUN})${CONFIG.DRY_RUN ? ' [DRY RUN]' : ''}...\n`);

  const results = { success: [], failed: [], skipped: [] };
  const startTime = Date.now();

  // Process in concurrent chunks
  for (let i = 0; i < urlsToProcess.length; i += CONFIG.CHUNK_SIZE) {
    const chunk = urlsToProcess.slice(i, i + CONFIG.CHUNK_SIZE);
    const chunkNum = Math.floor(i / CONFIG.CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(urlsToProcess.length / CONFIG.CHUNK_SIZE);
    
    const chunkResults = await Promise.all(
      chunk.map(url => indexUrl(indexing, url))
    );

    for (const result of chunkResults) {
      if (result.status === 'success' || result.status === 'dry-run') {
        results.success.push(result);
        console.log(`   ✅ [${result.status.toUpperCase()}] ${result.url}`);
      } else if (result.status === 'quota-exceeded') {
        results.skipped.push(result);
      } else {
        results.failed.push(result);
        console.error(`   ❌ [FAILED] ${result.url}: ${result.error}`);
      }
    }

    // Progress indicator
    const processed = Math.min(i + CONFIG.CHUNK_SIZE, urlsToProcess.length);
    const pct = Math.round((processed / urlsToProcess.length) * 100);
    console.log(`   📊 Progress: ${processed}/${urlsToProcess.length} (${pct}%) — Chunk ${chunkNum}/${totalChunks}\n`);

    // Inter-chunk delay to respect rate limits
    if (i + CONFIG.CHUNK_SIZE < urlsToProcess.length) {
      await sleep(CONFIG.BASE_DELAY_MS);
    }
    
    // Short circuit if quota exceeded
    if (results.skipped.some(r => r.status === 'quota-exceeded')) {
      console.warn(`\n   🛑 [QUOTA EXCEEDED] Halting indexing sweep to respect daily limits.`);
      break;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  return { ...results, elapsed, total: urlsToProcess.length };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUDIT LOGGER — Persistent JSON audit trail
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function writeAuditLog(results) {
  const auditDir = path.dirname(CONFIG.AUDIT_LOG);
  if (!fs.existsSync(auditDir)) {
    fs.mkdirSync(auditDir, { recursive: true });
  }

  let auditHistory = [];
  if (fs.existsSync(CONFIG.AUDIT_LOG)) {
    try {
      auditHistory = JSON.parse(fs.readFileSync(CONFIG.AUDIT_LOG, 'utf8'));
    } catch (e) {
      auditHistory = [];
    }
  }

  const entry = {
    timestamp: new Date().toISOString(),
    engine: 'sovereign-indexing-v6.0',
    mode: CONFIG.DRY_RUN ? 'dry-run' : 'live',
    stats: {
      total: results.total,
      success: results.success.length,
      failed: results.failed.length,
      elapsed: `${results.elapsed}s`,
    },
    failures: results.failed.map(f => ({ url: f.url, error: f.error })),
  };

  // Keep last 100 entries
  auditHistory.unshift(entry);
  if (auditHistory.length > 100) auditHistory = auditHistory.slice(0, 100);

  fs.writeFileSync(CONFIG.AUDIT_LOG, JSON.stringify(auditHistory, null, 2));
  console.log(`📋 Audit log: ${CONFIG.AUDIT_LOG}`);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN ENTRY POINT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SOVEREIGN INDEXING ENGINE v6.0');
  console.log('  Production Hardened | Google Indexing API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const urls = await fetchSitemapUrls();
  const results = await runIndexingSweep(urls);
  writeAuditLog(results);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  INDEXING SWEEP COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  📊 Total URLs:   ${results.total}`);
  console.log(`  ✅ Successful:   ${results.success.length}`);
  console.log(`  ⏭️  Skipped:      ${results.skipped?.length || 0}`);
  console.log(`  ❌ Failed:       ${results.failed.length}`);
  console.log(`  ⏱️  Elapsed:      ${results.elapsed}s`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (results.failed.length > 0) {
    console.log('  FAILED URLs:');
    results.failed.forEach(f => console.log(`    → ${f.url}: ${f.error}`));
    console.log('');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
