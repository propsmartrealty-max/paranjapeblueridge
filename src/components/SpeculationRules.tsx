import React from 'react';

/**
 * Speculation Rules API Component
 * 
 * Tells Google Chrome (which powers Google Search mobile ranking metrics)
 * to prerender the core project pages and prefetch all other internal pages
 * in the background. This results in 0ms load times and perfect Core Web Vitals.
 */
export default function SpeculationRules() {
  const rules = {
    "prerender": [
      {
        "source": "list",
        "urls": [
          "https://www.paranjapeblueridge.com/paranjape-blue-ridge-promenade-hinjewadi-pune",
          "https://www.paranjapeblueridge.com/paranjape-blue-ridge-altius-hinjewadi-pune",
          "https://www.paranjapeblueridge.com/paranjape-blue-ridge-41-hinjewadi-pune",
          "https://www.paranjapeblueridge.com/hinjewadi-micro-market"
        ]
      }
    ],
    "prefetch": [
      {
        "source": "document",
        "where": {
          "and": [
            { "href_matches": "https://www.paranjapeblueridge.com/*" },
            { 
              "not": { 
                "href_matches": [
                  "https://www.paranjapeblueridge.com/api/*",
                  "https://www.paranjapeblueridge.com/feed.xml",
                  "https://www.paranjapeblueridge.com/sitemap.xml",
                  "https://www.paranjapeblueridge.com/*\\?*"
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
