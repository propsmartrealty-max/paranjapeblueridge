import React from 'react';
import { getRelatedPseoLinks } from '@/data/seo-matrix';
import { ChevronRight, Zap } from 'lucide-react';

interface SiloLinksProps {
  currentSlug: string;
  silo: string;
}

export default function SiloLinks({ currentSlug, silo }: SiloLinksProps) {
  const finalLinks = getRelatedPseoLinks(currentSlug, silo, 6);

  if (finalLinks.length === 0) return null;

  return (
    <section className="py-20 border-t border-slate-200">
      <div className="flex items-center gap-4 text-[#8F6A24] font-bold tracking-[6px] uppercase text-[10px] mb-8 font-mono">
        <Zap size={14} className="text-[#B88E3E]" />
        Related Township Intelligence
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {finalLinks.map((link) => (
          <a 
            key={link.slug} 
            href={`/${link.slug}`}
            className="group p-6 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all flex items-center justify-between no-underline shadow-xs hover:border-[#B88E3E]"
          >
            <div className="flex flex-col">
              <span className="text-[9px] text-[#8F6A24] font-mono uppercase tracking-widest mb-1 font-bold">{link.type} Profile</span>
              <span className="text-sm font-sans font-semibold text-[#070D1A] group-hover:text-[#B88E3E] transition-colors">{link.title}</span>
            </div>
            <ChevronRight className="text-slate-400 group-hover:text-[#B88E3E] group-hover:translate-x-1 transition-all" size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}
