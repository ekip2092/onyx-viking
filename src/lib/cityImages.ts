import data from "./city-images.json";

export type CityImage = {
  img: string;
  artist: string;
  license: string;
  source: string;
};

/** Real, licensed city photos sourced from Wikimedia Commons (see scripts/). */
export const CITY_IMAGES = data as Record<string, CityImage>;

export function cityImage(name: string): CityImage | undefined {
  return CITY_IMAGES[name];
}
