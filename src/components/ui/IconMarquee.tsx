import type { SvgIconComponent } from "@mui/icons-material";
import { cn } from "@/lib/cn";

export type MarqueeItem = { label: string; Icon: SvgIconComponent };

// Items size to their content (w-fit), so lengths are estimated from the labels. Measured in the
// browser: an item is max(icon, label) + px-8 padding, and text-sm semibold labels run ~7px/char.
const ICON_PX = 60;
const PADDING_PX = 64;
const CHAR_PX = 7;

// Each half of the track must be wider than the widest screen, or the end of the strip shows
// before the loop resets. 4,000px clears 4K-class displays with room for estimation error.
const MIN_HALF_PX = 4000;

// Scroll speed shared by every marquee, so strips of different lengths move at the same pace.
const PX_PER_SECOND = 14;

function estimateWidth(items: MarqueeItem[]) {
  return items.reduce((sum, { label }) => sum + Math.max(ICON_PX, label.length * CHAR_PX) + PADDING_PX, 0);
}

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
  const setWidth = estimateWidth(items);
  const copies = Math.ceil(MIN_HALF_PX / setWidth);
  const half = Array.from({ length: copies }, () => items).flat();
  // One loop moves the track by one half, so its duration sets the speed.
  const duration = `${Math.round((setWidth * copies) / PX_PER_SECOND)}s`;

  return (
    // overflow-hidden clips the track sideways; the icons sit inside this box, so nothing is cut off.
    <div className={cn("relative overflow-hidden", className)}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      {/* The blue band: a full-width strip behind the label row only, so icons stand above it. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-11 bg-inverse" />

      {/* Two identical halves; animate-marquee shifts the track by exactly one half per loop.
          Per-item padding (not flex gap) keeps both halves the same length and each icon
          centered over its label. The inline duration overrides animate-marquee's default. */}
      <div
        aria-hidden
        style={{ animationDuration: duration }}
        className={cn(
          "relative flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...half, ...half].map(({ label, Icon }, i) => (
          <span key={i} className="flex w-fit shrink-0 flex-col items-center px-8">
            <Icon fontSize="inherit" className="mb-1 text-6xl text-inverse" />
            <span className="flex h-11 items-center text-sm font-semibold whitespace-nowrap text-background">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
