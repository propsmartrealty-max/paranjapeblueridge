"use client";

import React from 'react';
import IndependentClusterDetail from './IndependentClusterDetail';

interface SlugPageClientProps {
  project?: any;
  slug?: string;
}

export default function SlugPageClient({ project, slug }: SlugPageClientProps) {
  const targetSlug = project?.slug || slug || 'promenade';

  return (
    <div className="w-full bg-[#FAF9F6] text-[#070D1A]">
      <IndependentClusterDetail clusterSlug={targetSlug} />
    </div>
  );
}
