import { faqs, products, site } from "./site";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: site.name,
      url: `${site.url}/`,
      email: `mailto:${site.email}`,
      telephone: site.phone.e164,
      areaServed: ["Phoenix", "Gilbert", "Mesa", "Chandler", "San Tan Valley", "Scottsdale"].map((name) => ({
        "@type": "City",
        name,
      })),
      keywords: "used pallets, 48x40 composite pallets, buy pallets Phoenix, pallets Gilbert AZ",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "07:00",
          closes: "18:00",
        },
      ],
      priceRange: "$$",
      description:
        "Used 48×40 composite pallets with Value and Industrial Grade options. Pickup in Gilbert by appointment; delivery available by quote.",
    },
    ...products.map((p) => ({
      "@type": "Product",
      name: p.schemaName,
      brand: { "@type": "Brand", name: site.name },
      category: "Pallet",
      url: `${site.url}/#pricing`,
      image: `${site.url}${p.image}`,
      description: p.description,
      itemCondition: "https://schema.org/UsedCondition",
      offers: {
        "@type": "Offer",
        price: p.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    })),
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
