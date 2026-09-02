export const runtime = 'edge';
import React from 'react';
import Link from 'next/link';
import { getRegionPseoLinks } from '@/data/seo-matrix';
import Navbar from '@/components/Navbar';
import FooterSEO from '@/components/FooterSEO';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

const validRegions = ['hinjewadi', 'wakad', 'baner', 'balewadi', 'pune-city'];

export function generateStaticParams() {
  return validRegions.map(region => ({ region }));
}

interface PageProps {
  params: {
    region: string;
  };
}

export default function ExploreRegionHub({ params }: PageProps) {
  const { region } = params;

  if (!validRegions.includes(region)) {
    return notFound();
  }

  const regionUrls = getRegionPseoLinks(region, 100);
  const formattedRegion = region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="min-h-screen bg-navy text-text flex flex-col">
      <Navbar />
      
      <section className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-7xl">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Real Estate Hub: <span className="text-gold">{formattedRegion}</span>
          </h1>
          <p className="text-text-light text-lg max-w-3xl">
            Explore the complete directory of real estate configurations, micro-market analytics, and premium luxury properties available in the {formattedRegion} sector of Pune. Anchor your investment with Paranjape Blue Ridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regionUrls.map((u, i) => (
            <Link 
              key={u.slug + i} 
              href={`/${u.slug}`}
              className="text-sm text-text-light hover:text-gold transition-colors p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
            >
              <div className="font-bold text-white mb-1 truncate" title={u.title}>{u.title}</div>
              <div className="text-xs opacity-70 truncate">{u.intent}</div>
            </Link>
          ))}
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
