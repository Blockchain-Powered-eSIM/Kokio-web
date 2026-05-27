import React from "react";
import Image from "next/image";
import Twitter from "@/assets/icons/twitter-fill.svg";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-cashmere-500">
      <div className="container flex items-center justify-center gap-2 px-4 py-3 text-center">
        <p className="text-sm font-light text-outer-space-950 md:text-base">
          <span className="font-bold">KOKI&apos;O is launching soon!</span>{" "}
          Follow us on{" "}
          <a
            href="https://x.com/kokiodotapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-outer-space-800"
          >
            <Image
              src={Twitter}
              alt="Twitter"
              width={16}
              height={16}
              className="relative top-[3px] inline-block h-4 w-4"
            />
          </a>{" "}
          for release updates.
        </p>
      </div>
    </div>
  );
};
AnnouncementBanner.displayName = "AnnouncementBanner";

export { AnnouncementBanner };
