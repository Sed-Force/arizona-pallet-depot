"use client";

import CheckBox from "@mui/icons-material/CheckBox";
import CheckBoxOutline from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { QuantityField } from "@/components/ui/QuantityField";
import { discountTiers, formatUsd, nextDiscountTier, priceCart, qualifiesForCallRate } from "@/lib/pricing";
import { links, products, type Product } from "@/lib/site";
import type { OrderDetails } from "@/lib/order";
import { OrderDetailsFields, readOrderDetails } from "./OrderDetailsFields";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethods } from "./PaymentMethods";

type Quantities = Record<Product["id"], number>;

function clampQty(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

/** Dotted leader between a label and its value, like a printed price list. */
function Leader() {
  return <span aria-hidden className="mx-3 mb-1.5 flex-1 self-end border-b-2 border-dotted border-border-strong" />;
}

export function PalletCalculator() {
  const [quantities, setQuantities] = useState<Quantities>({ value: 1, industrial: 0 });
  const setQty = (id: Product["id"], n: number) => setQuantities((q) => ({ ...q, [id]: clampQty(n) }));

  const lines = products.map((product) => ({ product, qty: quantities[product.id] }));
  const order = priceCart(lines);
  const nextTier = nextDiscountTier(order.qty);

  // Two steps: fill in the order form, then Checkout swaps it for a summary and payment methods.
  const [details, setDetails] = useState<OrderDetails | null>(null);
  const paying = details !== null;
  const paymentHeading = useRef<HTMLHeadingElement>(null);

  const checkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (order.qty === 0) return;
    const next = readOrderDetails(e.currentTarget);
    // Render the payment step first so focus (and the scroll it brings on small screens) lands on it.
    flushSync(() => setDetails(next));
    paymentHeading.current?.focus();
  };

  const editDetails = () => {
    flushSync(() => setDetails(null));
    document.getElementById("o-first")?.focus();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Locked while paying, so the summary always matches what's charged. Sticky on wide screens so the
          total stays in view while filling out the order form; top-24 clears the 4rem navbar. */}
      <fieldset disabled={paying} className="min-w-0 md:sticky md:top-24 md:self-start">
        <Card>
          <h2 className="text-xl font-bold">Cost Calculator</h2>
          <p className="mt-1 text-sm text-muted">Mix and match pallet types; bulk discounts count every pallet in the order.</p>

          <ul className="mt-5 divide-y divide-border">
            {order.lines.map(({ product, qty, subtotal }) => (
              <li key={product.id} className="py-4 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`qty-${product.id}`} className="font-semibold">
                    {product.name}
                  </label>
                  <span className="font-bold tabular-nums">{formatUsd(subtotal)}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-muted">{formatUsd(product.price)}/unit</span>
                  <Leader />
                  <QuantityField
                    id={`qty-${product.id}`}
                    min={0}
                    label={product.shortName}
                    value={qty}
                    onChange={(n) => setQty(product.id, n)}
                    className="w-36 shrink-0"
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t-2 border-border-strong pt-4" aria-live="polite">
            <dl className="text-sm">
              <div className="flex items-center">
                <dt className="font-semibold">Subtotal</dt>
                <Leader />
                <dd className="font-semibold tabular-nums">{formatUsd(order.subtotal)}</dd>
              </div>
            </dl>

            {/* A heading over its own list: a <dl> can't hold a nested heading row whose <dd> contains more dt/dd pairs. */}
            <div className="mt-2 text-sm">
              <p className="font-semibold">Discounts Applied</p>
              <dl className="mt-2">
                {/* Tiers build on each other: each one adds its own step to the per-pallet discount
                    ($1 at 50+, another $1 at 100+), so every tier reached is checked and shows its share. */}
                {discountTiers.map((t, i) => {
                  const step = t.discountPerPallet - (discountTiers[i - 1]?.discountPerPallet ?? 0);
                  const reached = order.qty >= t.minQty;

                  return (
                    <div key={t.minQty} className={cn("flex items-center", reached ? "text-success-foreground" : "text-subtle")}>
                      <dt className="flex items-center gap-1.5">
                        {reached ? (
                          <CheckBox sx={{ fontSize: 18 }} aria-hidden />
                        ) : (
                          <CheckBoxOutline sx={{ fontSize: 18 }} aria-hidden />
                        )}
                        {t.minQty}+ Units (−{formatUsd(step)} each)
                        <span className="sr-only">{reached ? "(applied)" : "(not reached)"}</span>
                      </dt>
                      <Leader />
                      <dd className="tabular-nums">{reached ? `−${formatUsd(step * order.qty)}` : "$0.00"}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            {nextTier && order.qty > 0 && (
              <p className="mt-3 rounded-lg border border-primary/20 bg-primary-soft p-3 text-sm text-body">
                Order {nextTier.minQty - order.qty} more to save {order.discountPerPallet > 0 && "another "}
                {formatUsd(nextTier.discountPerPallet - order.discountPerPallet)} on every pallet.
              </p>
            )}

            <div className="mt-4 border-t border-border pt-4">
              <p className="font-bold">Total</p>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-muted">
                  {order.qty} {order.qty === 1 ? "unit" : "units"}
                </span>
                <Leader />
                <span className="text-2xl font-extrabold text-primary tabular-nums">{formatUsd(order.total)}</span>
              </div>
            </div>

            {qualifiesForCallRate(order.qty) && (
              <p className="mt-3 rounded-lg border border-primary/20 bg-primary-soft p-3 text-sm text-body">
                <a href={links.tel} className="font-semibold text-link">Call Us</a>{" "}
                — we may be able to offer an even better better deal.
              </p>
            )}
          </div>

        </Card>
      </fieldset>

      {/* Right column: the order form, then (after Checkout) the summary and payment methods in its place.
          The form is only hidden while paying, so "Edit order details" brings it back with everything filled in. */}
      <div className="min-w-0">
        <form onSubmit={checkout} hidden={paying}>
          <h2 className="text-xl font-bold">Order Details</h2>
          <p className="mt-1 mb-5 text-sm text-muted">Who’s ordering, and how the pallets get to you.</p>
          <OrderDetailsFields />

          <button type="submit" disabled={order.qty === 0} className={buttonClasses("primary", "lg", "mt-5 w-full")}>
            Checkout · {formatUsd(order.total)}
          </button>
          {order.qty === 0 && <p className="mt-2 text-sm text-muted">Add at least one pallet to check out.</p>}
          <p className="mt-3 text-xs text-subtle">
            Delivery fees are quoted separately. We’ll call to confirm your pickup or delivery time after you pay.
          </p>
        </form>

        {paying && (
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 ref={paymentHeading} tabIndex={-1} className="scroll-mt-24 text-xl font-bold focus:outline-none">
                Select Payment Method
              </h2>
              <button type="button" onClick={editDetails} className={buttonClasses("secondary", "sm", "gap-1.5")}>
                <EditIcon sx={{ fontSize: 16 }} aria-hidden />
                Edit order details
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">Check your order below, then choose how to pay.</p>
            <OrderSummary order={order} details={details} />
            <PaymentMethods lines={lines} order={order} details={details} />
          </Card>
        )}
      </div>
    </div>
  );
}
