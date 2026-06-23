# Onyx Viking Services — Website

A six-page luxury marketing site for **Onyx Viking Services**, a high-end **Viking** appliance-repair company serving Los Angeles & Southern California. Built with **Next.js (App Router)** + **TypeScript**, animated with **GSAP**, and styled on the **Corsa design system** (near-black canvas, a single scarce Rosso Corsa red, sharp corners, editorial type, oversized numerals).

This project was cloned from the Onyx Sub-Zero Services site and rebranded to Viking. The Sub-Zero site is a separate, untouched project — see `docs/superpowers/specs/2026-06-22-onyx-viking-rebrand-design.md` for the brand bible and rebrand decisions.

## Stack

- **Next.js 14** (App Router, React 18, TypeScript)
- **GSAP 3** + ScrollTrigger for restrained, tasteful motion
- **Inter** (via `next/font`) — open-source substitute for the licensed FerrariSans brand face
- No CSS framework: the Corsa design tokens live as CSS custom properties in `src/app/globals.css`
- **Stripe** embedded Checkout for the $95 diagnostic; **Google Calendar** booking via an Apps Script bridge

## Getting started

> **Node.js 18.18+ required.**

```bash
cd "onyx-site"
npm install
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Pages / routes

| Route                | Page                | Highlights                                                            |
| -------------------- | ------------------- | --------------------------------------------------------------------- |
| `/`                  | Home / landing      | Full-bleed hero **video**, trust stats, service scope, reviews, cities |
| `/about`             | About               | Brand manifesto, credentials, 4-step process                          |
| `/cities`            | Cities Served       | Featured neighbourhoods + full LA/SoCal directory                     |
| `/problems`          | Problems We Fix      | Warning signs + Viking Refrigeration (9) and Viking Cooking (6) grids |
| `/contact`           | Contact             | Contact details + callback form                                       |
| `/book`              | Book an Appointment | Booking flow with the upfront **$95 diagnostic fee** → Stripe         |
| `/cities-we-serve`   | City hub            | Directory linking all city landing pages                              |
| `/viking-repair-{city}` | City landing pages | 46 unique localized pages with per-city copy + JSON-LD              |
| `/viking-*-repair-*` | PPC landing pages   | 9 keyword-matched, `noindex` paid-traffic pages                       |

## Brand model

Viking is a single brand spanning two service categories, mapped onto the two-grid layout:

- **Viking Refrigeration** (`VIKING_REFRIGERATION` in `src/lib/site.ts`) — refrigerators, freezers, wine cellars
- **Viking Cooking** (`VIKING_COOKING`) — ranges, cooktops, ovens, wall ovens

## Editing content

All brand data and copy live in **`src/lib/site.ts`** — phone, email, hours, city list, services, problems, reviews, assurances, diagnostic fee. SEO/analytics constants are in **`src/lib/seo.ts`**. Per-city copy is in **`src/lib/cityCopy.json`** + **`src/data/cities.json`**; PPC landing copy is in **`src/lib/landingPages.ts`**.

## Owner-data placeholders to fill

- `GA4_ID` in `seo.ts` (real GA4 Measurement ID — currently `G-XXXXXXXXXX`)
- `ADS_LABELS.call` / `.form` in `seo.ts` (create the conversion actions in the existing Google Ads account)
- `BUSINESS.*` in `seo.ts` (address/geo/priceRange/license/rating — gated so JSON-LD stays valid until real)
- `SITE.bearReg` — CA Appliance Service Dealer Reg. # (BEAR)
- **Stripe payment link** in `site.ts` — confirm it points at the correct Stripe account for Onyx Viking Services

## Notes & follow-ups

- **Google Ads** account is shared with the prior brand (`AW-18249301786`); the booking conversion fires on confirmation.
- **Forms / payment** are wired (Stripe + Apps Script calendar) but use owner credentials in Vercel env vars — set these before going live.
- **Photography / video is blank.** All images and videos are supplied by the owner — see `MEDIA-MANIFEST.md` for the full list of expected files and paths.
- **Brand/legal:** "Onyx", the gem mark, and all copy are original/placeholder. The site is independent and not affiliated with Viking Range, LLC — the disclaimer stays in the footer.
