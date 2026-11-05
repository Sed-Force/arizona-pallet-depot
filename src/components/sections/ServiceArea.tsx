import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getImageProps } from "next/image";
import { Container } from "@/components/ui/Container";
import { IconMarquee } from "@/components/ui/IconMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const cities = site.serviceArea.map((city) => ({ label: city, Icon: LocalShippingIcon }));

const mapAlt = `Map of our Phoenix metro service area: ${site.serviceArea.join(", ")}`;
// Both maps run edge to edge, so they're sized against the full viewport width.
const desktopMap = getImageProps({ src: "/images/service-area-map.png", alt: mapAlt, width: 1357, height: 701, sizes: "100vw" }).props;
const mobileMap = getImageProps({ src: "/images/service-area-map-mobile.png", alt: mapAlt, width: 701, height: 701, sizes: "100vw" }).props;

export function ServiceArea({ note }: { note?: string }) {
  return (
    // Same band styling as Section's "surface" tone, but the marquee runs full-bleed outside the container.
    <section className="border-y border-border bg-surface pt-12 md:pt-16">
      <Container>
        <SectionHeading title="Proudly Serving the Phoenix Metro Area" />
      </Container>

      <div className="pt-12 md:pt-16">
        {/* Phones get the square crop; wider screens the full map. Each <source> carries its own size so the
            browser reserves the right height before the image loads. */}
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopMap.srcSet} width={desktopMap.width} height={desktopMap.height} />
          <img {...mobileMap} alt={mapAlt} className="block h-auto w-full" />
        </picture>
      </div>

      {/* Pulled up by the icon row's height (60px icon + 4px gap), so the map ends at the top of the blue band
          and the trucks sit over the map. Reversed so it reads as a counter-flow to the hero's badge strip. */}
      <IconMarquee iconColor="text-black"  items={cities} reverse className="-mt-16" />

      {/* {note && (
        <Container>
          <p className="mt-3 text-sm text-muted">{note}</p>
        </Container>
      )} */}
    </section>
  );
}
