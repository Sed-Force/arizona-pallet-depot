import Link from "next/link";
import { Callout } from "@/components/blog/Prose";
import { links, site } from "@/lib/site";

export default function Post() {
  return (
    <>
      <h2>Typical capacities (rule of thumb)</h2>
      <ul>
        <li><strong>Pickup truck:</strong> ~10–15 pallets (bed + safe stacking)</li>
        <li><strong>Small box truck (12–16′):</strong> ~40–60 pallets</li>
        <li><strong>26′ box truck:</strong> ~100–120 pallets</li>
        <li>
          <strong>53′ dry van:</strong> up to 26 stacks × 2 rows = ~52 pallet positions (floor-loaded) — confirm with
          your carrier
        </li>
      </ul>
      <p>
        Numbers vary by exact vehicle dimensions, stacking height, and whether pallets are nested or on edge. When in
        doubt, call us and we’ll help you plan the load.
      </p>

      <h2>Tips for smooth pickup/delivery</h2>
      <ul>
        <li>Bring straps/ratchet tie-downs for open-bed hauling.</li>
        <li>Know your dock height and access (low clearance, cul-de-sac, etc.).</li>
        <li>For larger orders, <strong>delivery by quote</strong> may be easier and safer.</li>
      </ul>

      <Callout>
        Planning a larger order? <Link href={links.quote}>Request a quote</Link> or call{" "}
        <a href={links.tel}>{site.phone.display}</a>.
      </Callout>
    </>
  );
}
