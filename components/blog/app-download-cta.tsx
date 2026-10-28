import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Logomark from "@/assets/logomark.svg";
import { CTA_LABEL } from "@/lib/site-copy";

/** Download card linking to /live. Uses the homepage hero's beach-scene art
 * (clouds ~y0-600, ocean band ~y995-1120, sand and bucket ~y1120-1582 of a
 * 2068-tall viewBox) with the crop positioned at ~58% to show the
 * ocean-to-sand band instead of plain sky. */
export function AppDownloadCTA() {
  return (
    <Link
      href="/live"
      className="not-prose group relative my-8 block overflow-hidden rounded-3xl border-2 border-ocean"
    >
      <Image
        src="/beach-scene-desktop.svg"
        alt=""
        fill
        sizes="(min-width: 768px) 42rem, 100vw"
        className="object-cover object-[50%_58%] transition-transform duration-500 group-hover:scale-105"
      />
      <div className="relative flex flex-col gap-3 bg-white/75 p-6 backdrop-blur-sm transition-colors group-hover:bg-white/65 md:p-8">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-outer-space-950/70">
          <Image src={Logomark} alt="" aria-hidden="true" className="h-4 w-4" />
          Kokio on iOS &amp; Android
        </span>
        <p className="font-heading text-lg font-bold text-outer-space-950 md:text-xl">
          Kokio is live.
        </p>
        <p className="max-w-md text-sm leading-relaxed text-outer-space-950/80 md:text-base">
          Pick a plan that fits how you travel in over 200 countries. Pay with
          crypto or card, no KYC, no data collection. Simple, private and
          secure.
        </p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-outer-space-950">
          {CTA_LABEL}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
