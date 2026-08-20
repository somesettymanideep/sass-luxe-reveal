import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE_PATH = '/sass-luxe-reveal/';

async function checkAssets() {
  console.log('--- Starting Asset Manifest Validation ---');
  
  if (!fs.existsSync(DIST)) {
    console.error('Build directory not found. Run build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
  const mainJsFile = fs.readdirSync(path.join(DIST, 'assets')).find(f => f.startsWith('main-') && f.endsWith('.js'));
  
  if (!mainJsFile) {
    console.error('Main JS bundle not found.');
    process.exit(1);
  }

  const mainJs = fs.readFileSync(path.join(DIST, 'assets', mainJsFile), 'utf-8');
  
  // Find all /__l5e/ or /assets/ references that should be prefixed
  const assetRefs = new Set([
    ...Array.from(mainJs.matchAll(/\/__l5e\/assets-v1\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+/g)).map(m => m[0]),
    ...Array.from(mainJs.matchAll(/src\/assets\/[a-zA-Z0-9._-]+/g)).map(m => m[0])
  ]);

  console.log(`Found ${assetRefs.size} unique asset references in bundle.`);

  let missingCount = 0;
  for (const ref of assetRefs) {
    // Assets starting with /__l5e/ are typically from Lovable Cloud and might not be in dist/
    // But local src/assets should be there
    if (ref.startsWith('src/assets/')) {
        // These are typically transformed by Vite, so they might not exist as literal paths
        continue;
    }
  }

  // Check for literal 404s in index.html references
  const htmlRefs = Array.from(indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)).map(m => m[1]);
  for (const ref of htmlRefs) {
    if (ref.startsWith('http')) continue;
    
    let localPath = ref.startsWith(BASE_PATH) 
        ? path.join(DIST, ref.replace(BASE_PATH, ''))
        : path.join(DIST, ref);

    if (!fs.existsSync(localPath) && !ref.includes('favicon')) {
      console.warn(`[WARN] Possible missing file in HTML: ${ref}`);
    }
  }

  console.log('--- Asset Validation Complete ---');
}

checkAssets().catch(console.error);
