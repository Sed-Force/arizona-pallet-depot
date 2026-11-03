import { cn } from "@/lib/cn";

/** Typography for long-form article content (headings, lists, links, tables). */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-body leading-relaxed",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2:first-child]:mt-0",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_a]:font-semibold [&_a]:text-link [&_a]:underline [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Highlighted aside used at the end of posts. */
export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-lg bg-primary-soft p-4 text-foreground-2">{children}</div>;
}
