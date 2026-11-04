import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type HeroProps = {
  title: string;
  eyebrow?: string;
  description?: React.ReactNode;
  actions?: HeroAction[];
  image?: { src: string; alt: string };
  /** Extra content under the actions. */
  children?: React.ReactNode;
  /** Full-bleed content along the bottom edge of the hero, outside the content column (e.g. TrustBadges). */
  footer?: React.ReactNode;
  /** Image heroes use the full page heading size; text-only heroes are more compact. */
  compact?: boolean;
  /** Subpage hero: half the viewport tall with a shorter, half-width image, so the home hero stands apart. */
  half?: boolean;
};

export function Hero({ title, eyebrow, description, actions, image, children, footer, compact, half }: HeroProps) {
  return (
    // data-hero: MobileActionBar stays hidden until this section scrolls out of view.
    <section
      data-hero
      className={cn(
        "-mt-16 flex flex-col bg-gradient-to-b from-surface to-background pt-16",
        half ? cn("min-h-[50vh] justify-center", image && "pb-10 md:pb-12") : "min-h-screen justify-between",
      )}
    >
      <Container
        className={
          image
            ? // Single column on mobile (image first via order-first below); from md, text beside the image
              // (2/3 width on the home hero, half width on subpages).
              cn("grid items-center gap-8 pt-4 sm:pt-8 md:gap-10", half ? "md:grid-cols-2" : "md:grid-cols-3")
            : "py-10 md:py-12"
        }
      >
        <div className="w-full">
          {eyebrow && <p className="text-sm text-subtle">{eyebrow}</p>}
          
          <h1
            className={
              compact
                ? "text-3xl leading-tight font-extrabold md:text-4xl"
                : "text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-5xl"
            }
          >
            {title}
          </h1>

          {description && <div className="mt-4 text-lg text-body">{description}</div>}
          
          {actions && actions.length > 0 && (
            <div
              className={
                actions.length === 3
                  ? // Three actions: stacked on mobile, one row on sm, first-over-pair on md
                    // (where the hero splits into two columns), one row again on lg+.
                    "mt-6 grid gap-3 sm:grid-cols-[auto_1fr_1fr] md:grid-cols-2 lg:grid-cols-1"
                  : "mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              }
            >
              {actions.map((a, i) => (
                <ButtonLink
                  key={a.label}
                  href={a.href}
                  variant={a.variant ?? "primary"}
                  className={cn("whitespace-nowrap", actions.length === 3 && i === 0 && "md:col-span-2 lg:col-span-1")}
                >
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          )}
          {children}
        </div>

        {image && (
          // order-first: image leads on mobile; from md it returns to the right, spanning two of three columns.
          <div
            className={cn(
              "relative order-first overflow-hidden rounded-2xl bg-surface-3 md:order-none",
              half ? "aspect-[16/9] md:aspect-[3/2]" : "aspect-[4/3] md:col-span-2 md:aspect-[5/4]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes={half ? "(min-width: 1152px) 550px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1152px) 730px, (min-width: 768px) 66vw, 100vw"}
              className="object-cover"
            />
          </div>
        )}
      </Container>

      {footer}
    </section>
  );
}
