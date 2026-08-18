export function getDynamicContext(slug: string): string {
  if (slug.includes('hinjewadi')) {
    return "Located adjacent to the Rajiv Gandhi Infotech Park, this property offers zero commute to major tech giants like Infosys, TCS, and Wipro.";
  } else if (slug.includes('baner')) {
    return "Situated in Baner, this project is surrounded by Pune's finest dining, elite international schools, and offers direct access to the Mumbai-Bangalore highway.";
  } else if (slug.includes('balewadi')) {
    return "Just minutes away from Balewadi High Street, residents enjoy a vibrant cosmopolitan lifestyle combined with peaceful residential luxury.";
  } else if (slug.includes('wakad')) {
    return "Wakad provides unparalleled connectivity between the IT corridor of Hinjewadi and the prime PCMC industrial belt.";
  } else if (slug.includes('bhugaon')) {
    return "Nestled in nature near the scenic Manas Lake, Bhugaon offers a tranquil resort-like lifestyle just minutes from Kothrud.";
  } else {
    return "Strategically located in Pune's most promising real estate corridor, guaranteeing superior connectivity and infrastructure.";
  }
}
