# Media needed — Onyx Viking Services

This site was cloned from the Onyx Sub‑Zero site with **all images and videos left
out** so you can drop in fresh Viking assets. The code already points at the exact
paths below — just place files with these names and they appear automatically.
Empty folders are kept in `public/` and `src/app/` as drop targets.

Notes:
- `.webp` files are **optional** (the `.jpg`/`.png` is the fallback). Provide both for best performance.
- Recommended hero/background ratio is ~16:9; card images ~16:10; `og.jpg` must be **1200×630**.
- Nothing here is wired to a brand lock — any Viking‑appropriate photo/video works.

---

## 1. Brand appliance photos — `public/appliances/`  (REQUIRED — used on key pages)
| File | Used on |
|------|---------|
| `viking_french_door.jpg` (+ `.webp`) | Home → "Refrigeration" card |
| `viking_range.jpg` (+ `.webp`) | Home → "Cooking" card |
| `viking_648prog.jpg` | Problems → Refrigeration band hero |
| `viking_cooktop.jpg` | Problems → Cooking band hero |
| `viking_fridge.jpg` | Cities index → photo lede |
| `viking_wine.jpg` | Contact page image |
| `viking_undercounter.jpg` | Booking form side image |
| `repair_fridge_condenser.jpg` | Problems → "the work we do" lede |
| `repair_fridge_hands.jpg` | About page |
| `repair_tools_layout.jpg` | About → "our purpose" lede |

## 2. Support / kitchen photos — `public/images/support/`  (REQUIRED)
| File | Used on |
|------|---------|
| `viking-kitchen-1.jpg` (+ `.webp`) | Every city page → Refrigeration services band |
| `viking-kitchen-2.jpg` (+ `.webp`) | Every city page → Cooking services band |
| `onyx-technician.jpg` (+ `.webp`) | Support imagery |

## 3. Brand, logo & social — `public/`  (REQUIRED)
| File | Used on |
|------|---------|
| `onyx-mark.svg` | Logo in nav, footer, checkout (SVG, square) |
| `og.jpg` | Social/Open Graph share image — **1200×630** |
| `onyx-kitchen.jpg` (+ `.webp`) | Home → closing band |
| `about-portrait.jpg` (+ `.webp`) | About → portrait |
| `specialists_bg.jpg` | Home → specialists band |

## 4. Background videos + posters — `public/`  (REQUIRED for headers)
Each video needs its poster image (shown before/while the video loads).
| Video | Poster | Used on |
|-------|--------|---------|
| `kitchen_bg_website.mp4` | `kitchen_bg_poster.jpg` | Home hero (desktop) |
| `hero_bg_mobile_v3.mp4` | `hero_bg_mobile_v3_poster.jpg` | Home hero (mobile) |
| `repair_bg_website.mp4` | `repair_bg_poster.jpg` | Problems / About header (desktop) |
| `repair_bg_mobile.mp4` | `repair_bg_mobile_poster.jpg` | Problems / About header (mobile) |
| `phonecall_bg_website.mp4` | — | Contact header (desktop) |
| `phonecall_bg_mobile.mp4` | — | Contact header (mobile) |
| `tech-door_16x9_web.webm` | — | Cities header |

## 5. Favicons — `src/app/`  (REQUIRED for browser tab/app icon)
| File | Purpose |
|------|---------|
| `icon.svg` | Browser tab favicon |
| `apple-icon.png` | Apple touch icon (180×180) |

## 6. City hero images — `public/images/cities/`  (REQUIRED — one per city)
Name each `{slug}-hero.jpg` (and optional `{slug}-hero.webp`). All 46 city slugs:

```
agoura-hills altadena bel-air beverly-hills brentwood calabasas century-city
chatsworth culver-city el-segundo encino glendale granada-hills hancock-park
hermosa-beach hidden-hills hollywood holmby-hills la-canada-flintridge los-feliz
malibu manhattan-beach marina-del-rey moorpark newport-beach pacific-palisades
palos-verdes pasadena playa-del-rey playa-vista porter-ranch redondo-beach
san-marino santa-barbara santa-monica sherman-oaks sierra-madre simi-valley
studio-city tarzana thousand-oaks toluca-lake topanga westchester
westlake-village woodland-hills
```
Example: `public/images/cities/bel-air-hero.jpg`

## 7. City thumbnail photos — `public/cities/`  (used on featured-city cards)
These were real, licensed Wikimedia city photos on the old site (attribution lives
in `src/lib/city-images.json`). Keep these names, or swap in your own and update the
attribution. Files: `bel-air.jpg`, `beverly-hills.jpg`, `brentwood.jpg`, `calabasas.jpg`,
`encino.jpg`, `glendale.jpg`, `hancock-park.jpg`, `hermosa-beach.jpg`, `hidden-hills.jpg`,
`holmby-hills.jpg`, `la-canada-flintridge.jpg`, `los-feliz.jpg`, `malibu.jpg`,
`manhattan-beach.jpg`, `newport-beach.jpg`, `pacific-palisades.jpg`, `palos-verdes.jpg`,
`pasadena.jpg`, `redondo-beach.jpg`, `san-marino.jpg`, `santa-barbara.jpg`,
`santa-monica.jpg`, `sherman-oaks.jpg`, `sierra-madre.jpg`, `studio-city.jpg`,
`tarzana.jpg`, `toluca-lake.png`, `woodland-hills.jpg`.

## 8. Optional extras (not referenced yet — add if you want more appliance shots)
`viking_repair_range.jpg`, `viking_microwave_drawer.jpg`, `viking_range_hood.jpg`,
`viking_steam_oven.jpg`, `viking_wall_oven.jpg` in `public/appliances/`.
