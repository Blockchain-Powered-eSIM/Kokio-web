import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "Kokio Blog";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Kokio Blog",
    title: "Guides, updates, and stories from Kokio",
  });
}
