import type { Metadata } from "next";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { links, products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arizona Pallet Depot is a Gilbert-based supplier of used 48×40 composite pallets serving the Phoenix metro. Value ($15) and Industrial Grade ($30).",
  alternates: { canonical: "/about" },
};

const reasons = [
  {
    label: "Real savings:",
    text: (
      <>
        Comparable new pallets list near <span className="whitespace-nowrap">$155</span>—ours deliver similar utility
        for far less.
      </>
    ),
  },
  { label: "Two clear options:", text: "Value (budget-friendly) and Industrial Grade (heavy-duty)." },
  { label: "Local & responsive:", text: "Pickup in Gilbert by appointment or delivery by quote." },
  { label: "Same-day options:", text: "When inventory allows, we move quickly." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title={`About ${site.name}`}
        description={
          <p>
            We’re a Gilbert-based supplier serving the Phoenix metro with reliable, used 48×40 composite pallets. Choose
            from <strong>Value ($15)</strong> and <strong>Industrial Grade ($30)</strong>. Pickup is by appointment;
            delivery available by quote.
          </p>
        }
        actions={[
          { label: `Call ${site.phone.display}`, href: links.tel },
          { label: "Request a Quote", href: links.quote, variant: "secondary" },
        ]}
        image={{ src: "/images/pallet-4.jpg", alt: "Arizona Pallet Depot — used 48x40 composite pallets in Phoenix AZ" }}
      />

      <Section tone="surface" containerClassName="grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeading title="Our Story" />
          <p className="mt-3 text-slate-700">
            Arizona Pallet Depot started with a simple goal: make pallets easy and affordable for local businesses. We
            focus on the <strong>standard 48×40 composite pallet</strong> that most warehouses need—no endless guessing
            on sizes or specs. Every pallet is inspected for reliable, day-to-day performance.
          </p>
          <p className="mt-3 text-slate-700">
            Whether you’re picking up a small batch or coordinating a larger run, we keep it straightforward: fair
            pricing, fast communication, and on-time handoff.
          </p>
        </div>
        <div>
          <SectionHeading title="Why Choose Us" />
          <ul className="mt-4 space-y-3 text-slate-700">
            {reasons.map((r) => (
              <li key={r.label} className="flex gap-2">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>
                  <strong>{r.label}</strong> {r.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FeatureGrid
        title="What We Offer"
        features={products.map((p) => ({ title: `${p.name} — $${p.price}/unit`, description: p.description }))}
      />

      <ServiceArea note="Pickup in Gilbert by appointment. Delivery available by quote with minimums." />

      <CtaPanel
        title="Ready to order?"
        description="Tell us what you need and we’ll confirm availability and pricing right away."
        image={{ src: "/images/pallet-6.jpg", alt: "Industrial grade used 48x40 composite pallet — Arizona Pallet Depot" }}
      />
    </>
  );
}
