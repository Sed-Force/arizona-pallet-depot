import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/lib/site";

/** Sticky call/quote bar on small screens. The root layout pads the body to clear it. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex gap-3 px-4 pt-3">
        <ButtonLink href={links.tel} className="flex-1">Call</ButtonLink>
        <ButtonLink href={links.quote} variant="secondary" className="flex-1">Quote</ButtonLink>
      </div>
    </div>
  );
}
