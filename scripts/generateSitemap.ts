import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.blueridge.com';
const pagesDir = path.resolve(process.cwd(), 'src', 'app');
const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

function isPageFile(file: string) {
  const ext = path.extname(file);
  return ['.tsx', '.js', '.jsx', '.ts'].includes(ext) && !file.startsWith('_') && !file.startsWith('[');
}

function collectUrls(dir: string, basePath = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const urls: string[] = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip special directories like api, etc.
      if (['api', 'static', 'public'].includes(entry.name)) continue;
      const nested = collectUrls(entryPath, `${basePath}/${entry.name}`);
      urls.push(...nested);
    } else if (entry.isFile() && isPageFile(entry.name)) {
      const slug = entry.name.replace(/\.(tsx|js|jsx|ts)$/, '');
      const urlPath = slug === 'page' ? '/' : `/${slug}`;
      urls.push(`${SITE_URL}${urlPath}`);
    }
  }
  return urls;
}

const urls = collectUrls(pagesDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>\n    <loc>${url}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`
  )
  .join('\n')}
</urlset>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log('Sitemap generated at', outputPath);
