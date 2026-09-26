import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Manifesto } from "@/lib/manifesto";

/** Featured banner for /manifesto on the blog index. Deliberately not a
 * PostCard: it carries the manifesto page's meadow + sand palette so it reads
 * as a standalone document, separate from the dated posts above it. */
export function ManifestoCard({ manifesto }: { manifesto: Manifesto }) {
  return (
    <Link
      href="/manifesto"
      className="group relative block overflow-hidden rounded-3xl border-2 border-manifesto-sand-border shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-manifesto-coral focus-visible:ring-offset-2"
    >
      <Image
        src="/manifesto/meadow-bg.png"
        alt=""
        fill
        sizes="(min-width: 896px) 896px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="relative flex flex-col items-center gap-4 bg-manifesto-card/85 px-6 py-12 text-center backdrop-blur-sm transition-colors group-hover:bg-manifesto-card/75 md:px-16 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-manifesto-coral">
          Inside Kokio
        </span>
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-manifesto-ink md:text-4xl">
          {manifesto.title}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-manifesto-ink/80 md:text-base">
          {manifesto.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-manifesto-teal">
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
