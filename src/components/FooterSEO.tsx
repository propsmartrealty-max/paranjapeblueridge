import React from 'react';
import { longTailUrls } from '@/data/seo-matrix';

export default function FooterSEO() {
  // Randomly select 60 keywords per SSG build for massive PageRank sculpting across the PSEO matrix
  const shuffled = [...longTailUrls].sort(() => 0.5 - Math.random());
  const displayedLinks = shuffled.slice(0, 60);

  return (
    <footer className="bg-[var(--bg)] border-t border-gold/10 pt-10 pb-6 px-4 rounded-xl backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col text-sm text-text-light/70 mb-6">
          <p className="max-w-2xl mb-8">
            Paranjape Blue Ridge – Premium 138-acre integrated township in Pune's IT corridor. Explore luxury 2BHK, 3BHK, 4BHK, 5BHK, Duplex, and Simplex configurations across Hinjewadi, Mahalunge, Baner, and Wakad corridors. High ROI investment property with walk-to-work IT Park proximity.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {displayedLinks.map((url) => (
              <a
                key={url.slug}
                href={`/${url.slug}`}
                className="text-text-light/30 hover:text-gold transition-colors text-[10px] uppercase tracking-wider"
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
