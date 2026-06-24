import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/master-data';
import { MapPin, Shield, CheckCircle2 } from 'lucide-react';
import PrintButton from '@/components/PrintButton';
import { Metadata } from 'next';
import Image from 'next/image';

const SITE_URL = 'https://www.paranjapeblueridge.com';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return {};

  const title = `Download Brochure: ${project.name} Hinjewadi | Floor Plans & Pricing`;
  const description = `Get the official brochure for ${project.name} at Paranjape Blue Ridge. Includes high-res floor plans, detailed specifications, and current price list: ${project.price}.`;
  const canonical = `${SITE_URL}/brochure/${params.slug}`;
  const dynamicOgUrl = `${SITE_URL}/api/og?title=Official+Brochure%3A+${encodeURIComponent(project.name)}&price=${encodeURIComponent(project.price)}&config=Floor+Plans+%26+Blueprints`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
      type: 'website',
      images: [{ url: dynamicOgUrl, width: 1200, height: 630, alt: `Brochure for ${project.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ParanjapeSchemes',
      title,
      description,
      images: [dynamicOgUrl],
    }
  };
}

export default function CustomBrochure({ params }: PageProps) {
  const { slug } = params;
  const project = projects.find(p => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white text-navy p-0 md:p-12 print:p-0">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl border border-navy/5 overflow-hidden print:shadow-none print:border-none">
        
        {/* PRINT CONTROLS (HIDDEN ON PRINT) */}
        <div className="bg-navy p-6 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-navy font-bold">BR</div>
                <span className="text-white font-serif italic">Sovereign Brochure Generator</span>
            </div>
            <div className="flex gap-4">
                <PrintButton />
            </div>
        </div>

        {/* BROCHURE CONTENT */}
        <div className="p-12 md:p-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                <div className="flex-1">
                    <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-6">
                        <Shield size={14} />
                        Official Sovereign Document
                    </div>
                    <h1 className="text-7xl font-serif text-navy mb-6">{project.name}</h1>
                    <p className="text-2xl text-navy/60 font-serif italic mb-8">{project.tagline}</p>
                    <div className="flex items-center gap-4 text-navy/40 text-sm">
                        <MapPin size={16} />
                        Blue Ridge, Phase 1, Hinjewadi, Pune - 411057
                    </div>
                </div>
                <div className="w-full md:w-64">
                    <Image src="/assets/images/blue-ridge-logo.png" width={200} height={80} className="w-full h-auto opacity-20" alt="Paranjape Blue Ridge Logo" />
                </div>
            </div>

            {/* Main Visual */}
            <div className="aspect-video bg-navy-light rounded-3xl overflow-hidden mb-20 relative">
                <Image 
                    src={project.id === 'promenade' ? '/assets/images/sky-lounge.png' : 
                         project.id === 'altius' ? '/assets/images/altius-riverside.png' : 
                         '/assets/images/ridges-41.png'} 
                    fill
                    sizes="100vw"
                    className="object-cover" 
                    alt={`Brochure cover image for Paranjape Blue Ridge ${project.name} - Luxury residences in Hinjewadi Phase 1`} 
                />
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-navy/5">
                    <div className="text-[8px] text-navy/50 uppercase tracking-widest mb-1">Starting Price</div>
                    <div className="text-3xl font-serif text-navy">{project.price}*</div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
                <div>
                    <h3 className="text-2xl font-serif text-navy mb-10 border-b-2 border-gold pb-4 inline-block">Technical Tectonics</h3>
                    <div className="space-y-6">
                        {project.specs.slice(0, 3).map((spec, i) => (
                            <div key={i}>
                                <h4 className="text-[10px] font-bold text-navy/40 uppercase tracking-[3px] mb-3">{spec.title}</h4>
                                <ul className="grid grid-cols-1 gap-2">
                                    {spec.items.slice(0, 3).map((item, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-navy/70">
                                            <CheckCircle2 size={14} className="text-gold" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-navy p-12 rounded-[3rem] text-white">
                    <h3 className="text-2xl font-serif text-gold mb-8 italic">Configuration</h3>
                    <div className="space-y-8">
                        <div>
                            <span className="block text-[8px] text-white/40 uppercase tracking-widest mb-2">Carpet Area</span>
                            <span className="text-3xl font-serif text-white">{project.carpetArea}</span>
                        </div>
                        <div>
                            <span className="block text-[8px] text-white/40 uppercase tracking-widest mb-2">Possession Status</span>
                            <span className="text-3xl font-serif text-white">{project.possession}</span>
                        </div>
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-xs text-white/60 leading-relaxed">
                                This document is a personalized architectural summary for {project.name}. 
                                All details are subject to MahaRERA guidelines. Visit our site office for a physical tour.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Legal */}
            <div className="border-t border-navy/10 pt-12 flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                    <Image src="/assets/images/paranjape-logo.svg" width={200} height={24} className="h-6 w-auto mb-6 opacity-30" alt="Paranjape Schemes Construction Ltd. New Logo" />
                    <p className="text-[10px] text-navy/40 max-w-sm">MahaRERA: {project.id === 'promenade' ? 'P52100055581' : project.id === 'altius' ? 'P52100078116' : 'P52100000054'}</p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
