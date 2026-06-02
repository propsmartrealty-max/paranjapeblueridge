import React from 'react';
import { BookOpen } from 'lucide-react';

interface DynamicContentBlockProps {
  silo: string;
  title: string;
}

export default function DynamicContentBlock({ silo, title }: DynamicContentBlockProps) {
  
  // Generating long-form semantic content based on Silo
  const renderContent = () => {
    switch (silo) {
      case 'pune-macro':
      case 'west-pune-macro':
        return (
          <>
            <h3 className="text-2xl font-serif text-warm-white mb-4">Understanding the Pune Real Estate Market Landscape</h3>
            <p className="text-text-light mb-6">
              The Pune real estate market has experienced an unprecedented transformation over the last decade, establishing itself as one of India's most resilient and appreciating property hubs. Driven by a robust IT/ITeS sector, world-class educational institutions, and significant infrastructural upgrades, investing in <strong>{title}</strong> represents a calculated move towards long-term wealth generation. West Pune, in particular, has emerged as the nucleus of this growth, offering a blend of cosmopolitan lifestyle and unparalleled connectivity.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">Why West Pune is the Epicenter of Luxury Real Estate</h4>
            <p className="text-text-light mb-6">
              West Pune corridors, especially the Hinjewadi-Wakad-Baner belt, have evolved from peripheral outposts into premium micro-markets. The demand for <em>luxury homes in West Pune</em> is fueled by high-net-worth individuals (HNIs), NRI investors, and top-tier IT executives seeking a walk-to-work lifestyle without compromising on opulence. Mega townships in this region provide an all-inclusive ecosystem—schools, healthcare, retail, and commercial spaces—eliminating the need for gruelling daily commutes. Projects like Paranjape Blue Ridge stand at the pinnacle of this architectural revolution, offering a 138-acre sanctuary that redefines premium real estate in Pune.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">Capital Appreciation and Rental Yield Dynamics</h4>
            <p className="text-text-light mb-6">
              Analyzing historical data, properties in Hinjewadi Phase 1 have demonstrated a consistent year-on-year capital appreciation of 10-15%. Furthermore, the rental yields in this micro-market hover between 4.5% to 6%, significantly outperforming the national average of 2-3% for residential real estate. This exceptional ROI is primarily due to the constant influx of talent to the Rajiv Gandhi Infotech Park, which employs over 1.5 lakh professionals. The continuous demand for quality housing ensures that ready-possession flats and ongoing residential projects in Pune maintain high occupancy rates and premium rental commands.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">The Infrastructure Catalyst: Pune Metro Line 3</h4>
            <p className="text-text-light mb-6">
              One of the most significant value drivers for <strong>{title}</strong> is the upcoming Pune Metro Line 3 (Hinjewadi to Shivajinagar corridor). Real estate economics dictate that properties within a 1-kilometer radius of mass transit stations experience a "hyper-appreciation" phase upon project completion. With the metro line advancing rapidly, current price points offer a fleeting window for investors to capitalize on pre-operation valuations. When you buy a flat in Blue Ridge or similar premium townships, you are effectively securing an asset heavily insulated against market volatility by world-class infrastructure.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">The Township Advantage vs. Standalone Projects</h4>
            <p className="text-text-light mb-6">
              The paradigm shift in post-pandemic home buying heavily favors integrated mega townships over standalone buildings. Buyers are prioritizing expansive open spaces, comprehensive security, and in-house lifestyle amenities. A township offers a holistic living experience—featuring private golf courses, riverfront promenades, international schools, and dedicated commercial SEZs. This self-sustaining model not only enhances the quality of life but also ensures the property commands a premium in the resale market, solidifying its status as the best real estate investment in Pune.
            </p>
          </>
        );
      case 'corporate':
      case 'tech-parks':
        return (
          <>
            <h3 className="text-2xl font-serif text-warm-white mb-4">The Strategic Advantage of Proximity to {title}</h3>
            <p className="text-text-light mb-6">
              In today's fast-paced corporate environment, time is the ultimate luxury. Residing near major IT hubs like {title} fundamentally alters your daily lifestyle by eliminating the stress and fatigue of long commutes. The concept of the "Walk-to-Work" lifestyle is no longer a distant dream but a tangible reality for residents of premium townships in Hinjewadi Phase 1. By choosing a residence near {title}, you reclaim hours of your week, translating into better work-life balance, improved mental health, and more quality time spent with family.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">Economic Resilience and High Liquidity</h4>
            <p className="text-text-light mb-6">
              Properties situated near prominent tech parks exhibit incredible economic resilience. Even during market fluctuations, the constant influx of tech professionals ensures a steady demand for premium housing. This guarantees high liquidity if you ever choose to sell, and ensures top-tier rental yields. Investors targeting the corporate sector understand that proximity to {title} is the most critical factor in attracting high-paying, reliable corporate tenants. Paranjape Blue Ridge, being a township with its own IT SEZ, represents the apex of this investment strategy.
            </p>
          </>
        );
      case 'investor':
      case 'price-list':
        return (
          <>
            <h3 className="text-2xl font-serif text-warm-white mb-4">Investment Analysis: Maximizing ROI with {title}</h3>
            <p className="text-text-light mb-6">
              When evaluating real estate investments, savvy investors look beyond just the sticker price; they analyze the complete ecosystem of value generation. Investing in <strong>{title}</strong> at Paranjape Blue Ridge offers a multi-faceted return profile. The intrinsic value of the land in Hinjewadi Phase 1 is appreciating rapidly due to absolute scarcity—there are simply no more 100+ acre land parcels available for township development in this primary corridor. This scarcity drives the premium valuation of existing inventory.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">Rental Yields and Tenant Demographics</h4>
            <p className="text-text-light mb-6">
              The tenant demographic for luxury apartments in Blue Ridge consists primarily of mid-to-senior level IT management, expats, and corporate executives. This demographic guarantees timely rent payments, excellent property maintenance, and longer lease tenures. Consequently, the rental yield for configurations related to {title} frequently exceeds market averages, providing a robust, passive income stream that acts as a hedge against inflation.
            </p>
          </>
        );
      default:
        return (
          <>
            <h3 className="text-2xl font-serif text-warm-white mb-4">Elevating Your Lifestyle with {title}</h3>
            <p className="text-text-light mb-6">
              Choosing <strong>{title}</strong> at Paranjape Blue Ridge is about embracing an uncompromising standard of living. It is about waking up to panoramic views of a meticulously maintained 9-hole golf course, enjoying evening strolls along a private riverfront promenade, and knowing your children are receiving a world-class education just a short, safe walk away at the Blue Ridge Public School. This 138-acre integrated township is designed to cater to every facet of modern luxury.
            </p>
            <h4 className="text-xl font-serif text-gilded mb-3">A Community of Like-Minded Achievers</h4>
            <p className="text-text-light mb-6">
              Beyond the brick and mortar, true luxury lies in the community you join. Blue Ridge is home to a vibrant, cosmopolitan community of professionals, entrepreneurs, and visionaries. The extensive clubhouse facilities, sports arenas, and cultural events foster networking and lifelong friendships. Investing in {title} is an investment in a thriving social ecosystem that enriches your life on a daily basis.
            </p>
          </>
        );
    }
  };

  return (
    <div className="bg-navy border-t border-b border-gold/10 py-24">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-8">
          <BookOpen size={16} /> Semantic Market Analysis
        </div>
        <article className="prose prose-invert prose-gold max-w-none">
          {renderContent()}
        </article>
      </div>
    </div>
  );
}
