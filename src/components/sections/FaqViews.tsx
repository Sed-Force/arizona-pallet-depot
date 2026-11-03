"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import type { Faq } from "@/lib/site";

// MUI's default palette is light-only, so colors come from the site's theme tokens via className.
// MUI's styles sit in the `mui` CSS layer, below Tailwind utilities, so these classes win.

/** Mobile: stacked MUI accordions. */
export function FaqAccordions({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={className}>
      {faqs.map((faq, i) => (
        <Accordion
          key={faq.question}
          disableGutters
          elevation={0}
          // before:hidden drops MUI's divider line between adjacent accordions; each is its own card.
          className="mb-3 rounded-xl border border-border bg-surface text-foreground before:hidden last:mb-0"
        >
          <AccordionSummary
            id={`faq-accordion-${i}`}
            aria-controls={`faq-accordion-panel-${i}`}
            expandIcon={<ExpandMoreIcon className="text-muted" />}
            className="px-5"
          >
            <h3 className="font-semibold">{faq.question}</h3>
          </AccordionSummary>
          <AccordionDetails id={`faq-accordion-panel-${i}`} className="px-5 pt-0 pb-5 text-body">
            {faq.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

/** Wide screens: MUI vertical tabs, questions on the left and the selected answer on the right. */
export function FaqTabs({ faqs, className }: { faqs: Faq[]; className?: string }) {
  const [selected, setSelected] = useState(0);
  const faq = faqs[selected];

  return (
    <div className={className}>
      <Tabs
        orientation="vertical"
        value={selected}
        onChange={(_e, value: number) => setSelected(value)}
        aria-label="Frequently asked questions"
        className="w-80 shrink-0 border-r border-border"
        slotProps={{ indicator: { className: "bg-primary" } }}
      >
        {faqs.map((f, i) => (
          <Tab
            key={f.question}
            id={`faq-tab-${i}`}
            aria-controls={`faq-tabpanel-${i}`}
            label={f.question}
            className="max-w-none items-start px-5 py-4 text-left text-base font-semibold normal-case text-muted aria-selected:text-link"
          />
        ))}
      </Tabs>

      <div
        role="tabpanel"
        id={`faq-tabpanel-${selected}`}
        aria-labelledby={`faq-tab-${selected}`}
        className="flex-1 rounded-xl border border-border bg-surface p-6"
      >
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <p className="mt-3 text-body">{faq.answer}</p>
      </div>
    </div>
  );
}
