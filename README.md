# Arizona Pallet Depot (Next.js)

Next.js rebuild of the static `arizona-pallet-depot` site — App Router, TypeScript, Tailwind CSS v4.

## Getting started

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_PAYPAL_CLIENT_ID
npm install
npm run dev
```

## Structure

```
src/
  app/                    Routes: /, /about, /calculator, /blog, /blog/[slug], /thanks, sitemap, robots
  components/
    layout/               Global Navbar, Footer, MobileActionBar (rendered once in app/layout.tsx)
    ui/                   Primitives: Button/ButtonLink, Card, Container, Section, SectionHeading, Logo, JsonLd
    sections/             Page sections: Hero, FeatureGrid, PricingCards, ServiceArea, FaqList, QuoteForm, CtaPanel
    blog/                 PostCard, BlogBrowser (search + category filter), Prose
    calculator/           PalletCalculator (client component with PayPal checkout)
  content/posts.ts        Blog post metadata + registry; post bodies live in content/posts/*.tsx
  lib/site.ts             Business details, nav items, products, FAQs — edit here, not in pages
  lib/schema.ts           JSON-LD structured data
```

### Common edits

- **Phone, email, hours, service area, prices:** `src/lib/site.ts`
- **Nav links:** `navItems` in `src/lib/site.ts` (used by navbar and footer)
- **New blog post:** add a component in `src/content/posts/`, then its metadata to `posts` and the component to `postContent` in `src/content/posts.ts`

## Icons

[Material UI icons](https://mui.com/material-ui/material-icons/) (`@mui/icons-material`) are available. Import each icon by path, and size or color it with Tailwind classes:

```tsx
import PhoneIcon from "@mui/icons-material/Phone";

<PhoneIcon className="!text-xl text-blue-600" aria-hidden />
```

Icons inherit the surrounding text color. MUI's styles are emitted into a CSS `@layer mui` that sits below Tailwind's utilities (`globals.css`), so Tailwind classes override them. Font-size utilities still need `!` because MUI sets icon size through its own class. The `AppRouterCacheProvider` in `app/layout.tsx` renders those styles on the server.

## Before launch

- Set the real Formspree ID in `site.quoteFormAction` (`src/lib/site.ts`) — it's still the `yourFormID` placeholder from the original site.
- Set `NEXT_PUBLIC_PAYPAL_CLIENT_ID` in the hosting environment.

Old URLs (`/about.html`, `/calculator.html`, `/pallet-N.jpg`, …) permanently redirect to their new paths (`next.config.ts`).
