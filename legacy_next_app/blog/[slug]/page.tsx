export const runtime = 'edge';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBlogPostBySlug } from '@/utils/mdxUtils';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} | Paranjape Blue Ridge`,
    description: post.meta.description || post.meta.excerpt || '',
    alternates: {
      canonical: `https://paranjapeblueridge.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      <article className="prose prose-invert prose-lg max-w-4xl mx-auto pt-32 pb-24 px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/#blogs' },
            { label: post.meta.title || slug, href: `/blog/${slug}` }
          ]}
        />
        <h1 className="text-3xl md:text-5xl font-serif text-warm-white my-6">
          {post.meta.title}
        </h1>
        <div className="text-sm text-gold mb-8 flex gap-4">
          {post.meta.author && <span>By {post.meta.author}</span>}
          {post.meta.date && <span>• {post.meta.date}</span>}
        </div>
        <MarkdownContent content={post.content} className="prose prose-invert prose-lg max-w-none prose-a:text-gold hover:prose-a:text-gold-light" />
      </article>
    </main>
  );
}
