import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function PopularSearches() {
  const allUrls = generatePseoUrls();
  // Select a subset of highly optimized links to distribute link equity
  // Here we take the first 24 to keep the footer clean
  const topLinks = allUrls.slice(0, 24);

  return (
    <section className="bg-navy py-16 border-t border-white/5">
      <div className="container">
        <h3 className="text-gold font-bold text-[10px] uppercase tracking-widest mb-8">Popular Real Estate Searches in Pune</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {topLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={`/${link.slug}`} 
              className="text-xs text-text-light hover:text-warm-white hover:underline transition-colors block truncate"
              title={link.title}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
