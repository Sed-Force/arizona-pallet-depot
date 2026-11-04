"use client";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentsIcon from "@mui/icons-material/Payments";
import type { SvgIconComponent } from "@mui/icons-material";
import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import type { OrderDetails } from "@/lib/order";
import { sendOrderNotice } from "@/lib/orderNotice";
import { describeCart, formatUsd, type CartLine, type PricedCart } from "@/lib/pricing";
import { links, site } from "@/lib/site";

type MethodId = "cash" | "zelle";

const methods: { id: MethodId; label: string; detail: string; Icon: SvgIconComponent }[] = [
  { id: "cash", label: "Cash preferred", detail: "Pay at pickup or delivery", Icon: PaymentsIcon },
  { id: "zelle", label: "Zelle", detail: "Bank transfer, no fees", Icon: AccountBalanceIcon },
];

type PaymentMethodsProps = {
  lines: CartLine[];
  order: PricedCart;
  /** From the order form; sent with the payment so we know who paid and how to get the pallets to them. */
  details: OrderDetails;
};

export function PaymentMethods({ lines, order, details }: PaymentMethodsProps) {
  const [method, setMethod] = useState<MethodId>("cash");

  return (
    <>
      <RadioGroup value={method} onChange={setMethod} aria-label="Payment method" // Stacked at md, where this card is only half the page; side by side when there's room.
        className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {methods.map(({ id, label, detail, Icon }) => (
          <Radio
            key={id}
            value={id}
            aria-label={`${label}: ${detail}`}
            className="group relative flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2 focus:outline-none data-checked:border-primary data-checked:bg-primary-soft data-focus:ring-2 data-focus:ring-primary/30"
          >
            <Icon className="text-muted group-data-checked:text-link" />
            <span className="font-semibold group-data-checked:text-link">{label}</span>
            <span className="text-xs text-muted">{detail}</span>
            <CheckCircleIcon fontSize="small" className="invisible absolute top-3 right-3 text-link group-data-checked:visible" />
          </Radio>
        ))}
      </RadioGroup>

      <div className="mt-5 border-t border-border pt-5">
        {order.qty === 0 ? (
          <p className="text-sm text-muted">Add at least one pallet to choose how to pay.</p>
        ) : (
          <>
            {method === "cash" && <CashPanel lines={lines} order={order} details={details} />}
            {method === "zelle" && <ZellePanel lines={lines} order={order} details={details} />}
          </>
        )}
      </div>
    </>
  );
}

type PanelProps = PaymentMethodsProps;

/** Shown when the order email couldn't be sent, so the order isn't lost. */
function CallToConfirm() {
  return (
    <>
      {" "}We couldn’t send your order details to us automatically, so please{" "}
      <a href={links.tel} className="font-semibold">call {site.phone.display}</a> to confirm your order.
    </>
  );
}

function CashPanel({ order, details }: PanelProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const handoff = details.fulfillment === "delivery" ? "delivery" : "pickup";

  const confirmOrder = async () => {
    setStatus("sending");
    const sent = await sendOrderNotice({ details, order, payment: `Cash (pay on arrival, collect at ${handoff})` });
    setStatus(sent ? "sent" : "failed");
  };

  return status === "sent" || status === "failed" ? (
    <div role="status" className="rounded-lg border border-success-border bg-success-soft p-4 text-sm text-success-foreground">
      Thanks! Please have {formatUsd(order.total)} in cash ready at {handoff}.
      {status === "sent" ? ` We’ll call to confirm your ${handoff} time.` : <CallToConfirm />}
    </div>
  ) : (
    <>
      <p className="text-sm text-muted">
        Pay {formatUsd(order.total)} in cash at {handoff}. Place your order now and we’ll call to confirm the time.
      </p>
      <button
        type="button"
        onClick={confirmOrder}
        disabled={status === "sending"}
        className={buttonClasses("primary", "lg", "mt-4 w-full disabled:opacity-60")}
      >
        {status === "sending" ? "Sending your order…" : "Pay on arrival"}
      </button>
    </>
  );
}

function ZellePanel({ lines, order, details }: PanelProps) {
  // Leading with the last name helps match the bank transfer to this order.
  const memo = `${details.lastName}: ${describeCart(lines)}`;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const confirmSent = async () => {
    setStatus("sending");
    const sent = await sendOrderNotice({ details, order, payment: "Zelle (customer says it’s sent; check the bank before scheduling)" });
    setStatus(sent ? "sent" : "failed");
  };

  return (
    <>
      <p className="text-sm text-muted">Send the total from your bank’s app, then let us know so we can confirm your order.</p>
      <dl className="mt-4 divide-y divide-border rounded-lg border border-border text-sm">
        {[
          ["Send to", site.zelle.email],
          ["Recipient name", site.zelle.recipient],
          ["Amount", formatUsd(order.total)],
          ["Memo", memo],
        ].map(([term, value]) => (
          <div key={term} className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-muted">{term}</dt>
            <dd className="text-right font-semibold break-all">{value}</dd>
          </div>
        ))}
      </dl>
      {status === "sent" || status === "failed" ? (
        <div role="status" className="mt-4 rounded-lg border border-success-border bg-success-soft p-4 text-sm text-success-foreground">
          Thanks! We’ll confirm once your payment arrives.
          {status === "sent" ? " We’ll call to schedule your pickup or delivery." : <CallToConfirm />}
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm text-muted">Once you’ve sent it, let us know so we can match your payment to this order.</p>
          <button
            type="button"
            onClick={confirmSent}
            disabled={status === "sending"}
            className={buttonClasses("primary", "lg", "mt-3 w-full disabled:opacity-60")}
          >
            {status === "sending" ? "Sending your order…" : "I’ve sent the payment"}
          </button>
        </>
      )}
    </>
  );
}
