import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function PopularSearches() {
  const allUrls = generatePseoUrls();
  const topLinks = allUrls.filter(u => u.silo !== 'regional-mr').slice(0, 24);
  const regionalLinks = allUrls.filter(u => u.silo === 'regional-mr').slice(0, 12);

  return (
    <section className="bg-[var(--bg)] py-20 border-t border-gold/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-gilded font-bold text-[10px] uppercase tracking-[4px] mb-8">Premium Real Estate Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {topLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={`/${link.slug}`} 
                  className="text-[11px] text-text-light hover:text-gold transition-colors block truncate"
                  title={link.title}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div className="border-l border-gold/10 pl-12 hidden lg:block">
            <h3 className="text-gilded font-bold text-[10px] uppercase tracking-[4px] mb-8">प्रादेशिक रिअल इस्टेट (मराठी)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {regionalLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={`/${link.slug}`} 
                  className="text-[11px] text-text-light hover:text-gold transition-colors block truncate"
                  title={link.title}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
