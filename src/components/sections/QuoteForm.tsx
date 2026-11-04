import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneField } from "@/components/ui/PhoneField";
import { QuantityField } from "@/components/ui/QuantityField";
import { SelectField } from "@/components/ui/SelectField";
import { fieldClasses as field } from "@/components/ui/fieldClasses";
import { FulfillmentFields } from "./FulfillmentFields";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { links, products, site } from "@/lib/site";

export function QuoteForm() {
  return (
    <Section id="quote" tone="surface" containerClassName="grid gap-10 md:grid-cols-2">
      <div>
        <SectionHeading
          title="Request a Quote"
          description="Tell us what you need — we’ll confirm availability and price."
        />

        {/* Sends to Formspree, which emails the request to us; see QuoteRequestForm. */}
        <QuoteRequestForm className="mt-6 grid min-w-0 gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sr-only" htmlFor="q-name">Your name</label>
            <input id="q-name" required name="name" placeholder="Your name" autoComplete="name" className={field} />
            <label className="sr-only" htmlFor="q-phone">Phone</label>
            <PhoneField id="q-phone" name="phone" required />
          </div>

          <label className="sr-only" htmlFor="q-email">Email</label>
          <input id="q-email" name="email" type="email" placeholder="Email (optional)" autoComplete="email" className={field} />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sr-only" htmlFor="q-qty">Quantity</label>
            <SelectField name="type" label="Pallet type" placeholder="Type" options={products.map((p) => p.name)} />
            <QuantityField id="q-qty" name="quantity" placeholder="Quantity" />
          </div>

          <FulfillmentFields idPrefix="q" />

          <label className="sr-only" htmlFor="q-notes">Notes</label>
          <textarea id="q-notes" name="notes" rows={4} placeholder="Notes (timing, delivery details, etc.)" className={field} />

          <button type="submit" className={buttonClasses("primary", "lg", "w-full sm:w-auto sm:justify-self-start")}>
            Send Request
          </button>
        </QuoteRequestForm>
      </div>

      {/* The column stretches to the form's height, giving the sticky card room to travel.
          top-24 clears the 4rem sticky navbar with a 2rem gap. */}
      <div className="">
        <Card className="rounded-2xl md:sticky md:top-24 bg-surface-2 flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              Operating Hours
            </h3>

            <ul className="list-disc pl-4 text-body">
              <li>
                {site.pickup.operation.startDay} - {site.pickup.operation.endDay}, {site.pickup.operation.startTime} - {site.pickup.operation.endTime}
              </li>
              <li>
                {site.pickup.operation.flexDay} {site.pickup.operation.note}
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              Pickup Available
            </h3>
            <p className="mt-2 text-body">In {site.pickup.location} {site.pickup.operation.note}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold">
              Contact Us Directly
            </p>

            <div className="flex flex-col gap-2">
              <p className="mt-2 text-body">
                Email: <a className="hover:text-link" href={links.mailto}>{site.email}</a>
              </p>

              {/* <div className="flex flex-row flex-wrap gap-4">
                <ButtonLink 
                  href={links.sms}
                  size="md"
                  variant="secondary"
                  className="flex-1"
                >
                  Text Us
                </ButtonLink>
                
                <ButtonLink
                  href={links.tel}
                  size="md"
                  className="flex-1"
                >
                  Call Now
                </ButtonLink>
              </div> */}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
