"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function JSONLD() {
  const pathname = usePathname();
  const slug = pathname ? pathname.replace(/^\//, '') : '';
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);

  const baseGraph: any[] = [
      {
        "@type": "RealEstateListing",
        "@id": "https://www.paranjapeblueridge.com/listing",
        "name": "Paranjape Blue Ridge Hinjewadi - 2, 3 & 4 BHK Luxury Flats",
        "description": "Experience the grand 138-acre integrated township at Paranjape Blue Ridge Hinjewadi Phase 1.",
        "url": "https://www.paranjapeblueridge.com",
        "image": "https://www.paranjapeblueridge.com/assets/images/township-night.png"
      },
      {
        "@type": "RealEstateAgent",
        "name": "Paranjape Schemes (Construction) Ltd.",
        "image": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
        "@id": "https://www.paranjapeblueridge.com/business",
        "url": "https://www.paranjapeblueridge.com",
        "telephone": "+918149866385",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Phase 1, Hinjewadi",
          "addressLocality": "Pune",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5913,
          "longitude": 73.7389
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Paranjape Blue Ridge good for investment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Blue Ridge is Hinjewadi's most successful integrated township with high rental yields (4-5%) and consistent capital appreciation."
            }
          },
          {
            "@type": "Question",
            "name": "What are the configuration options in Ridges 41?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ridges 41 offers high-rise 2, 3, and 4 BHK residences with advanced MiVAN construction."
            }
          }
        ]
      }
  ];

  if (pseoData) {
      baseGraph.push({
        "@type": "Product",
        "name": pseoData.title,
        "description": pseoData.intent,
        "brand": {
          "@type": "Brand",
          "name": "Paranjape Schemes"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "9760000",
          "availability": "https://schema.org/InStock",
          "url": `https://www.paranjapeblueridge.com/${pseoData.slug}`
        }
      });
  } else {
      baseGraph.push({
        "@type": "Product",
        "name": "The Altius",
        "description": "Ultra-luxury 4 & 5 BHK riverfront apartments with golf course access.",
        "brand": {
          "@type": "Brand",
          "name": "Paranjape Schemes"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "18000000",
          "availability": "https://schema.org/InStock",
          "url": "https://www.paranjapeblueridge.com/paranjape-blue-ridge-altius-hinjewadi-pune"
        }
      });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": baseGraph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
