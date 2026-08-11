import { MetadataRoute } from 'next';
import { generateSitemaps as getSitemapChunks, getSitemapUrls } from '@/data/sitemap-logic';

export const revalidate = 86400; // Cache for 24 hours

export async function generateSitemaps() {
  const chunks = await getSitemapChunks();
  // Next.js expects an array of objects with an 'id' property
  return chunks;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const urls = await getSitemapUrls({ id });
  return urls;
}
