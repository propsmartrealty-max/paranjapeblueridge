'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Compass, Waves, Trees, School, Building, CheckCircle2, ArrowRight } from 'lucide-react';

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
    videoDuration: '3m 45s',
    description: 'High-altitude panoramic flyover showcasing the 138-acre master layout, captive substation, IT SEZ, and direct proximity to Rajiv Gandhi Infotech Park Phase 1.',
    specs: ['138 Acres Total Area', '3,500+ Resident Families', '220/22 KVA Substation', 'Walk-to-Work Proximity']
  },
  {
    id: 'golf-course',
    title: '9-Hole Executive Golf Course',
    category: 'Recreation',
    icon: <Trees size={16} />,
    image: '/assets/images/amenity-golf.png',
    videoDuration: '2m 30s',
    description: 'Walkthrough of Pune’s only residential 9-hole executive golf course with floodlit driving ranges, professional coaching, and lush greens.',
    specs: ['9-Hole Executive Course', 'Floodlit Driving Range', 'PGA Certified Coaching', 'Private Clubhouse']
  },
  {
    id: 'boat-club',
    title: 'Mula Riverfront Boat Club & Marina',
    category: 'Waterfront',
    icon: <Waves size={16} />,
    image: '/assets/images/amenity-boat-club.png',
    videoDuration: '2m 15s',
    description: 'Exclusive riverside tour of Pune’s first private residential boat club featuring kayaking, rowing docks, and waterfront dining promenades.',
    specs: ['Private River Access', 'Kayaking & Rowing Fleet', 'Riverside Promenade', 'Sunset Dining Lounge']
  },
  {
    id: 'public-school',
    title: 'Blue Ridge Public School (ICSE)',
    category: 'Education',
    icon: <School size={16} />,
    image: '/assets/images/school-modern-education.png',
    videoDuration: '3m 10s',
    description: 'Explore the in-campus ICSE-affiliated institution offering world-class academics, athletic grounds, and zero-commute safety for children.',
    specs: ['ICSE Affiliated', 'Pre-Primary to Grade 12', 'Full-Sized Sports Field', 'Zero-Traffic Walkway']
  },
  {
    id: 'promenade-tower',
    title: 'Promenade Residences Model Suites',
    category: 'Architecture',
    icon: <Building size={16} />,
    image: '/assets/images/promenade-hero.png',
    videoDuration: '4m 20s',
    description: 'Interior architectural walkthrough of luxury 2, 3, and 4 BHK river-facing residences in Hinjewadi’s tallest residential tower.',
    specs: ['Tallest Tower in Phase 1', 'MahaRERA: P52100055581', 'Monolithic MiVAN RCC', '3-Side Open Ventilation']
  }
];

export default function TownshipVirtualTour() {
  const [activeTab, setActiveTab] = useState<TourTab>(tourTabs[0]);

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden" id="virtual-tour">
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold text-gold uppercase tracking-[4px] px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 inline-block mb-3">
          Virtual Experience Center
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
          4K Cinematic <span className="text-gilded">Township Tour</span>
        </h2>
        <p className="text-sm text-text-muted mt-3 max-w-xl mx-auto font-sans">
          Explore the 138-acre riverfront ecosystem from drone flyovers to interior model suites.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
        {tourTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
              activeTab.id === tab.id
                ? 'bg-gold text-navy border-gold shadow-lg font-extrabold'
                : 'bg-navy/80 text-text-muted hover:text-warm-white border-white/10 hover:border-gold/30'
            }`}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Main Tour Showcase Card */}
      <div className="ultra-glass-card rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Video Preview Frame */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl border border-gold/30 group">
            <img 
              src={activeTab.image} 
              alt={activeTab.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Play Button Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://wa.me/917744009295?text=Hello%2C%20please%20send%20me%20the%204K%20Virtual%20Tour%20video%20for%20Blue%20Ridge%20Township."
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-gold hover:bg-gold-light text-navy flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all cursor-pointer border-none no-underline"
                aria-label={`Watch ${activeTab.title}`}
              >
                <Play size={24} className="fill-navy translate-x-0.5" />
              </a>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-warm-white font-mono">
              <span className="bg-black/70 px-3 py-1 rounded-full border border-white/20">{activeTab.category}</span>
              <span className="bg-black/70 px-3 py-1 rounded-full border border-white/20">Duration: {activeTab.videoDuration}</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                {activeTab.category} Walkthrough
              </span>
              <h3 className="text-2xl font-serif text-warm-white font-bold mt-1">
                {activeTab.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              {activeTab.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-widest block">
                Key Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTab.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-warm-white bg-navy/60 p-2 rounded-xl border border-white/10">
                    <CheckCircle2 size={13} className="text-gold shrink-0" />
                    <span className="font-mono">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20">
              <a
                href="https://wa.me/917744009295?text=Hello%2C%20I%20want%20to%20request%20the%20full%204K%20Drone%20Walkthrough."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy py-3.5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:opacity-95 transition-all no-underline shadow-lg"
              >
                <span>Request HD Video on WhatsApp</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
