const fs = require('fs');
const path = require('path');

// Generate version from timestamp
const version = `v${Date.now()}`;

// Path to sw.js
const swPath = path.join(__dirname, '../public/sw.js');

// Read sw.js
let swContent = fs.readFileSync(swPath, 'utf8');

// Replace version using regex
swContent = swContent.replace(
    /const VERSION = '[^']+';/,
    `const VERSION = '${version}';`
);

// Write back
fs.writeFileSync(swPath, swContent);

console.log(`✅ Service Worker version updated to: ${version}`);
