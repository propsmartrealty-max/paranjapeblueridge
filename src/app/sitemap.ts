import { MetadataRoute } from 'next';
import { generateSitemaps as getChunks, getSitemapUrls } from '@/data/sitemap-logic';

export const revalidate = 86400; // Cache for 24 hours

export async function generateSitemaps() {
  const chunks = await getChunks();
  return chunks.map(c => ({ id: c.id }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  return getSitemapUrls({ id });
}
