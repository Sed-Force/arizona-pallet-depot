// Single source of truth for business details used across the site.

export const site = {
  name: "Arizona Pallet Depot",
  url: "https://arizonapalletdepot.com",
  phone: {
    display: "602-644-0600",
    e164: "+16026440600",
  },
  email: "layna@forcecabinets.com",
  pickup: {
    location: "Gilbert, AZ — by appointment only",
    hours: "Mon–Thurs 7am–5pm, Friday by appointment.",
  },
  // Replace with the real Formspree form ID before launch.
  quoteFormAction: "https://formspree.io/f/yourFormID",
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
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Buy Now", href: "/calculator" },
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
    name: "Industrial Grade Plastic Pallet",
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
  /** Order size the tier applies to, shown as the tier's heading. */
  label: string;
  /** Headline deal, e.g. "$1.00 off". */
  deal: string;
  detail: string;
  /** Tiers without a fixed discount send buyers to call instead. */
  callForPrice?: boolean;
};

export const bulkTiers: BulkTier[] = [
  { label: "Over 50 pallets", deal: "$1.00 off", detail: "per pallet" },
  { label: "Over 100 pallets", deal: "$2.00 off", detail: "per pallet" },
  { label: "Over 200 pallets", deal: "Call", detail: "for our best rates", callForPrice: true },
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
    question: "Do you deliver or ship?",
    answer:
      "Yes. Valley-wide delivery with minimum quantities and LTL shipping by quote. Pickup is preferred.",
  },
  {
    question: "Payment methods?",
    answer: "Cash preferred. Ask about other options when you call.",
  },
];
