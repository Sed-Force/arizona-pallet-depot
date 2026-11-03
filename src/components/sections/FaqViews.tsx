"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/site";

// Headless UI ships behavior only; styling follows the site's cards (rounded-xl, border, surface)
// and nav links (semibold, text-link when active). State arrives as data-open / data-selected attributes.

/** Mobile: stacked disclosure cards. */
export function FaqAccordions({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {faqs.map((faq) => (
        <Disclosure
          key={faq.question}
          as="div"
          className="rounded-xl border border-border bg-surface transition-colors data-open:border-primary/40"
        >
          <DisclosureButton className="group flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <h3 className="group-data-open:text-link">{faq.question}</h3>
            <ExpandMoreIcon className="shrink-0 text-muted transition-transform duration-200 group-data-open:rotate-180 group-data-open:text-link" />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className="origin-top px-5 pb-5 text-body transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0"
          >
            {faq.answer}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
}

/** Wide screens: vertical tabs, questions on the left and the selected answer in a card on the right. */
export function FaqTabs({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <TabGroup vertical className={className}>
      <TabList aria-label="Frequently asked questions" className="flex w-80 shrink-0 flex-col gap-1">
        {faqs.map((faq) => (
          <Tab
            key={faq.question}
            className="rounded-lg border-l-4 border-transparent px-4 py-3 text-left font-semibold text-foreground-2 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-selected:border-primary data-selected:bg-primary-soft data-selected:text-link"
          >
            {faq.question}
          </Tab>
        ))}
      </TabList>

      <TabPanels className="flex-1">
        {faqs.map((faq) => (
          <TabPanel
            key={faq.question}
            className="rounded-xl border border-border bg-surface p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <p className="mt-3 text-body">{faq.answer}</p>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
