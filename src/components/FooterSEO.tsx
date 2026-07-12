import React from 'react';
import { longTailUrls } from '@/data/seo-matrix';

export default function FooterSEO() {
  const displayedLinks = longTailUrls.slice(0, 8);

  return (
    <footer className="bg-[var(--bg)] border-t border-gold/10 pt-10 pb-6 px-4 rounded-xl backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start text-sm text-text-light/70 mb-6">
          <p className="max-w-md mb-4 md:mb-0">
            Paranjape Blue Ridge – Premium township in Pune's IT corridor offering luxury living, integrated amenities, and strategic proximity to major tech hubs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {displayedLinks.map((url) => (
              <a
                key={url.slug}
                href={`/${url.slug}`}
                className="text-text-light/40 hover:text-gold transition-colors text-xs"
              >
                {url.title}
              </a>
            ))}
          </div>
        </div>

        {/* Absolute bottom SEO string & Sitemap Link */}
        <div className="mt-12 pt-4 border-t border-gold/5 flex flex-col sm:flex-row justify-between items-center text-[9px] text-text-light/30 gap-4">
          <p className="text-center sm:text-left">
            Ranked #1 for: Paranjape Blue Ridge | Paranjape Blue Ridge Hinjewadi | Paranjape Blue Ridge Altius | Paranjape Promenade Hinjewadi | Paranjape Blue Ridge Township | West Pune Real Estate Market | Hinjewadi Real Estate Market
          </p>
          <a href="/html-sitemap" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold shrink-0">
            View Complete Property Sitemap
          </a>
        </div>

      </div>
    </footer>
  );
}
