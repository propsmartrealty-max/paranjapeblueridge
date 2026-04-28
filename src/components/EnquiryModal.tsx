"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bhk: '',
    budget: '',
    intent: 'Self Use',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isOpen) return null;

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // 1. Sovereign Vault - Local Storage Backup
    try {
      const existingLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      existingLeads.push({ ...formData, timestamp: new Date().toISOString(), source: 'blueridge_qualified_modal' });
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
        _subject: `💎 QUALIFIED: ${formData.name} - ${formData.bhk} - ${formData.budget}`,
        _captcha: "false" 
      }),
    })
    .then(response => response.json())
    .then(data => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setStep(1);
        setFormData({ name: '', phone: '', email: '', bhk: '', budget: '', intent: 'Self Use', message: '' });
        onClose();
      }, 3000);
    })
    .catch(error => {
      console.error("FormSubmit failed, attempting mailto fallback", error);
      window.location.href = `mailto:propsmartrealty@gmail.com?subject=Enquiry from ${formData.name}&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AConfig: ${formData.bhk}%0D%0ABudget: ${formData.budget}`;
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
        
        {/* Progress Bar */}
        <div className="absolute top-2 left-0 h-1 bg-gold transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }}></div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gold hover:text-warm-white transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-12">
          <div className="mb-10">
            <span className="text-gold font-bold tracking-[6px] uppercase text-[10px] block mb-4">Step {step} of 2</span>
            <h2 className="text-4xl font-serif text-warm-white leading-tight">
              {step === 1 ? 'Priority ' : 'Qualification '}
              <span className="italic font-normal text-gold">{step === 1 ? 'Enquiry' : 'Protocol'}</span>
            </h2>
          </div>

          {status === 'success' ? (
            <div className="bg-gold/10 text-gold p-8 rounded-3xl border border-gold/20 text-center animate-in slide-in-from-bottom duration-500">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/20">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-warm-white">Protocol Activated</h3>
              <p className="text-sm text-gold mt-2">Our Sovereign desk will contact you within 60 minutes.</p>
            </div>
          ) : (
            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={nextStep} 
                    className="space-y-6"
                  >
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

                    <button 
                      type="submit" 
                      className="w-full bg-gold text-navy font-bold py-5 rounded-2xl mt-4 hover:scale-[1.02] transition-all uppercase text-xs tracking-widest shadow-xl shadow-gold/20"
                    >
                      Next: Choose Configuration
                    </button>
                  </motion.form>
                ) : (
                  <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-[10px] text-gold uppercase font-bold tracking-widest ml-1">Interested Configuration</label>
                      <select 
                        required
                        value={formData.bhk}
                        onChange={e => setFormData({...formData, bhk: e.target.value})}
                        className="w-full px-6 py-4 bg-navy-light border border-white/10 rounded-2xl text-warm-white focus:border-gold outline-none"
                      >
                        <option value="">Select BHK</option>
                        <option value="2BHK">2 BHK Apartment</option>
                        <option value="3BHK">3 BHK Apartment</option>
                        <option value="4BHK">4 BHK Elite</option>
                        <option value="5BHK">5 BHK Sky Villa</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-gold uppercase font-bold tracking-widest ml-1">Approximate Budget</label>
                      <select 
                        required
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-6 py-4 bg-navy-light border border-white/10 rounded-2xl text-warm-white focus:border-gold outline-none"
                      >
                        <option value="">Select Range</option>
                        <option value="80L - 1Cr">₹80L - ₹1 Cr</option>
                        <option value="1Cr - 1.5Cr">₹1 Cr - ₹1.5 Cr</option>
                        <option value="1.5Cr - 2.5Cr">₹1.5 Cr - ₹2.5 Cr</option>
                        <option value="Above 2.5Cr">Above ₹2.5 Cr</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         type="button" 
                         onClick={() => setStep(1)}
                         className="py-4 border border-white/10 text-text-light rounded-2xl text-[10px] font-bold uppercase tracking-widest"
                       >
                         Back
                       </button>
                       <button 
                         type="submit" 
                         disabled={status === 'submitting'}
                         className="bg-gold text-navy font-bold py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                       >
                         {status === 'submitting' ? 'Processing...' : 'Complete Request'}
                       </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
