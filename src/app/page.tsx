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

import Discount from "@mui/icons-material/Discount";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Forklift from "@mui/icons-material/Forklift";
import Schedule from "@mui/icons-material/Schedule";

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
        eyebrow="Fast Pickup & Delivery"
        title="Plastic Pallets in Phoenix"
        description={
          <ul className="list-disc pl-5 gap-2 flex flex-col">
            <li>Used plastic 48×40 GMA pallets</li>
            <li>Bulk discounts may apply</li>
            <li>Pickup & Delivery available</li> 
            <li><strong>Starting at $15.00 per unit</strong></li>
          </ul>
        }
        actions={[
          { label: "Get a Quote", href: links.quote, variant: "secondary" },
          { label: "Text Us", href: links.sms, variant: "secondary" },
          { label: "Call Now", href: links.tel },
        ]}
        image={{ src: "/images/pallet-4.jpg", alt: "Used 48x40 Plastic pallets for sale in Phoenix AZ" }}
        footer={<TrustBadges />}
      />

      {/* <FeatureGrid
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
      /> */}

      <FeatureGrid
        title="Why Choose Us?"
        tone="surface"
        columns={4}
        features={[
          { title: "Same-Day Service", description: "We'll do our best to get you your pallets today.", icon: Schedule },
          { title: "Bulk Pricing", description: "Higher quantities equal bigger savings.", icon: Discount },
          { title: "Pallet Pickup", description: "By appointment only in Gilbert.", icon: Forklift },
          { title: "Valley-Wide Delivery", description: "We deliver to the entire Phoenix metro area.", icon: LocalShipping },
        ]}
      />

      <PricingCards />
      <ServiceArea note="Same day pickup & delivery available throughout the entire valley. Reach out to schedule your order!" />
      <FaqList faqs={faqs} />
      <QuoteForm />
    </>
  );
}
