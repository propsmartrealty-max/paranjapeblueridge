import React from 'react';

/**
 * Ultra-Advanced Ecosystem Injector
 * This component acts as a "Semantic Mesh" for Googlebot and AI Crawlers (Perplexity/ChatGPT).
 * It creates a highly dense, strictly formatted Knowledge Graph linking the entire Paranjape 
 * ecosystem together. It uses both JSON-LD Microdata and semantic HTML5 structures.
 */
export default function ParanjapeEcosystemInjector() {
  const ecosystemData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Paranjape Schemes Entire Real Estate Ecosystem - Pune",
    "description": "Complete directory of Paranjape Schemes (Construction) Limited premium townships, luxury apartments, and senior living projects across Pune, Maharashtra.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Residence",
          "name": "Paranjape Blue Ridge Hinjewadi",
          "url": "https://paranjapeblueridge.com",
          "description": "138-acre integrated township in Hinjewadi Phase 1 featuring a 9-hole golf course and walk-to-work IT SEZ."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Residence",
          "name": "Paranjape Forest Trails Bhugaon",
          "url": "https://paranjapeblueridge.com/forest-trails",
          "description": "170-acre luxury villa and apartment township in Bhugaon, Pune."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Residence",
          "name": "Paranjape Athashri Senior Living",
          "url": "https://paranjapeblueridge.com/athashri",
          "description": "Premium senior citizen housing communities across Pune with specialized healthcare and amenities."
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Residence",
          "name": "Paranjape Sky One Model Colony",
          "url": "https://paranjapeblueridge.com/sky-one",
          "description": "Ultra-luxury residences in Model Colony, Shivajinagar, Pune."
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Residence",
          "name": "Paranjape Broadway Wakad",
          "url": "https://paranjapeblueridge.com/broadway",
          "description": "Premium residential apartments in Wakad, Pune."
        }
      }
    ]
  };

  const lsiKeywords = [
    "Paranjape Schemes Pune", "Best Builders in Pune", "Pune Real Estate Investment",
    "Top Townships in Pune", "Buy Luxury Flat in Pune", "Ready Possession Flats Pune",
    "MahaRERA Registered Projects Pune", "NRI Property Investment Pune", "Pune IT Park Flats",
    "Paranjape Blue Ridge Golf Course", "Athashri Senior Living Pune", "Forest Trails Villas Bhugaon",
    "Paranjape Schemes Construction Limited", "PSCL Pune Properties", "Hinjewadi Phase 1 Township"
  ];

  return (
    <div className="w-full bg-[#050B14] border-t border-gold/5 pt-8 pb-4">
      {/* 1. Silent Knowledge Graph Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemData) }}
      />

      <div className="container mx-auto max-w-7xl px-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <h4 className="text-gold/50 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold">
          Paranjape Schemes Ecosystem Matrix
        </h4>
        
        {/* 2. Semantic LSI Keyword Cloud (Crawlable text node) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lsiKeywords.map((keyword, idx) => (
            <span key={idx} className="text-[9px] text-text-light/40 border border-white/5 rounded-full px-2 py-0.5">
              {keyword}
            </span>
          ))}
        </div>

        {/* 3. Deep HTML5 Internal Linking Structure */}
        <nav aria-label="Ecosystem Directory" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-[10px] text-text-light/50">
          <div className="flex flex-col gap-1">
            <strong className="text-warm-white/70 mb-1">Flagship Townships</strong>
            <a href="/blue-ridge" className="hover:text-gold transition-colors">Blue Ridge Hinjewadi</a>
            <a href="/forest-trails" className="hover:text-gold transition-colors">Forest Trails Bhugaon</a>
            <a href="/blueridge-promenade" className="hover:text-gold transition-colors">Blue Ridge Promenade</a>
            <a href="/the-altius" className="hover:text-gold transition-colors">The Altius Luxury</a>
          </div>
          
          <div className="flex flex-col gap-1">
            <strong className="text-warm-white/70 mb-1">Senior Living</strong>
            <a href="/athashri" className="hover:text-gold transition-colors">Athashri Baner</a>
            <a href="/athashri" className="hover:text-gold transition-colors">Athashri Bavdhan</a>
            <a href="/athashri" className="hover:text-gold transition-colors">Athashri Hinjewadi</a>
            <a href="/athashri" className="hover:text-gold transition-colors">Athashri Bhugaon</a>
          </div>

          <div className="flex flex-col gap-1">
            <strong className="text-warm-white/70 mb-1">Premium Urban</strong>
            <a href="/sky-one" className="hover:text-gold transition-colors">Sky One Shivajinagar</a>
            <a href="/broadway" className="hover:text-gold transition-colors">Broadway Wakad</a>
            <a href="/trident" className="hover:text-gold transition-colors">Trident Wakad</a>
            <a href="/crystal-ridge" className="hover:text-gold transition-colors">Crystal Ridge</a>
          </div>

          <div className="flex flex-col gap-1">
            <strong className="text-warm-white/70 mb-1">Micro-Markets</strong>
            <a href="/explore/hinjewadi" className="hover:text-gold transition-colors">Hinjewadi Real Estate</a>
            <a href="/explore/wakad" className="hover:text-gold transition-colors">Wakad Properties</a>
            <a href="/explore/baner" className="hover:text-gold transition-colors">Baner Luxury Homes</a>
            <a href="/explore/bhugaon" className="hover:text-gold transition-colors">Bhugaon Villas</a>
          </div>

          <div className="flex flex-col gap-1">
            <strong className="text-warm-white/70 mb-1">Corporate & Trust</strong>
            <a href="https://www.pscl.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Paranjape Schemes Corp</a>
            <a href="/data-index" className="hover:text-gold transition-colors">Pune Market Data Hub</a>
            <a href="/embed/roi-calculator" className="hover:text-gold transition-colors">Investment Calculator</a>
            <a href="/insights" className="hover:text-gold transition-colors">Real Estate Insights</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
