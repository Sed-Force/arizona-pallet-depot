import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { links, navItems, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            Used 48×40 plastic pallets for the Phoenix metro. Pickup in Gilbert by appointment; delivery by quote.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-subtle uppercase">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body hover:text-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-body">
          <h2 className="text-sm font-semibold tracking-wide text-subtle uppercase">Contact</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <strong>Call:</strong>{" "}
              <a className="underline hover:text-link" href={links.tel}>{site.phone.display}</a>
            </li>
            <li className="break-words">
              <strong>Email:</strong>{" "}
              <a className="underline hover:text-link" href={links.mailto}>{site.email}</a>
            </li>
            <li><strong>Pickup:</strong> {site.pickup.location}</li>
          </ul>
        </div>

        <div className="flex flex-wrap content-start gap-3 lg:justify-end">
          <ButtonLink href={links.tel} size="md">Call Now</ButtonLink>
          <ButtonLink href={links.quote} size="md" variant="secondary">Request Pricing</ButtonLink>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-5 text-sm text-muted">
          © <CurrentYear /> {site.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
