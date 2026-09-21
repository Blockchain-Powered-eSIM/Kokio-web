import React from "react";

/**
 * Only what is still ahead. Dates are targets, and a milestone whose date has
 * passed reads as a missed deadline rather than as history, so shipped work
 * comes off this list instead of staying on it.
 */
export const roadMapData = [
  {
    title: "Q3'26",
    focus: "Public launch",
    milestones: [
      "Public launch across 200+ destinations, on the App Store and Play Store",
      "Regional testing across Southeast Asia and partner communities",
      "Road to mainnet",
    ],
  },
  {
    title: "Q4'26",
    focus: "Features and distribution",
    milestones: [
      "Device wallet, so checkout happens inside the app",
      "Referral links, partner discount codes and sponsored eSIM flows for events",
      "Connectivity partnerships",
    ],
  },
  {
    title: "Q1'27",
    focus: "Privacy and deeper integrations",
    milestones: [
      "Distribution through physical hubs and coworking partnerships",
      "Privacy rails, based on user demand",
      "Plans that need verified identity, built with identity partners, without Kokio holding the identity",
    ],
  },
];

const RoadMap = () => {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="container flex scroll-mt-24 flex-col items-center gap-14 py-12 text-esim-black-50 md:py-32"
    >
      <div className="flex w-full max-w-4xl items-center justify-center gap-6 md:gap-14">
        <div className="flex-1 border-t border-gray-300 md:max-w-[63px]" />
        <h2
          id="roadmap-heading"
          className="text-center text-4xl font-bold uppercase md:text-5xl"
        >
          Milestones
        </h2>
        <div className="flex-1 border-t border-gray-300 md:max-w-[63px]" />
      </div>
      <div className="flex flex-col gap-20 lg:flex-row">
        {roadMapData.map((roadMap) => (
          <div
            key={roadMap.title}
            className="flex flex-1 flex-col gap-4 text-center"
          >
            <h3 className="text-4xl font-bold">{roadMap.title}</h3>
            <p className="text-2xl font-bold text-cashmere-500">
              {roadMap.focus}
            </p>
            <ul className="flex flex-col gap-3">
              {roadMap.milestones.map((milestone) => (
                <li key={milestone} className="text-xl font-light">
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
RoadMap.displayName = "RoadMap";

export { RoadMap };
