import React from "react";
import Image, { getImageProps } from "next/image";

import BeachTransition from "@/assets/transition1.svg";

import SignUpButton from "@/components/sign-up-button";

const Hero = () => {
  return (
    <section className="relative flex h-[1200px] w-full flex-col items-center gap-16 bg-beach-mobile bg-cover bg-center bg-no-repeat pb-32 pt-14 text-center xs:bg-beach-tablet md:max-h-[1500px] md:bg-beach-desktop md:pb-10 lg:max-h-[1700px]">
      <div className="container flex max-w-[1000px] flex-col gap-4 px-4 md:px-8">
        <h1 className="text-5xl font-bold text-outer-space-950 md:text-6xl">
          Experience the Future of Global Connectivity
        </h1>
        <p className="text-xl font-light lg:leading-7">
          Travel with confidence with Kokio’s travel data plans. Unlike
          traditional eSIM providers, Kokio leverages cutting-edge distributed
          ledger technology for enhanced security, privacy, and ease of use.
          Enjoy seamless connectivity across over 200 destinations worldwide.
        </p>
      </div>
      <SignUpButton />
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
