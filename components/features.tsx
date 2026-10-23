import React from "react";
import Image from "next/image";
import Link from "next/link";

import Relax from "@/assets/icons/relax.svg";
import Meditate from "@/assets/icons/meditate.svg";
import Shield from "@/assets/icons/shield.svg";
import ThumbsUp from "@/assets/icons/thumbs-up.svg";

export type FeatureLink = {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer" when true. */
  external?: boolean;
};

export type Feature = {
  icon: typeof Relax;
  title: string;
  description: string;
  link?: FeatureLink;
};

export const featuresData: Feature[] = [
  {
    icon: Relax,
    title: "Simple",
    description:
      "Set up your mobile plan quickly and easily with our new technology. Speed up the process even more by setting up Kokio wallet.",
  },
  {
    icon: Meditate,
    title: "Private",
    description:
      "We never ask for personal information, so there’s no way for us to collect or store it. Enjoy complete peace of mind on your vacations.",
  },
  {
    icon: Shield,
    title: "Secure",
    description:
      "Our app ensures top-notch security and privacy, utilizing biometrics and secure enclave technology.",
  },
  {
    icon: ThumbsUp,
    title: "Quick Pay",
    description:
      "Enjoy flexible payment options including credit and debit cards, Apple Pay, Google Pay, PayPal and other digital wallets.",
  },
];

const linkClass =
  "inline-flex min-h-11 items-center text-base font-medium underline underline-offset-4 hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current";

function FeatureLinkItem({ link }: { link: FeatureLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

const Features = () => {
  return (
    <section
      id="features"
      aria-label="Features"
      className="z-10 flex scroll-mt-24 justify-center text-esim-black-50"
    >
      <div className="container flex max-w-screen-2xl flex-col items-center gap-20 text-center lg:flex-row lg:flex-wrap lg:justify-center">
        {featuresData.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-6 px-4 md:max-w-[25rem]"
          >
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl font-bold md:text-5xl">
                {feature.title}
              </h3>
              <p className="text-lg font-light">{feature.description}</p>
              {feature.link ? <FeatureLinkItem link={feature.link} /> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
Features.displayName = "Features";

export { Features };
