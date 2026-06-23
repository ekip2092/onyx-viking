# Onyx Viking Services — Rebrand Spec (Brand Bible)

**Date:** 2026-06-22
**Goal:** Clone the live `onyxsubzeroservice.com` site (Onyx Sub-Zero Services — Sub-Zero & Wolf) into a NEW, independent project for `onyxvikingservice.com` (Onyx Viking Services — Viking brand). Same design, structure, luxury voice, and feature set. Only the **brand**, **domain**, and **phone** change; **pictures left blank** (owner supplies later).

The Sub-Zero site is a **read-only guidebook** — never edited, never deployed from here. This folder is the Viking project; git was re-initialized fresh and points at `github.com/ekip2092/onyx-viking.git`.

## Confirmed parameters

| Field | Value |
|-------|-------|
| Company name | **Onyx Viking Services** |
| Domain / canonical | **https://www.onyxvikingservice.com** |
| Email | **contact@onyxvikingservice.com** |
| Phone (display / tel) | **(877) 778-0227** / **+18777780227** |
| Disclaimer | "…not affiliated with, sponsored by, or endorsed by **Viking Range, LLC**." |
| Diagnostic fee | $95 (credited toward repair) — unchanged |
| Warranty | 3-year, manufacturer-backed — unchanged |
| Google Ads | **SAME account** — keep `AW-18249301786` + booking label `p3PUCL-V2sEcEJr--P1D` |
| GA4 | placeholder `G-XXXXXXXXXX` (owner to fill) |
| Stripe payment link | keep existing link — FLAG to owner to confirm it's the right account |

## Brand model — Viking is ONE brand, two service categories

The existing two-grid / two-column layout is preserved by mapping:

- **Viking Refrigeration** (replaces the `SUBZERO` object → renamed `VIKING_REFRIGERATION`)
  - Covers: refrigerators, fridges, freezers, wine cellars
  - Line: "Refrigerators · Freezers · Wine Cellars"
- **Viking Cooking** (replaces the `WOLF` object → renamed `VIKING_COOKING`)
  - Covers: ranges, stoves, cooktops, ovens, wall ovens
  - Line: "Ranges · Cooktops · Wall Ovens"

Owner's appliance list (authoritative): fridges, stoves, ranges, ovens, wall ovens, cooktops, freezers, refrigerators.

## Global replacements (apply everywhere — incl. JSON copy, landing pages, components)

- "Onyx Sub-Zero Services" → "Onyx Viking Services"
- "Sub-Zero & Wolf" / "Sub-Zero and Wolf" → "Viking" (collapse the pair; never "Viking and Viking")
- "Sub-Zero" → "Viking"; "Wolf" → "Viking"
- "two brands" / "two marques" / "both brands" framing → "one brand, every appliance" / "the whole Viking kitchen"
- Domain `onyxsubzeroservice.com` → `onyxvikingservice.com`
- Email `contact@onyxsubzeroservice.com` → `contact@onyxvikingservice.com`
- Phone `(877) 927-7767` → `(877) 778-0227`; tel `+18779277767` → `+18777780227`
- Slug `/sub-zero-repair-{city}` → `/viking-repair-{city}`
- Keep: $95, 3-year warranty, "24 years", "factory trained", "genuine OEM parts", discreet/white-glove voice, British spellings ("labour", "neighbourhood") as in source.

## Viking factual accuracy (do NOT carry over Sub-Zero/Wolf-specific facts)

- Viking Range, LLC — pioneered the professional-style range for the home (est. 1987, Greenwood, MS).
- Product lines (use instead of Sub-Zero model numbers 650/632/561/690): **Professional 7 Series, Professional 5 Series, Designer Series, Tuscany Series**.
- Cooking features (replace Wolf "dual stacked sealed burners", red knobs): **VariSimmer sealed burners, SureSpark ignition, TruConvec convection, Gourmet-Glo broiler, ProFlow ventilation, BlackChrome knobs**.
- Refrigeration features (replace Sub-Zero "dual refrigeration", "Vacuum Condenser" code, "air purification cartridge"): **ProChill temperature management, Spillproof Plus shelves, Odor Eliminator, BottleProbe (wine), Plasmacluster Ion air purifier**.
- Viking DOES make wine cellars — "wine cellar / wine storage" copy stays valid under Refrigeration.
- When unsure of a specific Viking fact, keep the claim generic. Never invent model numbers.

## Voice — KEEP

Restrained luxury-automotive. Client-world references (Bentley, estates, estate managers, "the way a marque services a motorcar") stay — they describe the CLIENT, not the appliance brand. Factory-trained, genuine parts, discreet, white-glove.

## Surface / work breakdown

- **Core data (owner-edited by Claude):** `src/lib/site.ts`, `src/lib/seo.ts`, `src/lib/cities.ts`
- **Bulk copy:** `src/lib/cityCopy.json` (46 cities), `src/data/cities.json` (46 cities), `src/lib/landingPages.ts` (9 PPC pages)
- **Brand-constant importers (`VIKING_REFRIGERATION`/`VIKING_COOKING`):** `problems/page.tsx`, `HomeBody.tsx`, `city/CityPage.tsx`
- **Other brand-string components/pages:** Footer, Nav, about, contact, book, cities, cities-we-serve, Landing, ContactBody, BookForm, HomeHero, return, checkout
- **Routes:** rename 46 `sub-zero-repair-*` → `viking-repair-*`; rename 9 PPC `*-la`/`*-los-angeles` slugs → `viking-*` and update each page.tsx slug key
- **Config:** `layout.tsx`, `sitemap.ts`, `robots.ts`, `package.json`, `README.md`

### PPC landing slug mapping

| Old slug | New slug |
|----------|----------|
| sub-zero-refrigerator-repair-los-angeles | viking-refrigerator-repair-los-angeles |
| sub-zero-freezer-wine-storage-repair-la | viking-freezer-wine-cellar-repair-la |
| sub-zero-ice-maker-repair-la | viking-ice-maker-repair-la |
| sub-zero-refrigerator-leak-repair-la | viking-refrigerator-leak-repair-la |
| sub-zero-refrigerator-parts-repair-la | viking-refrigerator-parts-repair-la |
| sub-zero-not-cooling-repair-la | viking-refrigerator-not-cooling-repair-la |
| wolf-range-cooktop-repair-la | viking-range-cooktop-repair-la |
| wolf-oven-repair-la | viking-oven-repair-la |
| sub-zero-wolf-appliance-repair-la | viking-appliance-repair-la |

## Media — LEFT BLANK

Owner supplies all images/videos at the end. Keep wiring/paths; a `MEDIA-MANIFEST.md` lists every expected file. Missing files render blank/404 until supplied — expected.

## Out of scope

Design tokens, CSS, layout, animation, component structure, image dimensions/positions. Do not push to GitHub until build is green and owner is signaled.
