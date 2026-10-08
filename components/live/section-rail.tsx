"use client";

import { useEffect, useRef, useState } from "react";

const RAIL_LABELS = [
  ["auth", "01 · Start"],
  ["shop", "02 · Browse"],
  ["checkout", "03 · Checkout"],
  ["orders", "04 · Orders"],
  ["install", "05 · Install"],
  ["wallet", "06 · Wallet"],
  ["settings", "07 · Settings"],
] as const;

/** Top nav rail that tracks which step section is currently in view, so
 * readers scrolling down (instead of tapping a rail link) can still see
 * "you are here" — mirrors the .segmented active-pill treatment. */
export function SectionRail() {
  const [active, setActive] = useState<string>(RAIL_LABELS[0][0]);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = RAIL_LABELS
      .map(([id]) => document.getElementById(`step-${id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    // A section counts as "current" once it's crossed into the top band of
    // the viewport (below the sticky controls bar) and hasn't yet scrolled
    // past the point we'd consider the reader done with it.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length === 0) return;
        const id = visible[0].target.id.replace("step-", "");
        setActive(id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    linkRefs.current[active]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav className="rail">
      {RAIL_LABELS.map(([id, label]) => (
        <a
          key={id}
          ref={(el) => {
            linkRefs.current[id] = el;
          }}
          href={`#step-${id}`}
          className={id === active ? "active" : undefined}
          aria-current={id === active ? "true" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
