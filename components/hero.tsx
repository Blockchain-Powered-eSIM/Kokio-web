import React from "react";
import Image from "next/image";
import Link from "next/link";

import BeachTransition from "@/assets/transition1.svg";

import SignUpButton from "@/components/sign-up-button";
import { StoreBadges } from "@/components/store-badges";

const Hero = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative flex h-[1200px] w-full scroll-mt-24 flex-col items-center gap-10 bg-beach-mobile bg-cover bg-[position:center_130px] bg-no-repeat pb-32 pt-14 text-center xs:bg-beach-tablet xs:bg-[position:center_calc(40%+130px)] md:max-h-[1500px] md:bg-beach-desktop md:bg-[position:center_50px] md:pb-10 lg:max-h-[1700px] lg:bg-[position:center_calc(40%+40px)]"
    >
      <div className="container flex max-w-[1000px] flex-col gap-4 px-4 md:px-8">
        <h1
          id="overview-heading"
          className="text-5xl font-bold text-outer-space-950 md:text-6xl"
        >
          Friendly eSIM store for your safe trips
        </h1>
        <p className="text-xl font-light lg:leading-7">
          Kokio is a travel eSIM app. Buy data in over 200 destinations with a
          card, Apple Pay, Google Pay or stablecoins. Install it at home
          before you fly, then activate on arrival. You sign in with a
          biometric that lives securely on your device, and we never ask for
          your name, email or ID, or collect any personal information.
        </p>
        <p className="text-sm font-light text-outer-space-950/80">
          New to eSIMs or never heard of it? Your phone might have one,{" "}
          <Link
            href="/blogs/esim-guide-for-travellers-2026#does-your-phone-support-esim"
            className="underline underline-offset-2 hover:text-outer-space-950 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-outer-space-950"
          >
            check it here
          </Link>{" "}
          and learn more about it!
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <SignUpButton large />
          <span className="text-sm font-light text-outer-space-950/70">
            With an interactive usage guide
          </span>
        </div>
        <StoreBadges />
      </div>
      <div className="md:-bottom-30 absolute -bottom-20 left-0 z-20 h-[480px] w-full custom-400:-bottom-40 md:bg-top lg:-bottom-36">
        <Image
          src={BeachTransition}
          alt="Beach"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};
Hero.displayName = "Hero";

export { Hero };
