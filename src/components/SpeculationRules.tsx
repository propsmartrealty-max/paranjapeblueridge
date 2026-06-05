import React from 'react';
import { projects, articles } from '@/data/master-data';

/**
 * Speculation Rules API Component
 * 
 * Tells Google Chrome (which powers Google Search mobile ranking metrics)
 * to prerender the core project pages and prefetch all other internal pages
 * in the background. This results in 0ms load times and perfect Core Web Vitals.
 */
export default function SpeculationRules() {
  // Prerender homepage, micro-market guide, project detail pages, configuration sub-pages, and insights using relative paths
  const prerenderUrls = [
    "/",
    "/hinjewadi-micro-market",
    ...projects.map(p => `/${p.slug}`),
    ...projects.flatMap(p => (p.configurations || []).map(c => `/${p.slug}/${c.slug}`)),
    ...articles.map(a => `/insights/${a.slug}`)
  ];

  const rules = {
    "prerender": [
      {
        "source": "list",
        "urls": prerenderUrls
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
                  "/google-products-feed",
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
