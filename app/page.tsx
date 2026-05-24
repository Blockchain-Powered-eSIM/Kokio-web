import Image from "next/image";
import { Faqs } from "@/components/faqs";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { RoadMap } from "@/components/road-map";
import { Setup } from "@/components/setup";

import BeachTransition from "@/assets/transition1.svg";
import PyramidTransition from "@/assets/transition2.svg";
import Pyramids from "@/assets/pyramids.svg";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Setup />
      <div className="relative -mt-1">
        <div className="relative h-[472px] w-full">
          <Image
            src={PyramidTransition}
            alt="Transition lines between the setup sections and features section"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="-mt-1 flex flex-col items-center gap-[720px] bg-pyramid-mobile bg-cover bg-center bg-no-repeat xs:gap-[680px] xs:bg-pyramid-tablet md:gap-[1060px] md:bg-pyramid-desktop lg:gap-[820px] lg:bg-pyramid-desktop">
        <Features />
        <div className="flex flex-col gap-10">
          <Faqs />
          <RoadMap />
        </div>
      </div>
    </main>
  );
}
