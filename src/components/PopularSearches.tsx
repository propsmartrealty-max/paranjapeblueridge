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
    <nav aria-label="Sovereign Market Hub" className="bg-navy-dark py-32 border-t border-gold/10">
      <div className="container">
        <div className="mb-20">
          <span className="text-gold font-bold tracking-[8px] uppercase text-[10px] block mb-4">Sovereign Intelligence Hub</span>
          <h2 className="text-4xl font-serif text-warm-white">Pune Real Estate <span className="italic font-normal text-gold">Market Index</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 text-gold/60">
                 <section.icon size={16} />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest">{section.title}</h4>
              </div>
              <ul className="space-y-3 list-none p-0 m-0">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={`/${link.slug}`} 
                      className="text-[11px] text-slate-600 hover:text-[#B88E3E] transition-colors block leading-tight no-underline"
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

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] text-text-light uppercase tracking-widest font-medium">
             Total Indexed Sovereign Nodes: <span className="text-gold">{totalCount.toLocaleString()}+ High-Intent Paths</span>
           </p>
           <div className="flex gap-4">
              <div className="bg-gold/10 text-gold text-[8px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-gold/20">
                Google Indexing API: active
              </div>
              <div className="bg-white/5 text-warm-white text-[8px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                Sitemap Coverage: 100%
              </div>
           </div>
        </div>
      </div>
    </nav>
  );
}
