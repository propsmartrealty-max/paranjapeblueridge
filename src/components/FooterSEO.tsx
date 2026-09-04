import React from 'react';
import { getCuratedPseoLinks } from '@/data/seo-matrix';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function FooterSEO() {
  const displayedLinks = getCuratedPseoLinks(60);

  return (
    <footer className="bg-[var(--bg)] border-t border-gold/20 pt-12 pb-8 px-4 rounded-xl backdrop-blur-md relative overflow-hidden">
      <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Core SEO Text & Local Business Info */}
          <div className="lg:col-span-1 flex flex-col text-sm text-text-muted">
            <div className="flex items-center gap-2.5 bg-white py-1.5 px-3 rounded-xl border border-slate-200/80 w-fit mb-4 shadow-sm">
              <img 
                src="/assets/images/paranjape-official-logo.png" 
                alt="Paranjape Schemes" 
                className="h-6 w-auto object-contain"
              />
              <div className="h-4 w-px bg-slate-200"></div>
              <img 
                src="/assets/images/blue-ridge-official-logo.png" 
                alt="Paranjape Blue Ridge" 
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="mb-6 leading-relaxed font-medium">
              Pune's premier 138-acre integrated township. Explore luxury 2BHK, 3BHK, 4BHK, 5BHK, Duplex, and Simplex configurations across Hinjewadi, Mahalunge, and Baner corridors.
            </p>
            
            <address className="not-italic flex flex-col gap-3 text-xs mb-6">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span className="font-medium">Blue Ridge Township, Near Rajiv Gandhi Infotech Park, Phase 1, Hinjewadi, Pune, Maharashtra 411057</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gold shrink-0" />
                <span className="font-mono font-medium">+91-20-67210000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gold shrink-0" />
                <span className="font-mono font-medium">sales@paranjapeschemes.in</span>
              </div>
            </address>

            <a href="/insights" className="inline-block mt-2 text-gold hover:text-warm-white transition-colors uppercase tracking-widest font-bold text-[10px] font-mono">
              Read Market Insights & Blog →
            </a>
          </div>

          {/* Column 2: Google Maps Integration */}
          <div className="lg:col-span-1 border border-gold/20 rounded-2xl overflow-hidden h-64 shadow-md">
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
            <h4 className="text-[#070D1A] text-xs uppercase tracking-widest mb-4 font-bold border-b border-slate-200 pb-2 font-mono">
              Trending Pune Real Estate
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              {displayedLinks.map((url) => (
                <a
                  key={url.slug}
                  href={`/${url.slug}`}
                  className="text-slate-600 hover:text-[#B88E3E] transition-colors text-[10px] uppercase tracking-wider font-medium"
                >
                  {url.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Absolute bottom SEO string & Sitemap Link */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 font-sans">
          <p className="text-center sm:text-left">
            Paranjape Blue Ridge • Hinjewadi Phase 1, Pune • 138-Acre Integrated Township • RERA Compliant
          </p>
          <div className="flex gap-4 shrink-0 flex-wrap justify-center font-mono">
            <a href="/hinjewadi-micro-market" className="text-[#8F6A24] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Hinjewadi Guide</a>
            <span className="text-slate-300">|</span>
            <a href="/blue-ridge/ongoing-projects" className="text-[#8F6A24] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Active Clusters</a>
            <span className="text-slate-300">|</span>
            <a href="/construction-updates" className="text-[#8F6A24] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Construction Status</a>
            <span className="text-slate-300">|</span>
            <a href="/nri-investment" className="text-[#8F6A24] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">NRI Desk</a>
            <span className="text-slate-300">|</span>
            <a href="/directory" className="text-[#8F6A24] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Directory</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
