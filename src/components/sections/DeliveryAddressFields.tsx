import { fieldClasses as field } from "@/components/ui/fieldClasses";

type DeliveryAddressFieldsProps = {
  /** Keeps ids unique when more than one form on the site renders these fields. */
  idPrefix: string;
};

/**
 * Delivery address block shared by the quote form and checkout. Render it only while Delivery is
 * chosen: unmounted fields aren't submitted or validated, so they're required only while shown.
 */
export function DeliveryAddressFields({ idPrefix }: DeliveryAddressFieldsProps) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <fieldset className="grid gap-4 rounded-xl border border-border p-4">
      <legend className="px-1 text-sm font-semibold">Delivery address</legend>

      <label className="sr-only" htmlFor={id("street")}>Street address</label>
      <input id={id("street")} required name="delivery_street" placeholder="Street address" autoComplete="shipping address-line1" className={field} />

      <label className="sr-only" htmlFor={id("street2")}>Suite, unit, or dock (optional)</label>
      <input id={id("street2")} name="delivery_street2" placeholder="Suite, unit, or dock (optional)" autoComplete="shipping address-line2" className={field} />

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_8rem]">
        <label className="sr-only" htmlFor={id("city")}>City</label>
        <input id={id("city")} required name="delivery_city" placeholder="City" autoComplete="shipping address-level2" className={field} />

        <label className="sr-only" htmlFor={id("state")}>State</label>
        {/* Delivery is Phoenix-metro only, so the state is fixed. */}
        <input id={id("state")} name="delivery_state" value="AZ" readOnly aria-readonly className={`${field} text-muted sm:w-16`} />

        <label className="sr-only" htmlFor={id("zip")}>ZIP code</label>
        <input
          id={id("zip")}
          required
          name="delivery_zip"
          placeholder="ZIP"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          title="5-digit ZIP code"
          autoComplete="shipping postal-code"
          className={field}
        />
      </div>
    </fieldset>
  );
}
