import React from 'react';

export default function JSONLD() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": "https://blueridge-hinjewadi.com/#listing",
        "name": "Paranjape Blue Ridge Hinjewadi",
        "description": "Premium 138-acre integrated township in Hinjewadi Phase 1, Pune. Featuring Promenade, The Altius, and Ridges 41.",
        "url": "https://blueridge-hinjewadi.com",
        "image": "https://blueridge-hinjewadi.com/assets/images/township-night.png"
      },
      {
        "@type": "LocalBusiness",
        "name": "Paranjape Blue Ridge",
        "image": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
        "@id": "https://blueridge-hinjewadi.com/#business",
        "url": "https://blueridge-hinjewadi.com",
        "telephone": "+919672559666",
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
      },
      {
        "@type": "Product",
        "name": "The Altius Riverside Residences",
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
          "url": "https://blueridge-hinjewadi.com/#altius"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
