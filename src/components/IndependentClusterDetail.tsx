"use client";

import React, { useState } from 'react';
import { 
  Building2, Ruler, Calendar, ShieldCheck, MapPin, Download, 
  Eye, CheckCircle2, ChevronRight, Phone, MessageCircle, Trees, 
  Waves, Sparkles, Navigation, Layers, Utensils, DoorOpen, Flame,
  Share2, ArrowRight, Compass, ShieldAlert, Award
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

  const [activeTab, setActiveTab] = useState<'floorPlans' | 'specs' | 'amenities' | 'masterplan'>('floorPlans');
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState(`${cluster.name} Floor Plan & Cost Sheet`);

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  const currentPlan = cluster.floorPlans[selectedPlanIndex] || cluster.floorPlans[0];

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white min-h-screen pt-24 pb-20">
      
      {/* Global Inquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialInterest={modalInterest}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PROJECT HERO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 border-b border-slate-200 arch-section-divider bg-gradient-to-b from-[#F3F5F8] via-[#FAF9F6] to-[#FAF9F6]">
        {/* Background Project Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={cluster.heroImage}
            alt={`${cluster.name} - Paranjape Blue Ridge Hinjewadi Phase 1`}
            className="w-full h-full object-cover scale-105 opacity-30 filter saturate-115 brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/90 via-transparent to-[#FAF9F6]/90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl text-center flex flex-col items-center">
          
          {/* Breadcrumb & Project Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8F6A24] mb-6 shadow-sm">
            <a href="/" className="hover:text-[#070D1A] no-underline">Blue Ridge</a>
            <span>/</span>
            <span className="font-bold text-[#070D1A]">{cluster.name}</span>
          </div>

          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-slate-500 mb-3 block font-bold">
            PARANJAPE SCHEMES PRESENTS
          </span>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-normal text-[#070D1A] tracking-tight leading-[1.04] mb-4">
            {cluster.name}
          </h1>

          <div className="text-lg sm:text-2xl font-serif italic text-gradient-champagne font-light mb-6 max-w-3xl">
            {cluster.tagline}
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans mb-8">
            {cluster.architecturalStory}
          </p>

          {/* Quick Action CTA Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md sm:max-w-none mb-12">
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
              <Eye size={15} className="text-[#B88E3E]" />
              <span>Book Private Presentation</span>
            </button>

            <a
              href={`https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(cluster.name)}%20at%20Paranjape%20Blue%20Ridge%2C%20Hinjewadi.%20Please%20share%20floor%20plans%20and%20price%20list.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-sans font-bold uppercase tracking-wider no-underline flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Advisor</span>
            </a>
          </div>

          {/* 4 Essential Real Estate Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-200 w-full max-w-4xl text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Configuration</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.configurations}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Carpet Area Range</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.carpetAreaRange}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Architecture</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">{cluster.towerDetails.storeys} Storeys ({cluster.towerDetails.towers})</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Offering Price</span>
              <div className="text-sm font-sans font-bold text-[#B88E3E]">{cluster.priceStarting}</div>
            </div>
          </div>

          {/* MahaRERA Official Verification Bar */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-mono text-[#8F6A24]">
            <ShieldCheck size={16} className="text-[#B88E3E] shrink-0" />
            <span>MahaRERA Registration No: <strong className="font-bold text-[#070D1A]">{cluster.reraNumber}</strong></span>
            <span className="text-slate-400">|</span>
            <span>Possession: <strong className="font-bold text-[#070D1A]">{cluster.possessionTimeline}</strong></span>
          </div>

        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. PROJECT OVERVIEW & ARCHITECTURAL PILLARS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>01 • Project Architectural Overview</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
              Crafted with precision. <br />
              <span className="italic font-light text-gradient-champagne">Engineered for distinction.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-md">
                <img
                  src={cluster.gallery[1] || cluster.heroImage}
                  alt={`${cluster.name} Architectural Facade`}
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {cluster.conceptPoints.map((pt, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 text-[#B88E3E] flex items-center justify-center font-mono text-xs font-bold">
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#070D1A]">{pt.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
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
      <section className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="chapter-badge mb-3">
                <span>02 • Master Layout & Orientation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
                Position Within the <br />
                <span className="italic font-light text-gradient-champagne">138-Acre Masterplan.</span>
              </h2>
            </div>
            <div className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-bold">
              Precinct: {cluster.masterplanPosition.zone}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="rounded-3xl overflow-hidden bg-slate-50 p-4 border border-slate-200 shadow-md">
                <img
                  src="/assets/images/master-layout-plan-hq.jpg"
                  alt={`Master Layout Plan showing ${cluster.name} in Paranjape Blue Ridge`}
                  className="w-full h-auto max-h-[480px] object-contain rounded-2xl mx-auto"
                />
                <div className="p-3 text-center text-xs font-mono text-slate-500 border-t border-slate-200 mt-2">
                  * Official Paranjape Blue Ridge 138-Acre Master Layout Plan • MahaRERA Certified
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#070D1A]">Immediate Precinct Connections</h3>
                <ul className="space-y-3 text-xs text-slate-600 font-sans">
                  {cluster.masterplanPosition.nearbyKeyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Navigation size={16} className="text-[#B88E3E] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{kp}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <Building2 size={16} className="text-[#B88E3E] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">Blue Ridge IT SEZ (3M+ Sq. Ft.) — 0 Min Commute</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Compass size={16} className="text-[#B88E3E] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">Upcoming Metro Line 3 Station — 800 Meters</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleOpenModal(`Request Masterplan Blueprint for ${cluster.name}`)}
                  className="w-full py-3 rounded-xl btn-champagne text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow-sm mt-4"
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
              <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
                Authentic 2D Layouts & <br />
                <span className="italic font-light text-gradient-champagne">Dimensional Blueprints.</span>
              </h2>
            </div>

            {/* Plan Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {cluster.floorPlans.map((fp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPlanIndex(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    selectedPlanIndex === idx
                      ? 'bg-[#B88E3E] text-white border-[#8F6A24] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#B88E3E]'
                  }`}
                >
                  {fp.configTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Active Floor Plan Showcase Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Plan Blueprint Canvas */}
              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-center min-h-[380px]">
                <img
                  src={currentPlan.planImage2D}
                  alt={`${cluster.name} - ${currentPlan.configTitle}`}
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              </div>

              {/* Plan Specifications & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-[#8F6A24] uppercase tracking-widest block font-bold">
                    Official Architectural Blueprint
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#070D1A] mt-1">
                    {currentPlan.configTitle}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-xs font-sans py-1 border-b border-slate-200">
                    <span className="text-slate-500">RERA Carpet Area:</span>
                    <strong className="text-sm font-mono text-[#070D1A]">{currentPlan.carpetArea}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans py-1 border-b border-slate-200">
                    <span className="text-slate-500">Spatial Dimensions:</span>
                    <strong className="text-xs font-mono text-[#070D1A]">{currentPlan.dimensions}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans py-1">
                    <span className="text-slate-500">Bedrooms / Baths:</span>
                    <strong className="text-xs font-mono text-[#B88E3E]">{currentPlan.bhkNumber} BHK Suites</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
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
                    onClick={() => handleOpenModal(`Cost Sheet: ${currentPlan.configTitle} (${cluster.name})`)}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#070D1A] border border-slate-300 hover:border-[#B88E3E] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Get Cost Breakdown
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Real Estate Inventory Status Table */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-bold text-[#070D1A]">Verified Inventory & Price Matrix</h3>
              <span className="text-xs font-mono text-[#8F6A24] font-bold">MahaRERA: {cluster.reraNumber}</span>
            </div>

            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  <th className="pb-3">Unit Configuration</th>
                  <th className="pb-3">Carpet Area</th>
                  <th className="pb-3">Floor Range</th>
                  <th className="pb-3">View & Orientation</th>
                  <th className="pb-3">Starting Price</th>
                  <th className="pb-3 text-right">Inventory Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cluster.inventoryPreview.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-[#070D1A]">{item.type}</td>
                    <td className="py-4 font-mono text-slate-600">{item.carpetArea}</td>
                    <td className="py-4 text-slate-600">{item.floorRange}</td>
                    <td className="py-4 text-slate-600">{item.viewOrientation}</td>
                    <td className="py-4 font-mono text-[#B88E3E] font-bold">{item.pricingStatus}</td>
                    <td className="py-4 text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-50 border border-amber-200 text-[#8F6A24] font-bold">
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
          5. DUAL-TIER AMENITIES (CLUSTER EXCLUSIVE VS. TOWNSHIP)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>04 • Dual-Tier Lifestyle Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
              Exclusive Cluster Privileges vs. <br />
              <span className="italic font-light text-gradient-champagne">138-Acre Master Township.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Cluster Dedicated Amenities Card */}
            <div className="bg-[#FAF9F6] p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#8F6A24] font-mono text-xs uppercase tracking-widest border-b border-slate-200 pb-4 font-bold">
                <Sparkles size={16} className="text-[#B88E3E]" />
                <span>Exclusive to {cluster.name} Residents</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-sans">
                {cluster.clusterAmenities.map((am, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#B88E3E] shrink-0"></span>
                    <span className="font-medium">{am}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                * Private RFID keycard and biometric access for residents only.
              </div>
            </div>

            {/* 138-Acre Township Master Amenities Card */}
            <div className="bg-[#FAF9F6] p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-xs uppercase tracking-widest border-b border-slate-200 pb-4 font-bold">
                <Trees size={16} className="text-blue-500" />
                <span>138-Acre Blue Ridge Master Township Facilities</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-sans">
                {cluster.townshipAmenities.map((am, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    <span className="font-medium">{am}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                * Fully operational integrated township infrastructure in Hinjewadi Phase 1.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. DETAILED TECHNICAL & ARCHITECTURAL SPECIFICATIONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>05 • Materiality & Engineering Standards</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
              Scraped Official Specifications for <br />
              <span className="italic font-light text-gradient-champagne">{cluster.name}.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cluster.specifications.map((spec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#070D1A]">{spec.category}</h3>
                  <span className="text-[10px] font-mono text-[#B88E3E] font-bold">0{idx + 1}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 font-sans">
                  {spec.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-[#B88E3E] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Formwork Assurance Banner */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Award size={28} className="text-[#B88E3E] shrink-0" />
              <div>
                <div className="text-sm font-serif font-bold text-[#070D1A]">
                  Structure: {cluster.towerDetails.structureType}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
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
          7. GOOGLE MAPS LOCATION & TRANSIT PROXIMITY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-white border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <div className="chapter-badge mb-3">
              <span>06 • Location & Strategic Connectivity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal leading-tight">
              Direct Connectivity to <br />
              <span className="italic font-light text-gradient-champagne">Rajiv Gandhi Infotech Park & Metro Line 3.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Google Maps Embed */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 sm:h-96">
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
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-[#B88E3E]" />
                  <span className="text-xs font-bold text-[#070D1A]">Blue Ridge IT SEZ</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">0 Minutes (On-Campus)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-[#B88E3E]" />
                  <span className="text-xs font-bold text-[#070D1A]">Infosys / Wipro / TCS Gate</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#070D1A]">400m - 900m (5-8 Mins)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#B88E3E]" />
                  <span className="text-xs font-bold text-[#070D1A]">Hinjewadi Metro Line 3</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#070D1A]">800 Meters (3 Mins)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#B88E3E]" />
                  <span className="text-xs font-bold text-[#070D1A]">Baner & Balewadi High Street</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#070D1A]">10 Mins (Via New Bridge)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-[#B88E3E]" />
                  <span className="text-xs font-bold text-[#070D1A]">Mumbai-Pune Expressway</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#070D1A]">3.5 KM (5 Mins)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. PRIVATE VIP CONCIERGE & BOOKING DOCK
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-gradient-to-b from-[#FAF9F6] to-[#F3F5F8]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <div className="chapter-badge mb-4 mx-auto">
            <Sparkles size={11} className="text-[#B88E3E]" />
            <span>Private Advisory Desk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#070D1A] font-normal mb-4">
            Schedule a Private Tour of <br />
            <span className="italic font-light text-gradient-champagne">{cluster.name}.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans">
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
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#070D1A] border border-slate-300 hover:border-[#B88E3E] text-xs font-sans font-bold uppercase tracking-wider no-underline flex items-center gap-2 transition-all"
            >
              <Phone size={14} className="text-[#B88E3E]" />
              <span>Call +91 7744009295</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
