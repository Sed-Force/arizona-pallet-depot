import type { Metadata } from "next";
import { FaqList } from "@/components/sections/FaqList";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { PricingCards } from "@/components/sections/PricingCards";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import { faqs, links } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Used 48×40 Pallets in Phoenix & Gilbert, AZ | Arizona Pallet Depot" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <Hero
        title="Phoenix Plastic Pallets Fast Delivery or Pickup"
        description={
          <p>
            Used plastic 48×40 GMA pallets. <strong>Starting at $15.00 per unit</strong>. Bulk discounts may apply.
            Pickup preferred; delivery/shipping available for a fee (call).
          </p>
        }
        actions={[
          { label: "Request Bulk Pricing", href: links.quote, variant: "secondary" },
          { label: "Text Us", href: links.sms, variant: "secondary" },
          { label: "Call Now", href: links.tel },
        ]}
        image={{ src: "/images/pallet-4.jpg", alt: "Used 48x40 Plastic pallets for sale in Phoenix AZ" }}
      >
        <TrustBadges />
      </Hero>

      <FeatureGrid
        title="What We Carry"
        features={[
          {
            title: "48×40 Used Plastic Pallets",
            description: "Durable, nestable, and consistent spec. Perfect for warehouses and shipping.",
          },
          {
            title: "Rackable & Stackable",
            description: "Designed to interlock easily — stack them high without shifting.",
          },
        ]}
      />

      <FeatureGrid
        title="Why Choose Us"
        tone="surface"
        columns={4}
        features={[
          { title: "Same-Day Options", description: "Need pallets today? We’ll do our best." },
          { title: "Bulk Pricing", description: "Save more at higher quantities." },
          { title: "Pallet Pickup in Gilbert", description: "By appointment only." },
          { title: "Valley-Wide Pallet Delivery", description: "Phoenix metro coverage." },
        ]}
      />

      <PricingCards />
      <ServiceArea />
      <FaqList faqs={faqs} />
      <QuoteForm />
    </>
  );
}
