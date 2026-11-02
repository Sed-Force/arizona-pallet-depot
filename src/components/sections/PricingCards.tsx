import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/site";

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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} padded={false} className="flex flex-col overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-200">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold">{p.name}</h3>
              <Price unit="/unit">${p.price}</Price>
              <p className="mt-1 text-sm text-slate-600">{p.description}</p>
            </div>
          </Card>
        ))}

        <Card className="flex flex-col justify-center sm:col-span-2 lg:col-span-1">
          <h3 className="font-semibold">Bulk / Custom</h3>
          <Price>Call</Price>
          <p className="mt-1 text-sm text-slate-600">Best rates on 200+ units</p>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-slate-700">
        <strong>Compared to competitors</strong> who list the same plastic pallets starting at $155.00 — get the same
        utility at a fraction of the cost. <em>Cash preferred.</em>
      </div>
    </Section>
  );
}
