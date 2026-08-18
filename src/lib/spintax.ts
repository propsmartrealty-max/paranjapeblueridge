/**
 * Deterministic Spintax Parser
 * Parses strings like "{Welcome to|Discover|Explore} the {best|premium|luxury} {homes|apartments}"
 * Uses a seed (derived from the URL slug) to ensure consistent SSR/SSG rendering.
 */

// Simple seeded PRNG
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Generate a numeric seed from a string slug
function slugToSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function parseSpintax(text: string, seedString: string): string {
  if (!text) return text;
  
  const seed = slugToSeed(seedString);
  const random = mulberry32(seed);

  // Recursively parse {a|b|c} to handle nested spintax if needed
  const pattern = /\{([^{}]*)\}/g;
  
  let result = text;
  while (pattern.test(result)) {
    result = result.replace(pattern, (match, contents) => {
      const options = contents.split('|');
      const choiceIndex = Math.floor(random() * options.length);
      return options[choiceIndex];
    });
  }
  
  return result;
}

export const spunParagraphs = {
  heroTitle: "{Discover|Explore|Experience} {Premium|Luxury|Ultra-Luxury} {Living|Residences|Homes} at {Paranjape|Paranjape Schemes}",
  heroSubtitle: "{Immerse yourself in|Step into} a {world-class|premium|meticulously planned} {integrated township|residential ecosystem|community} that {redefines|elevates|transforms} {luxury living|urban living|modern lifestyles} in Pune.",
  bodyIntro: "{Paranjape Schemes|Paranjape Schemes Construction Limited} {presents|brings you|offers} an {exclusive|unparalleled|exceptional} {opportunity|chance} to {own|invest in} {premium|luxury|high-end} real estate. {Designed for|Crafted for|Built for} {modern families|discerning buyers|IT professionals}, these {residences|apartments|homes} {combine|blend|fuse} {elegance|luxury|comfort} with {unmatched|world-class|superior} {amenities|facilities|infrastructure}.",
  investment: "{From an investment perspective|For investors}, {this location|this micro-market|this corridor} {has historically delivered|consistently delivers|is known for} {excellent|strong|high} {capital appreciation|ROI|rental yields}. {With|Driven by} {rapid infrastructure growth|upcoming Metro connectivity|thriving IT hubs}, {property values|real estate prices} are {expected to surge|projected to appreciate significantly|poised for high growth}.",
  lifestyle: "Enjoy a {walk-to-work|balanced|resort-like} {lifestyle|experience} with {exclusive access to|premium features like} {a 9-hole golf course|private boat clubs|integrated schools} and {lush|sprawling|beautifully landscaped} {greenery|open spaces}."
};
