import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { links, site } from "@/lib/site";

type CtaPanelProps = {
  title: string;
  description: string;
  image?: { src: string; alt: string };
};

/** Closing call-to-action: quote + call buttons beside an optional photo. */
export function CtaPanel({ title, description, image }: CtaPanelProps) {
  return (
    <Section>
      <div className="grid items-center gap-6 rounded-2xl border border-border bg-surface p-6 md:grid-cols-2 md:p-8">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          <p className="mt-2 text-body">{description}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={links.quote} size="md" variant="secondary">Get a Quote</ButtonLink>
            <ButtonLink href={links.tel} size="md">Call Now</ButtonLink>
          </div>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-3">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </Section>
  );
}
