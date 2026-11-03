import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/lib/site";
import { FaqAccordions, FaqTabs } from "./FaqViews";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Section>
      <SectionHeading title="FAQ" />
      {/* Both views render; CSS shows one per breakpoint. Choosing in JS (useMediaQuery) would
          make server and client markup differ and cause a hydration mismatch. */}
      <FaqAccordions faqs={faqs} className="mt-6 md:hidden" />
      <FaqTabs faqs={faqs} className="mt-6 hidden items-start gap-8 md:flex" />
    </Section>
  );
}
