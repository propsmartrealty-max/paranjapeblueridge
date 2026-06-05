import React from 'react';
import Link from 'next/link';
import { generatePseoUrls } from '@/data/seo-matrix';
import { Link2 } from 'lucide-react';

interface RelatedSearchesMeshProps {
  currentSlug: string;
  silo: string;
}

// Deterministic hash for stable link ordering (no Math.random which causes hydration mismatch)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function RelatedSearchesMesh({ currentSlug, silo }: RelatedSearchesMeshProps) {
  const allUrls = generatePseoUrls();
  const seed = hashString(currentSlug);
  
  // 1. Same silo, different pages — deterministic shuffle
  const sameSiloPages = allUrls
    .filter(u => u.silo === silo && u.slug !== currentSlug)
    .sort((a, b) => (hashString(a.slug + seed) % 100) - (hashString(b.slug + seed) % 100))
    .slice(0, 6);

  // 2. Macro pages (pune-macro, west-pune-macro) — deterministic shuffle
  const macroPages = allUrls
    .filter(u => (u.silo === 'pune-macro' || u.silo === 'west-pune-macro') && u.slug !== currentSlug)
    .sort((a, b) => (hashString(a.slug + seed) % 100) - (hashString(b.slug + seed) % 100))
    .slice(0, 4);

  // 3. Cross-silo links for topic authority spreading — pull from different silos
  const crossSiloTargets = ['investor', 'infrastructure', 'buyer-intent', 'paranjape-schemes'].filter(s => s !== silo);
  const crossSiloLinks = crossSiloTargets.flatMap(targetSilo =>
    allUrls
      .filter(u => u.silo === targetSilo && u.slug !== currentSlug)
      .sort((a, b) => (hashString(a.slug + seed) % 100) - (hashString(b.slug + seed) % 100))
      .slice(0, 1)
  );

  const relatedLinks = [...sameSiloPages, ...macroPages, ...crossSiloLinks];

  if (relatedLinks.length === 0) return null;

  return (
    <section className="bg-navy py-16 border-t border-white/5">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <Link2 className="text-gold" size={20} />
          <h3 className="text-xl font-serif text-warm-white">Popular Real Estate Searches in Pune</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {relatedLinks.map((link) => (
            <Link 
              key={link.slug} 
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
