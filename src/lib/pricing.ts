import { bulkTiers, type Product } from "./site";

// bulkTiers is sorted by `minQty`, so the last tier an order clears is its best one.
export const discountTiers = bulkTiers.filter(
  (t): t is typeof t & { discountPerPallet: number } => t.discountPerPallet !== undefined,
);

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

export type CartLine = { product: Product; qty: number };

/**
 * Prices a mixed order. The bulk tier comes from the total pallet count across all types,
 * and its discount applies to every pallet of every type.
 */
export function priceCart(lines: CartLine[]) {
  const qty = lines.reduce((sum, l) => sum + l.qty, 0);
  const discountPerPallet = discountTierFor(qty)?.discountPerPallet ?? 0;
  const priced = lines.map((l) => ({
    ...l,
    unitAfterDiscount: l.product.price - discountPerPallet,
    subtotal: l.product.price * l.qty,
    total: (l.product.price - discountPerPallet) * l.qty,
  }));
  const subtotal = priced.reduce((sum, l) => sum + l.subtotal, 0);
  return {
    lines: priced,
    qty,
    discountPerPallet,
    subtotal,
    savings: discountPerPallet * qty,
    total: subtotal - discountPerPallet * qty,
  };
}

export type PricedCart = ReturnType<typeof priceCart>;

/** Short order summary for payment memos and descriptions, e.g. "3 × Value Pallet, 2 × Industrial Grade". */
export function describeCart(lines: CartLine[]) {
  return lines
    .filter((l) => l.qty > 0)
    .map((l) => `${l.qty} × ${l.product.shortName}`)
    .join(", ");
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
