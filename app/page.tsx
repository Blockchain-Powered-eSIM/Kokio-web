import Image from "next/image";
import { Faqs } from "@/components/faqs";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/home/gallery";
import { Partners } from "@/components/home/partners";
import { Pricing } from "@/components/home/pricing";
import { ManifestoShowcase } from "@/components/home/manifesto-showcase";
import { RecentPosts } from "@/components/home/recent-posts";
import { HomeSection } from "@/components/home/section";
import { RoadMap } from "@/components/road-map";
import { Setup } from "@/components/setup";
import { JsonLd } from "@/components/json-ld";
import { homeGraph } from "@/lib/schema";

import PyramidTransition from "@/assets/transition2.svg";

export default function Home() {
  return (
    <main className="flex flex-col">
      <JsonLd data={homeGraph} />
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
      <div className="relative -mt-1 flex w-full flex-col items-center justify-center gap-40 bg-[#574978] bg-pyramid-mobile bg-cover bg-[position:center_40%] bg-no-repeat py-10 xs:bg-pyramid-tablet xs:bg-[position:center_50%] md:gap-48 md:bg-pyramid-desktop md:bg-[position:center_50%] md:py-14 lg:min-h-[140vw] lg:bg-[position:center_54.3%]">
        <Features />
        <Pricing />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#301c3d] to-transparent" />
      </div>
      <div className="flex flex-col bg-[#301c3d]">
        <HomeSection>
          <ManifestoShowcase />
        </HomeSection>
        <RecentPosts />
        <Partners />
        <Gallery />
        <HomeSection>
          <Faqs />
        </HomeSection>
        <HomeSection className="py-0 md:py-0">
          <RoadMap />
        </HomeSection>
      </div>
    </main>
  );
}
