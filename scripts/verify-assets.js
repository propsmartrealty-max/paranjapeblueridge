const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const missing = [];
const checked = new Set();

walkDir(path.join(__dirname, '..', 'src'), (filePath) => {
  if (!/\.(tsx?|astro|jsx?|json)$/.test(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /['"`](\/assets\/[^'"`\s?#]+)['"`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const assetPath = match[1];
    checked.add(assetPath);
    const localPath = path.join(__dirname, '..', 'public', assetPath);
    if (!fs.existsSync(localPath)) {
      missing.push({ assetPath, file: path.relative(path.join(__dirname, '..'), filePath) });
    }
  }
});

console.log(`Total unique asset paths checked: ${checked.size}`);
console.log(`Missing assets found: ${missing.length}`);
missing.forEach(m => console.log(`  MISSING: ${m.assetPath} (in ${m.file})`));
