import Image from "next/image";

import Globe from "@/assets/icons/globe.svg";
import MapIcon from "@/assets/icons/map.svg";
import MultiPin from "@/assets/icons/multi-pin.svg";
import Pin from "@/assets/icons/pin.svg";

/** Decorative icon per plan shape, in the same order as PRICING.shapes. */
const SHAPE_ICONS = [Pin, MapIcon, MultiPin, Globe];

/**
 * Pricing copy: the "from $2" anchor and the four plan shapes. Shared by the
 * page and its agent text so the two cannot disagree.
 */
export const PRICING = {
  title: "Well curated eSIM catalogue",
  lead: "Plans start from $2, and we aim to be cheap or competitive against a roaming pass, across a curated range of plans travellers actually ask for.",
  shapesIntro: "Plans come in four shapes, and they are data only by default.",
  shapes: [
    {
      name: "Local unlimited",
      line: "One country, for a trip or a stay in a single place.",
    },
    {
      name: "Regional",
      line: "A whole region, for a route that crosses several neighbouring countries.",
    },
    {
      name: "Multi-regional",
      line: "Specific countries that span different regions, not a whole region, for a route that does not fit one area.",
    },
    {
      name: "Global",
      line: "Coverage across many countries, for people who would rather buy once.",
    },
  ],
  guideLabel: "Browse plans in the app guide",
  guideNote:
    "The guide shows how the shop works, with example prices that are not current.",
  guideHref: "https://kokio.app/live",
} as const;

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="z-10 flex scroll-mt-24 justify-center text-esim-black-50"
    >
      <div className="container flex max-w-screen-2xl flex-col items-center gap-10 px-4 text-center">
        <h2
          id="pricing-heading"
          className="max-w-[650px] text-5xl font-bold md:text-6xl"
        >
          {PRICING.title}
        </h2>
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <p className="text-lg font-light">{PRICING.lead}</p>
          <p className="text-lg font-light">{PRICING.shapesIntro}</p>
        </div>
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:flex-wrap lg:justify-center">
          {PRICING.shapes.map((shape, i) => (
            <div
              key={shape.name}
              className="flex flex-col items-center gap-6 px-4 md:max-w-[25rem]"
            >
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <Image
                  src={SHAPE_ICONS[i]}
                  alt=""
                  aria-hidden="true"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-bold md:text-5xl">
                  {shape.name}
                </h3>
                <p className="text-lg font-light">{shape.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
