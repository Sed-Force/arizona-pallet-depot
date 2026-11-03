import { bulkTiers } from "./site";

// bulkTiers is sorted by `minQty`, so the last tier an order clears is its best one.
const discountTiers = bulkTiers.filter((t) => t.discountPerPallet !== undefined);

/** The discount tier this quantity qualifies for, if any. The discount applies to every pallet. */
export function discountTierFor(qty: number) {
  return discountTiers.findLast((t) => qty >= t.minQty);
}

/** The next discount tier this quantity hasn't reached yet, for "order N more to save" hints. */
export function nextDiscountTier(qty: number) {
  return discountTiers.find((t) => qty < t.minQty);
}

/** True when the order is large enough that we'd rather quote it by phone. */
export function qualifiesForCallRate(qty: number) {
  return bulkTiers.some((t) => t.discountPerPallet === undefined && qty >= t.minQty);
}

export function priceOrder(unitPrice: number, qty: number) {
  const discountPerPallet = discountTierFor(qty)?.discountPerPallet ?? 0;
  const unitAfterDiscount = unitPrice - discountPerPallet;
  return {
    discountPerPallet,
    unitAfterDiscount,
    subtotal: unitPrice * qty,
    savings: discountPerPallet * qty,
    total: unitAfterDiscount * qty,
  };
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
