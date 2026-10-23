import { ChevronDown } from "lucide-react";

import type { LegalSection } from "@/lib/legal/types";
import { TocLinks } from "@/components/legal/legal-links";

/**
 * Table of contents for a legal document.
 * Mobile uses a native <details> disclosure.
 * Desktop is a sticky sidebar with active-section highlighting.
 */
export function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      <details className="group mb-8 rounded-2xl border border-esim-black-200 bg-background/60 p-4 md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav aria-label="Table of contents" className="mt-4">
          <TocLinks sections={sections} />
        </nav>
      </details>

      <nav
        aria-label="Table of contents"
        className="hidden md:sticky md:top-12 md:block md:max-h-[calc(100vh-6rem)] md:overflow-y-auto"
      >
        <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-esim-black-700">
          On this page
        </p>
        <TocLinks sections={sections} spy />
      </nav>
    </>
  );
}
