import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatUsd } from "@/lib/pricing";
import { bulkTiers, links, products, site } from "@/lib/site";
import Link from "next/link";

function Price({ children, unit }: { children: React.ReactNode; unit?: string }) {
  return (
    <p className="mt-2 text-3xl font-extrabold">
      {children}
      {unit && <span className="text-base font-semibold">{unit}</span>}
    </p>
  );
}

export function PricingCards() {
  return (
    <Section id="pricing">
      <SectionHeading
        title="Pallet Pricing & Bulk"
        description={
          <div className="text-body">
            <strong>Compare us with competitors</strong> who list the same plastic pallets at $155.00 - get the same
            utility at a fraction of the cost. <em>Cash preferred.</em>
          </div>
        }
      />

      {/* Product cards side by side from sm up; Bulk / Custom spans the full row beneath. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <Card key={p.id} padded={false} className="flex flex-col overflow-hidden">
            <div className="relative aspect-[4/3] bg-surface-3">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold">{p.name}</h3>
              <Price unit="/unit">${p.price}</Price>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </div>
          </Card>
        ))}

        <div className="sm:col-span-2">
          <h3 className="font-semibold text-xl">Bulk / Custom Orders</h3>
          <p className="mt-1 text-body text-muted">The more you order, the more you save.</p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {bulkTiers.map((tier) => (
              <li
                key={tier.minQty}
                className={`${tier.discountPerPallet !== undefined ? "bg-surface border border-border" : "group relative bg-primary items-center justify-between transition-colors hover:bg-primary-hover"} flex flex-col gap-4 rounded-lg p-4`}
              >
                <p className={`${tier.discountPerPallet !== undefined ? "text-muted" : "text-white"} text-sm font-semibold w-full text-left`}>
                  {tier.minQty}+ pallets
                </p>
                
                {tier.discountPerPallet !== undefined ? (
                  <div className="flex flex-col flex-1 gap-2 items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-3xl font-extrabold">{formatUsd(tier.discountPerPallet)}</p>
                      
                      <div className="flex flex-col items-start font-bold">
                        <p className="text-xs text-muted">Discount</p>
                        <p className="text-xs text-muted">per pallet</p>
                      </div>
                    </div>

                    {/* Savings at the tier's threshold quantity; larger orders save more. */}
                    <p className="w-full text-center self-start rounded-full border border-success-border bg-success-soft px-3 py-1 text-sm font-semibold text-success-foreground">
                      Instant ${tier.discountPerPallet * tier.minQty} savings!
                    </p>
                  </div>
                ) : (
                  // The ::after overlay stretches this link over the whole card, so the entire frame is clickable.
                  <Link
                    href={links.tel}
                    className="text-white flex-1 flex items-start justify-center after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-white focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-primary"
                  >
                    <p className="flex flex-col text-center ">
                      <span className="text-3xl font-extrabold text-white">Call</span>
                      <span className="block text-sm text-white">for our best rates</span>
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
