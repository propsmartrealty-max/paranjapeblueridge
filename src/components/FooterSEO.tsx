import React from 'react';
import { getCuratedPseoLinks } from '@/data/seo-matrix';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function FooterSEO() {
  const displayedLinks = getCuratedPseoLinks(60);

  return (
    <footer className="bg-white border-t-2 border-slate-200 pt-12 pb-8 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Core SEO Text & Local Business Info */}
          <div className="lg:col-span-1 flex flex-col text-sm text-slate-600">
            <div className="flex items-center gap-2.5 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-200 w-fit mb-4 shadow-xs">
              <img 
                src="/assets/images/paranjape-official-logo.png" 
                alt="Paranjape Schemes" 
                className="h-6 w-auto object-contain shrink-0"
              />
              <div className="h-4 w-px bg-slate-200 shrink-0"></div>
              <img 
                src="/assets/images/blue-ridge-official-logo.png" 
                alt="Paranjape Blue Ridge" 
                className="h-6 w-auto object-contain shrink-0"
              />
            </div>
            <p className="mb-4 leading-relaxed font-medium text-slate-700">
              <strong>Paranjape Schemes (Construction) Limited</strong> presents <strong>Paranjape Blue Ridge Hinjewadi Phase 1</strong>, Pune's landmark 138-acre integrated sovereign township. Explore luxury riverfront and golf-facing 2 BHK, 3 BHK, 4 BHK, and Duplex penthouses across <strong>Promenade Residences</strong>, <strong>The Altius</strong>, and <strong>Ridges 41</strong>.
            </p>
            
            <address className="not-italic flex flex-col gap-3 text-xs mb-6 text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#785415] shrink-0 mt-0.5" />
                <span className="font-medium">Paranjape Blue Ridge Township, Near Rajiv Gandhi Infotech Park, Phase 1, Hinjewadi, Pune, Maharashtra 411057</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#785415] shrink-0" />
                <span className="font-mono font-bold">+91-20-67210000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#785415] shrink-0" />
                <span className="font-mono font-bold">sales@paranjapeschemes.in</span>
              </div>
            </address>

            <a href="/insights" className="inline-block mt-1 text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold text-[11px] font-mono no-underline">
              Read Paranjape Real Estate Market Insights →
            </a>
          </div>

          {/* Column 2: Google Maps Integration */}
          <div className="lg:col-span-1 border-2 border-slate-200 rounded-2xl overflow-hidden h-64 shadow-sm">
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
              Paranjape Schemes & Blue Ridge Keywords
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              {displayedLinks.map((url) => (
                <a
                  key={url.slug}
                  href={`/${url.slug}`}
                  className="text-slate-600 hover:text-[#785415] transition-colors text-[10px] uppercase tracking-wider font-semibold no-underline"
                >
                  {url.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Absolute bottom SEO string & Sitemap Link */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 gap-4 font-sans font-medium">
          <p className="text-center sm:text-left">
            Paranjape Blue Ridge • Hinjewadi Phase 1, Pune • 138-Acre Integrated Township • MahaRERA Certified
          </p>
          <div className="flex gap-3 sm:gap-4 shrink-0 flex-wrap justify-center font-mono">
            <a href="/blue-ridge-public-school" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">ICSE School</a>
            <span className="text-slate-300">|</span>
            <a href="/blue-ridge-golf-course" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">9-Hole Golf</a>
            <span className="text-slate-300">|</span>
            <a href="/blue-ridge-boat-club" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Boat Club</a>
            <span className="text-slate-300">|</span>
            <a href="/blue-ridge-sez-tech-park" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">IT SEZ</a>
            <span className="text-slate-300">|</span>
            <a href="/hinjewadi-micro-market" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Hinjewadi Guide</a>
            <span className="text-slate-300">|</span>
            <a href="/blue-ridge/ongoing-projects" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Active Clusters</a>
            <span className="text-slate-300">|</span>
            <a href="/construction-updates" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Construction</a>
            <span className="text-slate-300">|</span>
            <a href="/nri-investment" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">NRI Desk</a>
            <span className="text-slate-300">|</span>
            <a href="/directory" className="text-[#785415] hover:text-[#070D1A] transition-colors uppercase tracking-widest font-bold no-underline">Directory</a>
          </div>
        </div>

        {/* MahaRERA Statutory Compliance & Legal Links */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-3">
          <p className="text-center sm:text-left max-w-2xl leading-relaxed">
            <strong>MahaRERA Registration Details:</strong> Promenade Residences: <strong>P52100055581</strong> | The Altius: <strong>P52100078116</strong> | Ridges 41: <strong>P52100000054</strong>. Project details available at <a href="https://maharera.maharerait.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#785415] underline">maharera.maharerait.gov.in</a>. Managed by authorized channel partner Propsmart Realty. Conceptual images for illustration only.
          </p>
          <div className="flex gap-3 shrink-0 font-mono text-[9px] uppercase tracking-wider">
            <a href="/privacy-policy" className="text-slate-600 hover:text-[#785415] transition-colors no-underline">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="text-slate-600 hover:text-[#785415] transition-colors no-underline">Terms & Conditions</a>
            <span>•</span>
            <a href="/disclaimer" className="text-slate-600 hover:text-[#785415] transition-colors no-underline">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
