import JSONLD from '@/components/JSONLD';
import SpeculationRules from '@/components/SpeculationRules';
import type { FC } from 'react';
import Head from 'next/head';



interface SeoHeadProps {
  pathname: string;
  title?: string;
  description?: string;
  image?: string;
  articlePublished?: string;
  articleModified?: string;
  author?: string;
}

const DEFAULT_TITLE = 'Paranjape Blue Ridge';
const DEFAULT_DESCRIPTION = 'Premium real estate township in Pune';
const DEFAULT_IMAGE = 'https://www.blueridge.com/assets/images/og-default.jpg';

const SeoHead: FC<SeoHeadProps> = ({
  pathname,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  articlePublished,
  articleModified,
  author,
}) => {
  const ogType = articlePublished ? 'article' : 'website';
  const fullUrl = `https://www.blueridge.com${pathname}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {articlePublished && (
          <>
            <meta property="article:published_time" content={articlePublished} />
            {articleModified && <meta property="article:modified_time" content={articleModified} />}
            {author && <meta property="article:author" content={author} />}
          </>
        )}
      </Head>
      <JSONLD pathname={pathname} />
      <SpeculationRules />
    </>
  );
};


