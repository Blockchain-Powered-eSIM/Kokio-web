import React from "react";
import Image from "next/image";

import BeachBall from "@/assets/beach-ball.svg";

export const setupData = [
  {
    title: "Download Our App and Choose a Plan",
    description:
      "Easily download our app and select from a curated catalogue of local and special regional eSIM plans from over 200 destinations worldwide.",
  },
  {
    title: "Pay and Activate the eSIM",
    description:
      "Pay with a card, Apple Pay or crypto, then install your eSIM in a few taps. Install it at home on Wi-Fi and switch it on when you land.",
  },
  {
    title: "Add a Wallet, If You Want One",
    description:
      "A Kokio wallet is optional. But once it’s set up, you can pay for eSIMs and top-ups with USDC, USDT or DAI, and use it like any other crypto wallet. Card payments work fine without it, but you’ll save on card fees, which vary by country.",
  },
];

const Setup = () => {
  return (
    <section
      id="setup"
      aria-labelledby="setup-heading"
      className="relative z-10 -mt-1 flex scroll-mt-24 justify-center overflow-x-hidden bg-ocean custom-400:mt-5 md:pt-24 lg:-mt-1 lg:pt-32"
    >
      <div className="container flex flex-col items-center gap-28 px-4 py-10 text-center md:gap-12 md:px-8">
        <h2
          id="setup-heading"
          className="max-w-[637px] text-5xl font-bold text-outer-space-950 md:px-4 md:text-6xl"
        >
          Simple Setup, Fun Trip Ahead.
        </h2>
        <div className="relative h-48 w-full object-cover md:h-[452px] md:w-[452px]">
          <Image src={BeachBall} alt="Beach ball and bucket" fill priority />
        </div>
        <dl className="flex flex-col gap-20 px-8 md:px-28 lg:flex-row lg:justify-between lg:px-4">
          {setupData.map((setup) => (
            <div key={setup.title} className="flex flex-col gap-4 lg:flex-1">
              <dt className="font-heading text-4xl font-bold text-outer-space-950">
                {setup.title}
              </dt>
              <dd className="text-xl font-light">{setup.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
Setup.displayName = "Setup";
export { Setup };
