import React from 'react';
import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import JSONLD from '@/components/JSONLD';
import SeoContentBlock from '@/components/SeoContentBlock';

// Pre-render named project pages AND PSEO pages as static HTML at build time
export async function generateStaticParams() {
  const projectParams = projects.map((p) => ({ slug: p.slug }));
  const pseoParams = generatePseoUrls().map((u) => ({ slug: u.slug }));
  return [...projectParams, ...pseoParams];
}

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
      {/* Server-rendered SEO content block — H1, FAQs, internal links visible to Google on first crawl */}
      <SeoContentBlock slug={params.slug} />
      {children}
    </>
  );
}
