import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, CheckCircle2, MessageCircle, Star, ArrowRight } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import ProximityMatrix from '@/components/ProximityMatrix';
import RoiCalculator from '@/components/RoiCalculator';
import CompetitorComparison from '@/components/CompetitorComparison';
import RelatedSearchesMesh from '@/components/RelatedSearchesMesh';

interface PseoProps {
  pageData?: {
    slug: string;
    title: string;
    intent: string;
    type: string;
    silo: string;
    description?: string;
  };
  data?: any;
}

export default function PseoLandingPage({ pageData, data }: PseoProps) {
  const current = pageData || data;
  if (!current) return null;

  const getBenefits = (silo: string) => {
    switch(silo) {
      case 'nri':
        return ['FEMA Compliant Investment', 'Remote Purchase Possible', 'NRI Desk Support', 'Repatriable Rental Income'];
      case 'investor':
        return ['High Rental Yield (4.8% - 5.2%)', 'Strong Capital Appreciation', 'Premium Tenant Profile', 'Zero Maintenance Headaches'];
      case 'corporate':
        return ['Zero Commute Time', 'Walk to Office Hubs', 'Premium Work-Life Balance', 'Corporate Community'];
      case 'infrastructure':
      case 'infra-guide':
        return ['Future-Proof Connectivity', 'Metro Station Access (800m)', 'Highway Proximity', 'Appreciating Asset'];
      case 'ecosystem':
      case 'luxury-ecosystem':
        return ['Private Boat Club', 'ICSE School Inside', '9-Hole Golf Course', '138 Acre Mega Township'];
      case 'competitor':
      case 'battleground':
        return ['138-Acre Mega Township', 'Ready Possession Clusters', 'Golf Course & Boat Club', 'Blue Ridge Public School'];
      default:
        return ['High Rental Yield', 'Walk to Work', 'Premium Amenities', 'Capital Appreciation'];
    }
  };

  const benefits = getBenefits(current.silo || '');

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#F3F5F8] via-[#FAF9F6] to-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/images/pscl-blue-ridge-aerial-drone.webp" 
            className="w-full h-full object-cover opacity-20 filter brightness-105"
            alt={`Paranjape Blue Ridge Township - ${current.title}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/80 via-[#FAF9F6]/90 to-[#FAF9F6]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: 'Real Estate Pune', href: '/' },
              { label: current.title, href: `/${current.slug}` }
            ]} 
          />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-[10px] mb-4 mt-4 shadow-xs">
            <ShieldCheck size={14} className="text-[#B88E3E]" />
            <span>Verified Township Inventory • Hinjewadi Phase 1</span>
          </div>
          
          <h1 id="speakable-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#070D1A] font-normal mb-4 leading-tight">
            <span>
              {current.intent || current.title}
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex text-[#B88E3E]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="mr-0.5" />)}
            </div>
            <span className="text-xs text-[#8F6A24] font-mono bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
              MahaRERA Registered
            </span>
            <span className="text-xs text-slate-500 font-mono">
              138-Acre Integrated Township
            </span>
          </div>

          <p id="speakable-summary" className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans font-normal">
            {current.description || `Discover the finest ${current.type || 'residences'} tailored to your lifestyle at Paranjape Blue Ridge Hinjewadi Phase 1, Pune.`}
          </p>
        </div>
      </section>

      {/* CORE BENEFITS & CONTENT */}
      <section className="py-16 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#070D1A] mb-6 pb-2 border-b border-slate-100">
              Key Highlights
            </h2>
            <div className="space-y-4">
              {benefits.map((b: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-sans">
                  <CheckCircle2 size={18} className="text-[#B88E3E] shrink-0" />
                  <span className="text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#070D1A] mb-4 pb-2 border-b border-slate-100">
              Township Infrastructure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
              Paranjape Blue Ridge stands as a 138-acre integrated landmark in Hinjewadi Phase 1. Featuring an operational ICSE school, 9-hole golf course, private marina boat club, and walk-to-work Special Economic Zone.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all no-underline shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Enquiry</span>
              </a>
              <a 
                href="/hinjewadi-micro-market"
                className="btn-champagne flex items-center gap-2 px-5 py-3 rounded-full font-bold uppercase text-xs tracking-wider no-underline shadow-sm"
              >
                <span>Market Guide &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MODULES */}
        <div className="space-y-16">
          <ProximityMatrix />
          <RoiCalculator />
          <CompetitorComparison />
          <FAQSection />
          <RelatedSearchesMesh currentSlug={current.slug} />
        </div>
      </section>
    </div>
  );
}
