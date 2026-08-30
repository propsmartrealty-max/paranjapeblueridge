import fs from 'fs';
import path from 'path';
import { renderMdx } from '@/components/MDXRenderer';
import { MDXRenderer } from '@/components/MDXRenderer';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'pillars');
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
  return files.map(f => ({
    slug: f.replace(/\.mdx$/, ''),
  }));
}

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
