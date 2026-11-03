"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { links } from "@/lib/site";

/**
 * Sticky call/quote bar on small screens. Stays tucked below the viewport until the page's hero
 * (the `[data-hero]` section) has scrolled out of view above, then slides up into place.
 * Pages without a hero show it right away. The root layout pads the body to clear it.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Look the hero up on every check rather than holding a reference: React can replace the
    // page's DOM (e.g. after a hydration mismatch), and earlier routes can stay mounted but hidden
    // (Cache Components keeps them in <Activity>), so use the hero that is currently laid out.
    function update() {
      const hero = Array.from(document.querySelectorAll<HTMLElement>("[data-hero]")).find(
        (el) => el.getClientRects().length > 0,
      );
      // Show once the hero is entirely above the viewport; with no hero, show right away.
      setVisible(!hero || hero.getBoundingClientRect().bottom <= 0);
    }

    // Defer the first check a tick so the new route has rendered.
    const timer = setTimeout(update, 0);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div
      // Off-screen buttons shouldn't be reachable by keyboard or screen reader.
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      {/* Primary action on the right, nearest a right-handed thumb (matches the hero's CTA order). */}
      <div className="flex gap-3 px-4 pt-3">
        <ButtonLink href={links.quote} variant="secondary" className="flex-1">Quote</ButtonLink>
        <ButtonLink href={links.tel} className="flex-1">Call</ButtonLink>
      </div>
    </div>
  );
}
