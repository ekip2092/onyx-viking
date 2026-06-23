# Media Manifest — Onyx Viking Services

All copy/pages are Viking-branded and the build is green. Images/videos are **left for you to supply**. The cloned `public/` folder still contains the original (Sub‑Zero/Wolf) media — none of it was deleted. Components degrade gracefully: a missing `PicImage` shows an on‑brand gradient, a missing header video shows the gradient overlay. A few appliance thumbnails use a plain `<img>` and will show a broken‑image icon until supplied (see "MUST PROVIDE").

Drop replacement files at the exact paths below (under `onyx-site/public/`). Provide BOTH `.webp` and `.jpg` where a pair is listed.

## 1. MUST PROVIDE — referenced by code, not present yet (Viking appliance shots)

| Path | Used on | Notes |
|------|---------|-------|
| `/appliances/viking_refrigerator.jpg` + `.webp` | Home scope card, Problems grid | Viking refrigerator/column |
| `/appliances/viking_range.jpg` + `.webp` | Home scope card | Viking pro range |
| `/appliances/viking_cooktop.jpg` | Problems (cooking grid) | Viking cooktop |
| `/appliances/viking_fridge.jpg` | (agent‑renamed ref) | Viking fridge |
| `/appliances/viking_undercounter.jpg` | (agent‑renamed ref) | Viking undercounter unit |
| `/appliances/viking_wine.jpg` | (agent‑renamed ref) | Viking wine cellar |
| `/images/support/viking-kitchen-1.jpg` + `.webp` | City page — refrigeration band | luxury kitchen w/ Viking fridge (gradient until supplied) |
| `/images/support/viking-kitchen-2.jpg` + `.webp` | City page — cooking band | luxury kitchen w/ Viking range (gradient until supplied) |

## 2. SHOULD REPLACE — present but brand‑stale

| Path | Why |
|------|-----|
| `/og.jpg` | Social share image — likely shows Sub‑Zero/Wolf branding; remake with Viking + new phone |
| `/images/support/onyx-technician.jpg` + `.webp` | Keep if generic; replace if it shows a Sub‑Zero/Wolf unit |

## 3. KEEP — present, referenced, brand‑neutral (reusable; replace only if you want)

- **46 city heroes** `/images/cities/{slug}-hero.jpg` + `.webp` — cinematic LA‑neighborhood/kitchen shots, all present.
- **Background videos**: `/kitchen_bg_website.mp4`, `/repair_bg_website.mp4`, `/repair_bg_mobile.mp4`, `/phonecall_bg_website.mp4`, `/phonecall_bg_mobile.mp4`, `/hero_bg_mobile_v3.mp4` + posters (`/kitchen_bg_poster.jpg`, `/repair_bg_poster.jpg`, `/repair_bg_mobile_poster.jpg`, `/hero_bg_mobile_v3_poster.jpg`), `/tech-door_16x9_web.webm`.
- **Neutral repair stills**: `/appliances/repair_fridge_condenser.jpg`, `/appliances/repair_fridge_hands.jpg`, `/appliances/repair_tools_layout.jpg`.
- **Misc**: `/onyx-kitchen.jpg` + `.webp`, `/about-portrait.jpg` + `.webp`, `/specialists_bg.jpg`, `/onyx-mark.svg` (logo).

## 4. UNUSED — old Sub‑Zero/Wolf files no longer referenced (safe to delete once replaced)

`/appliances/subzero_french_door.{jpg,webp}`, `subzero_648prog.jpg`, `subzero_fridge.jpg`, `subzero_undercounter.jpg`, `subzero_wine.jpg`, `wolf_range.{jpg,webp}`, `wolf_cooktop.jpg`, `wolf_wall_oven.jpg`, `wolf_steam_oven.jpg`, `wolf_range_hood.jpg`, `wolf_microwave_drawer.jpg`, `repair_wolf_range.jpg`, `/images/support/subzero-wolf-kitchen-1.{jpg,webp}`, `subzero-wolf-kitchen-2.{jpg,webp}`, and the `/cities/*.jpg` set (28 files, not referenced by the current build).

---

**Format tips:** city heroes ~1600×1000 landscape; appliance cards ~16:10; backgrounds 1080p+ landscape (mobile cuts portrait). WebP first + JPG fallback keeps load fast.
