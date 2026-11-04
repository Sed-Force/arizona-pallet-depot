"use client";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { useState, useSyncExternalStore } from "react";
import { fieldClasses as field } from "@/components/ui/fieldClasses";
import type { Fulfillment } from "@/lib/order";
import { site } from "@/lib/site";
import { DeliveryAddressFields } from "./DeliveryAddressFields";

const fulfillmentOptions = [
  { value: "pickup", label: "Pickup", detail: `From our yard in ${site.pickup.location}`, Icon: StorefrontIcon },
  { value: "delivery", label: "Delivery", detail: "To your site, Phoenix metro", Icon: LocalShippingIcon },
] as const;

/** A date `days` from today in the visitor's local time, as YYYY-MM-DD for a date input's `min`/`max`. */
function daysFromToday(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

const tomorrow = () => daysFromToday(1);
// Without a `max`, browsers let the year run to six digits ("202612"); a 4-digit max caps it at four.
const oneYearOut = () => daysFromToday(365);

const noSubscribe = () => () => {};

type FulfillmentFieldsProps = {
  /** Keeps ids unique when more than one form on the site renders these fields. */
  idPrefix: string;
  disabled?: boolean;
  /** Whether a requested date must be given (checkout) or is optional (quote requests). */
  dateRequired?: boolean;
};

/**
 * Service date, Pickup/Delivery toggle, and (for delivery) the address fields. Shared by the quote form
 * and checkout. Submits `fulfillment` ("pickup" or "delivery"), `requested_date`, and the `delivery_*` fields.
 */
export function FulfillmentFields({ idPrefix, disabled, dateRequired }: FulfillmentFieldsProps) {
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  // Computed in the browser only: the server's timezone can be a day ahead of the visitor's.
  const minDate = useSyncExternalStore(noSubscribe, tomorrow, () => undefined);
  const maxDate = useSyncExternalStore(noSubscribe, oneYearOut, () => undefined);
  const dateId = `${idPrefix}-date`;

  return (
    <>
      <div className="grid gap-3">
        {/* Same style and spacing as the "Pickup or delivery?" label below. */}
        <label htmlFor={dateId} className="text-sm font-semibold">
          Service date{!dateRequired && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        <input id={dateId} required={dateRequired} name="requested_date" type="date" min={minDate} max={maxDate} className={field} />
      </div>

      <RadioGroup
        name="fulfillment"
        value={fulfillment}
        onChange={setFulfillment}
        disabled={disabled}
        className="grid gap-3 sm:grid-cols-2"
      >
        <Label className="text-sm font-semibold sm:col-span-2">Pickup or delivery?</Label>
        {fulfillmentOptions.map(({ value, label, detail, Icon }) => (
          <Radio
            key={value}
            value={value}
            aria-label={`${label}: ${detail}`}
            className="group flex cursor-pointer items-center gap-3 rounded-xl border border-border-strong bg-surface p-3 transition-colors hover:bg-surface-2 focus:outline-none data-checked:border-primary data-checked:bg-primary-soft data-disabled:cursor-default data-focus:ring-2 data-focus:ring-primary/30"
          >
            <Icon className="text-muted group-data-checked:text-link" aria-hidden />
            <span className="flex flex-col">
              <span className="font-semibold group-data-checked:text-link">{label}</span>
              <span className="text-xs text-muted">{detail}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>

      {fulfillment === "delivery" && <DeliveryAddressFields idPrefix={idPrefix} />}
    </>
  );
}
