import type { Metadata } from "next";
import { BlogBrowser } from "@/components/blog/BlogBrowser";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { posts } from "@/content/posts";
import { breadcrumbSchema } from "@/lib/schema";
import { links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and tips for buying used 48×40 pallets in Phoenix & Gilbert, AZ. Pricing, delivery, and pallet selection advice.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <Hero
        half
        eyebrow="Articles & Insights"
        title="Resource Blog"
        description={
          <p>
            Practical guides for buying and using pallets in Phoenix. Learn about pricing, delivery, vehicle capacity,
            and how to choose between Value and Industrial Grade used 48×40 composite pallets.
          </p>
        }
        actions={[
          { label: "Get a Quote", href: links.quote, variant: "secondary" },
          { label: `Call Now`, href: links.tel },
        ]}
        image={{ src: "/images/pallet-4.jpg", alt: "Used 48x40 composite pallets in Phoenix, AZ" }}
      />

      <Container className="py-8 md:py-12">
        <BlogBrowser posts={posts} />
      </Container>

      <CtaPanel
        title="Questions About Pallets?"
        description="Our team has answers. Give us a call or get a quote today."
        image={{ src: "/images/pallet-6.jpg", alt: "Industrial grade pallets in Phoenix" }}
      />
    </>
  );
}
