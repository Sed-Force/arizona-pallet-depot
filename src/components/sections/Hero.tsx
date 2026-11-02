import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

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
    <section className="bg-gradient-to-b from-white to-slate-50">
      <Container
        className={
          image
            ? "grid items-center gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-16 lg:py-20"
            : "py-10 md:py-12"
        }
      >
        <div>
          {eyebrow && <p className="text-sm text-slate-500">{eyebrow}</p>}
          <h1
            className={
              compact
                ? "text-3xl leading-tight font-extrabold md:text-4xl"
                : "text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-5xl"
            }
          >
            {title}
          </h1>
          {description && <div className="mt-4 text-lg text-slate-700">{description}</div>}
          {actions && actions.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions.map((a) => (
                <ButtonLink key={a.label} href={a.href} variant={a.variant ?? "primary"}>
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          )}
          {children}
        </div>

        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-[5/4]">
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
