# Onyx Viking Services — Website

A six-page luxury marketing site for **Onyx Viking Services**, a high-end Viking appliance-repair company serving Los Angeles & Southern California. Built with **Next.js (App Router)** + **TypeScript**, animated with **GSAP**, and styled on the **Corsa design system** (near-black canvas, a single scarce Rosso Corsa red, sharp corners, editorial type, oversized numerals).

Implemented from the Claude Design handoff bundle (`design_handoff_onyx_viking_website`) — tokens, copy, layouts, and interactions follow that spec.

## Stack

- **Next.js 14** (App Router, React 18, TypeScript)
- **GSAP 3** + ScrollTrigger for restrained, tasteful motion
- **Inter** (via `next/font`) — the documented open-source substitute for the licensed FerrariSans brand face
- No CSS framework: the Corsa design tokens live as CSS custom properties in `src/app/globals.css`

## Getting started

> **Node.js 18.18+ is required** and was **not installed** on the machine where this was scaffolded. Install Node first (https://nodejs.org — LTS), then:

```bash
cd "onyx-site"
npm install
npm run dev
```

Open http://localhost:3000. Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## Pages / routes

| Route        | Page                | Highlights                                                            |
| ------------ | ------------------- | --------------------------------------------------------------------- |
| `/`          | Home / landing      | Full-bleed hero **video**, trust stats, service scope, reviews, cities |
| `/about`     | About               | Brand manifesto, credentials, 4-step process                          |
| `/cities`    | Cities Served       | Featured neighbourhoods + full LA/SoCal directory                     |
| `/problems`  | Problems We Fix      | Warning signs + Viking (9) and Viking (6) repair grids                |
| `/contact`   | Contact             | Contact details + callback form (inline success state)                |
| `/book`      | Book an Appointment | Booking flow with the upfront **$95 diagnostic fee** + confirmation   |

## Animation (GSAP)

Motion is deliberately restrained — the design system calls for "slow fades and gentle parallax at most; no bounces, no springy easing." Everything below **respects `prefers-reduced-motion`** (motion is fully disabled) and is **opacity-safe** (content stays visible if JS never runs):

- **`<Reveal>`** (`src/components/anim/Reveal.tsx`) — a soft fade + small upward rise as sections scroll into view, with optional stagger for grids.
- **Hero parallax** (`src/components/anim/useParallax.ts`) — a gentle scrubbed drift on the background video only.
- **Count-up numerals** (`src/components/ui/SpecCell.tsx`) — the oversized stat numbers count up once on scroll-in.

## Project structure

```
src/
  app/
    layout.tsx            Root layout — Inter font, metadata
    globals.css           Corsa design tokens + base styles
    page.tsx              Home
    about|cities|problems|contact|book/page.tsx
  components/
    layout/               Nav, Footer, StickyCallBar, Shell
    ui/                   Button, Input, SpecCell, Icons, Eyebrow, Stars, PhotoSlot
    sections/             HomeHero, AssuranceBand, ContactBody, BookForm
    anim/                 Reveal, useParallax, useIsoLayoutEffect
  lib/
    site.ts               Brand config + all page content (single source of truth)
public/
    onyx-mark.svg         Logo mark
    kitchen_bg_website.mp4 Hero background video
```

## Editing content

All brand data and copy live in **`src/lib/site.ts`** — phone, email, hours, city list, services, problems, reviews, assurances, diagnostic fee. Change it there and it flows to every page.

## Notes & follow-ups

- **Forms are front-end only.** The contact form swaps to a success state and the booking form to a confirmation screen with a generated `CR-######` reference — neither posts anywhere yet. Wire the contact form to your lead endpoint and the booking "Pay" button to a real processor (e.g. Stripe) for the $95 diagnostic fee.
- **Photography is placeholder.** The About portrait and the six featured-city cards use on-brand graphite `PhotoSlot` placeholders. Pass a `src` to `PhotoSlot` (or swap in `next/image`) when you have real photos.
- **Hero video** is wired to `/public/kitchen_bg_website.mp4`. Add a `.webm` and a `kitchen_bg_poster.jpg` to `/public` for better cross-browser delivery and a poster frame.
- **Brand/legal:** "Onyx", the gem mark, and all copy are original/placeholder. The site is independent and not affiliated with Viking Range, LLC — the disclaimer stays in the footer. Swap in the client's real owned brand mark and the licensed brand font for production.
```
