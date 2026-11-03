import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/lib/site";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Section>
      <SectionHeading title="FAQ" />
      <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-xl border border-border bg-surface p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span aria-hidden className="text-xl leading-none text-faint transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-body">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
