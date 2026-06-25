import React from 'react';
import Link from 'next/link';
import { generatePseoUrls } from '@/data/seo-matrix';
import { projects } from '@/data/master-data';
import { ArrowRight, Building2, MapPin, TrendingUp } from 'lucide-react';

export default function SemanticRecommender({
  currentSlug,
  silo,
  isMr = false,
}: {
  currentSlug: string;
  silo: string;
  isMr?: boolean;
}) {
  const allUrls = generatePseoUrls();
  
  // 1. Get 3 relevant programmatic insights from the same silo (Internal Link Clustering)
  const relatedInsights = allUrls
    .filter(u => u.silo === silo && u.slug !== currentSlug && (isMr ? u.slug.startsWith('mr-') : !u.slug.startsWith('mr-')))
    .slice(0, 3);

  // 2. Recommend high-converting core project pages based on intent
  let recommendedProjects = projects.slice(0, 2); // Default
  if (silo === 'corporate' || silo === 'investor' || silo === 'amenities') {
    // Recommend premium configurations
    recommendedProjects = projects.filter(p => p.slug === 'altius' || p.slug === 'promenade');
  } else if (silo === 'price-list' || silo === 'floor-plan') {
    // Recommend entry level configurations for price intent
    recommendedProjects = projects.filter(p => p.slug === 'ridges-41' || p.slug === 'promenade');
  }

  const t = (en: string, mr: string) => isMr ? mr : en;

  return (
    <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gold/20" aria-label="Related Real Estate Opportunities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-text-light mb-2">
              {t("Explore More Opportunities", "अधिक संधी एक्सप्लोर करा")}
            </h2>
            <p className="text-text-light/70 text-lg">
              {t("Discover premium residences and market insights in Hinjewadi Phase 1", "हिंजवडी फेज १ मधील प्रीमियम निवासस्थाने आणि मार्केट अंतर्दृष्टी शोधा")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Project Silos (High Priority PageRank) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommendedProjects.map((project) => (
              <Link 
                href={isMr ? `/mr-${project.slug}` : `/${project.slug}`} 
                key={project.slug}
                className="group relative bg-dark-card border border-gold/10 rounded-2xl p-6 hover:border-gold/40 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 size={64} className="text-gold" />
                </div>
                
                <div className="relative z-10">
                  <div className="text-xs font-bold tracking-[2px] text-gold uppercase mb-2">
                    {t('Premium Residences', 'प्रीमियम निवासस्थाने')}
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-text-light mb-2 group-hover:text-gold transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-light/60 text-sm line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <div className="font-semibold text-text-light">
                    {project.price}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column: Deep-Linking Insights (Topical Authority) */}
          <div className="lg:col-span-5 bg-dark-card/50 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-gold" size={20} />
              <h3 className="text-xl font-bold text-text-light">
                {t("Related Insights", "संबंधित अंतर्दृष्टी")}
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {relatedInsights.map((insight) => (
                <Link 
                  href={`/${insight.slug}`} 
                  key={insight.slug}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors items-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="text-text-light font-medium group-hover:text-gold transition-colors line-clamp-2">
                      {insight.title}
                    </h4>
                    <span className="text-xs text-text-light/50 mt-1 uppercase tracking-wider block">
                      {insight.silo.replace('-', ' ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
