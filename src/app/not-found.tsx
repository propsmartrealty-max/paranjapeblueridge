"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Mail, AlertCircle, ArrowRight } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function NotFound() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', bot_field: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (formData.bot_field) return;

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const mobileOnly = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;
    if (!phoneRegex.test(mobileOnly)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setFormStatus('submitting');
    const sanitize = (str: string) => {
      let clean = str.replace(/[<>]/g, '');
      if (DOMPurify) clean = DOMPurify.sanitize(clean);
      return clean;
    };

    const leadPayload = {
      name: sanitize(formData.name),
      phone: sanitize(formData.phone),
      email: sanitize(formData.email),
      bhk: 'Not Found Page Inquiry',
      source: '404_Page',
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      const data = await response.json();
      if (!response.ok && data.error) {
        setFormError(data.error);
        setFormStatus('idle');
        return;
      }
    } catch (err) {
      console.error("Lead API dispatch failed", err);
    }

    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', phone: '', email: '', bot_field: '' });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-text selection:bg-gold selection:text-navy">
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="text-[20rem] font-serif font-black text-gold">404</span>
        </div>
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-3 text-gold mb-6">
              <AlertCircle size={24} />
              <span className="font-bold tracking-[4px] uppercase text-xs">Route Not Found</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-warm-white leading-tight mb-6">
              The page you're looking for <span className="italic text-gilded font-normal">has moved.</span>
            </h1>
            <p className="text-text-light text-lg mb-10 max-w-md">
              You might be looking for an old project or a removed link. But don't worry, our latest luxury inventory in Hinjewadi Phase 1 is available.
            </p>
            <div className="space-y-4">
              <Link href="/paranjape-blue-ridge-promenade-hinjewadi-pune" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-gold/5 rounded-xl border border-white/10 hover:border-gold/30 transition-all">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Latest Project</span>
                  <span className="text-warm-white font-bold group-hover:text-gold transition-colors">Promenade Residences</span>
                </div>
                <ArrowRight size={16} className="text-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/hinjewadi-micro-market" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-gold/5 rounded-xl border border-white/10 hover:border-gold/30 transition-all">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Insights</span>
                  <span className="text-warm-white font-bold group-hover:text-gold transition-colors">Hinjewadi Micro-Market Guide</span>
                </div>
                <ArrowRight size={16} className="text-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-gold/5 rounded-xl border border-white/10 hover:border-gold/30 transition-all">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-widest block mb-1">Return</span>
                  <span className="text-warm-white font-bold group-hover:text-gold transition-colors">Go to Homepage</span>
                </div>
                <ArrowRight size={16} className="text-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl border border-gold/20 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-serif text-warm-white mb-2">Request Latest Inventory</h3>
            <p className="text-sm text-text-light mb-8">Skip the search. Let our relationship manager send you the latest pricing and floor plans.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <input
                type="text"
                name="bot_field"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                value={formData.bot_field}
                onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
              />

              {formError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs font-bold text-center">
                  {formError}
                </div>
              )}

              {formStatus === 'success' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/50 p-6 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Mail size={24} />
                  </div>
                  <h4 className="text-emerald-400 font-bold">Request Sent!</h4>
                  <p className="text-emerald-500/80 text-xs">We will contact you shortly with the details.</p>
                </div>
              ) : (
                <>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-gold/10 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm" 
                    placeholder="Full Name" 
                  />
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-gold/10 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm" 
                    placeholder="Mobile Number" 
                  />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-gold/10 rounded-xl p-3 text-warm-white focus:border-gold outline-none text-sm" 
                    placeholder="Email Address (Optional)" 
                  />
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gold text-navy py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl gold-glow disabled:opacity-50 border-none cursor-pointer mt-2"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Request Details'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
