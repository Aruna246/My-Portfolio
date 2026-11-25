const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      scanDir(full);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.html') || entry.name.endsWith('.css'))) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/w-\[\d{3,}px\]|min-w-\[\d{3,}px\]|w-screen|overflow-visible|translate-x|max-w-\[|left-|right-/.test(line)) {
          if (!line.includes('//')) {
            console.log(`${entry.name}:${idx + 1}: ${line.trim()}`);
          }
        }
      });
    }
  }
}

scanDir('src');
