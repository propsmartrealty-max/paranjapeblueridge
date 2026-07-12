import fs from 'fs';
import path from 'path';
import { renderMdx } from '@/components/MDXRenderer';
import { MDXRenderer } from '@/components/MDXRenderer';

export const dynamic = 'force-dynamic'; // Ensure server‑side rendering

export default async function PillarPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const mdxPath = path.join(process.cwd(), 'content', 'pillars', `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    return <p>Content not found.</p>;
  }
  const source = fs.readFileSync(mdxPath, 'utf8');
  const mdx = await renderMdx(source);
  return (
    <section className="prose prose-lg max-w-3xl mx-auto py-8">
      <MDXRenderer source={mdx} />
    </section>
  );
}
