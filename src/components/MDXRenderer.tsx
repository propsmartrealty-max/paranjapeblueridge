import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * MDXRenderer renders MDX content passed as a string.
 * It uses `next-mdx-remote` to keep MDX rendering server‑side.
 * The component also adds common remark/rehype plugins for tables, GFM, and heading anchors.
 */
export async function renderMdx(source: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
    parseFrontmatter: true,
  });
}

interface MDXRendererProps {
  /** Serialized MDX content */
  source: MDXRemoteSerializeResult;
}

export const MDXRenderer: React.FC<MDXRendererProps> = ({ source }) => {
  return <MDXRemote {...source} />;
};
