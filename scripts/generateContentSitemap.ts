import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.blueridge.com';
const pagesDir = path.resolve(process.cwd(), 'src', 'app');
const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

function isPageFile(file: string) {
  const ext = path.extname(file);
  return ['.tsx', '.mdx'].includes(ext) && !file.startsWith('_') && !file.startsWith('[');
}

function collectUrls(dir: string, basePath = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const urls: string[] = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip special directories like api, static, public.
      if (['api', 'static', 'public'].includes(entry.name)) continue;
      const nested = collectUrls(entryPath, `${basePath}/${entry.name}`);
      urls.push(...nested);
    } else if (entry.isFile() && isPageFile(entry.name)) {
      // Strip "page" and extension to form URL
      const slug = entry.name.replace(/\.tsx$|\.mdx$/, '');
      const urlPath = slug === 'page' ? basePath || '/' : `${basePath}/${slug}`;
      urls.push(`${SITE_URL}${urlPath}`);
    }
  }
  return urls;
}

const blogDir = path.resolve(process.cwd(), 'content', 'blog');
  let blogUrls: string[] = [];
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
    blogUrls = blogFiles.map(f => {
      const slug = f.replace(/\\.mdx$/, '');
      return `${SITE_URL}/blog/${slug}`;
    });
  }
  const urls = [...collectUrls(pagesDir), ...blogUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log('Content sitemap generated at', outputPath);
