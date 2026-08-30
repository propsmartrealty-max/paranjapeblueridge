export const runtime = 'edge';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPillarBySlug } from '@/utils/mdxUtils';

interface PillarPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PillarPageProps): Promise<Metadata> {
  const post = getPillarBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.meta.title || params.slug} | Paranjape Blue Ridge`,
    description: post.meta.description || post.meta.excerpt || '',
    alternates: {
      canonical: `https://paranjapeblueridge.com/pillars/${params.slug}`,
    },
  };
}

export default function PillarPage({ params }: PillarPageProps) {
  const { slug } = params;
  const post = getPillarBySlug(slug);

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
            { label: 'Pillars', href: '/content' },
            { label: post.meta.title || slug, href: `/pillars/${slug}` }
          ]}
        />
        {post.meta.title && (
          <h1 className="text-3xl md:text-5xl font-serif text-warm-white my-6">
            {post.meta.title}
          </h1>
        )}
        <MarkdownContent content={post.content} className="prose prose-invert prose-lg max-w-none prose-a:text-gold hover:prose-a:text-gold-light" />
      </article>
    </main>
  );
}
