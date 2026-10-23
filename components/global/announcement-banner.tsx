"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CTA_LABEL, LIVE_NOTICE } from "@/lib/site-copy";

const AnnouncementBanner = () => {
  const pathname = usePathname();
  if (pathname?.startsWith("/live")) return null;

  return (
    <div className="w-full bg-cashmere-500">
      <div className="container flex items-center justify-center gap-2 px-4 py-3 text-center">
        <p className="text-sm font-light text-outer-space-950 md:text-base">
          <span className="font-bold">{LIVE_NOTICE}</span>{" "}
          <Link
            href="/live"
            className="font-bold underline underline-offset-2 hover:text-outer-space-800"
          >
            {CTA_LABEL}
          </Link>
        </p>
      </div>
    </div>
  );
};
AnnouncementBanner.displayName = "AnnouncementBanner";

export { AnnouncementBanner };
