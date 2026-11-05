// Single source of truth for business details used across the site.

import { formatPhone, phoneDigits } from "./phone";

// Written out in full so Next.js can inline it into browser code too (it only replaces literal process.env.NEXT_PUBLIC_* reads).
const email = process.env.NEXT_PUBLIC_EMAIL;
if (!email) throw new Error("NEXT_PUBLIC_EMAIL is not set. Add it to .env.local (see .env.example).");

// A US number in any format ("6025550100", "602-555-0100", "+1 602 555 0100"); only the digits are kept.
const businessPhone = phoneDigits(process.env.NEXT_PUBLIC_PHONE ?? "");
if (businessPhone.length !== 10) throw new Error("NEXT_PUBLIC_PHONE must be a 10-digit US phone number. Set it in .env.local (see .env.example).");

const zelleEmail = process.env.NEXT_PUBLIC_ZELLE_EMAIL;
const zelleRecipient = process.env.NEXT_PUBLIC_ZELLE_RECIPIENT;
if (!zelleEmail || !zelleRecipient) throw new Error("NEXT_PUBLIC_ZELLE_EMAIL and NEXT_PUBLIC_ZELLE_RECIPIENT must be set. Add them to .env.local (see .env.example).");

export const site = {
  name: "Arizona Pallet Depot",
  url: "https://arizonapalletdepot.com",
  phone: {
    /** Shown on the page, e.g. "(602) 555 - 0100". */
    display: formatPhone(businessPhone),
    /** For tel:/sms: links and structured data, e.g. "+16025550100". */
    e164: `+1${businessPhone}`,
  },
  email,
  pickup: {
    location: "Gilbert, AZ",
    operation: {
      startDay: "Mon",
      endDay: "Thu",
      startTime: "6:30am",
      endTime: "4pm",
      flexDay: "Friday",
      note: "by appointment only",
    },
  },
  // Zelle details shown at checkout: the email registered with Zelle, and the name the bank shows for it.
  zelle: { email: zelleEmail, recipient: zelleRecipient },
  serviceArea: [
    "Phoenix",
    "Mesa",
    "Gilbert",
    "Chandler",
    "Tempe",
    "Scottsdale",
    "Queen Creek",
    "Glendale",
    "Peoria",
    "Casa Grande",
    "Fountain Hills",
    "Maricopa",
    "San Tan Valley",
    "Florence",
    "Goodyear",
  ],
} as const;

export const links = {
  tel: `tel:${site.phone.e164}`,
  sms: `sms:${site.phone.e164}`,
  mailto: `mailto:${site.email}`,
  quote: "/#quote",
  pricing: "/#pricing",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  // { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Buy Now", href: "/checkout" },
];

export type Product = {
  id: "value" | "industrial";
  name: string;
  /** Compact label for selects and other tight spaces. */
  shortName: string;
  schemaName: string;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "value",
    name: "Value Pallet",
    shortName: "Value Pallet",
    schemaName: "Value Pallet (Used 48×40 Composite)",
    price: 15,
    image: "/images/pallet-5.jpg",
    imageAlt: "Value pallet — used 48x40 composite for budget-friendly use",
    description:
      "Cost-effective 48×40 plastic pallet for simple, routine use. Normal signs of use may be present (minor, non-structural chips). Ideal when price matters most.",
  },
  {
    id: "industrial",
    name: "Industrial Pallet",
    shortName: "Industrial Grade",
    schemaName: "Industrial Grade Pallet (Used 48×40 Composite)",
    price: 30,
    image: "/images/pallet-7.jpg",
    imageAlt: "Industrial grade pallet — heavy-duty used 48x40 composite pallet",
    description:
      "Rugged 48×40 plastic pallet engineered for demanding loads and frequent handling. Comparable new plastic pallets are often priced near $155—get similar utility for less.",
  },
];

export type BulkTier = {
  /** The tier applies to orders of at least this many pallets. */
  minQty: number;
  /** Dollars off every pallet in the order. Omit for a "call for best rates" tier. */
  discountPerPallet?: number;
};

// Ascending by `minQty`. Drives the pricing card and the checkout totals (lib/pricing.ts).
export const bulkTiers: BulkTier[] = [
  { minQty: 50, discountPerPallet: 1 },
  { minQty: 100, discountPerPallet: 2 },
  { minQty: 200 },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What sizes do you stock?",
    answer:
      "We stock only the standard 48×40 composite pallet in Value and Industrial Grade options.",
  },
  {
    question: "Are these pallets stackable or rackable?",
    answer:
      "Yes — both Value and Industrial Grade plastic pallets are designed to interlock securely and can be stacked high without shifting.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Yes - we deliver to the entire Phoenix metro area. Please call for pricing and availability.",
  },
  {
    question: "Payment methods?",
    answer: "Cash preferred. Ask about other options when you call.",
  },
];
