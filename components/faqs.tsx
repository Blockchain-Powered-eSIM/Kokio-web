import React from "react";

const faqsData = [
  {
    question:
      "What is Kokio and how does it differ from traditional eSIM providers?",
    answer:
      "Kokio utilizes distributed ledger technology to offer decentralized mobile connectivity, enhancing privacy, security, and ease of use compared to traditional eSIM providers.",
  },
  {
    question: "How do I sign up for Kokio’s beta program?",
    answer:
      "To join Kokio’s beta program, click on the “Sign up for beta” button on the landing page and follow the instructions provided.",
  },
  {
    question: "How can I set up my Kokio eSIM?",
    answer:
      "Download the Kokio app, choose your desired plan from over 200 destinations, and activate your eSIM instantly to start enjoying mobile connectivity.",
  },
  {
    question: "What payment options does Kokio accept?",
    answer:
      "Kokio supports a variety of payment methods including credit and debit cards, Apple Pay, Google Pay, PayPal and other digital wallets.",
  },
  /*{
    question: "How does the eSIM wallet feature work?",
    answer:
      "When you activate your Kokio eSIM, an optional secure digital wallet is also created. This wallet can function as both a crypto wallet and a digital ID.",
  },*/
  {
    question: "What security measures does Kokio employ for its services?",
    answer:
      "Kokio’s app ensures top-notch security and privacy using biometrics, secure enclave technology, and the inherent security features of distributed ledger technology.",
  },
  {
    question: "Is personal information required to use Kokio’s services?",
    answer:
      "No, Kokio values privacy and does not require personal information for setting up or using its services, ensuring your data remains private.",
  },
  {
    question: "What is the roadmap for Kokio’s service launch?",
    answer:
      "Key milestones includes the smart contract audit in February, app integration and conducting internal QA testing in June, launching closed beta testing in July to address bugs, and publicly launching the app with data plan access in October.",
  },
];

const Faqs = () => {
  return (
    <section className="container px-4 md:px-8">
      <div className="rounded-4xl bg-esim-black-950/60 px-8 py-10 md:rounded-[3.5rem] md:px-12 md:py-[5.5rem]">
        <h2 className="mb-8 text-4xl font-bold text-cashmere-500 md:mb-20 lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <dl className="flex flex-col gap-14">
          {faqsData.map((faq) => (
            <div key={faq.question} className="flex flex-col gap-2">
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
