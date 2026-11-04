import type { Metadata } from "next";
import Image from "next/image";
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
    label: "Unbeatable Savings:",
    text: (
      <>
        Comparable new pallets list near <span className="whitespace-nowrap">$155</span>—ours deliver similar utility
        for far less.
      </>
    ),
  },
  { label: "Two Clear Options:", text: "Value (budget-friendly) and Industrial Grade (heavy-duty)." },
  { label: "Local & Responsive:", text: "Pickup in Gilbert by appointment or delivery by quote." },
  { label: "Same-Day Services:", text: "When inventory allows, we move quickly." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        half
        eyebrow="About Us"
        title={`${site.name}`}
        description={
          <p>
            We’re a Gilbert-based supplier serving the Phoenix metro with reliable, used 48×40 composite pallets. Choose
            from <strong>Value ($15)</strong> and <strong>Industrial Grade ($30)</strong>. Pickup is by appointment;
            delivery available by quote.
          </p>
        }
        actions={[
          { label: "Get a Quote", href: links.quote, variant: "secondary" },
          { label: `Call Now`, href: links.tel },
        ]}
        image={{ src: "/images/pallet-4.jpg", alt: "Arizona Pallet Depot — used 48x40 composite pallets in Phoenix AZ" }}
      />

      <Section tone="surface" containerClassName="grid gap-10 md:grid-cols-2">
        <Image
          width={500}
          height={500}
          src="/images/pallet-7.jpg"
          alt="Arizona Pallet Depot — used 48x40 composite pallets in Phoenix AZ"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* self-start keeps the column its own height so it can travel alongside the taller image;
            top-24 clears the 4rem sticky navbar with a 2rem gap. */}
        <div className="md:sticky md:top-24 md:self-start">
          <SectionHeading title="Our Story" />
          <p className="mt-3 text-body">
            Arizona Pallet Depot started with a simple goal: make pallets easy and affordable for local businesses. We
            focus on the <strong>standard 48×40 composite pallet</strong> that most warehouses need—no endless guessing
            on sizes or specs. Every pallet is inspected for reliable, day-to-day performance.
          </p>
          <p className="mt-3 text-body">
            Whether you’re picking up a small batch or coordinating a larger run, we keep it straightforward: fair
            pricing, fast communication, and on-time handoff.
          </p>
        </div>
      </Section>

      <FeatureGrid
        title="Why Work With Us?"
        features={reasons.map((r) => ({ title: r.label, description: r.text }))}
      />

      <ServiceArea note="Pickup in Gilbert by appointment. Delivery available by quote with minimums." />
    </>
  );
}
