import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Container } from "@/components/ui/Container";
import { IconMarquee } from "@/components/ui/IconMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const cities = site.serviceArea.map((city) => ({ label: city, Icon: LocalShippingIcon }));

export function ServiceArea({ note }: { note?: string }) {
  return (
    // Same band styling as Section's "surface" tone, but the marquee runs full-bleed outside the container.
    <section className="border-y border-border bg-surface py-12 md:py-16">
      <Container>
        <SectionHeading title="Service Area" />
      </Container>

      {/* Reversed so it reads as a counter-flow to the hero's badge strip. */}
      <IconMarquee items={cities} reverse className="mt-6" />

      {note && (
        <Container>
          <p className="mt-3 text-sm text-muted">{note}</p>
        </Container>
      )}
    </section>
  );
}
