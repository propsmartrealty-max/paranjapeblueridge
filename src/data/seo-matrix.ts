export const seoMatrix = {
  configurations: [
    { slug: '2-bhk-flats', name: '2 BHK Flats', type: 'Apartment' },
    { slug: '3-bhk-flats', name: '3 BHK Flats', type: 'Apartment' },
    { slug: '4-bhk-flats', name: '4 BHK Flats', type: 'Apartment' },
    { slug: '5-bhk-flats', name: '5 BHK Flats', type: 'Apartment' },
    { slug: 'penthouses', name: 'Penthouses', type: 'Penthouse' },
    { slug: 'luxury-apartments', name: 'Luxury Apartments', type: 'Apartment' }
  ],
  locations: [
    { slug: 'hinjewadi-phase-1', name: 'Hinjewadi Phase 1' },
    { slug: 'hinjewadi-phase-2', name: 'Hinjewadi Phase 2' },
    { slug: 'hinjewadi-phase-3', name: 'Hinjewadi Phase 3' },
    { slug: 'wakad', name: 'Wakad' },
    { slug: 'baner', name: 'Baner' },
    { slug: 'pune', name: 'Pune' }
  ],
  landmarks: [
    { slug: 'near-infosys', name: 'near Infosys' },
    { slug: 'near-wipro', name: 'near Wipro' },
    { slug: 'near-rajiv-gandhi-infotech-park', name: 'near Rajiv Gandhi Infotech Park' }
  ],
  features: [
    { slug: 'river-facing', name: 'River Facing' },
    { slug: 'golf-course-facing', name: 'Golf Course Facing' },
    { slug: 'ready-possession', name: 'Ready Possession' },
    { slug: 'under-construction', name: 'Under Construction' }
  ]
};

// Helper function to generate combinations
export function generatePseoUrls() {
  const urls: { slug: string; title: string; intent: string; type: string }[] = [];

  // Config + Location
  seoMatrix.configurations.forEach(config => {
    seoMatrix.locations.forEach(location => {
      urls.push({
        slug: `${config.slug}-in-${location.slug}`,
        title: `${config.name} in ${location.name}`,
        intent: `${config.name} for sale in ${location.name}`,
        type: config.type
      });
    });
  });

  // Config + Landmark
  seoMatrix.configurations.forEach(config => {
    seoMatrix.landmarks.forEach(landmark => {
      urls.push({
        slug: `${config.slug}-${landmark.slug}-hinjewadi`,
        title: `${config.name} ${landmark.name} Hinjewadi`,
        intent: `${config.name} near ${landmark.name} Hinjewadi Pune`,
        type: config.type
      });
    });
  });

  // Feature + Config + Location
  seoMatrix.features.forEach(feature => {
    seoMatrix.configurations.slice(0, 3).forEach(config => { // limit to prevent explosion
      urls.push({
        slug: `${feature.slug}-${config.slug}-in-hinjewadi`,
        title: `${feature.name} ${config.name} in Hinjewadi`,
        intent: `Buy ${feature.name.toLowerCase()} ${config.name.toLowerCase()} in Hinjewadi Pune`,
        type: config.type
      });
    });
  });

  return urls;
}
