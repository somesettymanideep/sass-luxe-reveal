const fs = require('fs');
const path = require('path');

const BASE_URL = '/sass-luxe-reveal/';

function getAssetUrl(asset) {
  if (!asset || !asset.url) return '';
  let url = asset.url;
  if (url.startsWith('/') && !url.startsWith(BASE_URL)) {
    return BASE_URL.replace(/\/$/, '') + url;
  }
  return url;
}

const assetsDir = 'src/assets';
const files = fs.readdirSync(assetsDir);
const jsonFiles = files.filter(f => f.endsWith('.asset.json'));

console.log('--- ASSET RESOLUTION AUDIT ---');
jsonFiles.forEach(file => {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(assetsDir, file), 'utf-8'));
    console.log(`File: ${file}`);
    console.log(`  Raw URL: ${content.url}`);
    console.log(`  Resolved: ${getAssetUrl(content)}`);
  } catch (e) {
    console.log(`Error parsing ${file}: ${e.message}`);
  }
});
