import React from 'react';
import { projects, articles } from '@/data/master-data';

/**
 * Speculation Rules API Component (Chrome / Chromium 0ms Prerender Engine)
 * 
 * Instructs Chromium browsers to prerender core project pages, high-intent PSEO hubs,
 * and configuration routes in background memory for instant 0ms page loads and 100/100 INP.
 */
export default function SpeculationRules() {
  const prerenderUrls = [
    "/",
    "/mr",
    "/hinjewadi-micro-market",
    "/mr-hinjewadi-micro-market",
    ...projects.map(p => `/${p.slug}`),
    ...projects.map(p => `/mr-${p.slug}`),
    ...projects.flatMap(p => (p.configurations || []).map(c => `/${p.slug}/${c.slug}`)),
    ...articles.map(a => `/insights/${a.slug}`)
  ];

  const rules = {
    "prerender": [
      {
        "source": "list",
        "urls": prerenderUrls,
        "eagerness": "eager"
      }
    ],
    "prefetch": [
      {
        "source": "document",
        "where": {
          "and": [
            { "href_matches": "/*" },
            { 
              "not": { 
                "href_matches": [
                  "/api/*",
                  "/feed.xml",
                  "/sitemap.xml",
                  "/*\\?*"
                ] 
              } 
            }
          ]
        },
        "eagerness": "moderate"
      }
    ]
  };

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
