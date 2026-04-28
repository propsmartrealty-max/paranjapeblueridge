export const seoMatrix = {
  configurations: [
    { slug: '2-bhk-flats', name: '2 BHK Flats', type: 'Apartment' },
    { slug: '3-bhk-flats', name: '3 BHK Flats', type: 'Apartment' },
    { slug: '4-bhk-flats', name: '4 BHK Flats', type: 'Apartment' },
    { slug: '5-bhk-flats', name: '5 BHK Flats', type: 'Apartment' },
    { slug: 'luxury-apartments', name: 'Luxury Apartments', type: 'Apartment' }
  ],
  locations: [
    { slug: 'hinjewadi-phase-1', name: 'Hinjewadi Phase 1' },
    { slug: 'hinjewadi-phase-2', name: 'Hinjewadi Phase 2' },
    { slug: 'hinjewadi-phase-3', name: 'Hinjewadi Phase 3' },
    { slug: 'wakad', name: 'Wakad' },
    { slug: 'pune', name: 'Pune' }
  ],
  // Phase 3 Silos
  techParks: [
    { slug: 'near-embassy-tech-zone', name: 'near Embassy Tech Zone' },
    { slug: 'near-quadron-business-park', name: 'near Quadron Business Park' },
    { slug: 'near-qubix-it-park', name: 'near Qubix IT Park' },
    { slug: 'near-infosys-hinjewadi', name: 'near Infosys Hinjewadi' },
    { slug: 'near-tcs-hinjewadi', name: 'near TCS Hinjewadi' }
  ],
  infrastructure: [
    { slug: 'near-hinjewadi-metro-station', name: 'near Hinjewadi Metro Station' },
    { slug: 'on-pune-metro-line-3', name: 'on Pune Metro Line 3' },
    { slug: 'near-mumbai-pune-expressway', name: 'near Mumbai-Pune Expressway' }
  ],
  ecosystem: [
    { slug: 'with-golf-course', name: 'with Golf Course' },
    { slug: 'near-blue-ridge-public-school', name: 'near Blue Ridge Public School' },
    { slug: 'with-private-boat-club', name: 'with Private Boat Club' }
  ],
  investors: [
    { slug: 'high-rental-yield-properties', name: 'High Rental Yield Properties' },
    { slug: 'best-roi-real-estate-investment', name: 'Best ROI Real Estate Investment' },
    { slug: 'nri-investment-luxury-properties', name: 'NRI Investment Luxury Properties' },
    { slug: 'pre-launch-offers', name: 'Pre-launch Offers' }
  ],
  competitors: [
    { slug: 'near-life-republic', name: 'near Life Republic' },
    { slug: 'near-lodha-belmondo', name: 'near Lodha Belmondo' },
    { slug: 'near-vtp-blue-waters', name: 'near VTP Blue Waters' }
  ],
  battlegrounds: [
    { slug: 'blue-ridge-vs-life-republic', name: 'Blue Ridge vs Life Republic', vs: 'Life Republic' },
    { slug: 'blue-ridge-vs-vtp-blue-waters', name: 'Blue Ridge vs VTP Blue Waters', vs: 'VTP Blue Waters' },
    { slug: 'blue-ridge-vs-lodha-belmondo', name: 'Blue Ridge vs Lodha Belmondo', vs: 'Lodha Belmondo' },
    { slug: 'blue-ridge-vs-shapoorji-joyville', name: 'Blue Ridge vs Shapoorji Joyville', vs: 'Shapoorji Joyville' }
  ],
  infraGuides: [
    { slug: 'hinjewadi-metro-line-3-impact', name: 'Hinjewadi Metro Line 3 Impact & Stations' },
    { slug: 'blue-ridge-public-school-admission-guide', name: 'Blue Ridge Public School Admission & Facilities' },
    { slug: 'private-boat-club-membership-pune', name: 'Private Boat Club Membership & Riverfront Living' },
    { slug: 'hinjewadi-phase-1-infrastructure-updates', name: 'Hinjewadi Phase 1 Latest Infrastructure Updates' }
  ]
};

