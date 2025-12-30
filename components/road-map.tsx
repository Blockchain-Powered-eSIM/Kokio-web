import React from "react";

const roadMapData = [
  {
    title: "Q4'25",
    milestones: ["Alpha testing", "Android & iOS alpha app launch in Argentina, India and Thailand & bug fixes from user feeback."],
  },
  {
    title: "Q1'26",
    milestones: ["Beta", "With KOKI'O alpha live in over 200 countries, Work for beta features with continuos improvement from user feedback."],
  },
  {
    title: "Q2'26",
    milestones: ["Beta Testing", "Launch public beta testing and preparitions to ship KOKI'O to prod"],
  },
];

const RoadMap = () => {
  return (
    <section className="container flex flex-col items-center gap-14 py-12 text-esim-black-50 md:py-32">
      <div className="flex w-full max-w-4xl items-center justify-center gap-6 md:gap-14">
        <div className="flex-1 border-t border-gray-300 md:max-w-[63px]" />
        <h2 className="text-center text-4xl font-bold uppercase md:text-5xl">
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
