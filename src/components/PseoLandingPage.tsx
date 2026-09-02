import React from 'react';
import { projects } from '@/data/master-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, CheckCircle2, MessageCircle, Star } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import { parseSpintax } from '@/lib/spintax';
import { getDynamicContext } from '@/lib/dynamic-context';
import InteractiveFloorPlans from '@/components/InteractiveFloorPlans';
import PuneMarketReport from '@/components/PuneMarketReport';
import DynamicContentBlock from '@/components/DynamicContentBlock';
import RelatedSearchesMesh from '@/components/RelatedSearchesMesh';
import SiloLinks from '@/components/SiloLinks';
import DynamicFreshness from '@/components/DynamicFreshness';
import RoiCalculator from '@/components/RoiCalculator';
import MahaReraBadge from '@/components/MahaReraBadge';
import ProximityMatrix from '@/components/ProximityMatrix';
import EmiCalculator from '@/components/EmiCalculator';
import SiteVisitBooking from '@/components/SiteVisitBooking';
import NriCostEstimator from '@/components/NriCostEstimator';
import CompetitorComparison from '@/components/CompetitorComparison';
import EnvironmentalWidget from '@/components/EnvironmentalWidget';

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
  const dynamicContext = getDynamicContext(current.slug || '');

  return (
    <div className="text-text">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/real-township-day.jpg" 
            className="w-full h-full object-cover opacity-20"
            alt={`Paranjape Blue Ridge Township - ${current.title}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy to-navy"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: 'Real Estate Pune', href: '/' },
              { label: current.title, href: `/${current.slug}` }
            ]} 
          />
          
          <div className="flex items-center gap-3 text-gold font-mono font-bold tracking-[3px] uppercase text-xs mb-4 mt-6">
            <Shield size={16} />
            Verified Township Inventory
          </div>
          
          <h1 id="speakable-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-warm-white font-bold mb-6 leading-tight">
            <span className="text-gilded">
              {current.intent || current.title}
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="mr-0.5" />)}
            </div>
            <span className="text-xs text-gold font-mono bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              MahaRERA Registered
            </span>
          </div>

          <p id="speakable-summary" className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
            {current.description || `Discover the finest ${current.type || 'residences'} tailored to your lifestyle at Paranjape Blue Ridge Hinjewadi Phase 1.`}
          </p>
        </div>
      </section>

      {/* CORE BENEFITS & CONTENT */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="ultra-glass-card p-8 rounded-3xl border border-gold/20">
            <h2 className="text-2xl font-serif font-bold text-warm-white mb-6">Key Highlights</h2>
            <div className="space-y-4">
              {benefits.map((b: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-text-light">
                  <CheckCircle2 size={18} className="text-gold shrink-0" />
                  <span className="text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ultra-glass-card p-8 rounded-3xl border border-gold/20">
            <h2 className="text-2xl font-serif font-bold text-warm-white mb-6">Township Infrastructure</h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
              Paranjape Blue Ridge stands as a 138-acre integrated landmark in Hinjewadi Phase 1. Featuring an operational ICSE school, 9-hole golf course, private marina boat club, and walk-to-work Special Economic Zone.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all no-underline shadow-lg"
              >
                <MessageCircle size={16} />
                WhatsApp Enquiry
              </a>
              <a 
                href="/hinjewadi-micro-market"
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-warm-white px-5 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold hover:text-navy transition-all no-underline"
              >
                Market Guide &rarr;
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
