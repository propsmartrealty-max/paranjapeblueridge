export const runtime = 'edge';

import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSEO from '@/components/FooterSEO';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Clock, FileText, ArrowRight, Building, Calendar, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Construction Updates & RERA Milestones | Paranjape Blue Ridge',
  description: 'Track real-time construction progress and MahaRERA milestones for Promenade Residences, The Altius, and Ridges 41 at Paranjape Blue Ridge Hinjewadi Phase 1, Pune.',
  alternates: {
    canonical: 'https://paranjapeblueridge.com/construction-updates',
  },
  openGraph: {
    title: 'Live Construction Updates & RERA Milestones | Paranjape Blue Ridge',
    description: 'Real-time structural engineering updates, MiVAN concrete progress, and MahaRERA certifications for Blue Ridge towers.',
    url: 'https://paranjapeblueridge.com/construction-updates',
    images: ['https://paranjapeblueridge.com/assets/images/township-night.png'],
  },
};

const constructionTowers = [
  {
    name: "Promenade Residences",
    slug: "paranjape-blue-ridge-promenade-hinjewadi-pune",
    tagline: "41-Storey Luxury Riverfront Tower",
    rera: "P52100055581",
    possession: "September 2029",
    progress: 38,
    status: "Superstructure RCC In-Progress",
    image: "/assets/images/promenade-hero.png",
    milestones: [
      { name: "Deep Foundation & Piling", status: "completed", date: "Q1 2025" },
      { name: "Double-Height Podium Level", status: "completed", date: "Q3 2025" },
      { name: "MiVAN Superstructure (Floors 1-15)", status: "in-progress", date: "Active" },
      { name: "Upper Storeys & Rooftop Amenities", status: "upcoming", date: "2027" },
      { name: "Internal Luxury Finishes & Fitouts", status: "upcoming", date: "2028" },
      { name: "Final Handover & Possession", status: "upcoming", date: "Sept 2029" }
    ]
  },
  {
    name: "Ridges 41",
    slug: "paranjape-blue-ridge-41-hinjewadi-pune",
    tagline: "41-Storey Monolithic MiVAN Smart Residences",
    rera: "P52100000054",
    possession: "December 2028",
    progress: 54,
    status: "MiVAN Casting on Level 22",
    image: "/assets/images/ridges-41.png",
    milestones: [
      { name: "Excavation & Raft Foundation", status: "completed", date: "Q2 2024" },
      { name: "6-Level Dedicated Parking Podium", status: "completed", date: "Q4 2024" },
      { name: "MiVAN Monolithic Slab Casting (L1-22)", status: "in-progress", date: "Active" },
      { name: "Flooring, Glazing & Plumbing", status: "in-progress", date: "Active" },
      { name: "Elevator & DG Backup Commissioning", status: "upcoming", date: "2027" },
      { name: "Handover & Resident Moving-In", status: "upcoming", date: "Dec 2028" }
    ]
  },
  {
    name: "The Altius",
    slug: "paranjape-blue-ridge-the-altius-hinjewadi-pune",
    tagline: "Ultra-Luxury Riverfront 4 & 5 BHK Penthouses",
    rera: "P52100000054",
    possession: "Ready / Nearing Possession",
    progress: 88,
    status: "Final Finishing & Club Integration",
    image: "/assets/images/altius-tower.png",
    milestones: [
      { name: "Complete RCC Superstructure", status: "completed", date: "Completed" },
      { name: "Italian Marble & Deck Finishing", status: "completed", date: "Completed" },
      { name: "Private Lift Lobbies & Automation", status: "completed", date: "Completed" },
      { name: "Riverfront Landscaping & Clubhouse", status: "in-progress", date: "Active" },
      { name: "Pre-Possession Key Handover", status: "in-progress", date: "Active" }
    ]
  }
];

export default function ConstructionUpdatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "Live Construction Updates | Paranjape Blue Ridge Hinjewadi",
    "url": "https://paranjapeblueridge.com/construction-updates",
    "description": "Quarterly construction milestones, MiVAN engineering updates, and MahaRERA disclosures for Blue Ridge towers.",
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "url": "https://paranjapeblueridge.com"
    }
  };

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-navy via-navy-light/40 to-navy">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>MahaRERA Governance &amp; Transparency</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-warm-white">
              Live Construction <span className="italic font-normal text-gilded">Milestones</span>
            </h1>
            <p className="text-text-light text-sm sm:text-base leading-relaxed">
              Track real-time engineering progress, structural casting stages, and verified possession timelines across all active residential towers at Paranjape Blue Ridge Hinjewadi Phase 1.
            </p>
          </div>
        </div>
      </section>

      {/* Towers Progress Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 space-y-16">
          {constructionTowers.map((tower, idx) => (
            <div key={idx} className="bg-navy-light/80 border border-gold/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gold/20 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Building className="text-gold" size={24} />
                    <h2 className="text-2xl sm:text-3xl font-serif text-warm-white font-bold">{tower.name}</h2>
                    <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full border border-gold/30 font-mono">
                      MahaRERA: {tower.rera}
                    </span>
                  </div>
                  <p className="text-sm text-text-light">{tower.tagline}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-text-muted uppercase tracking-wider block">Possession Target</span>
                    <span className="text-base font-bold text-gold font-serif">{tower.possession}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text-muted uppercase tracking-wider block">Active Status</span>
                    <span className="text-base font-bold text-emerald-400">{tower.status}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-warm-white uppercase tracking-wider">Overall Structural &amp; Civil Completion</span>
                  <span className="text-gold font-mono">{tower.progress}%</span>
                </div>
                <div className="w-full bg-navy h-3 rounded-full overflow-hidden border border-gold/20 p-0.5">
                  <div
                    className="bg-gradient-to-r from-gold to-gold-light h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${tower.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {tower.milestones.map((m, mIdx) => {
                  const isDone = m.status === 'completed';
                  const isCurrent = m.status === 'in-progress';
                  return (
                    <div
                      key={mIdx}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                          : isCurrent
                          ? 'bg-gold/10 border-gold/40 text-gold shadow-lg'
                          : 'bg-navy/40 border-white/5 text-text-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold">
                          Stage {mIdx + 1}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          isDone ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-gold text-navy' : 'bg-white/5 text-text-muted'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-warm-white">{m.name}</h4>
                      <span className="text-xs text-text-muted mt-1 block font-mono">{m.date}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold/10">
                <Link
                  href={`/${tower.slug}`}
                  className="text-xs text-gold hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Explore Floor Plans &amp; Pricing for {tower.name}</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="https://wa.me/917744009295?text=Hello%20Sovereign%20Desk,%20I%20would%20like%20to%20request%20the%20latest%20MahaRERA%20construction%20photo%20dossier."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-gold/10 text-warm-white text-xs font-bold uppercase tracking-wider border border-gold/20 hover:border-gold transition-all"
                >
                  Request Official Photo Dossier
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
