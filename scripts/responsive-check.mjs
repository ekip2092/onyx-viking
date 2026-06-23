import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const pages = ["/", "/about", "/cities", "/problems", "/contact", "/book"];
const widths = [320, 360, 390, 768, 820, 1024, 1440];
const outDir = "scripts/_shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
let overflowProblems = 0;

console.log("=== horizontal-overflow audit (scrollWidth vs viewport) ===");
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const row = [];
  for (const p of pages) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    const r = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
    }));
    const over = r.sw - r.iw;
    if (over > 1) overflowProblems++;
    row.push(`${p}=${over > 1 ? "OVERFLOW+" + over : "ok"}`);
  }
  console.log(`w${w}: ` + row.join("  "));
  await ctx.close();
}

// Screenshots to eyeball
async function shot(width, height, path, file, full = false, action) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  if (action) await action(page);
  await page.screenshot({ path: `${outDir}/${file}`, fullPage: full });
  await ctx.close();
}

console.log("\n=== capturing screenshots ===");
// Phone (iPhone-ish)
await shot(390, 844, "/", "phone-home.png");
await shot(390, 844, "/", "phone-home-menu.png", false, async (page) => {
  await page.click(".menu-toggle");
  await page.waitForTimeout(250);
});
await shot(390, 844, "/cities", "phone-cities.png");
await shot(390, 844, "/book", "phone-book.png", true);
await shot(390, 844, "/contact", "phone-contact.png", true);
// iPad portrait
await shot(820, 1180, "/", "ipad-home.png");
await shot(820, 1180, "/cities", "ipad-cities.png");
// iPad landscape
await shot(1024, 768, "/", "ipadL-home.png");
// Desktop
await shot(1440, 900, "/", "desktop-home.png");

await browser.close();
console.log(`\nDONE. overflow problems: ${overflowProblems}`);
