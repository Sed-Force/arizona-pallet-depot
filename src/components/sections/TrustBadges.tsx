import PalletIcon from "@mui/icons-material/Pallet";
import { IconMarquee, type MarqueeItem } from "@/components/ui/IconMarquee";

const badges: MarqueeItem[] = [
  { label: "Same-Day Service", Icon: PalletIcon },
  { label: "Bulk Discounts", Icon: PalletIcon },
  { label: "Valley-Wide Delivery", Icon: PalletIcon },
];

/** Scrolling badge strip for Hero's `footer` slot. */
export function TrustBadges() {
  // mt-*: breathing room between the hero's content/buttons and the icons above the band.
  return <IconMarquee items={badges} className="mt-10 md:mt-12" />;
}
