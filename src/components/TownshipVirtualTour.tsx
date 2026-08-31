'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Eye, Compass, Waves, Trees, School, Building, CheckCircle2 } from 'lucide-react';
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
    icon: <Compass size={18} />,
    image: '/assets/images/real-township-day.jpg',
    videoDuration: 'PT3M45S',
    description: 'High-altitude panoramic flyover showcasing the 138-acre master layout, captive substation, IT SEZ, and direct proximity to Rajiv Gandhi Infotech Park Phase 1.',
    specs: ['138 Acres Total Area', '3,000+ Resident Families', '220/22 KVA Substation', 'Walk-to-Work Proximity']
  },
  {
    id: 'golf-course',
    title: '9-Hole Executive Golf Course',
    category: 'Recreation',
    icon: <Trees size={18} />,
    image: '/assets/images/amenity-golf.png',
    videoDuration: 'PT2M30S',
    description: 'Walkthrough of Pune’s only residential 9-hole executive golf course with floodlit driving ranges, professional coaching, and lush greens.',
    specs: ['9-Hole Executive Course', 'Floodlit Driving Range', 'PGA Certified Coaching', 'Private Clubhouse']
  },
  {
    id: 'boat-club',
    title: 'Mula Riverfront Boat Club & Marina',
    category: 'Waterfront',
    icon: <Waves size={18} />,
    image: '/assets/images/amenity-boat-club.png',
    videoDuration: 'PT2M15S',
    description: 'Exclusive riverside tour of Pune’s first private residential boat club featuring kayaking, rowing docks, and waterfront dining promenades.',
    specs: ['Private River Access', 'Kayaking & Rowing Fleet', 'Riverside Promenade', 'Sunset Dining Lounge']
  },
  {
    id: 'public-school',
    title: 'Blue Ridge Public School (ICSE)',
    category: 'Education',
    icon: <School size={18} />,
    image: '/assets/images/school-modern-education.png',
    videoDuration: 'PT3M10S',
    description: 'Explore the in-campus ICSE-affiliated institution offering world-class academics, athletic grounds, and zero-commute safety for children.',
    specs: ['ICSE Affiliated', 'Pre-Primary to Grade 12', 'Full-Sized Sports Field', 'Zero-Traffic Walkway']
  },
  {
    id: 'promenade-tower',
    title: 'Promenade Residences Model Suites',
    category: 'Architecture',
    icon: <Building size={18} />,
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
    <section className="py-20 bg-navy relative overflow-hidden" id="virtual-tour">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 space-y-3">
          <span className="text-gold font-bold tracking-[4px] uppercase text-xs">High-Definition Visual Intelligence</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white">
            Township <span className="italic font-normal text-gilded">Virtual Experience</span>
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            Experience the 138-acre grand lifestyle, amenities, and architecture of Paranjape Blue Ridge in cinematic detail.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tourTabs.map(tab => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-gold text-navy border-gold shadow-lg shadow-gold/20'
                    : 'bg-navy-light/60 hover:bg-gold/10 text-text-light border-gold/20 hover:border-gold/40'
                }`}
              >
                <span className={isActive ? 'text-navy' : 'text-gold'}>{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Player Frame */}
        <div className="bg-navy-light/80 border border-gold/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Showcase Panel */}
          <div className="lg:col-span-8 relative aspect-video sm:min-h-[420px] group">
            <Image
              src={activeTab.image}
              alt={`${activeTab.title} at Paranjape Blue Ridge Hinjewadi Phase 1`}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              placeholder="blur"
              blurDataURL={blurDataURLs.darkNavy}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-black/30" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-wider">
                {activeTab.category}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://wa.me/917744009295?text=Hello%20Sovereign%20Desk,%20I%20would%20like%20to%20request%20a%20private%20virtual%203D%20tour%20of%20Paranjape%20Blue%20Ridge."
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 text-navy flex items-center justify-center shadow-2xl hover:scale-110 transition-transform gold-glow group"
                aria-label="Request Live 3D Virtual Tour"
              >
                <Play size={28} className="ml-1 fill-current" />
              </a>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-warm-white">
              <span className="font-serif font-bold text-base sm:text-lg">{activeTab.title}</span>
              <span className="text-[10px] text-gold uppercase tracking-widest bg-navy/80 px-2.5 py-1 rounded border border-gold/20">
                Live 4K Drone Feed
              </span>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-navy-light/95 border-t lg:border-t-0 lg:border-l border-gold/20">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gold uppercase font-bold tracking-widest">Experience Overview</span>
                <h3 className="text-xl font-serif text-warm-white font-bold mt-1">{activeTab.title}</h3>
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                {activeTab.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Key Specifications</span>
                {activeTab.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-warm-white">
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gold/10">
              <a
                href="https://wa.me/917744009295?text=Hello%20Sovereign%20Desk,%20I%20would%20like%20to%20request%20a%20private%20virtual%203D%20tour%20of%20Paranjape%20Blue%20Ridge."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gold text-navy font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg text-center"
              >
                <Eye size={16} />
                <span>Book Guided 3D Walkthrough</span>
              </a>
              <span className="text-[10px] text-text-muted text-center block">
                Direct 1-on-1 virtual walkthrough hosted by Senior Relationship Managers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
