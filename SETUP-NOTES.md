# Onyx Viking Services — setup notes

This project was cloned from the Onyx Sub‑Zero site and rebranded to **Viking**.
What changed automatically, and what you still need to do before launch.

## What was changed for you
- **Brand:** every "Sub‑Zero" and "Wolf" reference → **Viking** across all copy, page
  titles, meta descriptions, JSON‑LD schema, alt text, and the FAQ/reviews. The old
  two‑brand framing ("two marques", "both brands", "Sub‑Zero or a Wolf") was rewritten
  for a single full‑line brand. Appliances are grouped into two service categories:
  **Refrigeration** and **Cooking** (see `src/lib/site.ts`).
- **Appliance lineup** expanded to Viking's range: refrigerators, freezers, built‑in
  fridges/freezers, ranges, stoves, ovens, wall ovens, cooktops, wine storage.
- **URLs / route folders:** `sub-zero-repair-{city}` → `viking-repair-{city}`,
  `wolf-oven-repair-la` → `viking-oven-repair-la`, `sub-zero-wolf-appliance-repair-la`
  → `viking-appliance-repair-la`, etc. Sitemap, canonicals, internal links, and
  next.config redirects all updated to match.
- **Domain / email:** `onyxsubzeroservice.com` → `onyxvikingservice.com`,
  `contact@onyxvikingservice.com`. Canonical origin = `https://www.onyxvikingservice.com`.
- **Phone:** updated everywhere to **(877) 778‑0227** (`+18777780227`).
- **Disclaimer:** now "not affiliated with Viking Range, LLC".
- **Code identifiers:** the `SUBZERO` / `WOLF` brand constants are renamed
  `REFRIGERATION` / `COOKING`.
- **Images & videos:** intentionally **left out**. See `MEDIA-NEEDED.md`.

## ⚠️ Business‑specific values still pointing at the Sub‑Zero account
You chose to keep these copied for now — **swap them before taking payments / running ads**,
or they will charge / attribute to the old business:

| Where | Value | Action |
|-------|-------|--------|
| `.env.local` | `STRIPE_SECRET_KEY` (sk_live…), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live…) | Replace with Viking's Stripe keys |
| `src/lib/site.ts` | `stripePaymentLink` (buy.stripe.com/…) | Replace with Viking's $95 deposit payment link |
| `.env.local` | `GOOGLE_APPS_SCRIPT_URL` + `GOOGLE_APPS_SCRIPT_SECRET` | Point at Viking's booking calendar Apps Script |
| `src/lib/seo.ts` | `ADS_ID` = `AW-18249301786`, `ADS_LABELS.book` | Replace with Viking's Google Ads conversion ID + labels |
| `src/lib/seo.ts` | `GA4_ID` = `G-XXXXXXXXXX` | Add Viking's GA4 Measurement ID |

> `.env.local` holds **live** Stripe keys carried over from the Sub‑Zero site. It is
> gitignored (not pushed to GitHub), but treat it as a secret and rotate if unsure.

Other owner‑supplied SEO fields in `src/lib/seo.ts` (address, geo, rating, CSLB license,
GBP URL) are still `PLACEHOLDER_…` and are intentionally omitted from live schema until
you fill them — no action required to launch.

## Running it locally
Node isn't installed on this machine yet (the old `node_modules` only synced via OneDrive).
Install Node LTS, then:

```bash
cd "path/to/viking-site"
npm install
npm run dev      # http://localhost:3000
npm run build    # production build / typecheck
```

A `next build` is the quickest way to confirm everything compiles after you add media.
