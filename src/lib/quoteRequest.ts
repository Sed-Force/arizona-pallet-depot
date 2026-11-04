"use server";

import { postToFormspree } from "./formspree";
import { formatAddress, formatRequestedDate } from "./order";
import { site } from "./site";

/**
 * Turns the quote form's fields into a Formspree submission: subject "AZ Pallet Depot - Request for
 * <service date>", then each filled-in field under a readable label, which is how Formspree lists them in the email.
 */
function quoteSubmission(data: FormData) {
  const get = (name: string) => String(data.get(name) ?? "").trim();
  const date = get("requested_date") ? formatRequestedDate(get("requested_date")) : "";
  const delivery = get("fulfillment") === "delivery";

  const fields: Record<string, string> = {
    Name: get("name"),
    Phone: get("phone"),
    Email: get("email"),
    "Pallet type": get("type"),
    Quantity: get("quantity"),
    "Service date": date || "Flexible",
    "Pickup or delivery": delivery ? "Delivery" : `Pickup (${site.pickup.location})`,
    "Delivery address": delivery
      ? formatAddress({
          street: get("delivery_street"),
          street2: get("delivery_street2"),
          city: get("delivery_city"),
          state: get("delivery_state"),
          zip: get("delivery_zip"),
        })
      : "",
    Notes: get("notes"),
  };

  return {
    _subject: `AZ Pallet Depot - Request for ${date || "Flexible Date"}`,
    // Lets "Reply" in the notification email go straight to the customer.
    ...(fields.Email && { _replyto: fields.Email }),
    ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value)),
  };
}

/**
 * Server function: sends the quote form to Formspree. Resolves false if it didn't go through, so the page can offer
 * phone/email instead.
 */
export async function sendQuoteRequest(data: FormData): Promise<boolean> {
  return postToFormspree("quote", quoteSubmission(data));
}
