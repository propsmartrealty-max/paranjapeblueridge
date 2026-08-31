export const runtime = 'edge';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FooterSEO from '@/components/FooterSEO';
import { projects, articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';
import { getCuratedPseoLinks, getPseoTotalCount } from '@/data/seo-matrix';
import { Building2, BookOpen, Compass, Globe, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap & Complete Master Index | Paranjape Blue Ridge',
  description: 'Exhaustive HTML sitemap and directory index of all residential towers, configurations, investment insights, and Pune micro-market guides.',
  alternates: {
    canonical: 'https://paranjapeblueridge.com/html-sitemap',
  },
};

export default function HtmlSitemapPage() {
  const mdxPosts = getAllPosts();
  const curatedPseo = getCuratedPseoLinks(48);
  const totalPseo = getPseoTotalCount();

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-b from-navy via-navy-light/40 to-navy">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-gold font-bold tracking-[4px] uppercase text-xs">Master Architecture Directory</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-warm-white">
              Sovereign <span className="italic font-normal text-gilded">HTML Sitemap</span>
            </h1>
            <p className="text-text-light text-sm sm:text-base">
              A fully accessible, structured navigation index across {totalPseo.toLocaleString()} properties, residential towers, floor plans, and investment guides at Paranjape Blue Ridge Hinjewadi, Pune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Silo 1: Residential Projects & Configurations */}
            <div className="bg-navy-light/80 border border-gold/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-gold/20 pb-3">
                <Building2 className="text-gold" size={20} />
                <h2 className="text-xl font-serif text-warm-white font-bold">Residential Projects</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {projects.map(p => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="text-warm-white hover:text-gold transition-colors font-medium">
                      {p.name}
                    </Link>
                    {p.configurations && p.configurations.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1 text-xs text-text-muted">
                        {p.configurations.map(c => (
                          <li key={c.slug}>
                            <Link href={`/${p.slug}/${c.slug}`} className="hover:text-gold transition-colors">
                              {c.title} ({c.carpetArea} sq.ft.)
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Silo 2: Portals & Specialized Investment Hubs */}
            <div className="bg-navy-light/80 border border-gold/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-gold/20 pb-3">
                <Globe className="text-gold" size={20} />
                <h2 className="text-xl font-serif text-warm-white font-bold">Portals &amp; Portfolios</h2>
              </div>
              <ul className="space-y-2 text-sm text-text-light">
                <li><Link href="/" className="hover:text-gold transition-colors font-medium text-warm-white">Homepage (Sovereign Edition)</Link></li>
                <li><Link href="/mr" className="hover:text-gold transition-colors font-medium text-warm-white">मराठी मुखपृष्ठ (Marathi Edition)</Link></li>
                <li><Link href="/nri-investment" className="hover:text-gold transition-colors font-medium text-warm-white">NRI Real Estate Investment Desk</Link></li>
                <li><Link href="/hinjewadi-micro-market" className="hover:text-gold transition-colors font-medium text-warm-white">Hinjewadi Phase 1 Micro-Market Analysis</Link></li>
                <li><Link href="/directory" className="hover:text-gold transition-colors font-medium text-warm-white">Pune Real Estate Master Directory</Link></li>
                <li><Link href="/sovereign-vault" className="hover:text-gold transition-colors font-medium text-warm-white">Sovereign Vault &amp; Admin Panel</Link></li>
                <li><Link href="/township.kml" className="hover:text-gold transition-colors font-medium text-warm-white">Google Earth / Maps Geographic KML</Link></li>
                <li><Link href="/feed.xml" className="hover:text-gold transition-colors font-medium text-warm-white">WebSub RSS 2.0 Feed</Link></li>
                <li><Link href="/llm.txt" className="hover:text-gold transition-colors font-medium text-warm-white">AI Knowledge Directives (/llm.txt)</Link></li>
              </ul>
            </div>

            {/* Silo 3: Research Insights & Thought Leadership */}
            <div className="bg-navy-light/80 border border-gold/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-gold/20 pb-3">
                <BookOpen className="text-gold" size={20} />
                <h2 className="text-xl font-serif text-warm-white font-bold">Research Insights</h2>
              </div>
              <ul className="space-y-2 text-sm text-text-light max-h-[380px] overflow-y-auto pr-2">
                {articles.map(a => (
                  <li key={a.slug}>
                    <Link href={`/insights/${a.slug}`} className="hover:text-gold transition-colors">
                      {a.title}
                    </Link>
                  </li>
                ))}
                {mdxPosts.map(p => (
                  <li key={p.slug}>
                    <Link href={`/insights/${p.slug}`} className="hover:text-gold transition-colors">
                      {p.meta?.title || p.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Silo 4: Curated Programmatic Corridors */}
          <div className="mt-12 bg-navy-light/60 border border-gold/20 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <Compass className="text-gold" size={24} />
                <div>
                  <h2 className="text-2xl font-serif text-warm-white font-bold">Curated Micro-Market &amp; Configuration Links</h2>
                  <p className="text-xs text-text-muted">High-intent catchment routes covering transit hubs, tech parks, and comparisons</p>
                </div>
              </div>
              <Link href="/directory" className="text-xs text-gold hover:underline font-bold uppercase tracking-wider">
                View All {totalPseo.toLocaleString()} Routes →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {curatedPseo.map(item => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="p-2.5 rounded-lg bg-navy/60 hover:bg-gold/10 border border-gold/10 hover:border-gold/30 transition-all text-text-light hover:text-gold truncate"
                  title={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Silo 5: MahaRERA Regulatory Transparency */}
          <div className="mt-8 bg-navy-light/40 border border-gold/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-3">
              <Shield className="text-gold" size={20} />
              <span>
                <strong>MahaRERA Certified Projects:</strong> Promenade: P52100055581 | The Altius: P52100000054 | Ridges 41: P52100000054
              </span>
            </div>
            <span className="text-gold">Paranjape Schemes (Construction) Ltd.</span>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
