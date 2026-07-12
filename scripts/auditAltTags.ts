import fs from 'fs';
import path from 'path';
import globby from 'globby';

async function main() {
  const files = await globby(['src/**/*.{tsx,jsx,js,ts}'], {
    ignore: ['node_modules/**', 'dist/**'],
  });
  const missingAlt: {file:string,line:number,lineContent:string}[] = [];
  const tagRegex = /<(img|Image|motion\.img)\b([^>]*)>/g;
  for (const file of files) {
    const absPath = path.resolve(file);
    const content = fs.readFileSync(absPath, 'utf8');
    const lines = content.split(/\n/);
    lines.forEach((line, idx) => {
      let match;
      while ((match = tagRegex.exec(line)) !== null) {
        const attrs = match[2];
        if (!/\balt\s*=/.test(attrs)) {
          missingAlt.push({file: absPath, line: idx + 1, lineContent: line.trim()});
        }
      }
    });
  }
  if (missingAlt.length === 0) {
    console.log('✅ All image tags have alt attributes.');
  } else {
    console.warn(`⚠️ Found ${missingAlt.length} image tags without alt attributes:`);
    missingAlt.forEach(({file,line,lineContent}) => {
      console.warn(`${file}:${line} → ${lineContent}`);
    });
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error during audit:', err);
  process.exit(1);
});
