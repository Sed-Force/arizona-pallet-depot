import Link from "next/link";
import { Callout } from "@/components/blog/Prose";
import { links } from "@/lib/site";

export default function Post() {
  return (
    <>
      <h2>Quick comparison</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <h3 className="!mt-0">Value Pallet — $15</h3>
          <p className="!mt-1">
            Budget-friendly used 48×40 composite pallet for simple, routine use. Normal cosmetic wear (minor,
            non-structural chips) is expected.
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="!mt-0">Industrial Grade — $30</h3>
          <p className="!mt-1">
            Heavy-duty used 48×40 composite pallet for higher loads and frequent handling. A cost-saving alternative to
            new pallets often listed near $155.
          </p>
        </div>
      </div>

      <h2>How to choose</h2>
      <ul>
        <li><strong>Weight &amp; handling:</strong> Choose Industrial for heavier items or frequent forklift cycles.</li>
        <li><strong>Budget:</strong> Choose Value when savings is the priority and loads are lighter.</li>
        <li><strong>Consistency:</strong> Both options are 48×40 composite with dependable fit in standard racking.</li>
      </ul>

      <Callout>
        Still unsure? <Link href={links.quote}>Request a quote</Link> with your load type and quantity—we’ll recommend
        the best fit.
      </Callout>
    </>
  );
}
