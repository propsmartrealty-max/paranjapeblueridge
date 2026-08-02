import { projects, articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';

const baseUrl = 'https://paranjapeblueridge.com';

export async function GET() {
  const images: { loc: string; image: string; title: string }[] = [];

  // 1. Collect Project Configuration Images
  projects.forEach((project) => {
    if (project.configurations) {
      project.configurations.forEach((config) => {
        if (config.image) {
          images.push({
            loc: `${baseUrl}/${project.slug}/${config.slug}`,
            image: config.image.startsWith('http') ? config.image : `${baseUrl}${config.image}`,
            title: `${config.title} - ${project.name}`,
          });
        }
      });
    }
  });

  // 2. Collect Article Images
  articles.forEach((article) => {
    if (article.image) {
      images.push({
        loc: `${baseUrl}/insights/${article.slug}`,
        image: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
        title: article.title,
      });
    }
  });

  // 3. Collect MDX Post Images
  const mdxPosts = getAllPosts();
  mdxPosts.forEach((post) => {
    if (post.meta?.image) {
      images.push({
        loc: `${baseUrl}/insights/${post.slug}`,
        image: post.meta.image.startsWith('http') ? post.meta.image : `${baseUrl}${post.meta.image}`,
        title: post.meta.title || 'Insight',
      });
    }
  });

  // Construct standard XML sitemap for images
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (img) => `
  <url>
    <loc>${img.loc}</loc>
    <image:image>
      <image:loc>${img.image}</image:loc>
      <image:title><![CDATA[${img.title}]]></image:title>
    </image:image>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
