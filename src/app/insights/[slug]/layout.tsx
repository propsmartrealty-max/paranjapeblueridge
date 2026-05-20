import { articles } from "@/data/master-data";
import { Metadata } from "next";

const SITE_URL = 'https://www.paranjapeblueridge.com';
const OG_IMAGE = `${SITE_URL}/assets/images/township-night.png`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return {};

  const title = `${article.title} | Paranjape Blue Ridge Insights`;
  const description = article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/insights/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/insights/${params.slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author],
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: article.title }],
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default function ArticleLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  // Server-side NewsArticle schema for Google rich results
  const newsArticleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.dateISO,
    "dateModified": article.dateISO,
    "author": { "@type": "Organization", "name": article.author },
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Blue Ridge Sovereign Portal",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` }
    },
    "mainEntityOfPage": `${SITE_URL}/insights/${article.slug}`,
    "image": OG_IMAGE,
    "articleSection": article.category,
    "keywords": ["Paranjape Blue Ridge", "Hinjewadi real estate", article.category, "Blue Ridge Pune"]
  } : null;

  return (
    <>
      {newsArticleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
        />
      )}
      {children}
    </>
  );
}

