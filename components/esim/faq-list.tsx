import type { Faq } from "@/lib/esim/types";

/** Question and answer pairs. Each one carries the id its FAQPage schema entry points at. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <dl className="flex flex-col gap-8">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          id={`faq-${faq.id}`}
          className="flex scroll-mt-24 flex-col gap-2"
        >
          <dt className="font-heading text-xl font-bold text-foreground">
            {faq.question}
          </dt>
          <dd className="text-lg font-light leading-8 text-esim-black-900">
            {faq.answer}
          </dd>
        </div>
      ))}
    </dl>
  );
}
