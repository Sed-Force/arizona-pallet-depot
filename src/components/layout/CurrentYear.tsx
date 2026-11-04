import { cacheLife } from "next/cache";

// Cached so the year is baked into the static shell and refreshed daily
// (an uncached `new Date()` blocks prerendering under Cache Components).
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
