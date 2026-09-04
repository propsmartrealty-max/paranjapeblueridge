"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Ruler, Calendar, ShieldCheck, MapPin, Download, 
  Eye, CheckCircle2, ChevronRight, ChevronLeft, Phone, MessageCircle, Trees, 
  Waves, Sparkles, Navigation, Layers, Utensils, DoorOpen, Flame,
  Share2, ArrowRight, Compass, ShieldAlert, Award, Maximize2, ZoomIn, 
  ZoomOut, RotateCcw, X, Image as ImageIcon
} from 'lucide-react';
import { blueRidgeClusters, ClusterResidence } from '@/data/cms/clusters';
import EnquiryModal from './EnquiryModal';

interface IndependentClusterDetailProps {
  clusterSlug: string;
}

export default function IndependentClusterDetail({ clusterSlug }: IndependentClusterDetailProps) {
  // Normalize slug matching
  const cluster = blueRidgeClusters.find(c => 
    c.slug === clusterSlug || 
    c.id === clusterSlug || 
    clusterSlug.includes(c.id) ||
    clusterSlug.includes(c.slug) ||
    (c.id === 'ridges-41' && clusterSlug.includes('41')) ||
    (c.id === 'altius' && clusterSlug.includes('altius')) ||
    (c.id === 'promenade' && clusterSlug.includes('promenade'))
  ) || blueRidgeClusters[0];

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState(`${cluster.name} Floor Plan & Cost Sheet`);

  // Floor Plan Lightbox Modal State
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
  const [floorPlanZoom, setFloorPlanZoom] = useState(1);

  // Master Layout Plan Lightbox State
  const [isMasterPlanModalOpen, setIsMasterPlanModalOpen] = useState(false);
  const [masterPlanZoom, setMasterPlanZoom] = useState(1);

  // Photo Gallery Lightbox State
  const [galleryModalIndex, setGalleryModalIndex] = useState<number | null>(null);

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  const currentPlan = cluster.floorPlans[selectedPlanIndex] || cluster.floorPlans[0];

  // Handle ESC and arrow keys for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFloorPlanModalOpen(false);
        setIsMasterPlanModalOpen(false);
        setGalleryModalIndex(null);
      }
      if (galleryModalIndex !== null) {
        if (e.key === 'ArrowRight') {
          setGalleryModalIndex((galleryModalIndex + 1) % cluster.gallery.length);
        } else if (e.key === 'ArrowLeft') {
          setGalleryModalIndex((galleryModalIndex - 1 + cluster.gallery.length) % cluster.gallery.length);
        }
      }
    };

    if (isFloorPlanModalOpen || isMasterPlanModalOpen || galleryModalIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFloorPlanModalOpen, isMasterPlanModalOpen, galleryModalIndex, cluster.gallery.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white min-h-screen pt-20 pb-20">
      
      {/* Global Inquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialInterest={modalInterest}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PROJECT HERO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header id="overview" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 border-b border-slate-200 arch-section-divider bg-gradient-to-b from-[#F3F5F8] via-[#FAF9F6] to-[#FAF9F6]">
        {/* Background Project Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={cluster.heroImage}
            alt={`${cluster.name} - Paranjape Blue Ridge Hinjewadi Phase 1`}
            className="w-full h-full object-cover scale-105 opacity-25 filter saturate-115 brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-transparent to-[#FAF9F6]/95"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl text-center flex flex-col items-center">
          
          {/* Breadcrumb & Project Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-300 text-[11px] font-mono uppercase tracking-[0.2em] text-[#785415] mb-6 shadow-xs font-bold">
            <a href="/" className="hover:text-[#070D1A] no-underline">Blue Ridge</a>
            <span>/</span>
            <span className="text-[#070D1A]">{cluster.name}</span>
          </div>

          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-slate-600 mb-3 block font-extrabold">
            PARANJAPE SCHEMES PRESENTS
          </span>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.04] mb-4">
            {cluster.name}
          </h1>

          <div className="text-lg sm:text-2xl font-serif italic text-[#785415] font-bold mb-6 max-w-3xl">
            {cluster.tagline}
          </div>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans font-medium mb-8">
            {cluster.architecturalStory}
          </p>

          {/* Quick Action CTA Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md sm:max-w-none mb-10">
            <button
              onClick={() => handleOpenModal(`${cluster.name} Cost Sheet & Brochure`)}
              className="w-full sm:w-auto btn-champagne px-8 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer border-none shadow-md flex items-center justify-center gap-2"
            >
              <Download size={15} />
              <span>Download Official Cost Sheet & Plans</span>
            </button>

            <button
              onClick={() => handleOpenModal(`${cluster.name} VIP Site Visit`)}
              className="w-full sm:w-auto btn-glass-outline px-8 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <Eye size={15} className="text-[#785415]" />
              <span>Book Private Presentation</span>
            </button>

            <a
              href={`https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(cluster.name)}%20at%20Paranjape%20Blue%20Ridge%2C%20Hinjewadi.%20Please%20share%20floor%20plans%20and%20price%20list.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-sans font-bold uppercase tracking-wider no-underline flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Advisor</span>
            </a>
          </div>

          {/* In-Page Fast Section Navigation Pills (Zero Stacking / Zero Overlap) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold mr-1 hidden sm:inline">Jump to:</span>
            {[
              { id: 'overview-section', label: 'Overview' },
              { id: 'master-layout', label: 'Master Layout' },
              { id: 'floor-plans', label: 'Floor Plans' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'gallery', label: 'Visual Gallery' },
              { id: 'location', label: 'Location & Map' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-sans font-bold bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 hover:border-[#785415] hover:text-[#785415] transition-all cursor-pointer shadow-xs"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 4 Essential Real Estate Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t-2 border-slate-200 w-full max-w-4xl text-left">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Configuration</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.configurations}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Carpet Area Range</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.carpetAreaRange}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Architecture</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.towerDetails.storeys} Storeys ({cluster.towerDetails.towers})</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Offering Price</span>
              <div className="text-sm font-sans font-bold text-[#785415]">{cluster.priceStarting}</div>
            </div>
          </div>

          {/* MahaRERA Official Verification Bar */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-100 border-2 border-amber-300 text-xs font-mono text-[#54390b] font-bold">
            <ShieldCheck size={16} className="text-[#785415] shrink-0" />
            <span>MahaRERA Registration No: <strong className="font-extrabold text-[#070D1A]">{cluster.reraNumber}</strong></span>
            <span className="text-amber-400">|</span>
            <span>Possession: <strong className="font-extrabold text-[#070D1A]">{cluster.possessionTimeline}</strong></span>
          </div>

        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. PROJECT OVERVIEW & ARCHITECTURAL PILLARS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="overview-section" className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>01 • Project Architectural Overview</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
              Crafted with precision. <br />
              <span className="italic font-bold text-[#785415]">Engineered for distinction.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7">
              <div 
                className="rounded-3xl overflow-hidden bg-white p-3 border-2 border-slate-200 shadow-md cursor-pointer group/facade relative"
                onClick={() => setGalleryModalIndex(1)}
              >
                <img
                  src={cluster.gallery[1] || cluster.heroImage}
                  alt={`${cluster.name} Architectural Facade`}
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl transition-transform duration-700 group-hover/facade:scale-[1.02]"
                />
                <div className="absolute inset-3 bg-black/20 opacity-0 group-hover/facade:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <span className="bg-white text-[#070D1A] px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-lg border border-slate-300">
                    <Maximize2 size={14} className="text-[#785415]" /> View High-Res Photo
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {cluster.conceptPoints.map((pt, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-[#785415] flex items-center justify-center font-mono text-xs font-extrabold">
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#070D1A]">{pt.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
                    {pt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. MASTER LAYOUT & PRECINCT LOCATION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="master-layout" className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="chapter-badge mb-3">
                <span>02 • Master Layout & Orientation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
                Position Within the <br />
                <span className="italic font-bold text-[#785415]">138-Acre Masterplan.</span>
              </h2>
            </div>
            <div className="px-4 py-2 rounded-full bg-slate-100 border-2 border-slate-300 text-xs font-mono text-slate-900 font-bold">
              Precinct: {cluster.masterplanPosition.zone}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div 
                className="rounded-3xl overflow-hidden bg-slate-50 p-4 border-2 border-slate-200 shadow-md cursor-pointer group/masterplan relative"
                onClick={() => {
                  setMasterPlanZoom(1);
                  setIsMasterPlanModalOpen(true);
                }}
              >
                <img
                  src="/assets/images/master-layout-plan-hq.jpg"
                  alt={`Master Layout Plan showing ${cluster.name} in Paranjape Blue Ridge`}
                  className="w-full h-auto max-h-[480px] object-contain rounded-2xl mx-auto transition-transform duration-500 group-hover/masterplan:scale-[1.01]"
                />
                <div className="p-3 text-center text-xs font-mono text-slate-600 border-t border-slate-200 mt-2 flex items-center justify-between">
                  <span className="font-semibold">* Official Paranjape Blue Ridge 138-Acre Master Layout Plan</span>
                  <span className="text-[#785415] font-bold flex items-center gap-1 group-hover/masterplan:underline">
                    <Maximize2 size={13} /> Click to Enlarge Blueprint
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#070D1A]">Immediate Precinct Connections</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 font-sans">
                  {cluster.masterplanPosition.nearbyKeyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Navigation size={16} className="text-[#785415] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-semibold">{kp}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <Building2 size={16} className="text-[#785415] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-semibold">Blue Ridge IT SEZ (3M+ Sq. Ft.) — 0 Min Commute</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Compass size={16} className="text-[#785415] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-semibold">Upcoming Metro Line 3 Station — 800 Meters</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleOpenModal(`Request Masterplan Blueprint for ${cluster.name}`)}
                  className="w-full py-3.5 rounded-xl btn-champagne text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-sm mt-4"
                >
                  Download Master Layout Plan PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. INTERACTIVE 2D FLOOR PLANS & UNIT SCHEMATICS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="floor-plans" className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="chapter-badge mb-3">
                <span>03 • Architectural Floor Plans</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
                Authentic 2D Layouts & <br />
                <span className="italic font-bold text-[#785415]">Dimensional Blueprints.</span>
              </h2>
            </div>

            {/* Plan Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {cluster.floorPlans.map((fp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPlanIndex(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 cursor-pointer ${
                    selectedPlanIndex === idx
                      ? 'bg-[#070D1A] text-white border-[#070D1A] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-[#785415]'
                  }`}
                >
                  {fp.configTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Active Floor Plan Showcase Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Plan Blueprint Canvas with Click to Enlarge */}
              <div 
                className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 flex items-center justify-center min-h-[380px] cursor-pointer group/blueprint relative"
                onClick={() => {
                  setFloorPlanZoom(1);
                  setIsFloorPlanModalOpen(true);
                }}
              >
                <img
                  src={currentPlan.planImage2D}
                  alt={`${cluster.name} - ${currentPlan.configTitle}`}
                  className="max-h-[420px] w-auto max-w-full object-contain transition-transform duration-500 group-hover/blueprint:scale-[1.02]"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/blueprint:opacity-100 transition-opacity flex items-center justify-center rounded-2xl pointer-events-none">
                  <div className="bg-white text-[#070D1A] px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-xl border-2 border-slate-300">
                    <Maximize2 size={14} className="text-[#785415]" /> Click to Inspect & Zoom Blueprint
                  </div>
                </div>
              </div>

              {/* Plan Specifications & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#785415] uppercase tracking-widest block font-bold">
                    Official Architectural Blueprint
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#070D1A] mt-1">
                    {currentPlan.configTitle}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-xs font-sans py-1 border-b border-slate-200">
                    <span className="text-slate-600 font-bold">RERA Carpet Area:</span>
                    <strong className="text-sm font-mono text-[#070D1A] font-extrabold">{currentPlan.carpetArea}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans py-1 border-b border-slate-200">
                    <span className="text-slate-600 font-bold">Spatial Dimensions:</span>
                    <strong className="text-xs font-mono text-[#070D1A] font-extrabold">{currentPlan.dimensions}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans py-1">
                    <span className="text-slate-600 font-bold">Bedrooms / Baths:</span>
                    <strong className="text-xs font-mono text-[#785415] font-extrabold">{currentPlan.bhkNumber} BHK Suites</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  Featuring a 3-side open layout, volumetric living spans, private balconies, and dedicated utility corridors engineered under Paranjape Schemes hallmark design principles.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleOpenModal(`Floor Plan Download: ${currentPlan.configTitle} (${cluster.name})`)}
                    className="flex-1 btn-champagne py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>Download CAD PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setFloorPlanZoom(1);
                      setIsFloorPlanModalOpen(true);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#070D1A] border-2 border-slate-300 hover:border-[#785415] text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 size={14} className="text-[#785415]" />
                    <span>Zoom Blueprint</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Real Estate Inventory Status Table */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-bold text-[#070D1A]">Verified Inventory & Price Matrix</h3>
              <span className="text-xs font-mono text-[#785415] font-extrabold">MahaRERA: {cluster.reraNumber}</span>
            </div>

            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b-2 border-slate-300 text-[11px] font-mono uppercase tracking-wider text-slate-700 bg-slate-50">
                  <th className="py-3 px-3">Unit Configuration</th>
                  <th className="py-3 px-3">Carpet Area</th>
                  <th className="py-3 px-3">Floor Range</th>
                  <th className="py-3 px-3">View & Orientation</th>
                  <th className="py-3 px-3">Starting Price</th>
                  <th className="py-3 px-3 text-right">Inventory Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {cluster.inventoryPreview.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-3 font-bold text-[#070D1A] text-sm">{item.type}</td>
                    <td className="py-4 px-3 font-mono text-slate-800 font-bold">{item.carpetArea}</td>
                    <td className="py-4 px-3 text-slate-700 font-medium">{item.floorRange}</td>
                    <td className="py-4 px-3 text-slate-700 font-medium">{item.viewOrientation}</td>
                    <td className="py-4 px-3 font-mono text-[#785415] font-extrabold text-sm">{item.pricingStatus}</td>
                    <td className="py-4 px-3 text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-100 border border-amber-300 text-[#54390b] font-extrabold">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. DUAL-TIER AMENITIES (HIGH CONTRAST & CLEAR VISIBILITY)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="amenities" className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>04 • Dual-Tier Lifestyle Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
              Exclusive Cluster Privileges vs. <br />
              <span className="italic font-bold text-[#785415]">138-Acre Master Township.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Cluster Dedicated Amenities Card */}
            <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 text-[#785415] font-mono text-xs uppercase tracking-widest border-b-2 border-amber-200 pb-4 font-bold">
                <Sparkles size={18} className="text-[#785415]" />
                <span>Exclusive to {cluster.name} Residents</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#070D1A] font-sans">
                {cluster.clusterAmenities.map((am, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#785415] shrink-0"></span>
                    <span className="font-semibold text-sm text-[#070D1A]">{am}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-mono text-slate-600 pt-3 border-t border-slate-200 font-medium">
                * Private RFID keycard and biometric access for residents only.
              </div>
            </div>

            {/* 138-Acre Township Master Amenities Card */}
            <div className="bg-white p-8 rounded-3xl border-2 border-slate-300 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 text-[#070D1A] font-mono text-xs uppercase tracking-widest border-b-2 border-slate-200 pb-4 font-bold">
                <Trees size={18} className="text-emerald-700" />
                <span>138-Acre Blue Ridge Master Township Facilities</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#070D1A] font-sans">
                {cluster.townshipAmenities.map((am, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span className="font-semibold text-sm text-[#070D1A]">{am}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-mono text-slate-600 pt-3 border-t border-slate-200 font-medium">
                * Fully operational integrated township infrastructure in Hinjewadi Phase 1.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. DETAILED TECHNICAL & ARCHITECTURAL SPECIFICATIONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="specifications" className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>05 • Materiality & Engineering Standards</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
              Scraped Official Specifications for <br />
              <span className="italic font-bold text-[#785415]">{cluster.name}.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cluster.specifications.map((spec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
                <div className="pb-3 border-b-2 border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#070D1A]">{spec.category}</h3>
                  <span className="text-[11px] font-mono text-[#785415] font-extrabold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    0{idx + 1}
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-sans">
                  {spec.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-[#785415] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Formwork Assurance Banner */}
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Award size={32} className="text-[#785415] shrink-0" />
              <div>
                <div className="text-base font-serif font-bold text-[#070D1A]">
                  Structure: {cluster.towerDetails.structureType}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium">
                  Earthquake resistant RCC framework engineered for maximum durability and thermal efficiency.
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal(`Technical Spec Sheet for ${cluster.name}`)}
              className="btn-champagne px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-sm whitespace-nowrap"
            >
              Request Full Spec PDF
            </button>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. OFFICIAL ARCHITECTURAL PHOTO GALLERY & VISUAL WALKTHROUGH
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="gallery" className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="chapter-badge mb-3">
                <ImageIcon size={11} className="text-[#785415]" />
                <span>06 • Authentic Architectural Visuals</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
                A Visual Odyssey of <br />
                <span className="italic font-bold text-[#785415]">{cluster.name}.</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-700 font-medium">
                Official architecture, grand canopies, panoramic views, and lifestyle amenities photographed and curated for {cluster.name}.
              </p>
            </div>

            <span className="text-xs font-mono text-[#785415] font-extrabold bg-amber-50 px-3 py-1.5 rounded-full border-2 border-amber-200">
              {cluster.gallery.length} Official Photographs
            </span>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cluster.gallery.map((imgSrc, idx) => (
              <div
                key={idx}
                onClick={() => setGalleryModalIndex(idx)}
                className={`relative rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-sm cursor-pointer group/photo ${
                  idx === 0 ? 'col-span-2 row-span-2 min-h-[320px]' : 'h-48'
                }`}
              >
                <img
                  src={imgSrc}
                  alt={`${cluster.name} - Official Photograph ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white">
                    <span className="text-xs font-mono uppercase tracking-widest font-extrabold">
                      Photo 0{idx + 1}
                    </span>
                    <Maximize2 size={16} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. GOOGLE MAPS LOCATION & TRANSIT PROXIMITY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="location" className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>07 • Location & Strategic Connectivity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold leading-tight">
              Direct Connectivity to <br />
              <span className="italic font-bold text-[#785415]">Rajiv Gandhi Infotech Park & Metro Line 3.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Google Maps Embed */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-slate-300 shadow-md h-80 sm:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9324673824555!2d73.73468507612711!3d18.57708576744837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc655555555%3A0xcab5d8a0f9f300b!2sBlue%20Ridge%20Township!5e0!3m2!1sen!2sin!4v1709825400000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${cluster.name} Location Map in Hinjewadi Phase 1`}
              ></iframe>
            </div>

            {/* Commute Distances Matrix */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-[#785415]" />
                  <span className="text-xs font-bold text-[#070D1A]">Blue Ridge IT SEZ</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-emerald-700">0 Minutes (On-Campus)</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-[#785415]" />
                  <span className="text-xs font-bold text-[#070D1A]">Infosys / Wipro / TCS Gate</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#070D1A]">400m - 900m (5-8 Mins)</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#785415]" />
                  <span className="text-xs font-bold text-[#070D1A]">Hinjewadi Metro Line 3</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#070D1A]">800 Meters (3 Mins)</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#785415]" />
                  <span className="text-xs font-bold text-[#070D1A]">Baner & Balewadi High Street</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#070D1A]">10 Mins (Via New Bridge)</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#785415]" />
                  <span className="text-xs font-bold text-[#070D1A]">Mumbai-Pune Expressway</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-[#070D1A]">3.5 KM (5 Mins)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. PRIVATE VIP CONCIERGE & BOOKING DOCK
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-gradient-to-b from-[#FAF9F6] to-[#F3F5F8]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <div className="chapter-badge mb-4 mx-auto">
            <Sparkles size={11} className="text-[#785415]" />
            <span>Private Advisory Desk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-bold mb-4">
            Schedule a Private Tour of <br />
            <span className="italic font-bold text-[#785415]">{cluster.name}.</span>
          </h2>

          <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans font-medium">
            Our specialized residential advisory desk will arrange customized floor-wise cost sheets, sample residence walkthroughs, and verified RERA paperwork.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => handleOpenModal(`VIP Inspection: ${cluster.name}`)}
              className="btn-champagne px-10 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-wider cursor-pointer border-none shadow-md"
            >
              Request Site Visit Slot
            </button>

            <a
              href="tel:+917744009295"
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#070D1A] border-2 border-slate-300 hover:border-[#785415] text-xs font-sans font-bold uppercase tracking-wider no-underline flex items-center gap-2 transition-all"
            >
              <Phone size={14} className="text-[#785415]" />
              <span>Call +91 7744009295</span>
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 1: FLOOR PLAN ZOOM LIGHTBOX
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isFloorPlanModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/20 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFC28D] font-bold">Blueprint Inspection</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white truncate max-w-xs sm:max-w-md">
                  {currentPlan.configTitle}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B88E3E]/30 text-[#DFC28D] text-xs font-mono font-bold border border-[#B88E3E]/40">
                  {currentPlan.carpetArea}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/15 rounded-xl p-1 border border-white/20">
                  <button
                    onClick={() => setFloorPlanZoom(prev => Math.max(0.75, prev - 0.25))}
                    aria-label="Zoom Out"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-white">{Math.round(floorPlanZoom * 100)}%</span>
                  <button
                    onClick={() => setFloorPlanZoom(prev => Math.min(2.5, prev + 0.25))}
                    aria-label="Zoom In"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setFloorPlanZoom(1)}
                    aria-label="Reset Zoom"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer ml-1"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsFloorPlanModalOpen(false);
                    handleOpenModal(`Download CAD: ${currentPlan.configTitle} (${cluster.name})`);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B88E3E] text-slate-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer border-none"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={() => setIsFloorPlanModalOpen(false)}
                  aria-label="Close Lightbox"
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer ml-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 cursor-grab active:cursor-grabbing">
              <div 
                className="transition-transform duration-200 ease-out bg-white p-4 sm:p-8 rounded-2xl shadow-2xl max-w-full max-h-full flex items-center justify-center"
                style={{ transform: `scale(${floorPlanZoom})` }}
              >
                <img
                  src={currentPlan.planImage2D}
                  alt={`${currentPlan.configTitle} Blueprint`}
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 2: MASTER LAYOUT PLAN LIGHTBOX
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isMasterPlanModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/20 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFC28D] font-bold">138-Acre Master Blueprint</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white">Paranjape Blue Ridge Master Layout</h4>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/15 rounded-xl p-1 border border-white/20">
                  <button
                    onClick={() => setMasterPlanZoom(prev => Math.max(0.75, prev - 0.25))}
                    aria-label="Zoom Out"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-white">{Math.round(masterPlanZoom * 100)}%</span>
                  <button
                    onClick={() => setMasterPlanZoom(prev => Math.min(2.5, prev + 0.25))}
                    aria-label="Zoom In"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setMasterPlanZoom(1)}
                    aria-label="Reset Zoom"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-all cursor-pointer ml-1"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <button
                  onClick={() => setIsMasterPlanModalOpen(false)}
                  aria-label="Close Lightbox"
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer ml-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 cursor-grab active:cursor-grabbing">
              <div 
                className="transition-transform duration-200 ease-out bg-black p-2 rounded-2xl shadow-2xl max-w-full max-h-full flex items-center justify-center"
                style={{ transform: `scale(${masterPlanZoom})` }}
              >
                <img
                  src="/assets/images/master-layout-plan-hq.jpg"
                  alt="Official Paranjape Blue Ridge 138-Acre Master Layout Plan"
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 3: FULL-SCREEN PHOTO GALLERY LIGHTBOX
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {galleryModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 select-none"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/20 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFC28D] font-bold">{cluster.name}</span>
                <span className="text-white/30">|</span>
                <span className="text-xs font-mono text-white/90 font-bold">
                  {galleryModalIndex + 1} / {cluster.gallery.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGalleryModalIndex(null)}
                  aria-label="Close Photo Lightbox"
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-2 sm:p-8">
              {/* Previous Photo Button */}
              <button
                onClick={() => setGalleryModalIndex((galleryModalIndex - 1 + cluster.gallery.length) % cluster.gallery.length)}
                aria-label="Previous Photo"
                className="absolute left-2 sm:left-8 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer z-10"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Active Image */}
              <img
                src={cluster.gallery[galleryModalIndex]}
                alt={`${cluster.name} - Photo ${galleryModalIndex + 1}`}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Next Photo Button */}
              <button
                onClick={() => setGalleryModalIndex((galleryModalIndex + 1) % cluster.gallery.length)}
                aria-label="Next Photo"
                className="absolute right-2 sm:right-8 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/20 overflow-x-auto max-w-4xl mx-auto w-full">
              {cluster.gallery.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setGalleryModalIndex(tIdx)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    galleryModalIndex === tIdx ? 'border-[#DFC28D] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
