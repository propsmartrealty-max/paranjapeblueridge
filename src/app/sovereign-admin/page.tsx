"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Download, Users, Shield, Lock, Trash2 } from 'lucide-react';

export default function SovereignAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      setLeads(storedLeads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }
  }, [isAuthenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1925') { // Default PIN: 1925 (User can change this)
      setIsAuthenticated(true);
    } else {
      alert('Unauthorized Protocol');
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Phone', 'Email', 'BHK', 'Budget', 'Source'];
    const rows = leads.map(l => [
      new Date(l.timestamp).toLocaleDateString(),
      l.name,
      l.phone,
      l.email,
      l.bhk || 'N/A',
      l.budget || 'N/A',
      l.source
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sovereign_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const clearLeads = () => {
    if (confirm('Are you sure you want to purge the Sovereign Vault? This cannot be undone.')) {
      localStorage.setItem('ks_leads', '[]');
      setLeads([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center p-6 text-text">
        <div className="w-full max-w-md bg-navy-light border border-gold/30 p-12 rounded-[3rem] shadow-2xl text-center">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
            <Lock size={24} />
          </div>
          <h1 className="text-3xl font-serif text-warm-white mb-4">Sovereign <span className="italic font-normal text-gold">Vault</span></h1>
          <p className="text-text-light text-sm mb-8">Enter access protocol to view lead intelligence.</p>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="ENTER PIN"
              className="w-full bg-navy border border-white/10 rounded-2xl p-4 text-center tracking-[1em] text-gold focus:border-gold outline-none"
            />
            <button className="w-full bg-gold text-navy font-bold py-4 rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-gold/20">
              Access Vault
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy text-text pt-24 pb-20">
      <Navbar />
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-4">
              <Shield size={14} />
              Vault Intelligence Dashboard
            </div>
            <h1 className="text-5xl font-serif text-warm-white">Lead <span className="italic font-normal text-gold text-4xl">Management</span></h1>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={clearLeads}
               className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
             >
               <Trash2 size={14} />
               Purge Vault
             </button>
             <button 
               onClick={exportToCSV}
               className="flex items-center gap-3 bg-gold text-navy px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gold/20"
             >
               <Download size={14} />
               Export CSV
             </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-navy-light p-8 rounded-3xl border border-white/5">
              <div className="text-[10px] text-text-light uppercase tracking-widest mb-2 font-bold">Total Leads</div>
              <div className="text-4xl font-serif text-warm-white">{leads.length}</div>
           </div>
           <div className="bg-navy-light p-8 rounded-3xl border border-white/5">
              <div className="text-[10px] text-text-light uppercase tracking-widest mb-2 font-bold">Today</div>
              <div className="text-4xl font-serif text-warm-white">
                {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
              </div>
           </div>
           <div className="bg-navy-light p-8 rounded-3xl border border-white/5">
              <div className="text-[10px] text-gold uppercase tracking-widest mb-2 font-bold">Vault Status</div>
              <div className="text-2xl font-serif text-gold">ACTIVE SECURE</div>
           </div>
        </div>

        {/* TABLE */}
        <div className="bg-navy-light border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-5 text-[10px] font-bold text-gold uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gold uppercase tracking-widest">Name</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gold uppercase tracking-widest">Contact</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gold uppercase tracking-widest">BHK / Budget</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gold uppercase tracking-widest">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 text-sm text-text-light">{new Date(lead.timestamp).toLocaleDateString()}</td>
                    <td className="px-8 py-6 text-sm text-warm-white font-bold">{lead.name}</td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-warm-white font-medium">{lead.phone}</div>
                      <div className="text-[10px] text-text-light">{lead.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold rounded-lg border border-gold/20 mr-2 uppercase">
                        {lead.bhk || 'N/A'}
                      </span>
                      <span className="text-xs text-text-light">{lead.budget || 'N/A'}</span>
                    </td>
                    <td className="px-8 py-6 text-[10px] text-text-light font-bold uppercase tracking-widest">{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {leads.length === 0 && (
            <div className="p-20 text-center text-text-light italic">
              The Sovereign Vault is currently empty.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
