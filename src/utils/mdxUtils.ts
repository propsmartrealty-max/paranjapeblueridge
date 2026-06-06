import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/content/insights');

export function getMdxFiles() {
  if (!fs.existsSync(CONTENT_PATH)) {
    return [];
  }
  return fs.readdirSync(CONTENT_PATH).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  try {
    // Check both .md and .mdx extensions
    let fullPath = path.join(CONTENT_PATH, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(CONTENT_PATH, `${slug}.mdx`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts() {
  const files = getMdxFiles();
  return files.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const post = getPostBySlug(slug);
    return post;
  }).filter(Boolean);
}
