"use client";

import { FulfillmentFields } from "@/components/sections/FulfillmentFields";
import { PhoneField } from "@/components/ui/PhoneField";
import { fieldClasses as field } from "@/components/ui/fieldClasses";
import type { Fulfillment, OrderDetails } from "@/lib/order";

/** Reads the fields below out of their form once the browser has validated it. */
export function readOrderDetails(form: HTMLFormElement): OrderDetails {
  const data = new FormData(form);
  const get = (name: string) => String(data.get(name) ?? "").trim();
  const fulfillment: Fulfillment = get("fulfillment") === "delivery" ? "delivery" : "pickup";

  return {
    firstName: get("first_name"),
    lastName: get("last_name"),
    phone: get("phone"),
    email: get("email"),
    company: get("company"),
    fulfillment,
    ...(fulfillment === "delivery" && {
      address: {
        street: get("delivery_street"),
        street2: get("delivery_street2"),
        city: get("delivery_city"),
        state: get("delivery_state"),
        zip: get("delivery_zip"),
      },
    }),
    requestedDate: get("requested_date"),
    notes: get("notes"),
  };
}

/** Contact, pickup/delivery and notes fields for the checkout order form. */
export function OrderDetailsFields() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="o-first">First name</label>
        <input id="o-first" required name="first_name" placeholder="First name" autoComplete="given-name" className={field} />
        <label className="sr-only" htmlFor="o-last">Last name</label>
        <input id="o-last" required name="last_name" placeholder="Last name" autoComplete="family-name" className={field} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="o-phone">Phone</label>
        <PhoneField id="o-phone" name="phone" required />
        <label className="sr-only" htmlFor="o-email">Email</label>
        <input id="o-email" required name="email" type="email" placeholder="Email" autoComplete="email" className={field} />
      </div>

      <label className="sr-only" htmlFor="o-company">Company (optional)</label>
      <input id="o-company" name="company" placeholder="Company (optional)" autoComplete="organization" className={field} />

      <FulfillmentFields idPrefix="o" dateRequired />

      <label className="sr-only" htmlFor="o-notes">Notes (optional)</label>
      <textarea id="o-notes" name="notes" rows={3} placeholder="Notes (optional) — dock hours, gate codes, timing" className={field} />
    </div>
  );
}
