"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Download, Users, Shield, Lock, Trash2, 
  RefreshCw, Globe, CheckCircle2, AlertCircle, 
  Search, Mail, Phone, Calendar 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UnifiedSovereignVault() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexStatus, setIndexStatus] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const storedLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      setLeads(storedLeads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }
  }, [isAuthenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1925';
    if (pin === adminPin) {
      setIsAuthenticated(true);
    } else {
      alert('Unauthorized Protocol');
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Configuration', 'Budget', 'Source'];
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

  const triggerIndexing = async () => {
    if (!confirm('Initiate Sovereign Indexing Sweep? This will notify Google of all sitemap changes.')) return;
    
    setIsIndexing(true);
    setIndexStatus(null);
    
    try {
      const response = await fetch('/api/index-sweep', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PIN || '1925'}`
        }
      });
      const data = await response.json();
      setIndexStatus(data);
    } catch (err) {
      console.error("Indexing failed", err);
      setIndexStatus({ error: "Connection to Sovereign Engine lost." });
    } finally {
      setIsIndexing(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (l.source && l.source.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
                <span className="flex items-center gap-3 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-4">
                    <Shield size={14} />
                    Sovereign Vault v2.0
                </span>
                <h1 className="text-5xl font-serif text-warm-white">Lead <span className="italic font-normal text-gold">Intelligence</span></h1>
                <p className="text-text-light mt-4">Secure dashboard for real-time lead tracking and indexing orchestration.</p>
            </div>
            <div className="flex gap-4">
                <button 
                  onClick={clearLeads}
                  className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                    <Trash2 size={14} />
                    Purge
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

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-navy-light p-8 rounded-3xl border border-white/5">
                <span className="text-[10px] text-text-light uppercase tracking-widest block mb-2 font-bold">Total Leads</span>
                <span className="text-4xl font-serif text-warm-white block">{leads.length}</span>
            </div>
            <div className="bg-navy-light p-8 rounded-3xl border border-white/5">
                <span className="text-[10px] text-text-light uppercase tracking-widest block mb-2 font-bold">Today</span>
                <span className="text-4xl font-serif text-warm-white block">
                  {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
                </span>
            </div>
            <div className="bg-navy-light p-8 rounded-3xl border border-gold/20 shadow-lg shadow-gold/5 col-span-1 md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gold uppercase tracking-widest block font-bold flex items-center gap-2">
                    <Globe size={12} />
                    Indexing Engine
                  </span>
                  {indexStatus && (
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${indexStatus.error ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'}`}>
                      {indexStatus.error ? 'Failed' : 'Last Success'}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-serif text-warm-white">
                    {isIndexing ? (
                      <span className="flex items-center gap-2 text-gold animate-pulse">
                        <RefreshCw size={18} className="animate-spin" />
                        SWEEPING...
                      </span>
                    ) : (
                      <span className="text-emerald-500 uppercase tracking-widest text-lg font-bold">Protocol Active</span>
                    )}
                  </div>
                  <button 
                    onClick={triggerIndexing}
                    disabled={isIndexing}
                    className="bg-navy border border-gold/50 text-gold text-[9px] font-bold uppercase tracking-[2px] px-6 py-3 rounded-xl hover:bg-gold hover:text-navy transition-all"
                  >
                    Trigger Sweep
                  </button>
                </div>
            </div>
        </div>

        {/* SEARCH & TABLE SECTION */}
        <div className="bg-navy-light rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                    <input 
                        type="text" 
                        placeholder="Filter by Name or Source Page..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-warm-white focus:border-gold outline-none transition-all"
                    />
                </div>
                <div className="text-[10px] text-text-light uppercase tracking-widest font-bold hidden md:block">
                  Displaying {filteredLeads.length} Sovereign Records
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Customer Intel</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Source Protocol</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Config / Budget</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Captured On</th>
                            <th className="p-6 text-right text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                          {filteredLeads.map((lead, idx) => (
                              <motion.tr 
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0"
                              >
                                  <td className="p-6">
                                      <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold font-bold">
                                              {lead.name[0]}
                                          </div>
                                          <div>
                                              <span className="block text-sm font-bold text-warm-white">{lead.name}</span>
                                              <div className="flex gap-2 mt-1">
                                                <span title={lead.email} className="text-[10px] text-text-light flex items-center gap-1"><Mail size={10}/> {lead.email}</span>
                                                <span title={lead.phone} className="text-[10px] text-text-light flex items-center gap-1"><Phone size={10}/> {lead.phone}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="p-6">
                                      <span className="px-3 py-1 bg-gold/5 rounded-full text-[9px] font-bold text-gold uppercase tracking-widest border border-gold/10">
                                          {lead.source || 'Direct'}
                                      </span>
                                  </td>
                                  <td className="p-6">
                                      <div className="text-xs text-warm-white font-medium">{lead.bhk || 'N/A'}</div>
                                      <div className="text-[10px] text-text-light uppercase tracking-widest">{lead.budget || 'N/A'}</div>
                                  </td>
                                  <td className="p-6">
                                      <div className="flex items-center gap-2 text-xs text-text-light">
                                          <Calendar size={12} className="text-gold/50" />
                                          {new Date(lead.timestamp).toLocaleString()}
                                      </div>
                                  </td>
                                  <td className="p-6 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Secured</span>
                                      </div>
                                  </td>
                              </motion.tr>
                          ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredLeads.length === 0 && (
                  <div className="p-20 text-center text-text-light italic">
                    The Sovereign Vault is currently empty or no records match your filter.
                  </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
