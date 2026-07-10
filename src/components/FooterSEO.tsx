import React from 'react';
import { generatePseoUrls, longTailUrls } from '@/data/seo-matrix';

export default function FooterSEO() {
  const pseoUrls = generatePseoUrls();

  return (
    <div className="bg-[var(--bg)] border-t border-gold/10 pt-10 pb-6 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-[10px] sm:text-xs text-text-light/50 leading-relaxed font-sans">
          
          {/* Section 1: Pune Real Estate Market */}
          <div>
            <h3 className="text-gold uppercase tracking-widest font-bold mb-3 text-[10px]">Pune Real Estate Market</h3>
            <p className="mb-3">
              The <strong>Pune Real Estate Market</strong> is rapidly evolving as one of India's most lucrative investment destinations. Driving this phenomenal growth is the thriving IT sector, excellent educational institutions, and robust infrastructure. Paranjape Blue Ridge Hinjewadi stands at the forefront of this transformation, offering global standards of living in Pune's most dynamic tech corridor.
            </p>
            <p>
              As the definitive address in the <strong>West Pune Real Estate Market</strong>, Paranjape Blue Ridge Township redefines the luxury landscape. Investors looking for high capital appreciation consistently choose properties that offer integrated, walk-to-work lifestyles.
            </p>
          </div>

          {/* Section 2: Hinjewadi Real Estate Market */}
          <div>
            <h3 className="text-gold uppercase tracking-widest font-bold mb-3 text-[10px]">Hinjewadi Real Estate Market</h3>
            <p className="mb-3">
              The <strong>Hinjewadi Real Estate Market</strong> represents the epicenter of Pune's IT revolution. With over 800 multinational corporations operating within the Rajiv Gandhi Infotech Park, the demand for premium residential spaces has skyrocketed. Paranjape Blue Ridge Hinjewadi is universally recognized as the number one residential choice for corporate leaders and IT professionals alike.
            </p>
            <p>
              Whether you are searching for ready possession flats, under construction apartments, or ultra-luxury penthouses, Paranjape Blue Ridge provides an unmatched portfolio of 2, 3, 4, and 5 BHK premium flats designed for discerning families.
            </p>
          </div>

          {/* Section 3: Blue Ridge Township Features */}
          <div>
            <h3 className="text-gold uppercase tracking-widest font-bold mb-3 text-[10px]">Blue Ridge Township Features</h3>
            <p className="mb-3">
              Experience the pinnacle of integrated living with unmatched <strong>Blue Ridge Township Features</strong>. Spread across 138 acres, this megatownship is a self-sustained ecosystem. Residents enjoy exclusive access to a professional 9-hole golf course, a private boat club on the Mula river, and the highly acclaimed Blue Ridge Public School (ICSE) located right inside the township gates.
            </p>
            <p>
              Projects like <strong>Paranjape Promenade Hinjewadi</strong> and the ultra-luxury <strong>Paranjape Blue Ridge Altius</strong> offer river-facing balconies, state-of-the-art clubhouses, infinite swimming pools, and multi-tier security systems, cementing its reputation as the best township in Pune.
            </p>
          </div>

          {/* Section 4: Proximity to IT Park */}
          <div>
            <h3 className="text-gold uppercase tracking-widest font-bold mb-3 text-[10px]">Proximity to IT Park &amp; Hubs</h3>
            <p className="mb-3">
              Strategic location is paramount. Paranjape Blue Ridge offers unparalleled <strong>proximity to IT Park</strong> campuses including Infosys, Wipro, TCS, Tech Mahindra, Cognizant, and Accenture. This strategic placement ensures a zero-commute, walk-to-work lifestyle that drastically enhances work-life balance for IT employees.
            </p>
            <p>
              Beyond commercial hubs, the township offers seamless connectivity to the upcoming Hinjewadi Metro Line 3, the Mumbai-Bangalore Highway, Wakad, Balewadi High Street, and Baner. Book your flat in Paranjape Blue Ridge today and secure a high rental yield investment in the undisputed #1 project of the West Pune Real Estate Market.
            </p>
          </div>

        </div>
        
        {/* Curated visible internal link mesh to replace the hidden link dump */}
        <div className="mt-12 pt-8 border-t border-gold/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Configurations */}
          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-4 text-[10px]">By Configuration &amp; Layout</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/2-bhk-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">2 BHK in Hinjewadi</a>
              <a href="/3-bhk-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">3 BHK in Hinjewadi</a>
              <a href="/4-bhk-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">4 BHK in Hinjewadi</a>
              <a href="/5-bhk-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">5 BHK in Hinjewadi</a>
              <a href="/penthouses-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Penthouses in Hinjewadi</a>
              <a href="/duplex-apartments-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Duplex Apartments</a>
              <a href="/ready-possession-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Ready Possession Flats</a>
              <a href="/under-construction-apartments-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Under Construction</a>
              <a href="/sky-residences-in-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Sky Residences Pune</a>
              <a href="/premium-flats-in-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Premium Flats Pune</a>
              <a href="/studio-apartments-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Studio Apartments</a>
              <a href="/ready-possession-luxury-flats-in-hinjewadi" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Ready Luxury Flats</a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-4 text-[10px]">By Location &amp; Confluence</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/flats-for-sale-in-mahalunge" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Flats in Mahalunge</a>
              <a href="/3-bhk-flats-in-mahalunge" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">3 BHK in Mahalunge</a>
              <a href="/4-bhk-flats-in-mahalunge" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">4 BHK in Mahalunge</a>
              <a href="/4-bhk-flats-in-baner" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">4 BHK in Baner</a>
              <a href="/flats-for-sale-in-baner" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Flats in Baner</a>
              <a href="/2-bhk-flats-in-balewadi" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">2 BHK in Balewadi</a>
              <a href="/3-bhk-flats-in-balewadi" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">3 BHK in Balewadi</a>
              <a href="/2-bhk-flats-in-wakad" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Flats in Wakad</a>
              <a href="/3-bhk-flats-in-wakad" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">3 BHK in Wakad</a>
              <a href="/2-bhk-flats-in-marunji" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Flats in Marunji</a>
              <a href="/flats-for-sale-in-pune-west" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Flats in Pune West</a>
              <a href="/best-roi-real-estate-investment-in-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Best ROI Investment</a>
            </div>
          </div>

          {/* Competitor Comparisons & Battles */}
          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-4 text-[10px]">Competitor Benchmarks</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/blue-ridge-vs-vtp-blue-waters" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs VTP Waters</a>
              <a href="/blue-ridge-vs-vtp-bellissimo" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs VTP Bellissimo</a>
              <a href="/blue-ridge-vs-life-republic" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Life Republic</a>
              <a href="/blue-ridge-vs-lodha-belmondo" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Lodha Belmondo</a>
              <a href="/blue-ridge-vs-shapoorji-joyville" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Joyville</a>
              <a href="/blue-ridge-vs-megapolis" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Megapolis</a>
              <a href="/blue-ridge-vs-godrej-hinjewadi" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Godrej</a>
              <a href="/blue-ridge-vs-kohinoor-central-park" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Kohinoor</a>
              <a href="/blue-ridge-vs-krisala-41-luxovert" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge vs Krisala 41</a>
              <a href="/best-township-in-hinjewadi" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Best Township Hinjewadi</a>
              <a href="/best-township-in-pune-comparison" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Best Township Pune</a>
              <a href="/metro-line-3-hinjewadi-property" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Metro Line 3 Properties</a>
            </div>
          </div>

          {/* Township Ecosystem */}
          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-4 text-[10px]">Township Ecosystem</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/golf-facing-apartments-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Golf Facing Homes</a>
              <a href="/river-facing-flats-in-hinjewadi-phase-1" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">River Facing Flats</a>
              <a href="/walk-to-work-homes-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Walk-to-Work Flats</a>
              <a href="/integrated-township-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Integrated Township</a>
              <a href="/self-sustained-township-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Self Sustained Town</a>
              <a href="/golf-township-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Golf Township Pune</a>
              <a href="/riverfront-township-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Riverfront Township</a>
              <a href="/blue-ridge-public-school-admission-guide" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Blue Ridge School Guide</a>
              <a href="/private-boat-club-membership-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Boat Club Membership</a>
              <a href="/hinjewadi-phase-1-infrastructure-updates" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Hinjewadi Infra Updates</a>
              <a href="/paranjape-schemes-pune-projects" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Paranjape Projects</a>
              <a href="/ready-possession-luxury-flats-in-pune" className="text-[10px] text-text-light/40 hover:text-gold transition-colors">Ready Luxury Pune</a>
            </div>
          </div>
        </div>

        {/* Absolute bottom SEO string & Sitemap Link */}
        <div className="mt-12 pt-4 border-t border-gold/5 flex flex-col sm:flex-row justify-between items-center text-[9px] text-text-light/30 gap-4">
          <p className="text-center sm:text-left">
            Ranked #1 for: Paranjape Blue Ridge | Paranjape Blue Ridge Hinjewadi | Paranjape Blue Ridge Altius | Paranjape Promenade Hinjewadi | Paranjape Blue Ridge Township | West Pune Real Estate Market | Hinjewadi Real Estate Market
          </p>
          <a href="/html-sitemap" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold shrink-0">
            View Complete Property Sitemap
          </a>
        </div>

      </div>
    </div>
  );
}
