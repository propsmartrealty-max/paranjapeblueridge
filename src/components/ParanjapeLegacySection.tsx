"use client";

import React, { useState } from 'react';
import { Building2, ArrowRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { completedParanjapeProjects } from '@/data/cms/legacy-projects';

export default function ParanjapeLegacySection() {
  const [filter, setFilter] = useState<'All' | 'Township' | 'Luxury Residences'>('All');

  const filtered = filter === 'All' 
    ? completedParanjapeProjects 
    : completedParanjapeProjects.filter(p => p.category === filter);

  return (
    <section id="legacy" className="py-24 sm:py-32 bg-[#030508] relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
              The Paranjape Legacy
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-ivory tracking-tight leading-[1.08]">
              Built over time. <br />
              <span className="italic font-light text-gradient-champagne">Designed for generations.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-stone-light leading-relaxed font-sans font-light">
              Over three decades of pioneering integrated masterplans, iconic residential enclaves, and generational landmarks across Maharashtra.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {(['All', 'Township', 'Luxury Residences'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all border-none cursor-pointer ${
                  filter === cat
                    ? 'bg-champagne text-obsidian font-bold shadow-md'
                    : 'bg-white/[0.03] text-stone-light hover:text-ivory border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-3xl p-4 sm:p-6 border border-white/10 hover:border-champagne/40 transition-all duration-500 group shadow-glass"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-obsidian-dark mb-6">
                <img
                  src={proj.heroImage}
                  alt={proj.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-champagne-light">
                    {proj.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono text-stone-light uppercase tracking-wider block">
                      {proj.location}
                    </span>
                    <h3 className="text-2xl font-serif text-ivory font-medium">
                      {proj.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 text-ivory">
                    {proj.completionYear}
                  </span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
                  {proj.legacyStory}
                </p>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-stone-light">
                  <strong className="text-ivory font-medium">Scale & Milestone: </strong>
                  {proj.totalAcresOrUnits}
                </div>

                <a
                  href={`/why-paranjape`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-champagne hover:text-champagne-light no-underline pt-2 group/link"
                >
                  <span>Explore Developer Legacy</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
