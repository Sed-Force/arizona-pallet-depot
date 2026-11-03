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
  /** Extra content under the actions (e.g. trust badges). */
  children?: React.ReactNode;
  /** Image heroes use the full page heading size; text-only heroes are more compact. */
  compact?: boolean;
};

export function Hero({ title, eyebrow, description, actions, image, children, compact }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-surface to-background">
      <Container
        className={
          image
            ? "grid items-center gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-16 lg:py-20"
            : "py-10 md:py-12"
        }
      >
        <div>
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
                    "mt-6 grid gap-3 sm:grid-cols-[auto_1fr_1fr] md:grid-cols-2 lg:grid-cols-[auto_1fr_1fr]"
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
          // order-first: image leads on mobile; from md it returns to the right-hand column.
          <div className="relative order-first aspect-[4/3] overflow-hidden rounded-2xl bg-surface-3 md:order-none md:aspect-[5/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
