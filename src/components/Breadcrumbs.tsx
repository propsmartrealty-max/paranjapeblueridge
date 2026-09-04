"use client";

import React from 'react';
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

    const excludedPrefixes = ['/insights', '/blog', '/sovereign-vault', '/content', '/brochure', '/api', '/html-sitemap'];
    if (excludedPrefixes.some(prefix => href.startsWith(prefix))) {
      return href;
    }

    if (href.startsWith('/')) {
      return `/mr-${href.substring(1)}`;
    }
    return href;
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 list-none p-0 m-0">
        <li className="flex items-center">
          <a href={getLocalizedHref('/')} aria-label={t('Navigate to Home', 'मुख्यपृष्ठावर जा')} className="hover:text-[#8F6A24] transition-colors flex items-center gap-1.5 no-underline text-slate-500">
            <Home size={11} aria-hidden="true" />
            <span>{t('Home', 'होम')}</span>
          </a>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight size={11} className="text-slate-300 shrink-0" aria-hidden="true" />
            <a 
              href={getLocalizedHref(item.href)} 
              aria-current={idx === items.length - 1 ? 'page' : undefined}
              className={`hover:text-[#8F6A24] transition-colors no-underline ${idx === items.length - 1 ? 'text-[#8F6A24] font-bold' : 'text-slate-600'}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
