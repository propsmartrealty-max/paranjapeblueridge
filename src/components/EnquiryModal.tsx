"use client";

import React, { useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // 1. Sovereign Vault - Local Storage Backup
    try {
      const existingLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      existingLeads.push({ ...formData, timestamp: new Date().toISOString(), source: 'blueridge_modal' });
      localStorage.setItem('ks_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.error("Vault save failed", err);
    }

    // 2. FormSubmit Endpoint for Email Delivery
    const formUrl = 'https://formsubmit.co/ajax/propsmartrealty@gmail.com';
    
    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        _subject: `New Enquiry from ${formData.name} - Paranjape Blue Ridge`,
        _captcha: "false" // Disable captcha for smoother UX
      }),
    })
    .then(response => response.json())
    .then(data => {
      setStatus('success');
      // Optional: Delay close
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', phone: '', email: '', message: '' });
        onClose();
      }, 3000);
    })
    .catch(error => {
      console.error("FormSubmit failed, attempting mailto fallback", error);
      // 3. Fallback mailto:
      window.location.href = `mailto:propsmartrealty@gmail.com?subject=Enquiry from ${formData.name}&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
      setStatus('success');
      setTimeout(() => { onClose(); }, 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-navy border border-gold/30 rounded-[3rem] shadow-[0_0_100px_rgba(212,168,83,0.15)] overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gold hover:text-warm-white transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-12">
          <div className="mb-10">
            <span className="text-gold font-bold tracking-[6px] uppercase text-[10px] block mb-4">Request Access</span>
            <h2 className="text-4xl font-serif text-warm-white leading-tight">Priority <span className="italic font-normal text-gold">Enquiry</span></h2>
            <p className="text-text-light mt-4 text-sm leading-relaxed">
              Unlock the sovereign portfolio for Paranjape Blue Ridge. Enter your details for exclusive inventory access.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-gold/10 text-gold p-8 rounded-3xl border border-gold/20 text-center animate-in slide-in-from-bottom duration-500">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/20">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-warm-white">Request Dispatched</h3>
              <p className="text-sm text-gold mt-2">Check your email for the Sovereign Vault access.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] text-gold uppercase font-bold tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-warm-white focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] text-gold uppercase font-bold tracking-widest ml-1">Phone</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-warm-white focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                    placeholder="+91"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-gold uppercase font-bold tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-warm-white focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold py-5 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 shadow-xl shadow-gold/20 uppercase text-xs tracking-widest"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Dispatching...
                  </span>
                ) : 'Secure Priority Access'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
