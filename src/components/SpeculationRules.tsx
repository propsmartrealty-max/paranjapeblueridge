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
  const baseUrl = 'https://www.paranjapeblueridge.com';
  
  // Prerender homepage, micro-market guide, project detail pages, configuration sub-pages, and insights
  const prerenderUrls = [
    baseUrl,
    `${baseUrl}/hinjewadi-micro-market`,
    ...projects.map(p => `${baseUrl}/${p.slug}`),
    ...projects.flatMap(p => (p.configurations || []).map(c => `${baseUrl}/${p.slug}/${c.slug}`)),
    ...articles.map(a => `${baseUrl}/insights/${a.slug}`)
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
            { "href_matches": `${baseUrl}/*` },
            { 
              "not": { 
                "href_matches": [
                  `${baseUrl}/api/*`,
                  `${baseUrl}/feed.xml`,
                  `${baseUrl}/google-products-feed`,
                  `${baseUrl}/sitemap.xml`,
                  `${baseUrl}/*\\?*`
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
