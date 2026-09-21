import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Teaser card for /manifesto, dropped into blog posts that reference it.
 * Carries the meadow background from the manifesto page itself (behind a
 * frosted sand panel, same trick as ManifestoShell) so the click-through
 * reads as a continuation of that page rather than a footnote link out. */
export function ManifestoCTA() {
  return (
    <Link
      href="/manifesto"
      className="not-prose group relative my-8 block overflow-hidden rounded-3xl border-2 border-manifesto-sand-border"
    >
      <Image
        src="/manifesto/meadow-bg.png"
        alt=""
        fill
        sizes="(min-width: 768px) 42rem, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="relative flex flex-col gap-3 bg-manifesto-card/85 p-6 backdrop-blur-sm transition-colors group-hover:bg-manifesto-card/75 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-manifesto-coral">
          The Kokio Manifesto
        </span>
        <p className="font-heading text-lg font-bold text-manifesto-ink md:text-xl">
          Connectivity is a human right. Privacy is its guardian.
        </p>
        <p className="text-sm leading-relaxed text-manifesto-ink/80 md:text-base">
          Kokio is also a provider, and we say it upfront: don&apos;t
          trust Kokio, verify it. This is our position, written out in
          full.
        </p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-manifesto-teal">
          Read the Manifesto
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
