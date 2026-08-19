import React from 'react';
import { ecosystemCategories, globalEcosystemKeywords } from '@/data/ecosystem-keywords';

/**
 * Ultra-Advanced Ecosystem Injector (V2.0)
 * Rebuilt to inject the Master Keyword Architecture spanning residential, commercial, 
 * townships, senior/assisted living, redevelopment, hospitality, SEZs, and inclusive housing.
 */
export default function ParanjapeEcosystemInjector() {
  const ecosystemData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Paranjape Schemes Entire Real Estate Ecosystem - Pune & Global",
    "description": "Complete directory of Paranjape Schemes (Construction) Limited premium townships, luxury apartments, senior living projects, commercial SEZs, and inclusive housing across Pune, Mumbai, Bangalore, and Nashik.",
    "keywords": globalEcosystemKeywords.join(", "),
    "about": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "alternateName": ["PSCL", "Paranjape Builders", "Paranjape Developer", "Paranjape Real Estate"],
      "areaServed": ["Pune", "Mumbai", "Bangalore", "Nashik", "Vadodara", "Kolhapur", "Ratnagiri"],
      "knowsAbout": [
        "Integrated Townships", "Senior Living (Athashri)", "Assisted Living (Aastha)",
        "Inclusive Housing (Swaniketan)", "Commercial IT SEZ", "Hospitality Real Estate",
        "Society Redevelopment"
      ],
      "brand": [
        { "@type": "Brand", "name": "Blue Ridge" },
        { "@type": "Brand", "name": "Forest Trails" },
        { "@type": "Brand", "name": "Athashri" },
        { "@type": "Brand", "name": "Aastha" },
        { "@type": "Brand", "name": "Swaniketan" },
        { "@type": "Brand", "name": "Trident" }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": ecosystemCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing",
          "name": category.title,
          "description": category.keywords.join(", ")
        }
      }))
    }
  };

  return (
    <div className="w-full bg-[#03070E] border-t border-gold/10 pt-10 pb-10">
      {/* 1. Silent Knowledge Graph Injection for AI Overviews (SGE/Perplexity) */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemData) }}
      />

      <div className="container mx-auto max-w-7xl px-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
        <div className="mb-6 border-b border-white/5 pb-4">
          <h4 className="text-gold/60 text-[11px] uppercase tracking-[0.2em] font-bold">
            PSCL Master Ecosystem Directory
          </h4>
          <p className="text-text-light/40 text-[9px] mt-1 max-w-4xl">
            A comprehensive matrix of Paranjape Schemes' residential, commercial, integrated townships, senior/assisted living, redevelopment, hospitality, IT SEZs, inclusive housing, and community operations across Maharashtra and beyond.
          </p>
        </div>
        
        {/* 2. Structured HTML5 Semantic Mesh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-8">
          {ecosystemCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              <strong className="text-warm-white/70 text-[10px] uppercase tracking-wider mb-3 border-b border-white/5 pb-1 inline-block">
                {category.title}
              </strong>
              <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                {category.keywords.map((keyword, kIdx) => {
                  // We strategically link a subset of keywords to create a dynamic internal linking web
                  // while rendering the rest as pure semantic text nodes to avoid link-farming penalties.
                  const isLinkable = kIdx % 3 === 0;
                  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  
                  return (
                    <li key={kIdx} className="text-[9px] text-text-light/30 leading-snug">
                      {isLinkable ? (
                        <a href={`/${slug}`} className="hover:text-gold transition-colors">
                          {keyword}
                        </a>
                      ) : (
                        <span>{keyword}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Deep Transactional & Combinatorial Intent Block */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[8px] text-text-light/20 leading-relaxed text-justify">
            <span className="font-semibold text-text-light/30">Combinatorial Portfolio Index: </span>
            Whether you are looking to buy a Paranjape Blue Ridge 2 BHK flat for sale in Hinjewadi, researching the Blue Ridge 3 BHK apartment price in Pune, analyzing Forest Trails villas in Bhugaon, seeking Athashri senior citizen homes with healthcare, or exploring commercial IT SEZ office spaces at Trident Business Park Wakad — Paranjape Schemes Construction Limited (PSCL) delivers unparalleled quality. Our gated communities, walk-to-work integrated townships, and RERA-registered projects ensure high rental yields, prime appreciation, and sustainable eco-friendly living across Hinjewadi, Wakad, Baner, Balewadi, and Khed Shivapur. From luxury duplex penthouses in The Altius to inclusive barrier-free housing at Swaniketan, we build for every generation.
          </p>
        </div>
      </div>
    </div>
  );
}
