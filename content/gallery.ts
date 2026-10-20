/**
 * Curated Instagram gallery. Images are files in public/gallery/ served through
 * next/image, and every tile links out to Instagram.
 */

export const INSTAGRAM_HANDLE = "kokiodotapp";
export const INSTAGRAM_URL = "https://www.instagram.com/kokiodotapp/";

export type GalleryTile = {
  image: string;
  /** Alt text describing the image. */
  alt: string;
  permalink: string;
  caption?: string;
};

// The Gallery component displays at most the first 3 tiles (components/home/gallery.tsx).
export const gallery: GalleryTile[] = [
  {
    image: "/gallery/esim-guide-beach.png",
    alt: "Illustration of a hand holding a phone on a sunny beach, the screen reading eSIMs, the complete guide for travellers (2026), with a parasol, bucket and beach ball nearby.",
    permalink: INSTAGRAM_URL,
  },
  {
    image: "/gallery/where-your-sim-data-goes.png",
    alt: "Illustration of a hand holding a phone that reads Where your sim data goes, in front of pyramids, camels and palm trees at dusk.",
    permalink: INSTAGRAM_URL,
  },
];
