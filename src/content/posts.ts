import type { ComponentType } from "react";
import HowManyPalletsFit from "./posts/how-many-pallets-fit";
import ValueVsIndustrial from "./posts/value-vs-industrial-pallets";
import WhereToBuy from "./posts/where-to-buy-pallets-phoenix";

export type PostMeta = {
  slug: string;
  title: string;
  /** Shorter title for listing cards, when it differs. */
  cardTitle?: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  heroLead: string;
  eyebrow: string;
  category: "Guide" | "Logistics";
  readingTime: string;
  image: string;
  imageAlt: string;
  heroImageAlt: string;
};

// To add a post: create a component in ./posts, add its metadata here,
// and register the component in `postContent` below.
export const posts: PostMeta[] = [
  {
    slug: "where-to-buy-pallets-phoenix",
    title: "Where to Buy Pallets in Phoenix, AZ (2025)",
    cardTitle: "Where to Buy Pallets in Phoenix, AZ (Guide 2025)",
    metaTitle: "Where to Buy Pallets in Phoenix, AZ (Guide 2025)",
    description:
      "Your 2025 guide to buying pallets in Phoenix, AZ. Compare local suppliers, pricing, pickup vs. delivery, and how to choose between Value and Industrial Grade used 48×40 composite pallets.",
    excerpt:
      "Compare local suppliers, pickup vs. delivery, and when to choose Value vs. Industrial Grade used 48×40 composite pallets.",
    heroLead:
      "Here’s a local-first guide to finding pallets—how pricing works, when pickup beats delivery, and whether you need Value or Industrial Grade.",
    eyebrow: "Guide • Phoenix, AZ",
    category: "Guide",
    readingTime: "5–7 min read",
    image: "/images/pallet-4.jpg",
    imageAlt: "Where to buy pallets in Phoenix",
    heroImageAlt: "Used 48x40 composite pallets stacked in Phoenix AZ",
  },
  {
    slug: "value-vs-industrial-pallets",
    title: "Value vs. Industrial Grade Pallets: Which Should You Choose?",
    metaTitle: "Value vs. Industrial Grade Pallets: Which Should You Choose?",
    description:
      "Understand the difference between Value and Industrial Grade used 48×40 composite pallets, typical use cases, and how to choose the right pallet in Phoenix.",
    excerpt:
      "Understand the difference, typical use cases, and how to pick the right pallet for your operation in Phoenix.",
    heroLead: "The quick differences, when to use each, and how to choose based on load, handling, and budget.",
    eyebrow: "Guide • Phoenix, AZ",
    category: "Guide",
    readingTime: "4–6 min read",
    image: "/images/pallet-6.jpg",
    imageAlt: "Value vs Industrial pallets",
    heroImageAlt: "Industrial grade used 48x40 composite pallet in Phoenix AZ",
  },
  {
    slug: "how-many-pallets-fit",
    title: "How Many Pallets Fit? Pickup Trucks, Box Trucks & 53′ Trailers",
    metaTitle: "How Many Pallets Fit? Pickup Trucks, Box Trucks & 53′ Trailers",
    description:
      "Quick capacity guide for hauling used 48×40 pallets in Phoenix. See how many pallets fit in pickups, box trucks, and 53′ trailers so you can plan efficiently.",
    excerpt: "Quick capacity reference so you can plan pickups and deliveries without guesswork.",
    heroLead: "Use this quick guide to plan pickup or delivery for standard 48×40 composite pallets.",
    eyebrow: "Reference • Phoenix, AZ",
    category: "Logistics",
    readingTime: "3–5 min read",
    image: "/images/pallet-5.jpg",
    imageAlt: "How many pallets fit in pickup, box truck, trailer",
    heroImageAlt: "Value used 48x40 composite pallets in Phoenix AZ",
  },
];

const postContent: Record<string, ComponentType> = {
  "where-to-buy-pallets-phoenix": WhereToBuy,
  "value-vs-industrial-pallets": ValueVsIndustrial,
  "how-many-pallets-fit": HowManyPalletsFit,
};

export function getPost(slug: string) {
  const meta = posts.find((p) => p.slug === slug);
  const Content = postContent[slug];
  return meta && Content ? { ...meta, Content } : undefined;
}
