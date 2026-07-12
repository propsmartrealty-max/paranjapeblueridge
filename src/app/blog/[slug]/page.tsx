import fs from 'fs';
import path from 'path';
import { renderMdx } from '@/components/MDXRenderer';
import { MDXRenderer } from '@/components/MDXRenderer';

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const mdxPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    return <p>Blog post not found.</p>;
  }
  const source = fs.readFileSync(mdxPath, 'utf8');
  const mdx = await renderMdx(source);
  return (
    <article className="prose prose-lg max-w-3xl mx-auto py-8">
      <MDXRenderer source={mdx} />
    </article>
  );
}
