'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Compass, Waves, Trees, School, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { blurDataURLs } from '@/utils/blurData';

interface TourTab {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  image: string;
  videoDuration: string;
  description: string;
  specs: string[];
}

const tourTabs: TourTab[] = [
  {
    id: 'township-aerial',
    title: '138-Acre Township Aerial Flyover',
    category: 'Master Township',
    icon: <Compass size={16} />,
    image: '/assets/images/real-township-day.jpg',
    videoDuration: 'PT3M45S',
    description: 'High-altitude panoramic flyover showcasing the 138-acre master layout, captive substation, IT SEZ, and direct proximity to Rajiv Gandhi Infotech Park Phase 1.',
    specs: ['138 Acres Total Area', '3,000+ Resident Families', '220/22 KVA Substation', 'Walk-to-Work Proximity']
  },
  {
    id: 'golf-course',
    title: '9-Hole Executive Golf Course',
    category: 'Recreation',
    icon: <Trees size={16} />,
    image: '/assets/images/amenity-golf.png',
    videoDuration: 'PT2M30S',
    description: 'Walkthrough of Pune’s only residential 9-hole executive golf course with floodlit driving ranges, professional coaching, and lush greens.',
    specs: ['9-Hole Executive Course', 'Floodlit Driving Range', 'PGA Certified Coaching', 'Private Clubhouse']
  },
  {
    id: 'boat-club',
    title: 'Mula Riverfront Boat Club & Marina',
    category: 'Waterfront',
    icon: <Waves size={16} />,
    image: '/assets/images/amenity-boat-club.png',
    videoDuration: 'PT2M15S',
    description: 'Exclusive riverside tour of Pune’s first private residential boat club featuring kayaking, rowing docks, and waterfront dining promenades.',
    specs: ['Private River Access', 'Kayaking & Rowing Fleet', 'Riverside Promenade', 'Sunset Dining Lounge']
  },
  {
    id: 'public-school',
    title: 'Blue Ridge Public School (ICSE)',
    category: 'Education',
    icon: <School size={16} />,
    image: '/assets/images/school-modern-education.png',
    videoDuration: 'PT3M10S',
    description: 'Explore the in-campus ICSE-affiliated institution offering world-class academics, athletic grounds, and zero-commute safety for children.',
    specs: ['ICSE Affiliated', 'Pre-Primary to Grade 12', 'Full-Sized Sports Field', 'Zero-Traffic Walkway']
  },
  {
    id: 'promenade-tower',
    title: 'Promenade Residences Model Suites',
    category: 'Architecture',
    icon: <Building size={16} />,
    image: '/assets/images/promenade-facade-sunset.png',
    videoDuration: 'PT4M20S',
    description: 'Interior architectural walkthrough of luxury 2, 3, and 4 BHK river-facing residences in Hinjewadi’s tallest residential tower.',
    specs: ['Tallest Tower in Phase 1', 'MahaRERA: P52100055581', 'Monolithic MiVAN RCC', '3-Side Open Ventilation']
  }
];

export default function TownshipVirtualTour() {
  const [activeTab, setActiveTab] = useState<TourTab>(tourTabs[0]);

  // VideoObject Schema for Google Rich Video Snippets
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `${activeTab.title} - Paranjape Blue Ridge Hinjewadi`,
    "description": activeTab.description,
    "thumbnailUrl": `https://paranjapeblueridge.com${activeTab.image}`,
    "uploadDate": "2026-01-15T08:00:00+05:30",
    "duration": activeTab.videoDuration,
    "contentUrl": "https://paranjapeblueridge.com/assets/images/real-township-day.jpg",
    "embedUrl": `https://paranjapeblueridge.com/#${activeTab.id}`,
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://paranjapeblueridge.com/assets/images/blue-ridge-logo.png"
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="virtual-tour">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ultra-glass-card border border-gold/25 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="text-center mb-12">
            <span className="gilded-pill mb-3">High-Definition Visual Intelligence</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
              Township <span className="italic font-normal text-gilded">Virtual Experience</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl mx-auto leading-relaxed">
              Experience the 138-acre lifestyle, amenities, and architecture of Paranjape Blue Ridge in cinematic detail.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {tourTabs.map(tab => {
              const isActive = tab.id === activeTab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-gold via-gold-light to-gold text-navy border-gold shadow-lg shadow-gold/30 scale-105'
                      : 'bg-white/70 dark:bg-slate-900/60 hover:bg-gold/10 text-text-muted border-gold/20 hover:border-gold/40'
                  }`}
                >
                  <span className={isActive ? 'text-navy' : 'text-gold'}>{tab.icon}</span>
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Showcase Player Frame */}
          <div className="bg-gradient-to-b from-white/90 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 border border-gold/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Showcase Panel (8 cols) */}
            <div className="lg:col-span-8 relative aspect-video sm:min-h-[420px] group overflow-hidden">
              <Image
                src={activeTab.image}
                alt={`${activeTab.title} at Paranjape Blue Ridge Hinjewadi Phase 1`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL={blurDataURLs.darkNavy}
                className="object-cover transition-transform duration-1000 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-wider">
                  {activeTab.category}
                </span>
              </div>

              {/* Glowing Play Trigger Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gold/40 animate-ping"></div>
                  <a
                    href="https://wa.me/917744009295?text=Hello%20Sovereign%20Desk,%20I%20would%20like%20to%20request%20a%20private%20virtual%203D%20tour%20of%20Paranjape%20Blue%20Ridge."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-gold to-gold-light text-navy flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform group cursor-pointer"
                    aria-label="Request Live 3D Virtual Tour"
                  >
                    <Play size={28} className="ml-1 fill-current" />
                  </a>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-serif font-bold text-sm sm:text-base">{activeTab.title}</span>
                <span className="text-[9px] text-gold uppercase tracking-widest bg-black/70 px-2.5 py-1 rounded-full border border-gold/30 font-mono">
                  4K Cinematic
                </span>
              </div>
            </div>

            {/* Content Details Panel (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-gold/5 border-t lg:border-t-0 lg:border-l border-gold/20">
              <div>
                <span className="text-[10px] text-gold uppercase tracking-widest font-bold block mb-1">Interactive Feature</span>
                <h3 className="text-xl font-serif text-warm-white font-bold mb-3">{activeTab.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">{activeTab.description}</p>
                
                <div className="space-y-2.5">
                  {activeTab.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-warm-white/90">
                      <CheckCircle2 size={14} className="text-gold shrink-0" />
                      <span className="font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#enquiry"
                className="mt-8 w-full py-3.5 bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-bold rounded-2xl text-center text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2"
              >
                <span>Book Live Video Walkthrough</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
