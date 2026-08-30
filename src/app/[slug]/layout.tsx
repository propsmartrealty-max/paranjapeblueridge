import React from 'react';
import JSONLD from '@/components/JSONLD';
import SeoContentBlock from '@/components/SeoContentBlock';

export default function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      {/* Per-page structured data — WebPage schema is inside JSONLD.tsx @graph, no duplicate needed here */}
      <JSONLD pathname={`/${params.slug}`} />
      {children}
      {/* Server-rendered SEO content block — H1, FAQs, internal links visible to Google on first crawl */}
      <SeoContentBlock slug={params.slug} />
    </>
  );
}
