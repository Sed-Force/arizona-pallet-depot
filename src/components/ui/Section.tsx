import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  /** "muted" is the page background; "surface" is a white band with borders. */
  tone?: "muted" | "surface";
  className?: string;
  containerClassName?: string;
};

export function Section({
  children,
  id,
  tone = "muted",
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-12 md:py-16",
        tone === "surface" && "border-y border-border bg-surface",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
