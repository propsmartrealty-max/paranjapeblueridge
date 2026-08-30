const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = process.cwd();

function readDirPosts(relativeDir) {
  const dirPath = path.join(rootDir, relativeDir);
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(file => {
    const slug = file.replace(/\.mdx?$/, '');
    const fileContent = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const { data, content } = matter(fileContent);
    return {
      slug,
      meta: data,
      content,
    };
  });
}

const insightsPosts = readDirPosts('src/content/insights');
const blogPosts = readDirPosts('content/blog');
const pillarPosts = readDirPosts('content/pillars');

const outputContent = `// AUTO-GENERATED AT BUILD TIME BY scripts/build-posts.js - DO NOT EDIT MANUALLY
export interface PostMeta {
  title?: string;
  excerpt?: string;
  description?: string;
  category?: string;
  dateISO?: string;
  date?: string;
  author?: string;
  keywords?: string[];
  image?: string;
  [key: string]: any;
}

export interface PostItem {
  slug: string;
  meta: PostMeta;
  content: string;
}

export const generatedInsights: PostItem[] = ${JSON.stringify(insightsPosts, null, 2)};
export const generatedBlogPosts: PostItem[] = ${JSON.stringify(blogPosts, null, 2)};
export const generatedPillars: PostItem[] = ${JSON.stringify(pillarPosts, null, 2)};
`;

const outputPath = path.join(rootDir, 'src/data/generated-posts.ts');
fs.writeFileSync(outputPath, outputContent, 'utf8');
console.log(`✅ Generated ${insightsPosts.length} insights, ${blogPosts.length} blog posts, and ${pillarPosts.length} pillars in src/data/generated-posts.ts`);
