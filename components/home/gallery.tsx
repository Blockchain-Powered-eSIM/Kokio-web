import Image from "next/image";
import { ArrowRight } from "lucide-react";

import InstagramIcon from "@/assets/icons/instagram.svg";

import {
  gallery,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  type GalleryTile,
} from "@/content/gallery";
import { HomeSection } from "@/components/home/section";

const linkClass =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-center bg-cashmere-500 px-4 py-2 text-sm font-semibold sm:px-6 sm:text-base text-esim-black-950 hover:bg-cashmere-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#301c3d]";

/** Copy shared by the page and its agent text. */
export const GALLERY_COPY = {
  title: "We post digital wellness content on the gram",
  description:
    "Follow along to learn, or reach out to collaborate. We want to push more content and spread awareness that digital well-being matters, now more than ever.",
  followLabel: "Follow on Instagram",
} as const;

function GalleryItem({ tile }: { tile: GalleryTile }) {
  return (
    <li className="w-[calc(50%-0.5rem)] sm:w-60">
      <a
        href={tile.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tile.alt} (opens Instagram in a new tab)`}
        className="group relative block aspect-square overflow-hidden rounded-3xl border-2 border-manifesto-sand-border bg-white/10 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#301c3d] motion-safe:transition-shadow"
      >
        <Image
          src={tile.image}
          alt=""
          fill
          sizes="(min-width: 640px) 240px, 160px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:scale-105"
        />
      </a>
    </li>
  );
}

export function Gallery() {
  // Capped at 3 tiles.
  const items = gallery.slice(0, 3);
  if (!items.length) return null;

  return (
    <HomeSection>
      <section
        aria-labelledby="gallery-heading"
        className="container max-w-screen-xl px-4"
      >
        <div className="flex flex-col items-center gap-8 rounded-3xl border-2 border-manifesto-sand-border/60 bg-gradient-to-b from-manifesto-sand/15 to-white/[0.03] px-5 py-10 text-center shadow-sm md:px-12 md:py-14">
          <div className="flex max-w-2xl flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-manifesto-sand-border">
              <Image
                src={InstagramIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
              />
              @{INSTAGRAM_HANDLE}
            </span>
            <h2
              id="gallery-heading"
              className="font-heading text-3xl font-bold text-white md:text-4xl"
            >
              {GALLERY_COPY.title}
            </h2>
            <p className="text-white/90">{GALLERY_COPY.description}</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span className="whitespace-nowrap">
              {GALLERY_COPY.followLabel} (@{INSTAGRAM_HANDLE})
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-1"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <ul className="flex w-full flex-wrap justify-center gap-4">
            {items.map((tile) => (
              <GalleryItem key={tile.image} tile={tile} />
            ))}
          </ul>
        </div>
      </section>
    </HomeSection>
  );
}
