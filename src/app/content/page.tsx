import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ContentHub() {
  const pillarsDir = path.join(process.cwd(), 'content', 'pillars');
  const files = fs.readdirSync(pillarsDir).filter(f => f.endsWith('.mdx'));
  const pillars = files.map(f => ({
    slug: f.replace(/\.mdx$/, ''),
    title: f.replace(/\.mdx$/, '').replace(/-/g, ' '),
  }));
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Content Hub</h1>
      <ul className="space-y-4">
        {pillars.map(p => (
          <li key={p.slug} className="text-xl">
            <Link href={`/pillars/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
