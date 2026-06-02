import React from 'react';
import Link from 'next/link';
import { generatePseoUrls } from '@/data/seo-matrix';
import { Link2 } from 'lucide-react';

interface RelatedSearchesMeshProps {
  currentSlug: string;
  silo: string;
}

export default function RelatedSearchesMesh({ currentSlug, silo }: RelatedSearchesMeshProps) {
  const allUrls = generatePseoUrls();
  
  // Logic to find semantically related pages
  // 1. Same silo, different pages
  // 2. Macro pages (pune-macro, west-pune-macro)
  
  const sameSiloPages = allUrls
    .filter(u => u.silo === silo && u.slug !== currentSlug)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 6);

  const macroPages = allUrls
    .filter(u => (u.silo === 'pune-macro' || u.silo === 'west-pune-macro') && u.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const relatedLinks = [...sameSiloPages, ...macroPages];

  if (relatedLinks.length === 0) return null;

  return (
    <section className="bg-navy py-16 border-t border-white/5">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <Link2 className="text-gold" size={20} />
          <h3 className="text-xl font-serif text-warm-white">Popular Real Estate Searches in Pune</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {relatedLinks.map((link, index) => (
            <Link 
              key={index} 
              href={`/${link.slug}`}
              className="text-sm text-text-light hover:text-gold transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gold transition-colors"></span>
              {link.intent}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
