"use client";

import React from 'react';
import Link from 'next/link';
import { generatePseoUrls } from '@/data/seo-matrix';
import { ChevronRight, Zap } from 'lucide-react';

interface SiloLinksProps {
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

export default function SiloLinks({ currentSlug, silo }: SiloLinksProps) {
  const allUrls = generatePseoUrls();
  const seed = hashString(currentSlug);

  const related = allUrls
    .filter(u => u.silo === silo && u.slug !== currentSlug)
    // Deterministic shuffle based on current page slug — stable across server/client renders
    .sort((a, b) => (hashString(a.slug + seed) % 100) - (hashString(b.slug + seed) % 100))
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="py-20 border-t border-white/5">
      <div className="flex items-center gap-4 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-8">
        <Zap size={14} />
        Related Sovereign Intelligence
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((link) => (
          <Link 
            key={link.slug} 
            href={`/${link.slug}`}
            className="group p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-[8px] text-gold uppercase tracking-widest mb-1">{link.type} Profile</span>
              <span className="text-sm text-warm-white group-hover:text-gold transition-colors">{link.title}</span>
            </div>
            <ChevronRight className="text-gold/30 group-hover:text-gold group-hover:translate-x-1 transition-all" size={16} />
          </Link>
        ))}
      </div>
    </section>
  );
}
