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
  const { language, t } = useLanguage();

  const getLocalizedHref = (href: string) => {
    if (language !== 'mr') return href;
    if (href === '/') return '/mr';
    if (href.startsWith('/mr') || href.startsWith('/mr-')) return href;

    if (href === '/hinjewadi-micro-market') return '/mr-hinjewadi-micro-market';

    if (href.startsWith('/')) {
      return `/mr-${href.substring(1)}`;
    }
    return href;
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[4px] text-text-light mb-10">
      <Link href={getLocalizedHref('/')} className="hover:text-gold transition-colors flex items-center gap-1.5">
        <Home size={10} />
        {t('Home', 'होम')}
      </Link>
      
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight size={10} className="opacity-30" />
            <Link 
              href={getLocalizedHref(item.href)} 
              aria-current={idx === items.length - 1 ? 'page' : undefined}
              className={`hover:text-gold transition-colors ${idx === items.length - 1 ? 'text-gold' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
