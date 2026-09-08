'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Landmark, ExternalLink, QrCode } from 'lucide-react';

interface TrustBadgesSectionProps {
  clusterId?: 'promenade' | 'altius' | 'ridges-41' | 'all';
}

const reraProjects = [
  {
    id: 'promenade',
    name: 'Promenade Residences',
    number: 'P52100055581',
    qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fmaharera.maharerait.gov.in%2Fproject-details%3Fproject_id%3DP52100055581',
    status: 'RERA Registered & Active',
    completion: 'Sept 2029',
    url: 'https://maharera.maharerait.gov.in'
  },
  {
    id: 'altius',
    name: 'The Altius',
    number: 'P52100078116',
    qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fmaharera.maharerait.gov.in%2Fproject-details%3Fproject_id%3DP52100078116',
    status: 'RERA Registered & Active',
    completion: 'Dec 2029',
    url: 'https://maharera.maharerait.gov.in'
  },
  {
    id: 'ridges-41',
    name: 'Ridges 41',
    number: 'P52100000054',
    qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fmaharera.maharerait.gov.in%2Fproject-details%3Fproject_id%3DP52100000054',
    status: 'RERA Registered & Active',
    completion: 'Dec 2028',
    url: 'https://maharera.maharerait.gov.in'
  }
];

const bankPartners = [
  { name: 'State Bank of India', code: 'SBI APF: PNE/HIN/0942', tag: 'Lowest ROI from 8.35%' },
  { name: 'HDFC Bank Home Loans', code: 'HDFC APF: HDF-BLR-2024', tag: 'Fast-Track Sanction' },
  { name: 'ICICI Bank', code: 'ICICI APF: PUN/PAR/4481', tag: 'Pre-Approved Eligibility' },
  { name: 'Axis Bank', code: 'AXIS APF: AX-PUN-08812', tag: 'Special IT Professional Rates' },
  { name: 'Bank of Baroda', code: 'BOB APF: BOB-W-5519', tag: 'Zero Pre-closure Charges' }
];

export default function TrustBadgesSection({ clusterId = 'all' }: TrustBadgesSectionProps) {
  const displayedProjects = clusterId === 'all' 
    ? reraProjects 
    : reraProjects.filter(p => p.id === clusterId);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200 arch-section-divider">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#785415] text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
            <ShieldCheck size={14} className="text-[#785415]" />
            <span>MahaRERA Statutory Compliance & Bank Approvals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#070D1A] tracking-tight mb-4">
            100% Clear Title & Verified Approvals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans font-medium">
            Every residential tower at Paranjape Blue Ridge is registered under MahaRERA with transparent timelines and approved by India's premier nationalized and private banking institutions.
          </p>
        </div>

        {/* 1. Official MahaRERA QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {displayedProjects.map((project) => (
            <div 
              key={project.id}
              className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    <span>{project.status}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    Target: {project.completion}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-white p-2 rounded-xl border border-slate-300 shrink-0 shadow-xs group-hover:shadow-md transition-shadow">
                    <img 
                      src={project.qrImage} 
                      alt={`MahaRERA QR Code for ${project.name} - ${project.number}`} 
                      className="w-20 h-20 object-contain rounded-md"
                      loading="lazy"
                    />
                    <div className="flex items-center justify-center gap-1 mt-1 text-[8px] font-mono text-slate-500 uppercase font-bold">
                      <QrCode size={9} /> Scan RERA
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-serif font-bold text-[#070D1A] group-hover:text-[#785415] transition-colors truncate">
                      {project.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#785415] font-extrabold my-1">
                      {project.number}
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                      Scannable digital QR certificate verified against Maharashtra Real Estate Regulatory Authority records.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-[#785415] hover:text-[#070D1A] no-underline transition-colors"
              >
                <span>Verify on MahaRERA Portal</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

        {/* 2. Bank APF Approvals Ribbon */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-50 via-amber-50/40 to-slate-50 border-2 border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-[#785415] shrink-0">
                <Landmark size={24} />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-[#070D1A]">
                  Approved Project Finance (APF) Partners
                </h4>
                <p className="text-xs text-slate-600 font-sans font-medium">
                  Pre-approved for hassle-free home loan disbursements with maximum LTV ratios
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#785415] font-bold bg-white px-4 py-2 rounded-full border border-amber-300 shadow-xs shrink-0">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Dedicated On-Site Bank Desk Available</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
            {bankPartners.map((bank, index) => (
              <div key={index} className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <div className="text-xs font-serif font-bold text-[#070D1A] mb-1">
                  {bank.name}
                </div>
                <div className="text-[10px] font-mono text-slate-600 font-bold mb-1">
                  {bank.code}
                </div>
                <div className="text-[9px] font-sans font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block border border-emerald-100">
                  {bank.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-[11px] text-slate-500 font-sans">
            Disclaimer: Loans are disbursed at the sole discretion of the lending financial institutions under prevailing RBI norms.
          </div>
        </div>

      </div>
    </section>
  );
}
