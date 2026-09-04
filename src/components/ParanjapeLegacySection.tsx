"use client";

import React, { useState } from 'react';
import { Building2, ArrowRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { completedParanjapeProjects } from '@/data/cms/legacy-projects';

export default function ParanjapeLegacySection() {
  return (
    <section id="legacy" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="chapter-badge mb-4">
              <span>07 • Paranjape Township Legacy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.08]">
              Built over time. <br />
              <span className="italic font-light text-gradient-champagne">Designed for generations.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium">
              Over three decades of pioneering integrated masterplans, iconic residential enclaves, and generational landmarks across Maharashtra.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="glass-pill px-4 py-2 rounded-full text-xs font-mono font-bold text-slate-700">
              Township Heritage
            </span>
          </div>
        </div>

        {/* Project Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {completedParanjapeProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card-luxury p-4 sm:p-6 group"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 mb-6">
                <img
                  src={proj.heroImage}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#070D1A] font-bold">
                    {proj.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-200">
                      {proj.location}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {proj.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-white border border-white/20 font-bold">
                    {proj.completionYear}
                  </span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                  {proj.legacyStory}
                </p>

                <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200/90 text-xs text-slate-700 font-medium">
                  <strong className="text-[#070D1A] font-bold">Scale & Milestone: </strong>
                  {proj.totalAcresOrUnits}
                </div>

                <a
                  href="/why-paranjape"
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-[#785415] hover:text-[#5a3e0f] no-underline pt-2 group/link"
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
