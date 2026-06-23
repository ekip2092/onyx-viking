import copy from "./cityCopy.json";

export type CityFaqItem = { q: string; a: string };
export type CityCopy = {
  metaDescription: string;
  subhead: string;
  intro: string[];
  faqs: CityFaqItem[];
};

export const CITY_COPY = copy as Record<string, CityCopy>;
export const getCityCopy = (slug: string): CityCopy | undefined => CITY_COPY[slug];
