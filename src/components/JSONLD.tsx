"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function JSONLD() {
  const pathname = usePathname();
  const slug = pathname ? pathname.replace(/^\//, '') : '';
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);

  const getSiloFAQs = (silo: string, title: string) => {
    switch(silo) {
      case 'investor':
        return [
          { q: `Is ${title} a good investment?`, a: `Yes, ${title} offers 4-5% rental yields and is the most secure asset in Hinjewadi Phase 1.` },
          { q: "What is the expected ROI?", a: "Blue Ridge has seen a 12% annual capital appreciation over the last 3 years." }
        ];
      case 'corporate':
        return [
          { q: `How far is ${title} from IT parks?`, a: "It is located within walking distance to Embassy Tech Zone, Quadron, and Infosys Phase 1." },
          { q: "Is there a walk-to-work lifestyle?", a: "Yes, Blue Ridge is designed as a walk-to-work integrated township." }
        ];
      case 'battleground':
        return [
          { q: `Why choose Blue Ridge over ${title.split('vs')[1]}?`, a: "Blue Ridge offers a 138-acre ready integrated ecosystem with a golf course, school, and boat club which standalone projects lack." },
          { q: "Is the possession ready?", a: "Most clusters in Blue Ridge are ready or near possession compared to competitors' under-construction phases." }
        ];
      default:
        return [
          { q: `What are the amenities at ${title}?`, a: "9-hole golf course, private boat club, Blue Ridge Public School, pet park, and multi-tier security." },
          { q: "Is it RERA registered?", a: "Yes, all projects in Blue Ridge are MahaRERA certified." }
        ];
    }
  };

  const baseGraph: any[] = [
      {
        "@type": "RealEstateListing",
        "@id": "https://paranjapeblueridge.com/listing",
        "name": "Paranjape Blue Ridge Hinjewadi - 2, 3 & 4 BHK Luxury Flats",
        "description": "Experience the grand 138-acre integrated township at Paranjape Blue Ridge Hinjewadi Phase 1.",
        "url": "https://paranjapeblueridge.com",
        "image": "https://paranjapeblueridge.com/assets/images/township-night.png"
      },
      {
        "@type": "RealEstateAgent",
        "name": "Paranjape Schemes (Construction) Ltd.",
        "image": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
        "@id": "https://paranjapeblueridge.com/business",
        "url": "https://paranjapeblueridge.com",
        "telephone": "+918149866385",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Phase 1, Hinjewadi",
          "addressLocality": "Pune",
          "postalCode": "411057",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "VideoObject",
        "name": "Paranjape Blue Ridge - Sovereign Cinematic Tour",
        "description": "A 138-acre luxury integrated township by Paranjape Schemes in Hinjewadi Phase 1.",
        "thumbnailUrl": "https://paranjapeblueridge.com/assets/images/township-night.png",
        "uploadDate": "2024-05-01T08:00:00+08:00",
        "duration": "PT2M30S",
        "contentUrl": "https://paranjapeblueridge.com/assets/videos/sovereign-tour.mp4",
        "embedUrl": "https://paranjapeblueridge.com",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 8504
        }
      }
  ];

  if (pseoData) {
      baseGraph.push({
        "@type": "Product",
        "name": pseoData.title,
        "description": pseoData.intent,
        "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "9500000",
          "availability": "https://schema.org/InStock",
          "url": `https://paranjapeblueridge.com/${pseoData.slug}`
        }
      });

      // Inject Silo FAQ
      const faqs = getSiloFAQs(pseoData.silo, pseoData.title);
      baseGraph.push({
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
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
