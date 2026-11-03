"use client";

import Link from "next/link";
import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { discountTierFor, formatUsd, nextDiscountTier, priceOrder, qualifiesForCallRate } from "@/lib/pricing";
import { links, products, site, type Product } from "@/lib/site";

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

function clampQty(value: number) {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

export function PalletCalculator() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [productId, setProductId] = useState<Product["id"]>("value");
  const [paid, setPaid] = useState(false);

  const product = products.find((p) => p.id === productId) ?? products[0];
  const order = priceOrder(product.price, qty);
  const tier = discountTierFor(qty);
  const nextTier = nextDiscountTier(qty);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <h2 className="text-xl font-bold">Pallet Cost Calculator</h2>
        <p className="mt-1 text-sm text-muted">Enter quantity and select pallet type.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:items-end">
          <div>
            <label htmlFor="calc-qty" className="mb-1 block text-sm font-semibold">Quantity</label>
            <div className="flex h-11 w-full items-stretch overflow-hidden rounded-lg border border-border-strong sm:w-44">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="w-11 shrink-0 bg-surface-2 text-lg hover:bg-surface-3"
                onClick={() => setQty((q) => clampQty(q - 1))}
              >
                −
              </button>
              <input
                id="calc-qty"
                type="number"
                min={1}
                inputMode="numeric"
                value={qty}
                onChange={(e) => setQty(clampQty(e.target.valueAsNumber))}
                className="w-full min-w-0 border-x border-border text-center"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                className="w-11 shrink-0 bg-surface-2 text-lg hover:bg-surface-3"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="calc-type" className="mb-1 block text-sm font-semibold">Pallet Type</label>
            <select
              id="calc-type"
              value={productId}
              onChange={(e) => setProductId(e.target.value as Product["id"])}
              className="h-11 w-full rounded-lg border border-border-strong bg-surface px-3"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.shortName} — ${p.price}/unit
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5" aria-live="polite">
          {tier && (
            <dl className="mb-2 space-y-1 text-sm text-muted">
              <div className="flex justify-between gap-4">
                <dt>
                  {qty} × {formatUsd(product.price)}
                </dt>
                <dd>{formatUsd(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-success-foreground">
                <dt>
                  Bulk discount (over {tier.over}): −{formatUsd(order.discountPerPallet)}/pallet
                </dt>
                <dd>−{formatUsd(order.savings)}</dd>
              </div>
            </dl>
          )}
          <p className="text-lg font-bold text-primary">Total: {formatUsd(order.total)}</p>
          {nextTier?.discountPerPallet !== undefined && (
            <p className="mt-1 text-sm text-muted">
              Order {nextTier.over + 1 - qty} more to save {formatUsd(nextTier.discountPerPallet)} on every pallet.
            </p>
          )}
          {qualifiesForCallRate(qty) && (
            <p className="mt-2 rounded-lg border border-primary/20 bg-primary-soft p-3 text-sm text-body">
              Ordering this many? <a href={links.tel} className="font-semibold text-link underline">Call {site.phone.display}</a>{" "}
              — we may be able to beat this price.
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-subtle">
          Pickup preferred (Gilbert). Delivery/LTL by quote. Payments here don’t schedule pickup automatically — call or
          use the quote form after checkout.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={links.quote} variant="secondary">Request Quote</ButtonLink>
          <ButtonLink href="/" variant="dark">Back to Home</ButtonLink>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold">Pay with PayPal</h2>
        <p className="mt-1 text-sm text-muted">The amount below matches your calculator total.</p>

        <div className="mt-5">
          {paypalClientId ? (
            <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "USD" }}>
              <PayPalButtons
                style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay" }}
                // PayPal keeps the callbacks from its first render; re-render so the order uses the current total.
                forceReRender={[qty, productId]}
                createOrder={(_data, actions) =>
                  actions.order.create({
                    intent: "CAPTURE",
                    payment_source: {
                      paypal: { experience_context: { shipping_preference: "NO_SHIPPING" } },
                    },
                    purchase_units: [
                      {
                        description: product.schemaName,
                        custom_id: `qty:${qty}|unit:${product.price}|discount:${order.discountPerPallet}`,
                        amount: { currency_code: "USD", value: order.total.toFixed(2) },
                      },
                    ],
                  })
                }
                onApprove={async (_data, actions) => {
                  await actions.order?.capture();
                  setPaid(true);
                  setTimeout(() => router.push(links.quote), 1200);
                }}
                onError={(err) => {
                  console.error(err);
                  alert("PayPal error, please try again or contact us.");
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <p className="rounded-lg border border-warning-border bg-warning-soft p-4 text-sm text-warning-foreground">
              Online checkout is unavailable right now. Please call or request a quote.
            </p>
          )}
        </div>

        {paid && (
          <div role="status" className="mt-4 rounded-lg border border-success-border bg-success-soft p-4 text-success-foreground">
            Payment received — thank you! We’ll follow up. You can also{" "}
            <Link href={links.quote} className="font-semibold underline">submit pickup/delivery details</Link>.
          </div>
        )}
      </Card>
    </div>
  );
}
