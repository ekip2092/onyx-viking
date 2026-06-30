// Generate a .webp sibling for every .jpg under public/ (so <picture> webp
// <source> elements resolve; modern browsers won't fall back to <img> if the
// chosen webp source 404s). Run: node scripts/jpg-to-webp.mjs
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const jpgs = [];
function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p) : (extname(e).toLowerCase() === '.jpg' && jpgs.push(p));
  }
}
walk(PUB);

let made = 0, fail = 0;
for (const jpg of jpgs) {
  try {
    await sharp(jpg).webp({ quality: 80 }).toFile(jpg.slice(0, -4) + '.webp');
    made++;
  } catch (e) {
    fail++;
    console.log('FAIL', jpg, e.message);
  }
}
console.log(`webp written: ${made}, failed: ${fail}, total jpg: ${jpgs.length}`);
