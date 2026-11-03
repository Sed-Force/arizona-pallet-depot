import DiscountIcon from "@mui/icons-material/Discount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScheduleIcon from "@mui/icons-material/Schedule";

const badges = [
  { label: "Same-day options", Icon: ScheduleIcon },
  { label: "Bulk discounts", Icon: DiscountIcon },
  { label: "Valley-wide delivery", Icon: LocalShippingIcon },
];

// Copies of the badge set in each half of the track. Each half must be wider than the widest
// screen, or the end of the strip shows before the loop resets.
const COPIES_PER_HALF = 6;

/**
 * Full-width, endlessly scrolling badge strip. Render it in Hero's `footer` slot.
 * Screen readers get the plain list; the moving strip is decorative.
 */
export function TrustBadges() {
  const half = Array.from({ length: COPIES_PER_HALF }, () => badges).flat();

  return (
    <div className="overflow-hidden bg-primary text-on-primary">
      <ul className="sr-only">
        {badges.map((b) => (
          <li key={b.label}>{b.label}</li>
        ))}
      </ul>

      {/* Two identical halves; animate-marquee shifts the track by exactly one half per loop.
          Spacing is per-item padding (not flex gap) so both halves measure the same. */}
      <div
        aria-hidden
        className="flex w-max animate-marquee py-3 hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[...half, ...half].map(({ label, Icon }, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2 pr-12 text-sm font-semibold whitespace-nowrap">
            <Icon fontSize="small" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
