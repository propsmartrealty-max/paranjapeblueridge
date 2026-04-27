"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[4px] text-text-light mb-10">
      <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1.5">
        <Home size={10} />
        {t('Home', 'होम')}
      </Link>
      
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={10} className="opacity-30" />
          <Link 
            href={item.href} 
            className={`hover:text-gold transition-colors ${idx === items.length - 1 ? 'text-gold' : ''}`}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
