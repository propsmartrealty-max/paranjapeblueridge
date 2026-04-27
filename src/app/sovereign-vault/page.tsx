"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Mail, Phone, Calendar, Download, Search, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  timestamp: string;
}

export default function SovereignVault() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock leads for presentation
    const mockLeads = [
        { id: '1', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 98220 12345', project: 'Promenade Residences', timestamp: '2026-04-27 10:15' },
        { id: '2', name: 'Rahul Deshmukh', email: 'rahul.d@itcorp.com', phone: '+91 91234 56789', project: 'The Altius', timestamp: '2026-04-27 11:30' },
        { id: '3', name: 'Priya Verma', email: 'priya.v@tech.in', phone: '+91 99887 76655', project: 'Ridges 41', timestamp: '2026-04-27 12:45' },
    ];
    setLeads(mockLeads);
  }, []);

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      
      <div className="container pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
                <span className="flex items-center gap-3 text-gold font-bold tracking-[6px] uppercase text-[10px] mb-4">
                    <Shield size={14} />
                    Sovereign Vault v2.0
                </span>
                <h1 className="text-5xl font-serif text-warm-white">Lead <span className="italic font-normal text-gold">Intelligence</span></h1>
                <p className="text-text-light mt-4">Secure dashboard for real-time lead tracking and CRM orchestration.</p>
            </div>
            <div className="flex gap-4">
                <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-light hover:text-warm-white transition-all">
                    <Download size={14} />
                    Export CSV
                </button>
                <button className="flex items-center gap-3 bg-gold text-navy px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">
                    <RefreshCw size={14} />
                    Refresh Node
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
                { label: "Total Leads", val: "148", color: "gold" },
                { label: "Conversion Rate", val: "12.4%", color: "warm-white" },
                { label: "High Intent", val: "42", color: "gold" }
            ].map((stat, i) => (
                <div key={i} className="bg-navy-light p-8 rounded-3xl border border-white/5">
                    <span className="text-[10px] text-text-light uppercase tracking-widest block mb-2">{stat.label}</span>
                    <span className={`text-4xl font-serif text-${stat.color} block`}>{stat.val}</span>
                </div>
            ))}
        </div>

        <div className="bg-navy-light rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search Leads by Name or Project..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-warm-white focus:border-gold outline-none transition-all"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Customer</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Project Focus</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Contact Channels</th>
                            <th className="p-6 text-left text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Timestamp</th>
                            <th className="p-6 text-right text-[10px] uppercase tracking-widest text-text-light border-b border-white/5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead, idx) => (
                            <motion.tr 
                                key={lead.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0"
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold">
                                            {lead.name[0]}
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-warm-white">{lead.name}</span>
                                            <span className="text-[10px] text-text-light">ID: BR-{lead.id}0024</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gold uppercase tracking-tighter">
                                        {lead.project}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="flex gap-4">
                                        <span title={lead.email}>
                                            <Mail size={16} className="text-text-light hover:text-gold cursor-pointer transition-colors" />
                                        </span>
                                        <span title={lead.phone}>
                                            <Phone size={16} className="text-text-light hover:text-gold cursor-pointer transition-colors" />
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6 text-xs text-text-light">
                                    {lead.timestamp}
                                </td>
                                <td className="p-6 text-right">
                                    <button className="text-[10px] font-bold text-gold uppercase tracking-widest border border-gold/30 px-4 py-2 rounded-lg hover:bg-gold hover:text-navy transition-all">
                                        View Details
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </main>
  );
}
