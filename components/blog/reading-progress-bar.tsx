"use client";

import { useEffect, useRef } from "react";

/** Tracks scroll progress through a specific element rather than the whole page. */
export function ReadingProgressBar({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let ticking = false;

    function update() {
      ticking = false;
      const winHeight = window.innerHeight;
      const articleTop = target!.getBoundingClientRect().top + window.scrollY;
      const start = articleTop;
      const end = articleTop + target!.offsetHeight - winHeight;
      const range = end - start;
      const progress =
        range <= 0
          ? window.scrollY >= start
            ? 1
            : 0
          : Math.min(1, Math.max(0, (window.scrollY - start) / range));

      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-[#ECBE58] to-[#FF5D84]"
      />
    </div>
  );
}
