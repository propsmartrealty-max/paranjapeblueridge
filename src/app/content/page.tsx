export const runtime = 'edge';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPillars } from '@/utils/mdxUtils';

export default function ContentHub() {
  const pillars = getAllPillars();
  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      <section className="max-w-4xl mx-auto pt-32 pb-24 px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Pillars Content Hub', href: '/content' }
          ]}
        />
        <h1 className="text-4xl md:text-5xl font-serif text-warm-white my-8">Strategic Content Pillars</h1>
        <ul className="space-y-4">
          {pillars.map(p => (
            <li key={p.slug} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-gold/50 transition-colors">
              <Link href={`/pillars/${p.slug}`} className="text-xl text-gold hover:text-warm-white capitalize">
                {p.meta.title || p.slug.replace(/-/g, ' ')}
              </Link>
              {p.meta.description && (
                <p className="text-text-light text-sm mt-1">{p.meta.description}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
