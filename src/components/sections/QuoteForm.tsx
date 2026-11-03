import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { links, products, site } from "@/lib/site";

const field = "w-full rounded-lg border border-border-strong bg-surface px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function QuoteForm() {
  return (
    <Section id="quote" tone="surface" containerClassName="grid gap-10 md:grid-cols-2">
      <div>
        <SectionHeading
          title="Request a Quote"
          description="Tell us what you need — we’ll confirm availability and price."
        />

        <form action={site.quoteFormAction} method="POST" className="mt-6 grid gap-4">
          <input type="hidden" name="_next" value={`${site.url}/thanks`} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sr-only" htmlFor="q-name">Your name</label>
            <input id="q-name" required name="name" placeholder="Your name" autoComplete="name" className={field} />
            <label className="sr-only" htmlFor="q-phone">Phone</label>
            <input id="q-phone" required name="phone" type="tel" placeholder="Phone" autoComplete="tel" className={field} />
          </div>

          <label className="sr-only" htmlFor="q-email">Email</label>
          <input id="q-email" name="email" type="email" placeholder="Email (optional)" autoComplete="email" className={field} />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sr-only" htmlFor="q-qty">Quantity</label>
            <input id="q-qty" name="quantity" type="number" min={1} inputMode="numeric" placeholder="Quantity" className={field} />
            <label className="sr-only" htmlFor="q-type">Pallet type</label>
            <select id="q-type" name="type" defaultValue="" className={field}>
              <option value="">Type</option>
              {products.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <label className="sr-only" htmlFor="q-method">Pickup or delivery</label>
          <select id="q-method" name="method" defaultValue="" className={field}>
            <option value="">Pallet Pickup or Delivery?</option>
            <option>Pickup</option>
            <option>Delivery</option>
          </select>

          <label className="sr-only" htmlFor="q-notes">Notes</label>
          <textarea id="q-notes" name="notes" rows={4} placeholder="Notes (timing, delivery details, etc.)" className={field} />

          <button type="submit" className={buttonClasses("primary", "lg", "w-full sm:w-auto sm:justify-self-start")}>
            Send Request
          </button>
        </form>

        <p className="mt-4 text-sm text-muted">
          Prefer to talk?{" "}
          <a href={links.tel} className="font-semibold underline">Call {site.phone.display}</a> or{" "}
          <a href={links.sms} className="font-semibold underline">text us</a>.
        </p>
      </div>

      <div className="md:pt-14">
        <Card className="rounded-2xl">
          <h3 className="font-semibold">Pickup</h3>
          <p className="mt-2 text-body">{site.pickup.location}</p>
          <p className="mt-4 text-sm text-muted">Hours: {site.pickup.hours}</p>
          <p className="mt-1 text-sm break-words text-muted">
            Email: <a className="underline" href={links.mailto}>{site.email}</a>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={links.tel} size="md">Call Now</ButtonLink>
            <ButtonLink href={links.sms} size="md" variant="secondary">Text Us</ButtonLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}
