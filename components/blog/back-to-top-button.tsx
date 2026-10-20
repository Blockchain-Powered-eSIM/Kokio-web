"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Hidden once the element with id `hideBeforeId` scrolls into view. */
export function BackToTopButton({ hideBeforeId }: { hideBeforeId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const pastThreshold = window.scrollY > window.innerHeight * 1.5;
      const marker = document.getElementById(hideBeforeId);
      const inEndZone = marker
        ? marker.getBoundingClientRect().top <= window.innerHeight
        : false;
      setVisible(pastThreshold && !inEndZone);
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
  }, [hideBeforeId]);

  function handleClick() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-cashmere-500 text-white shadow-md transition-opacity duration-150 hover:bg-cashmere-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cashmere-500 focus-visible:ring-offset-2 md:right-6 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
