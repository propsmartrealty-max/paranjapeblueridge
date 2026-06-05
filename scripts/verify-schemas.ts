import { projects, articles } from '../src/data/master-data';
import { generatePseoUrls } from '../src/data/seo-matrix';

console.log('🔍 Starting Build-Time Schema Validation Audit...');

function testPseoUrls() {
  const urls = generatePseoUrls();
  console.log(`✅ Collected ${urls.length} programmatic SEO URLs.`);

  if (urls.length === 0) {
    throw new Error('Verification Failed: PSEO URL generator returned 0 items.');
  }

  // Check for duplicate slugs
  const slugs = urls.map(u => u.slug);
  const uniqueSlugs = new Set(slugs);
  if (slugs.length !== uniqueSlugs.size) {
    const duplicates = slugs.filter((item, index) => slugs.indexOf(item) !== index);
    throw new Error(`Verification Failed: Duplicate slugs detected: ${duplicates.slice(0, 5).join(', ')}`);
  }
  console.log('✅ Zero duplicate slugs detected in dynamic routes.');

  // Check format of slugs (lowercase, clean characters)
  const invalidSlugs = urls.filter(u => !/^[a-z0-9\-]+$/.test(u.slug));
  if (invalidSlugs.length > 0) {
    throw new Error(`Verification Failed: Invalid slug formats: ${invalidSlugs.slice(0, 3).map(u => u.slug).join(', ')}`);
  }
  console.log('✅ All dynamic slugs conform to canonical URL format.');
}

function testSchemaMetadata() {
  // Validate projects data (MahaRERA registrations and specs)
  projects.forEach(p => {
    if (!p.reraNumber || p.reraNumber.trim() === '') {
      throw new Error(`Verification Failed: Project ${p.name} is missing a MahaRERA registration number.`);
    }
    if (!p.price || p.price.trim() === '') {
      throw new Error(`Verification Failed: Project ${p.name} is missing pricing info.`);
    }
    if (!p.configurations || p.configurations.length === 0) {
      throw new Error(`Verification Failed: Project ${p.name} has no configuration details.`);
    }
  });
  console.log(`✅ Validated RERA registration numbers across all ${projects.length} primary projects.`);

  // Validate insights articles dates
  articles.forEach(a => {
    if (isNaN(Date.parse(a.dateISO))) {
      throw new Error(`Verification Failed: Article ${a.title} has an invalid ISO date format: ${a.dateISO}`);
    }
  });
  console.log(`✅ Verified dateISO compliance for all ${articles.length} news insights articles.`);
}

function testAbsoluteUrlFormats() {
  const SITE_URL = 'https://www.paranjapeblueridge.com';
  
  projects.forEach(p => {
    p.configurations.forEach(c => {
      if (c.image) {
        if (!c.image.startsWith('/') && !c.image.startsWith('http')) {
          throw new Error(`Verification Failed: Configuration image path in ${p.name} must start with '/' or 'http': ${c.image}`);
        }
        const absoluteImageUrl = c.image.startsWith('http') ? c.image : `${SITE_URL}${c.image}`;
        if (!absoluteImageUrl.startsWith('https://')) {
          throw new Error(`Verification Failed: Absolute image URL is not secure: ${absoluteImageUrl}`);
        }
      }
    });
  });
  console.log('✅ All configuration asset images utilize clean, secure absolute paths.');
}

try {
  testPseoUrls();
  testSchemaMetadata();
  testAbsoluteUrlFormats();
  console.log('🎉 SCHEMA VALIDATION AUDIT COMPLETE: 100% compliant. Build can proceed.');
  process.exit(0);
} catch (error: any) {
  console.error('❌ Schema Validation Audit Failed:', error.message);
  process.exit(1);
}
