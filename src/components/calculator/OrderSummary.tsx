import { formatUsd, type PricedCart } from "@/lib/pricing";
import { site } from "@/lib/site";
import { formatRequestedDate, type OrderDetails } from "@/lib/order";

/** Read-back of the order and contact details, shown above the payment methods for the shopper to confirm. */
export function OrderSummary({ order, details }: { order: PricedCart; details: OrderDetails }) {
  const { address } = details;

  const rows: [string, React.ReactNode][] = [
    [
      "Order",
      <>
        {order.lines
          .filter((l) => l.qty > 0)
          .map((l) => (
            <span key={l.product.id} className="block">
              {l.qty} × {l.product.name} <span className="text-muted">({formatUsd(l.total)})</span>
            </span>
          ))}
        {order.savings > 0 && (
          <span className="block text-success-foreground">Bulk savings: −{formatUsd(order.savings)}</span>
        )}
      </>,
    ],
    [
      "Contact",
      <>
        <span className="block">
          {details.firstName} {details.lastName}
          {details.company && <span className="text-muted">, {details.company}</span>}
        </span>
        <span className="block">{details.phone}</span>
        <span className="block break-all">{details.email}</span>
      </>,
    ],
    details.fulfillment === "delivery" && address
      ? [
          "Delivery",
          <>
            <span className="block">
              {address.street}
              {address.street2 && `, ${address.street2}`}
            </span>
            <span className="block">
              {address.city}, {address.state} {address.zip}
            </span>
          </>,
        ]
      : ["Pickup", <>{site.pickup.location}, {site.pickup.operation.note}</>],
    [details.fulfillment === "delivery" ? "Deliver on" : "Pick up on", <>{formatRequestedDate(details.requestedDate)}</>],
  ];
  if (details.notes) rows.push(["Notes", <span key="notes" className="whitespace-pre-line">{details.notes}</span>]);

  return (
    <div className="mt-5 rounded-xl border border-border bg-surface-2 p-4">
      <dl className="grid gap-3 text-sm">
        {rows.map(([term, value]) => (
          <div key={term} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-3">
            <dt className="font-semibold">{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
        <span className="font-bold">
          Total <span className="text-sm font-normal text-muted">({order.qty} {order.qty === 1 ? "unit" : "units"})</span>
        </span>
        <span className="text-xl font-extrabold text-primary tabular-nums">{formatUsd(order.total)}</span>
      </div>
    </div>
  );
}
