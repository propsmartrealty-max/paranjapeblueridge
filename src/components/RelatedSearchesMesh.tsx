import React from 'react';
import { getRelatedPseoLinks } from '@/data/seo-matrix';
import { Link2 } from 'lucide-react';

interface RelatedSearchesMeshProps {
  currentSlug: string;
  silo: string;
}

export default function RelatedSearchesMesh({ currentSlug, silo }: RelatedSearchesMeshProps) {
  const relatedLinks = getRelatedPseoLinks(currentSlug, silo, 10);

  if (relatedLinks.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] py-16 border-t border-slate-200">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
          <Link2 className="text-[#B88E3E]" size={20} />
          <h3 className="text-xl font-serif text-[#070D1A] font-bold">Popular Real Estate Searches in Pune West</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {relatedLinks.map((link) => (
            <a 
              key={link.slug} 
              href={`/${link.slug}`}
              className="text-xs font-sans text-slate-600 hover:text-[#B88E3E] transition-colors flex items-center gap-2 group no-underline"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#B88E3E] transition-colors shrink-0"></span>
              <span className="line-clamp-1">{link.intent}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
