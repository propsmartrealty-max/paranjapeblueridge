'use client';

import React, { useState } from 'react';
import { Play, Eye, Compass, Waves, Trees, School, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface TourTab {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  image: string;
  videoDuration: string;
  youtubeId?: string;
  description: string;
  specs: string[];
}

const tourTabs: TourTab[] = [
  {
    id: 'township-aerial',
    title: '138-Acre Township Aerial Flyover',
    category: 'Master Township',
    icon: <Compass size={16} />,
    image: '/assets/images/pscl-blue-ridge-aerial-drone.webp',
    videoDuration: '3m 45s',
    youtubeId: '_VlWDJunSW8',
    description: 'High-altitude panoramic flyover showcasing the 138-acre master layout, captive 220 KVA substation, IT SEZ, and riverfront along Rajiv Gandhi Infotech Park Phase 1.',
    specs: ['138 Acres Total Area', '3,500+ Resident Families', '220/22 KVA Substation', 'Walk-to-Work Proximity']
  },
  {
    id: 'golf-course',
    title: '9-Hole Executive Golf Course',
    category: 'Recreation',
    icon: <Trees size={16} />,
    image: '/assets/images/pscl-blue-ridge-golf.webp',
    videoDuration: '2m 30s',
    youtubeId: '_VlWDJunSW8',
    description: 'Walkthrough of Pune’s premier residential 9-hole executive golf course with floodlit driving ranges, putting greens, and fairway-facing residences.',
    specs: ['9-Hole Executive Course', 'Floodlit Driving Range', 'PGA Certified Coaching', 'Private Clubhouse']
  },
  {
    id: 'boat-club',
    title: 'Mula Riverfront Boat Club & Marina',
    category: 'Waterfront',
    icon: <Waves size={16} />,
    image: '/assets/images/amenity-boat-club.png',
    videoDuration: '2m 15s',
    youtubeId: '_VlWDJunSW8',
    description: 'Exclusive riverside tour of Pune’s private residential boat club featuring kayaking, rowing docks, and waterfront sunset dining promenades.',
    specs: ['Private River Access', 'Kayaking & Rowing Fleet', 'Riverside Promenade', 'Sunset Dining Lounge']
  },
  {
    id: 'public-school',
    title: 'Blue Ridge Public School (ICSE)',
    category: 'Education',
    icon: <School size={16} />,
    image: '/assets/images/school-modern-education.png',
    videoDuration: '3m 10s',
    youtubeId: '_VlWDJunSW8',
    description: 'Explore the in-campus ICSE institution offering world-class academics, athletic grounds, and zero-commute safety for children.',
    specs: ['ICSE Affiliated', 'Pre-Primary to Grade 12', 'Full-Sized Sports Field', 'Zero-Traffic Walkway']
  },
  {
    id: 'promenade-tower',
    title: 'Promenade Residences Model Suites',
    category: 'Architecture',
    icon: <Building2 size={16} />,
    image: '/assets/images/promenade-hero.png',
    videoDuration: '4m 20s',
    youtubeId: '_VlWDJunSW8',
    description: 'Interior architectural walkthrough of luxury 3 and 4 BHK river-facing residences in Hinjewadi’s tallest 41-storey residential tower.',
    specs: ['41-Storey Iconic Towers', 'MahaRERA: P52100055581', 'Monolithic MiVAN RCC', '3-Side Open Ventilation']
  }
];

export default function TownshipVirtualTour() {
  const [activeTab, setActiveTab] = useState<TourTab>(tourTabs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTabChange = (tab: TourTab) => {
    setActiveTab(tab);
    setIsPlaying(false);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200 arch-section-divider relative" id="virtual-tour">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="chapter-badge mb-4 mx-auto">
            <Play size={11} className="text-[#785415]" />
            <span>Cinematic Experience Center</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] leading-tight">
            4K Cinematic Drone Tour of <br />
            <span className="italic font-light text-gradient-champagne">Paranjape Blue Ridge.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-sans font-medium mt-3">
            Fly over 138 masterplanned acres, from the championship golf fairways and river marina to high-rise model residences.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {tourTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab.id === tab.id
                  ? 'bg-[#785415] text-white border-[#785415] shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:text-[#070D1A] border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Video Canvas Container */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-300 shadow-2xl relative">
          <div className="relative aspect-video w-full max-h-[620px] flex items-center justify-center overflow-hidden">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeTab.youtubeId || '_VlWDJunSW8'}?autoplay=1&rel=0&modestbranding=1`}
                title={activeTab.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <>
                <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className="w-full h-full object-cover opacity-85 hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play 4K Cinematic Video Tour"
                  className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 hover:bg-white text-[#785415] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-110 transition-all cursor-pointer group"
                >
                  <Play size={32} className="ml-1 fill-[#785415] group-hover:scale-110 transition-transform" />
                </button>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold">
                  {activeTab.videoDuration} • 4K UHD
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 sm:p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
                      {activeTab.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                      {activeTab.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-slate-300">
                    {activeTab.specs.map((spec, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
