"use server";

import { postToFormspree } from "./formspree";
import { formatAddress, formatRequestedDate, type OrderDetails } from "./order";
import { describeCart, formatUsd, type PricedCart } from "./pricing";
import { site } from "./site";

type OrderNotice = {
  details: OrderDetails;
  order: PricedCart;
  /** How the customer is paying, e.g. "Cash (pay on arrival, collect at pickup)". */
  payment: string;
};

/**
 * Server function: emails the business the order through Formspree once the customer chooses to pay on arrival (cash) or says
 * they've sent payment (Zelle). Resolves false if it couldn't be sent, so the page can ask the customer to call instead.
 */
export async function sendOrderNotice({ details, order, payment }: OrderNotice): Promise<boolean> {
  const date = formatRequestedDate(details.requestedDate);
  const fields: Record<string, string> = {
    Payment: payment,
    Order: describeCart(order.lines),
    Units: String(order.qty),
    "Bulk discount": order.savings > 0 ? `−${formatUsd(order.savings)}` : "None",
    Total: formatUsd(order.total),
    Name: `${details.firstName} ${details.lastName}`,
    Company: details.company,
    Phone: details.phone,
    Email: details.email,
    "Service date": date,
    "Pickup or delivery": details.fulfillment === "delivery" ? "Delivery" : `Pickup (${site.pickup.location})`,
    "Delivery address": details.address ? formatAddress(details.address) : "",
    Notes: details.notes,
  };

  return postToFormspree("order", {
    // Same pattern as quote requests ("AZ Pallet Depot - Request for …"), so orders stand out in the inbox.
    _subject: `AZ Pallet Depot - Order for ${date} (${formatUsd(order.total)}, ${payment.split(" ")[0]})`,
    _replyto: details.email,
    ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value)),
  });
}
