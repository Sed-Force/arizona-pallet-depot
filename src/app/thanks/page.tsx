import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <Container size="narrow" className="py-20 text-center md:py-28">
      <h1 className="text-3xl font-extrabold md:text-4xl">Thanks! We’ve got your request.</h1>
      <p className="mt-4 text-lg text-body">
        We’ll reach out shortly from <strong className="break-words">{site.email}</strong> or call{" "}
        <strong>{site.phone.display}</strong>.
      </p>
      <ButtonLink href="/" className="mt-8">Back to Home</ButtonLink>
    </Container>
  );
}
