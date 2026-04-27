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
        className="absolute inset-0 bg-space-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-warm-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-space-black/50 hover:text-space-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-playfair font-bold text-space-black mb-2">Request Information</h2>
          <p className="text-space-black/70 mb-6 font-inter text-sm">
            Enter your details below to receive the complete project brochure, pricing, and floor plans for Paranjape Blue Ridge.
          </p>

          {status === 'success' ? (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-center">
              <svg className="w-12 h-12 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <h3 className="font-bold text-lg">Request Sent Successfully!</h3>
              <p className="text-sm opacity-80 mt-1">Our sales team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-space-black/80 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-space-black/10 rounded-xl focus:ring-2 focus:ring-accent-bronze focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-space-black/80 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-space-black/10 rounded-xl focus:ring-2 focus:ring-accent-bronze focus:border-transparent transition-all outline-none"
                    placeholder="+91 90000 00000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-space-black/80 mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-space-black/10 rounded-xl focus:ring-2 focus:ring-accent-bronze focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-accent-bronze text-white font-inter font-medium py-4 rounded-xl mt-6 hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending Request...
                  </span>
                ) : 'Request Details'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
