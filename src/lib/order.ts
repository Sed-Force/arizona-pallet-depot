export type Fulfillment = "pickup" | "delivery";

export type DeliveryAddress = { street: string; street2: string; city: string; state: string; zip: string };

/** Who's ordering and how the pallets get to them, from the checkout order form. */
export type OrderDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  fulfillment: Fulfillment;
  /** Only set for delivery orders. */
  address?: DeliveryAddress;
  /** Requested pickup or delivery date as YYYY-MM-DD. */
  requestedDate: string;
  notes: string;
};

export function formatAddress(a: DeliveryAddress) {
  return [a.street, a.street2, `${a.city}, ${a.state} ${a.zip}`].filter(Boolean).join(", ");
}

/** "Fri, Nov 20, 2026" from YYYY-MM-DD. */
export function formatRequestedDate(isoDate: string) {
  // Parse as a local date; `new Date("YYYY-MM-DD")` would read it as UTC and can land on the previous day.
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
