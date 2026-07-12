import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Reads an MDX file from the blog folder, parses front‑matter and serialises the content.
 */
export async function getBlogPost(slugArray: string[]) {
  const slug = slugArray.join('/');
  const filePath = path.resolve(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings] },
    parseFrontmatter: false,
  });
  return { frontMatter: data, mdxSource };
}
