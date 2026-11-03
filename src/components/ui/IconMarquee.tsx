import type { SvgIconComponent } from "@mui/icons-material";
import { cn } from "@/lib/cn";

export type MarqueeItem = { label: string; Icon: SvgIconComponent };

// Each half of the track holds at least this many items. Items are a fixed w-48 (192px), so 18
// make a half ~3,450px — wider than any common screen, so the strip never runs out before the
// loop resets. It also keeps every marquee the same length, so they scroll at the same speed.
const MIN_ITEMS_PER_HALF = 18;

type IconMarqueeProps = {
  items: MarqueeItem[];
  /** Scroll left-to-right instead of right-to-left. */
  reverse?: boolean;
  className?: string;
};

/**
 * Full-width, endlessly scrolling strip of icon-over-label items on a primary-blue band.
 * Screen readers get the plain list; the moving strip is decorative.
 */
export function IconMarquee({ items, reverse = false, className }: IconMarqueeProps) {
  const copies = Math.ceil(MIN_ITEMS_PER_HALF / items.length);
  const half = Array.from({ length: copies }, () => items).flat();

  return (
    // overflow-hidden clips the track sideways; the icons sit inside this box, so nothing is cut off.
    <div className={cn("relative overflow-hidden", className)}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      {/* The blue band: a full-width strip behind the label row only, so icons stand above it. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-11 bg-primary" />

      {/* Two identical halves; animate-marquee shifts the track by exactly one half per loop.
          Fixed-width items (not flex gap) keep both halves the same length and each icon
          centered over its label. */}
      <div
        aria-hidden
        className={cn(
          "relative flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...half, ...half].map(({ label, Icon }, i) => (
          <span key={i} className="flex w-48 shrink-0 flex-col items-center px-6">
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
