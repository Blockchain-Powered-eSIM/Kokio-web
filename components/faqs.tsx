import React from "react";

import { faqsData } from "@/content/faqs";

const Faqs = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="container max-w-screen-xl scroll-mt-24 px-4"
    >
      <div className="rounded-4xl bg-esim-black-950/60 px-8 py-10 md:rounded-[3.5rem] md:px-12 md:py-[5.5rem]">
        <h2
          id="faq-heading"
          className="mb-8 text-4xl font-bold text-cashmere-500 md:mb-20 lg:text-5xl"
        >
          Frequently Asked Questions
        </h2>
        <dl className="flex flex-col gap-14">
          {faqsData.map((faq) => (
            <div
              key={faq.id}
              id={`faq-${faq.id}`}
              className="flex scroll-mt-24 flex-col gap-2"
            >
              <dt className="font-heading text-2xl font-bold leading-[25px] text-cashmere-300 md:text-[1.75rem] md:leading-7">
                {faq.question}
              </dt>
              <dd className="text-lg font-light text-esim-black-50 md:leading-7">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
Faqs.displayName = "Faqs";

export { Faqs };
