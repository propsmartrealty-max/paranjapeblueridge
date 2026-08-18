'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import FooterSEO from '@/components/FooterSEO';
import { Copy, CheckCircle2 } from 'lucide-react';

export default function DataIndexHub() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const marketReportCode = `<iframe src="https://paranjapeblueridge.com/embed/pune-market-report" width="100%" height="600" style="border:none; border-radius:12px; overflow:hidden;" title="Pune Real Estate Market Report"></iframe><p style="text-align:center; font-size:12px;"><a href="https://paranjapeblueridge.com" rel="dofollow">Data Powered by Paranjape Blue Ridge</a></p>`;
  
  const roiCode = `<iframe src="https://paranjapeblueridge.com/embed/roi-calculator" width="100%" height="800" style="border:none; border-radius:12px; overflow:hidden;" title="Pune Real Estate ROI Calculator"></iframe><p style="text-align:center; font-size:12px;"><a href="https://paranjapeblueridge.com" rel="dofollow">ROI Data provided by Paranjape Blue Ridge</a></p>`;

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      
      <section className="pt-32 pb-20 container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-warm-white mb-6">
            Pune Real Estate <span className="text-gold italic font-normal">Data Hub</span>
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
            Open-source market reports, interactive calculators, and live analytics. 
            Journalists, bloggers, and analysts are free to embed these tools on their platforms using the provided HTML codes.
          </p>
        </div>

        <div className="space-y-24">
          
          {/* Market Report Embed */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif text-gold mb-4">Live Pune Market Report Widget</h2>
                <p className="text-text-light mb-8">
                  Enhance your articles with real-time property price trends, Metro Line 3 impact stats, and rental yield heatmaps. This lightweight widget auto-updates and perfectly scales to mobile devices.
                </p>
                <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-white/5 px-4 py-2 flex justify-between items-center border-b border-white/10">
                    <span className="text-xs text-text-light uppercase tracking-widest font-bold">Embed Code (HTML)</span>
                    <button 
                      onClick={() => handleCopy(marketReportCode, 'market')}
                      className="text-gold hover:text-warm-white transition-colors p-1"
                    >
                      {copied === 'market' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap font-mono">
                    {marketReportCode}
                  </pre>
                </div>
                <p className="text-[10px] text-text-light mt-4 uppercase tracking-widest">
                  * By embedding this widget, you agree to retain the "dofollow" attribution link.
                </p>
              </div>
              <div className="lg:w-1/2 w-full h-[500px] border border-white/10 rounded-xl overflow-hidden relative bg-black">
                <div className="absolute inset-0 flex items-center justify-center text-text-light/50 text-sm font-bold uppercase tracking-widest z-0">
                  Live Preview Loading...
                </div>
                <iframe src="/embed/pune-market-report" className="w-full h-full relative z-10" />
              </div>
            </div>
          </div>

          {/* ROI Calculator Embed */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif text-gold mb-4">Interactive ROI & Yield Calculator</h2>
                <p className="text-text-light mb-8">
                  Perfect for finance bloggers and investment analysis articles. Allow your readers to calculate appreciation, rental yields, and net ROI over a 10-year horizon for properties in the Hinjewadi IT corridor.
                </p>
                <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-white/5 px-4 py-2 flex justify-between items-center border-b border-white/10">
                    <span className="text-xs text-text-light uppercase tracking-widest font-bold">Embed Code (HTML)</span>
                    <button 
                      onClick={() => handleCopy(roiCode, 'roi')}
                      className="text-gold hover:text-warm-white transition-colors p-1"
                    >
                      {copied === 'roi' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap font-mono">
                    {roiCode}
                  </pre>
                </div>
                <p className="text-[10px] text-text-light mt-4 uppercase tracking-widest">
                  * By embedding this widget, you agree to retain the "dofollow" attribution link.
                </p>
              </div>
              <div className="lg:w-1/2 w-full h-[600px] border border-white/10 rounded-xl overflow-hidden relative bg-black">
                <div className="absolute inset-0 flex items-center justify-center text-text-light/50 text-sm font-bold uppercase tracking-widest z-0">
                  Live Preview Loading...
                </div>
                <iframe src="/embed/roi-calculator" className="w-full h-full relative z-10" />
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <FooterSEO />
    </main>
  );
}
