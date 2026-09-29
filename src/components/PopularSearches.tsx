import React from 'react';
import { getPopularSearchSections, getPseoTotalCount } from '@/data/seo-matrix';
import { LayoutGrid, TrendingUp, Cpu, Landmark, Building2, Trees } from 'lucide-react';

export default function PopularSearches() {
  const sectionsData = getPopularSearchSections();
  const totalCount = getPseoTotalCount();

  const icons = [Cpu, TrendingUp, LayoutGrid, Landmark, Trees, Building2];

  const sections = sectionsData.map((s, idx) => ({
    ...s,
    icon: icons[idx % icons.length]
  }));

  return (
    <nav aria-label="Sovereign Market Hub" className="bg-[#070D1A] py-14 sm:py-16 border-t border-gold/15">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px] block mb-2 font-mono">Sovereign Intelligence Hub</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-warm-white font-bold">Pune Real Estate <span className="italic font-normal text-gold">Market Index</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-2 text-gold">
                 <section.icon size={15} />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest font-mono text-warm-white/90">{section.title}</h4>
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={`/${link.slug}`} 
                      className="text-[11px] text-slate-300 hover:text-gold transition-colors block leading-snug no-underline"
                      title={link.title}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-medium">
             Total Indexed Sovereign Nodes: <span className="text-gold font-bold">{totalCount.toLocaleString()}+ High-Intent Paths</span>
           </p>
           <div className="flex gap-3">
              <div className="bg-gold/10 text-gold text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-gold/30">
                Google Indexing API: active
              </div>
              <div className="bg-white/5 text-slate-200 text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/15">
                Sitemap Coverage: 100%
              </div>
           </div>
        </div>
      </div>
    </nav>
  );
}
