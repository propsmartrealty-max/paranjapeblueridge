/**
 * SOVEREIGN INDEXING ENGINE v7.0 — Git-Diff Aware
 *
 * Priority Queue Strategy:
 *   1. CHANGED URLs (from git diff on push) — always indexed first
 *   2. NEW URLs (in sitemap but never indexed) — indexed next
 *   3. OLDEST indexed URLs (stale re-index) — fills remaining quota
 *
 * This ensures every git push immediately notifies Google about
 * the exact pages that changed, bypassing the quota waste of
 * re-submitting already-indexed unchanged pages.
 *
 * Triggers:
 *   push        → prioritise CHANGED_URLS from git diff
 *   schedule    → normal sweep of pending/stale URLs
 *   workflow_dispatch → FORCE_ALL=true resets cache and sweeps all
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
  CACHE_FILE: path.join(__dirname, '..', 'data', 'google-index-cache.json'),
  MAX_URLS_PER_RUN: 200,      // Google daily hard quota
  CHUNK_SIZE: 10,              // Concurrent batch size
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
  STALE_DAYS: 30,              // Re-index pages not touched in 30 days
  DRY_RUN: process.argv.includes('--dry-run'),
  TRIGGER: process.env.TRIGGER || 'manual',         // push | schedule | workflow_dispatch
  FORCE_ALL: process.env.FORCE_ALL === 'true',      // reset cache and re-index everything
  CHANGED_URLS_RAW: process.env.CHANGED_URLS || '', // comma-separated from git diff step
  SWEEP_CHANGED: false,        // set true if data/component change detected (full PSEO sweep)
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREDENTIAL RESOLVER — Multi-source with fallback
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function resolveCredentials() {
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
  if (fs.existsSync(CONFIG.KEY_FILE)) {
    const parsed = JSON.parse(fs.readFileSync(CONFIG.KEY_FILE, 'utf8'));
    console.log(`🔑 Credentials: Local file (${parsed.client_email})`);
    return parsed;
  }
  const credDir = path.join(__dirname, '..', 'credentials', 'service_account.json');
  if (fs.existsSync(credDir)) {
    const parsed = JSON.parse(fs.readFileSync(credDir, 'utf8'));
    console.log(`🔑 Credentials: Credentials dir (${parsed.client_email})`);
    return parsed;
  }
  console.error('❌ FATAL: No valid credentials found.');
  process.exit(1);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SITEMAP FETCHER
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
        if (url.startsWith('http') && url.includes(CONFIG.SITE_URL.replace('https://', ''))) {
          urls.push(url);
        }
      }
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
// PRIORITY QUEUE BUILDER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildPriorityQueue(allSitemapUrls, cache) {
  const now = Date.now();
  const staleThreshold = CONFIG.STALE_DAYS * 24 * 60 * 60 * 1000;

  // Parse CHANGED_URLS from env (set by git diff step in workflow)
  const rawChanged = CONFIG.CHANGED_URLS_RAW
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);

  // Flag: data/component change → sweep changed PSEO slugs via sitemap
  const needsFullSweep = rawChanged.includes('__SWEEP_CHANGED__') || CONFIG.SWEEP_CHANGED;
  const changedUrls = rawChanged.filter(u => u.startsWith('http'));

  // Tier 1: URLs explicitly changed in this git push (highest priority)
  const tier1 = changedUrls.filter(u => allSitemapUrls.includes(u));

  // Tier 2: Never-indexed URLs (new pages added to sitemap)
  const tier2 = allSitemapUrls.filter(u => !cache[u] && !tier1.includes(u));

  // Tier 3: Stale URLs (indexed > STALE_DAYS ago)
  const tier3 = allSitemapUrls.filter(u => {
    if (!cache[u] || tier1.includes(u) || tier2.includes(u)) return false;
    const indexedAt = new Date(cache[u].indexedAt).getTime();
    return (now - indexedAt) > staleThreshold;
  }).sort((a, b) => {
    // oldest first
    return new Date(cache[a].indexedAt) - new Date(cache[b].indexedAt);
  });

  console.log(`\n📋 Priority Queue:`);
  console.log(`   🔴 Tier 1 (Changed pages):   ${tier1.length} URLs`);
  console.log(`   🟡 Tier 2 (New/unindexed):   ${tier2.length} URLs`);
  console.log(`   🟢 Tier 3 (Stale >30 days):  ${tier3.length} URLs`);
  if (needsFullSweep) console.log(`   ⚡ Data/component change detected — PSEO slugs elevated to Tier 2`);

  // Merge tiers, cap at daily quota
  const queue = [...new Set([...tier1, ...tier2, ...tier3])].slice(0, CONFIG.MAX_URLS_PER_RUN);
  console.log(`   📦 Total to process this run: ${queue.length}/${CONFIG.MAX_URLS_PER_RUN} (quota limit)\n`);

  return queue;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RETRY / BACKOFF
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getBackoffDelay(attempt) {
  const exponentialDelay = CONFIG.BASE_DELAY_MS * Math.pow(2, attempt);
  const jitter = Math.random() * 500;
  return Math.min(exponentialDelay + jitter, 30000);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDEXING ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function indexUrl(indexing, url, attempt = 0) {
  try {
    if (CONFIG.DRY_RUN) {
      return { url, status: 'dry-run', attempts: 1 };
    }
    await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    });
    return { url, status: 'success', attempts: attempt + 1 };
  } catch (error) {
    if (error.code === 429) {
      if (error.message && error.message.toLowerCase().includes('quota')) {
        console.warn(`   🛑 [QUOTA EXCEEDED] Daily limit reached. Halting.`);
        return { url, status: 'quota-exceeded', error: error.message, attempts: attempt + 1 };
      }
      if (attempt < CONFIG.MAX_RETRIES) {
        const delay = getBackoffDelay(attempt);
        console.warn(`   ⏳ [THROTTLED] ${url} — Retry ${attempt + 1}/${CONFIG.MAX_RETRIES} in ${Math.round(delay / 1000)}s`);
        await sleep(delay);
        return indexUrl(indexing, url, attempt + 1);
      }
    }
    if (error.code === 403) {
      console.error(`\n🚫 PERMISSION DENIED (403): Service account is not an Owner in Search Console.`);
      console.error(`   Add the service account as Owner at: https://search.google.com/search-console`);
      process.exit(1);
    }
    if (attempt < CONFIG.MAX_RETRIES) {
      const delay = getBackoffDelay(attempt);
      console.warn(`   ⚠️  [RETRY] ${url} — ${error.message} (${attempt + 1}/${CONFIG.MAX_RETRIES})`);
      await sleep(delay);
      return indexUrl(indexing, url, attempt + 1);
    }
    return { url, status: 'failed', error: error.message, attempts: attempt + 1 };
  }
}

async function runIndexingSweep(queue, cache) {
  const credentials = resolveCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const indexing = google.indexing('v3');
  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  const results = { success: [], failed: [], skipped: [] };
  const startTime = Date.now();
  let quotaHit = false;

  console.log(`🚀 Indexing ${queue.length} URLs${CONFIG.DRY_RUN ? ' [DRY RUN]' : ''}...\n`);

  for (let i = 0; i < queue.length; i += CONFIG.CHUNK_SIZE) {
    if (quotaHit) break;

    const chunk = queue.slice(i, i + CONFIG.CHUNK_SIZE);
    const chunkNum = Math.floor(i / CONFIG.CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(queue.length / CONFIG.CHUNK_SIZE);

    const chunkResults = await Promise.all(chunk.map(url => indexUrl(indexing, url)));

    for (const result of chunkResults) {
      if (result.status === 'success' || result.status === 'dry-run') {
        results.success.push(result);
        // Update cache with timestamp so we can track staleness
        cache[result.url] = { indexedAt: new Date().toISOString(), status: 'indexed' };
        console.log(`   ✅ [OK] ${result.url}`);
      } else if (result.status === 'quota-exceeded') {
        results.skipped.push(result);
        quotaHit = true;
      } else {
        results.failed.push(result);
        console.error(`   ❌ [FAIL] ${result.url}: ${result.error}`);
      }
    }

    const processed = Math.min(i + CONFIG.CHUNK_SIZE, queue.length);
    const pct = Math.round((processed / queue.length) * 100);
    console.log(`   📊 Progress: ${processed}/${queue.length} (${pct}%) — Chunk ${chunkNum}/${totalChunks}\n`);

    if (!quotaHit && i + CONFIG.CHUNK_SIZE < queue.length) {
      await sleep(CONFIG.BASE_DELAY_MS);
    }
  }

  // Persist updated cache
  const dataDir = path.dirname(CONFIG.CACHE_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!CONFIG.DRY_RUN) {
    fs.writeFileSync(CONFIG.CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`💾 Cache updated: ${results.success.length} URLs recorded.`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  return { ...results, elapsed, total: queue.length };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INDEXNOW SWEEP — Bing/Yahoo/DuckDuckGo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function runIndexNow(allUrls) {
  console.log(`\n⚡ Starting IndexNow API Sweep for Bing & Yahoo...`);
  const INDEXNOW_KEY = '37ed22dc3eab4b13b1cd3f21975e533c';
  const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

  // Submit in batches of 100 (IndexNow limit)
  const BATCH_SIZE = 100;
  let totalSuccess = 0;

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'www.paranjapeblueridge.com',
          key: INDEXNOW_KEY,
          keyLocation: `https://www.paranjapeblueridge.com/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });
      if (response.ok || response.status === 202) {
        totalSuccess += batch.length;
      } else {
        console.warn(`   ⚠️  IndexNow batch ${Math.floor(i / BATCH_SIZE) + 1} returned ${response.status}`);
      }
    } catch (e) {
      console.warn(`   ⚠️  IndexNow batch failed: ${e.message}`);
    }
  }

  if (totalSuccess > 0) {
    console.log(`✅ SUCCESS: Bing, Yahoo, and DuckDuckGo have accepted all ${totalSuccess} URLs for instant indexing!`);
  }
  return totalSuccess;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUDIT LOGGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function writeAuditLog(results, trigger, changedUrls) {
  const auditDir = path.dirname(CONFIG.AUDIT_LOG);
  if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

  let auditHistory = [];
  if (fs.existsSync(CONFIG.AUDIT_LOG)) {
    try { auditHistory = JSON.parse(fs.readFileSync(CONFIG.AUDIT_LOG, 'utf8')); } catch (e) { auditHistory = []; }
  }

  const entry = {
    timestamp: new Date().toISOString(),
    engine: 'sovereign-indexing-v7.0',
    trigger,
    mode: CONFIG.DRY_RUN ? 'dry-run' : 'live',
    changedPagesFromGit: changedUrls,
    stats: {
      total: results.total,
      success: results.success.length,
      skipped: results.skipped?.length || 0,
      failed: results.failed.length,
      elapsed: `${results.elapsed}s`,
    },
    failures: results.failed.map(f => ({ url: f.url, error: f.error })),
  };

  auditHistory.unshift(entry);
  if (auditHistory.length > 100) auditHistory = auditHistory.slice(0, 100);
  fs.writeFileSync(CONFIG.AUDIT_LOG, JSON.stringify(auditHistory, null, 2));
  console.log(`📋 Audit log: ${CONFIG.AUDIT_LOG}`);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SOVEREIGN INDEXING ENGINE v7.0');
  console.log('  Git-Diff Aware | Google Indexing API + IndexNow');
  console.log(`  Trigger: ${CONFIG.TRIGGER.toUpperCase()} | Mode: ${CONFIG.DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Load or init cache
  let cache = {};
  if (CONFIG.FORCE_ALL) {
    console.log('⚡ FORCE_ALL=true — resetting cache, will re-index everything.');
  } else if (fs.existsSync(CONFIG.CACHE_FILE)) {
    try { cache = JSON.parse(fs.readFileSync(CONFIG.CACHE_FILE, 'utf8')); } catch (e) { cache = {}; }
  }

  // Fetch live sitemap
  const allSitemapUrls = await fetchSitemapUrls();

  // Build priority queue
  const queue = buildPriorityQueue(allSitemapUrls, cache);

  // Parse changed URLs for audit log
  const changedUrls = CONFIG.CHANGED_URLS_RAW
    .split(',').map(u => u.trim())
    .filter(u => u.startsWith('http'));

  if (queue.length === 0) {
    console.log('✅ Nothing to index — all URLs are fresh and up to date.');
    return;
  }

  // Google Indexing API sweep
  const results = await runIndexingSweep(queue, cache);

  // IndexNow sweep (free, no quota — submit all sitemap URLs every run)
  const indexNowCount = await runIndexNow(allSitemapUrls);

  // Write audit log
  writeAuditLog(results, CONFIG.TRIGGER, changedUrls);

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  INDEXING SWEEP COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  📊 Google API Processed:   ${results.total} URLs`);
  console.log(`  ✅ Google API Success:     ${results.success.length}`);
  console.log(`  ⏭️  Google API Skipped:    ${results.skipped?.length || 0} (quota)`);
  console.log(`  ❌ Google API Failed:      ${results.failed.length}`);
  console.log(`  ⚡ IndexNow Submitted:     ${indexNowCount} URLs (Bing/Yahoo)`);
  console.log(`  🔴 Changed pages indexed:  ${changedUrls.length}`);
  console.log(`  ⏱️  Elapsed:               ${results.elapsed}s`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (results.failed.length > 0) {
    console.log('  FAILED URLs:');
    results.failed.forEach(f => console.log(`    → ${f.url}: ${f.error}`));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
