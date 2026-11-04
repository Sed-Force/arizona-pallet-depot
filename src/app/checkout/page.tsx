import type { Metadata } from "next";
import { PalletCalculator } from "@/components/calculator/PalletCalculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Price your pallet order and pay in cash at pickup or delivery, or by Zelle. Value and Industrial Grade 48×40 pallets.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    // No hero: a plain heading keeps the calculator and payment options near the top of the page.
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl leading-tight font-extrabold md:text-4xl">Checkout</h1>
      <p className="mt-2 text-lg text-body">Price your order, then pick how you’d like to pay.</p>
      <div className="mt-8">
        <PalletCalculator />
      </div>
    </Container>
  );
}
