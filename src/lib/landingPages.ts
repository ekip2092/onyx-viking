/* Dedicated Google Ads landing pages, one per keyword theme. Conversion-only:
   no exit navigation, a short lead form, sticky tap-to-call. The H1 is matched
   to the ad headline word for word. These render under src/app/<slug>/page.tsx
   and are set noindex (they exist for paid traffic, not organic). */
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";

export type LpSymptom = { t: string; d: string };
export type LandingPage = {
  slug: string;
  title: string;
  h1: string;
  subhead: string;
  description: string;
  symptomsHeading: string;
  symptoms: LpSymptom[];
};

export const LANDING_PAGES: Record<string, LandingPage> = {
  "viking-refrigerator-repair-los-angeles": {
    slug: "viking-refrigerator-repair-los-angeles",
    title: "Viking Refrigerator Repair in Los Angeles | Onyx",
    h1: "Viking Refrigerator Repair in Los Angeles",
    subhead:
      "Factory trained Viking specialists across Los Angeles. Same day and next day service, genuine OEM parts, and a 3 year warranty.",
    description:
      "Factory trained Viking refrigerator repair across Los Angeles. Same day and next day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Viking refrigerator faults we fix",
    symptoms: [
      { t: "Refrigerator running warm", d: "Temperature drift and warm zones traced to the true fault, not a guess, usually on the first visit." },
      { t: "Authorized, certified service", d: "Factory trained on Viking alone, so your refrigerator and your warranty are both respected." },
      { t: "A technician at your door fast", d: "Same day and next day arrival windows across the Westside, the Valley, and the coast." },
    ],
  },
  "viking-freezer-wine-storage-repair-la": {
    slug: "viking-freezer-wine-storage-repair-la",
    title: "Viking Freezer & Wine Fridge Repair in LA | Onyx",
    h1: "Viking Freezer & Wine Storage Repair in LA",
    subhead:
      "Factory trained on Viking freezers and wine storage. Same day and next day visits, genuine OEM parts, and a 3 year warranty.",
    description:
      "Viking freezer and wine storage repair in LA. Factory trained, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Freezer and wine storage faults we fix",
    symptoms: [
      { t: "Freezer not freezing", d: "Soft ice and a warming compartment restored to a steady, factory set temperature." },
      { t: "Heavy frost buildup", d: "Excess ice traced to a defrost fault or a tired gasket and corrected properly." },
      { t: "Wine storage drifting warm", d: "Dual zone and humidity faults recalibrated to protect the cellar, to the degree." },
      { t: "Temperature control faults", d: "Erratic readings and control board errors diagnosed at the source." },
    ],
  },
  "viking-ice-maker-repair-la": {
    slug: "viking-ice-maker-repair-la",
    title: "Viking Ice Maker Repair in Los Angeles | Onyx",
    h1: "Viking Ice Maker Repair in Los Angeles",
    subhead:
      "Factory trained Viking specialists. Most ice maker faults diagnosed and repaired in a single visit, with genuine OEM parts on the van.",
    description:
      "Viking ice maker repair in Los Angeles. Factory trained technicians, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Ice maker faults we fix",
    symptoms: [
      { t: "No ice at all", d: "A dead ice maker brought back to full production, in a single visit wherever possible." },
      { t: "Low or slow ice output", d: "Water inlet, fill valve, and harvest faults found and put right." },
      { t: "Leaking or jammed ice maker", d: "Drips, jams, and overflow traced to the line or the mould and sealed properly." },
      { t: "Ice machine error codes", d: "Control and sensor errors read and cleared, not reset and ignored." },
    ],
  },
  "viking-refrigerator-leak-repair-la": {
    slug: "viking-refrigerator-leak-repair-la",
    title: "Viking Refrigerator Leak Repair in LA | Onyx",
    h1: "Viking Refrigerator Leak Repair in LA",
    subhead:
      "Factory trained Viking specialists. We find the source of the leak, seal it with genuine OEM parts, and protect your floors throughout.",
    description:
      "Viking refrigerator leak repair in LA. Factory trained, same day service, floors protected, genuine OEM parts. Call (877) 778-0227.",
    symptomsHeading: "Leaks and water faults we fix",
    symptoms: [
      { t: "Water on the floor", d: "Pooling beneath the unit traced to a clogged drain or a split line and stopped." },
      { t: "Dripping inside the cabinet", d: "Internal drips and refreezing corrected at the defrost drain." },
      { t: "Water line or dispenser leaks", d: "Inlet valves and dispenser lines resealed with genuine OEM parts." },
      { t: "Floors and cabinetry protected", d: "Stone and millwork are draped before a single panel comes off." },
    ],
  },
  "viking-refrigerator-parts-repair-la": {
    slug: "viking-refrigerator-parts-repair-la",
    title: "Viking Compressor, Seal & Component Repair LA | Onyx",
    h1: "Viking Refrigerator Repair — Compressor, Seals & More",
    subhead:
      "Factory trained on the sealed system. Compressors, gaskets, thermostats, and evaporators restored to factory spec with genuine OEM parts.",
    description:
      "Viking compressor, seal, and sealed system repair in LA. Factory trained, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Components we repair and replace",
    symptoms: [
      { t: "Compressor and sealed system", d: "Sealed system and compressor faults diagnosed and repaired to factory spec." },
      { t: "Door gaskets and seals", d: "Worn gaskets replaced so the cabinet holds cold and the compressor rests." },
      { t: "Thermostats and evaporators", d: "Cooling components restored across the classic 650, 632, 561, and 690." },
      { t: "Genuine OEM components only", d: "Every part is Viking OEM, sourced direct, never aftermarket." },
    ],
  },
  "viking-not-cooling-repair-la": {
    slug: "viking-not-cooling-repair-la",
    title: "Viking Refrigerator Not Cooling? LA Repair | Onyx",
    h1: "Viking Refrigerator Not Cooling? We Fix It",
    subhead:
      "Factory trained Viking specialists, often at your door the same day. We find why it stopped cooling and restore a steady temperature.",
    description:
      "Viking refrigerator not cooling? Factory trained LA repair, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Cooling problems we fix",
    symptoms: [
      { t: "Fridge warm, food spoiling", d: "A warming cabinet diagnosed quickly, before a dinner or a delivery is lost." },
      { t: "Not getting cold enough", d: "Weak cooling traced to the compressor, the fans, or the sealed system." },
      { t: "Temperature fluctuation", d: "Swings and drift stabilised to a steady, factory set point." },
      { t: "Total cooling failure", d: "A dead refrigerator triaged the same day wherever we can reach you." },
    ],
  },
  "viking-range-cooktop-repair-la": {
    slug: "viking-range-cooktop-repair-la",
    title: "Viking Range & Cooktop Repair in Los Angeles | Onyx",
    h1: "Viking Range & Cooktop Repair in Los Angeles",
    subhead:
      "Factory trained Viking specialists across Los Angeles. Same day and next day service, genuine OEM parts, and a 3 year warranty.",
    description:
      "Viking range and cooktop repair in Los Angeles. Factory trained, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Viking range and cooktop faults we fix",
    symptoms: [
      { t: "Burner will not light", d: "Clicking, sparking, and dead burners on dual stacked sealed burners, corrected." },
      { t: "Ignition faults", d: "Spark modules and igniters restored for a clean, immediate light." },
      { t: "Gas range problems", d: "Regulator and manifold flow issues that ruin a low simmer, put right." },
      { t: "Cooktop not working", d: "Unresponsive elements and controls diagnosed at the board." },
    ],
  },
  "viking-oven-repair-la": {
    slug: "viking-oven-repair-la",
    title: "Viking Oven & Wall Oven Repair in Los Angeles | Onyx",
    h1: "Viking Oven Repair in Los Angeles",
    subhead:
      "Factory trained on Viking ovens and wall ovens. Same day and next day service, genuine OEM parts, and a 3 year warranty.",
    description:
      "Viking oven and wall oven repair in Los Angeles. Factory trained, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Viking oven faults we fix",
    symptoms: [
      { t: "Oven not heating", d: "Failed igniters and bake elements restored for consistent, calibrated heat." },
      { t: "Will not hold temperature", d: "Drift and uneven baking traced to the sensor or the convection fan." },
      { t: "Self clean faults", d: "Locked doors and self clean errors cleared without damage." },
      { t: "Oven door and seals", d: "Hinge tension and gaskets restored so the oven keeps its heat." },
    ],
  },
  "viking-appliance-repair-la": {
    slug: "viking-appliance-repair-la",
    title: "Viking Appliance Repair in LA | Onyx",
    h1: "Viking Appliance Repair in Los Angeles",
    subhead:
      "One trusted name for every Viking appliance in the home. Factory trained, same day service, genuine OEM parts, 3 year warranty.",
    description:
      "Viking appliance repair across Los Angeles. Factory trained, same day service, genuine OEM parts, 3 year warranty. Call (877) 778-0227.",
    symptomsHeading: "Every Viking appliance",
    symptoms: [
      { t: "Any Viking fault", d: "Refrigeration, wine storage, ranges, and ovens, all under one trusted name." },
      { t: "One call for the whole kitchen", d: "A single point of contact for every luxury appliance in the home." },
      { t: "Factory trained across the Viking line", d: "One brand, every appliance, and nothing else." },
      { t: "Near you across Los Angeles", d: "Same day and next day across the Westside, the Valley, and the coast." },
    ],
  },
};

export const landingPageList = () => Object.values(LANDING_PAGES);

export function landingMetadata(p: LandingPage): Metadata {
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${p.slug}` },
    // Dedicated paid-traffic pages: keep them out of the organic index so they
    // never read as doorway pages against the main site.
    robots: { index: false, follow: true },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `${SITE_URL}/${p.slug}`,
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: SITE.name }],
    },
  };
}
