import { articles } from "@/data/master-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return {};

  const title = `${article.title} | Paranjape Blue Ridge Insights`;
  const description = article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/insights/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.paranjapeblueridge.com/insights/${params.slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author],
      images: [{ url: '/assets/images/township-night.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
