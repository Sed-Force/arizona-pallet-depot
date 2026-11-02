import Link from "next/link";
import { links, site } from "@/lib/site";

export default function Post() {
  return (
    <>
      <h2>Phoenix pallet buying options</h2>
      <p>
        You can source pallets in Phoenix through local suppliers, national distributors, or online marketplaces. For
        most, a <strong>local supplier</strong> is the fastest and most affordable path.
      </p>

      <h2>Pickup vs. Delivery</h2>
      <p>
        Pickup in Gilbert (by appointment) is fastest and most cost-effective. Delivery is available by quote across the
        Valley—ideal for larger orders.
      </p>

      <h2>Value vs. Industrial Grade</h2>
      <p>
        <strong>Value Pallet ($15/unit):</strong> Affordable, used 48×40 composite pallets with normal wear. Great for
        budget-conscious buyers.
      </p>
      <p>
        <strong>Industrial Grade Pallet ($30/unit):</strong> Heavy-duty used 48×40 composite pallets, reliable for
        thousands of pounds. Comparable new pallets often cost $155+.
      </p>

      <h2>Bulk Pricing</h2>
      <p>
        We keep pricing simple. For orders 200+, call for bulk discounts. For smaller orders, check our{" "}
        <Link href={links.pricing}>Pricing &amp; Bulk</Link> section.
      </p>

      <h2>Quick FAQ</h2>
      <ul>
        <li><strong>What size?</strong> Only 48×40 composite pallets.</li>
        <li><strong>Do you deliver?</strong> Yes, across Phoenix by quote. Pickup in Gilbert by appointment.</li>
        <li>
          <strong>Fastest order?</strong> Call <a href={links.tel}>{site.phone.display}</a> or{" "}
          <Link href={links.quote}>request a quote</Link>.
        </li>
      </ul>
    </>
  );
}
