import React from 'react';
import { getCuratedPseoLinks } from '@/data/seo-matrix';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function FooterSEO() {
  const displayedLinks = getCuratedPseoLinks(60);

  return (
    <footer className="bg-[var(--bg)] border-t border-gold/10 pt-10 pb-6 px-4 rounded-xl backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Core SEO Text & Local Business Info */}
          <div className="lg:col-span-1 flex flex-col text-sm text-text-light/70">
            <h3 className="text-gold font-serif text-xl mb-4">Paranjape Blue Ridge</h3>
            <p className="mb-6">
              Pune's premier 138-acre integrated township. Explore luxury 2BHK, 3BHK, 4BHK, 5BHK, Duplex, and Simplex configurations across Hinjewadi, Mahalunge, and Baner corridors.
            </p>
            
            <address className="not-italic flex flex-col gap-3 text-xs mb-6">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>Blue Ridge Township, Near Rajiv Gandhi Infotech Park, Phase 1, Hinjewadi, Pune, Maharashtra 411057</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+91-20-67210000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gold shrink-0" />
                <span>sales@paranjapeschemes.in</span>
              </div>
            </address>

            <a href="/insights" className="inline-block mt-2 text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold text-[10px]">
              Read Market Insights & Blog
            </a>
          </div>

          {/* Column 2: Google Maps Integration */}
          <div className="lg:col-span-1 border border-white/5 rounded-lg overflow-hidden h-64">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9324673824555!2d73.73468507612711!3d18.57708576744837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc655555555%3A0xcab5d8a0f9f300b!2sBlue%20Ridge%20Township!5e0!3m2!1sen!2sin!4v1709825400000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Paranjape Blue Ridge Hinjewadi Map Location"
            ></iframe>
          </div>

          {/* Column 3: Keyword Matrix Anchor Links */}
          <div className="lg:col-span-1 flex flex-col">
            <h4 className="text-warm-white text-xs uppercase tracking-widest mb-4 font-bold border-b border-white/5 pb-2">Trending Pune Real Estate</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              {displayedLinks.map((url) => (
                <a
                  key={url.slug}
                  href={`/${url.slug}`}
                  className="text-text-muted/80 hover:text-gold transition-colors text-[9px] uppercase tracking-wider"
                >
                  {url.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Absolute bottom SEO string & Sitemap Link */}
        <div className="pt-6 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center text-[9px] text-text-muted gap-4">
          <p className="text-center sm:text-left">
            Ranked #1 for: Paranjape Blue Ridge | Paranjape Blue Ridge Hinjewadi | Pune Real Estate Market | 3BHK Mahalunge | 2BHK Hinjewadi | 4BHK Baner
          </p>
          <div className="flex gap-4 shrink-0 flex-wrap justify-center">
            <a href="/explore/hinjewadi" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold">Hinjewadi Hub</a>
            <span className="text-gold/30">|</span>
            <a href="/explore/wakad" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold">Wakad Hub</a>
            <span className="text-gold/30">|</span>
            <a href="/explore/baner" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold">Baner Hub</a>
            <span className="text-gold/30">|</span>
            <a href="/directory" className="text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold">Global Directory</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
