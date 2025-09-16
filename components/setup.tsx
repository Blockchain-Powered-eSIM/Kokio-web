import React from "react";
import Image from "next/image";

import BeachBall from "@/assets/beach-ball.svg";

const setupData = [
  {
    title: "Download Our App and Choose a Plan",
    description:
      "Easily download our app and select from a curated catalogue of local and special regional eSIM plans from over 200 destinations worldwide.",
  },
  {
    title: "Pay and Activate the eSIM",
    description:
      "We support various payment methods including credit cards and digital wallets. Just pay and activate your eSIM to start enjoying mobile connectivity instantly.",
  },
  {
    title: "Turn Your Phone Into a Digital Wallet",
    description:
      "Activate your eSIM and optionally enable the smart wallet to purchase eSIMs and data top-ups with stablecoins and use it like any other crypto wallet.",
  },
  /*{
    title: "Turn Your Phone Into a Crypto Wallet",
    description:
      "Activate your eSIM and optionally enable the eSIM crypto wallet that also functions as a digital ID.",
  },*/
];

const Setup = () => {
  return (
    <section className="relative z-10 -mt-1 flex justify-center overflow-x-hidden bg-ocean custom-400:mt-5 md:pt-24 lg:-mt-1 lg:pt-32">
      <div className="container flex flex-col items-center gap-28 px-4 py-10 text-center md:gap-12 md:px-8">
        <h2 className="max-w-[637px] text-5xl font-bold text-outer-space-950 md:px-4 md:text-6xl">
          Simple Setup, Fun Trip Ahead.
        </h2>
        <div className="relative h-48 w-full object-cover md:h-[452px] md:w-[452px]">
          <Image src={BeachBall} alt="Beach ball and bucket" fill />
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