// Helper function to generate combinations
export function generatePseoUrls() {
  const urls: { slug: string; title: string; intent: string; type: string; silo: string }[] = [];

  // Silo 1: Tech Parks (Config + Tech Park)
  seoMatrix.configurations.forEach(config => {
    seoMatrix.techParks.forEach(park => {
      urls.push({
        slug: `${config.slug}-${park.slug}`,
        title: `${config.name} ${park.name}`,
        intent: `${config.name} ${park.name} Pune`,
        type: config.type,
        silo: 'corporate'
      });
    });
  });

  // Silo 2: Infrastructure (Config + Infra)
  seoMatrix.configurations.forEach(config => {
    seoMatrix.infrastructure.forEach(infra => {
      urls.push({
        slug: `${config.slug}-${infra.slug}`,
        title: `${config.name} ${infra.name}`,
        intent: `Premium ${config.name} ${infra.name}`,
        type: config.type,
        silo: 'infrastructure'
      });
    });
  });

  // Silo 3: Ecosystem (Townships / Flats + Ecosystem)
  seoMatrix.ecosystem.forEach(eco => {
    urls.push({
      slug: `integrated-townships-${eco.slug}-in-pune`,
      title: `Integrated Townships ${eco.name} in Pune`,
      intent: `Luxury Integrated Townships ${eco.name} in Pune`,
      type: 'Township',
      silo: 'ecosystem'
    });
    seoMatrix.configurations.slice(0, 3).forEach(config => {
      urls.push({
        slug: `${config.slug}-${eco.slug}`,
        title: `${config.name} ${eco.name}`,
        intent: `Buy ${config.name} ${eco.name} in Pune`,
        type: config.type,
        silo: 'ecosystem'
      });
    });
  });

  // Silo 4: Investors
  seoMatrix.investors.forEach(inv => {
    seoMatrix.locations.slice(0, 3).forEach(loc => {
      urls.push({
        slug: `${inv.slug}-in-${loc.slug}`,
        title: `${inv.name} in ${loc.name}`,
        intent: `Discover ${inv.name} in ${loc.name}`,
        type: 'Investment',
        silo: 'investor'
      });
    });
  });

  // Silo 5: Competitors Alternative (Config + Competitor location proxy)
  seoMatrix.configurations.slice(0, 3).forEach(config => {
    seoMatrix.competitors.forEach(comp => {
      urls.push({
        slug: `${config.slug}-${comp.slug}`,
        title: `${config.name} ${comp.name}`,
        intent: `Premium ${config.name} alternative ${comp.name} Pune`,
        type: config.type,
        silo: 'competitor'
      });
    });
  });

  // Silo 6: Competitor Battlegrounds
  seoMatrix.battlegrounds.forEach(bg => {
    urls.push({
      slug: bg.slug,
      title: bg.name,
      intent: `Detailed Comparison: ${bg.name} - Amenities, Location & ROI`,
      type: 'Comparison',
      silo: 'battleground'
    });
  });

  // Silo 7: Infrastructure Guides
  seoMatrix.infraGuides.forEach(guide => {
    urls.push({
      slug: guide.slug,
      title: guide.name,
      intent: `${guide.name} - Complete Buyer's Guide`,
      type: 'Guide',
      silo: 'infra-guide'
    });
  });

  // Legacy locations
  seoMatrix.configurations.forEach(config => {
    seoMatrix.locations.forEach(location => {
      urls.push({
        slug: `${config.slug}-in-${location.slug}`,
        title: `${config.name} in ${location.name}`,
        intent: `${config.name} for sale in ${location.name}`,
        type: config.type,
        silo: 'location'
      });
    });
  });

  // REGIONAL SEO (Marathi)
  seoMatrix.configurations.slice(0, 3).forEach(config => {
    seoMatrix.locations.slice(0, 3).forEach(loc => {
      // English version (already done below, but keeping it organized)
      
      // Marathi version
      const mrConfig = config.slug === '2-bhk-flats' ? '२ बीएचके फ्लॅट' : 
                       config.slug === '3-bhk-flats' ? '३ बीएचके फ्लॅट' : '४ बीएचके फ्लॅट';
      const mrLoc = loc.slug === 'hinjewadi-phase-1' ? 'हिंजवडी फेज १' : 
                    loc.slug === 'hinjewadi-phase-2' ? 'हिंजवडी फेज २' : 'हिंजवडी फेज ३';

      urls.push({
        slug: `mr-${config.slug}-in-${loc.slug}`,
        title: `${mrLoc} मध्ये ${mrConfig}`,
        intent: `${mrLoc} मध्ये विक्रीसाठी ${mrConfig} - परंजपे ब्लू रिज`,
        type: config.type,
        silo: 'regional-mr'
      });
    });
  });

  return urls;
}
