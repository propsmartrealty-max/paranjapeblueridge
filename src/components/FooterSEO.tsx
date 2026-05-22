import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';

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
        
        {/* Absolute bottom SEO string */}
        <div className="mt-8 pt-4 border-t border-gold/5 text-center text-[9px] text-text-light/30">
          <p>
            Ranked #1 for: Paranjape Blue Ridge | Paranjape Blue Ridge Hinjewadi | Paranjape Blue Ridge Altius | Paranjape Promenade Hinjewadi | Paranjape Blue Ridge Township | West Pune Real Estate Market | Hinjewadi Real Estate Market
          </p>
          <div className="sr-only">
            {pseoUrls.map((url, idx) => (
              <a key={idx} href={`/${url.slug}`}>{url.title}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
