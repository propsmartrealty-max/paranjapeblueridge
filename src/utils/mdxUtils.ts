import { generatedInsights, generatedBlogPosts, generatedPillars, PostItem } from '@/data/generated-posts';

export function getAllPosts(): PostItem[] {
  return generatedInsights;
}

export function getPostBySlug(slug: string): PostItem | null {
  return generatedInsights.find(post => post.slug === slug) || null;
}

export function getAllBlogPosts(): PostItem[] {
  return generatedBlogPosts;
}

export function getBlogPostBySlug(slug: string): PostItem | null {
  return generatedBlogPosts.find(post => post.slug === slug) || null;
}

export function getAllPillars(): PostItem[] {
  return generatedPillars;
}

export function getPillarBySlug(slug: string): PostItem | null {
  return generatedPillars.find(post => post.slug === slug) || null;
}
