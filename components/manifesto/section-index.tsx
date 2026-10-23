"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/lib/mdx-toc";
import { PILLAR_NUMERALS } from "@/lib/manifesto-mdx";
import { cn } from "@/lib/utils";

/** Sticky desktop-only (xl+) section index. */
export function SectionIndex({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveId((prevId) => {
          const intersecting = entries.filter((entry) => entry.isIntersecting);
          if (intersecting.length === 0) return prevId;
          return intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0].target.id;
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Section index" className="text-sm">
      <ul className="flex flex-col gap-3 border-l border-manifesto-ink/10">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const numeral = PILLAR_NUMERALS[heading.id];

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "-ml-px block rounded-sm border-l-2 py-0.5 pl-3 leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-manifesto-teal focus-visible:ring-offset-2",
                  isActive
                    ? "border-manifesto-teal font-medium text-manifesto-teal"
                    : "border-transparent text-manifesto-ink/60 hover:text-manifesto-ink"
                )}
              >
                {numeral ? `${numeral}. ` : null}
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
