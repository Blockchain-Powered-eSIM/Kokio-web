import type { ReactNode } from "react";
import Image from "next/image";

import { ManifestoNav } from "@/components/manifesto/manifesto-nav";

/**
 * Full-bleed watercolor background with a single translucent panel on top
 * — nav row and page content share one background layer, inset
 * ~5% from the viewport on every side, rather than each having their own.
 *
 * The background is a fixed-position layer behind the content, not
 * `background-attachment: fixed` — that property breaks on iOS Safari.
 */
export function ManifestoShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative print:bg-white">
      <div className="fixed inset-0 -z-10 bg-manifesto-sand print:hidden">
        <Image
          src="/manifesto/meadow-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="mx-[5vw] my-[5vh] overflow-hidden rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(80,110,70,0.35)] print:m-0 print:rounded-none print:shadow-none">
        <div className="bg-manifesto-card p-6 md:px-14 print:hidden">
          <ManifestoNav />
        </div>
        <div className="bg-manifesto-card/50 p-6 pt-10 backdrop-blur-xl md:px-10 md:pb-16 md:pt-12 lg:px-14 print:bg-white print:p-0 print:backdrop-blur-none">
          {children}
        </div>
      </div>
    </div>
  );
}
