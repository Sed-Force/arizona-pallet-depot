import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container size="narrow" className="py-20 text-center md:py-28">
      <p className="text-sm font-semibold text-link">404</p>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Page not found</h1>
      <p className="mt-4 text-body">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href={links.quote} variant="secondary">Request a Quote</ButtonLink>
      </div>
    </Container>
  );
}
