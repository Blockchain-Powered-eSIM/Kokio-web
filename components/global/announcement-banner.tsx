"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Twitter from "@/assets/icons/twitter-fill.svg";
import { CTA_MODE, TWITTER_URL } from "@/config/site";
import { LAUNCH_NOTICE, LIVE_NOTICE } from "@/lib/site-copy";

const AnnouncementBanner = () => {

  const pathname = usePathname();
  if (pathname?.startsWith("/live")) return null;

  return (
    <div className="w-full bg-cashmere-500">
      <div className="container flex items-center justify-center gap-2 px-4 py-3 text-center">
        {CTA_MODE === "live" ? (
          <p className="text-sm font-light text-outer-space-950 md:text-base">
            <span className="font-bold">{LIVE_NOTICE}</span>{" "}
            <Link
              href="/live"
              className="font-bold underline underline-offset-2 hover:text-outer-space-800"
            >
              Try out the App today!
            </Link>
          </p>
        ) : (
          <p className="text-sm font-light text-outer-space-950 md:text-base">
            <span className="font-bold">{LAUNCH_NOTICE}</span> Follow us on{" "}
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-outer-space-800"
            >
              <Image
                src={Twitter}
                alt="X"
                width={16}
                height={16}
                className="relative top-[3px] inline-block h-4 w-4"
              />
            </a>{" "}
            for updates.
          </p>
        )}
      </div>
    </div>
  );
};
AnnouncementBanner.displayName = "AnnouncementBanner";

export { AnnouncementBanner };
