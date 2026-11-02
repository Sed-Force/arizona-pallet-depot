import type { Metadata } from "next";
import { PalletCalculator } from "@/components/calculator/PalletCalculator";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pallet Calculator & Checkout",
  description: "Estimate your pallet order total and pay online with PayPal. Value and Industrial Grade 48×40 pallets.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <Hero compact title="Pallet Calculator & Checkout" description={<p>Estimate your total, then pay with PayPal.</p>} />
      <Container className="pb-16">
        <PalletCalculator />
      </Container>
    </>
  );
}
