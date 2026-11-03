import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bulkTiers, links, products, site } from "@/lib/site";

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
          <>
            <strong>Prices start at $15.00 per pallet.</strong> Request a quote for shipping or bulk orders.
          </>
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

        <Card className="sm:col-span-2">
          <h3 className="font-semibold">Bulk / Custom</h3>
          <p className="mt-1 text-sm text-muted">The more you order, the more you save.</p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {bulkTiers.map((tier) => (
              <li
                key={tier.label}
                className="flex flex-col rounded-lg border border-primary/20 bg-primary-soft p-4"
              >
                <p className="text-sm font-semibold text-link">{tier.label}</p>
                <p className="mt-1 text-3xl font-extrabold">{tier.deal}</p>
                <p className="text-sm text-muted">{tier.detail}</p>
                {tier.callForPrice && (
                  <ButtonLink href={links.tel} size="sm" className="mt-3 self-start">
                    Call {site.phone.display}
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-border-strong p-4 text-body">
        <strong>Compared to competitors</strong> who list the same plastic pallets starting at $155.00 — get the same
        utility at a fraction of the cost. <em>Cash preferred.</em>
      </div>
    </Section>
  );
}
