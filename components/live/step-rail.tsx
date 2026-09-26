"use client";

import { useEffect, useRef, useState } from "react";

export type RailItem = readonly [id: string, label: string];

/**
 * Sticky step navigator: highlights the step currently in view and jumps to any step on tap.
 * Publishes the sticky bar's height as --controls-h so anchored steps land just below it.
 */
export function StepRail({ items }: { items: readonly RailItem[] }) {
  const [active, setActive] = useState(items[0][0]);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = railRef.current?.closest<HTMLElement>(".kokio-live");
    const bar = railRef.current?.closest<HTMLElement>(".controls-outer");
    if (!root || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const barHeight = bar.offsetHeight;
      root.style.setProperty("--controls-h", `${barHeight}px`);
      // The current step is the last one whose top has scrolled up to (or past) the sticky bar.
      let current = items[0][0];
      for (const [id] of items) {
        const el = document.getElementById(`step-${id}`);
        if (el && el.getBoundingClientRect().top <= barHeight + 40) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the active pill visible when the rail scrolls sideways (small screens).
  useEffect(() => {
    const rail = railRef.current;
    const pill = rail?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!rail || !pill) return;
    const target = pill.offsetLeft - (rail.clientWidth - pill.offsetWidth) / 2;
    rail.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="rail" ref={railRef} aria-label="Guide steps">
      {items.map(([id, label]) => (
        <a key={id} href={`#step-${id}`} aria-current={active === id ? "step" : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}
