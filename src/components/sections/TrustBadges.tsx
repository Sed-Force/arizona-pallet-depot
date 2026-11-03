import PalletIcon from "@mui/icons-material/Pallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScheduleIcon from "@mui/icons-material/Schedule";

const badges = [
  { label: "Same-day options", Icon: PalletIcon },
  { label: "Bulk discounts", Icon: PalletIcon },
  { label: "Valley-wide delivery", Icon: PalletIcon },
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
    // mt-*: breathing room between the hero's content/buttons and the icons above the band.
    // overflow-hidden clips the track sideways; the icons sit inside this box, so nothing is cut off.
    <div className="relative mt-10 overflow-hidden md:mt-12">
      <ul className="sr-only">
        {badges.map((b) => (
          <li key={b.label}>{b.label}</li>
        ))}
      </ul>

      {/* The blue band: a full-width strip behind the label row only, so icons stand above it. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-11 bg-primary" />

      {/* Two identical halves; animate-marquee shifts the track by exactly one half per loop.
          Spacing is symmetric per-item padding (not flex gap) so both halves measure the same
          and each icon stays centered over its label. */}
      <div
        aria-hidden
        className="relative flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[...half, ...half].map(({ label, Icon }, i) => (
          <span key={i} className="flex shrink-0 flex-col items-center px-6">
            <Icon fontSize="inherit" className="mb-1 text-6xl text-primary" />
            <span className="flex h-11 items-center text-sm font-semibold whitespace-nowrap text-on-primary">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
