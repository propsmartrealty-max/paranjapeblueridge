'use client';

import React from 'react';
import { Wind, Trees, Volume2, SunMedium, ShieldCheck, RefreshCw } from 'lucide-react';

export default function EnvironmentalWidget() {
  return (
    <div className="bg-navy-light/60 border border-gold/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
            <Wind size={22} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-warm-white flex items-center gap-2">
              Live Micro-Climate & Environmental Quality Index
              <ShieldCheck size={18} className="text-emerald-400" />
            </h4>
            <p className="text-xs text-text-muted">Verified environmental sensors for Paranjape Blue Ridge, Hinjewadi Phase 1</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-mono font-bold">
          <RefreshCw size={12} className="animate-spin" />
          Live Sensors Active
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Air Quality Index */}
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <Wind size={14} className="text-emerald-400" /> Air Quality
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Good</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">AQI 42</div>
          <p className="text-[11px] text-text-muted">Crisp riverfront breeze with zero industrial emissions.</p>
        </div>

        {/* Green Cover */}
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <Trees size={14} className="text-gold" /> Green Open Space
            </span>
            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded font-bold">70% Open</span>
          </div>
          <div className="text-2xl font-bold font-mono text-gold">35+ Acres</div>
          <p className="text-[11px] text-text-muted">Golf course, river promenade & landscaped gardens.</p>
        </div>

        {/* Ambient Noise Level */}
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <Volume2 size={14} className="text-emerald-400" /> Acoustic Noise
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Quiet Zone</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">&lt; 45 dB</div>
          <p className="text-[11px] text-text-muted">Protected riverfront zone away from highway noise.</p>
        </div>

        {/* Micro-Climate Temp */}
        <div className="bg-navy/80 border border-gold/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <SunMedium size={14} className="text-gold" /> Micro-Climate
            </span>
            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded font-bold">Pleasant</span>
          </div>
          <div className="text-2xl font-bold font-mono text-warm-white">24°C</div>
          <p className="text-[11px] text-text-muted">2°C cooler than central city due to Mula river proximity.</p>
        </div>
      </div>
    </div>
  );
}
