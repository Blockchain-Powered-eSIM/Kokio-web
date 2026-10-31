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
  /** "contain" shows the full image letterboxed instead of cropping to fill the square. Default "cover". */
  fit?: "cover" | "contain";
};

// The Gallery component displays at most the first 3 tiles (components/home/gallery.tsx).
// Newest post first.
export const gallery: GalleryTile[] = [
  {
    image: "/gallery/devcon-mumbai.jpg",
    alt: "Kokio x Devcon India graphic reading Stay connected in Mumbai, no SIM queue, no KYC, no two-day wait, with a 20% off code DEVCON20, over an illustration of the Gateway of India at dusk.",
    permalink: INSTAGRAM_URL,
    fit: "contain",
  },
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
