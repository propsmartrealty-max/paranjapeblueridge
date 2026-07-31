import JSONLD from '@/components/JSONLD';
import SpeculationRules from '@/components/SpeculationRules';
import type { FC } from 'react';

/**
 * SeoHead — App Router compatible version.
 *
 * IMPORTANT: next/head is NOT supported in the App Router.
 * Meta tags (title, description, OG, Twitter) are managed via the Next.js
 * Metadata API (export metadata / generateMetadata) in layout.tsx and page.tsx.
 *
 * This component only renders:
 *  1. JSONLD structured data (JSON-LD script tags)
 *  2. SpeculationRules (prefetch/prerender hints)
 *
 * Both are safe to include inside <head> via the layout.tsx <head> block.
 */

interface SeoHeadProps {
  pathname: string;
}

const SeoHead: FC<SeoHeadProps> = ({ pathname }) => {
  return (
    <>
      <JSONLD pathname={pathname} />
      <SpeculationRules />
    </>
  );
};

export default SeoHead;
