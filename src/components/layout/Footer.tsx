import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { links, navItems, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3 w-full">
        <div className="flex flex-col gap-4 items-center md:items-start justify-center md:justify-start">
          <Logo />
          <p className="w-full text-sm text-muted text-center md:text-left">
            Used 48×40 plastic pallets for the Phoenix metro valley.
          </p>
        </div>

        {/* Contact and Explore share one grid item, so it spans the remaining two of the three columns. */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:col-span-2 w-full gap-8 items-center sm:items-start justify-center md:justify-start">
          <div className="flex flex-col gap-2 items-center sm:items-start justify-center sm:justify-start md:h-full">
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Contact
            </h2>
            
            <ul className="text-body flex flex-col items-center sm:items-start justify-center sm:justify-start gap-2">
              <li>
                <strong>Call:</strong>{" "}
                <a className="hover:text-link" href={links.tel}>{site.phone.display}</a>
              </li>

              <li>
                <strong>Email:</strong>{" "}
                <a className="hover:text-link" href={links.mailto}>{site.email}</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 items-center sm:items-end justify-center sm:justify-end">
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Explore
            </h2>
            
            <ul className="flex flex-col items-center sm:items-end justify-center sm:justify-end gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-body hover:text-link text-center sm:text-right">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-2 text-sm text-muted text-center md:text-left md:flex flex-row items-center">
          © <CurrentYear /> {site.name}. All rights reserved.

          <div className="hidden md:flex flex-1 flex-row gap-4 justify-end w-full">
            <ButtonLink href={links.quote} size="md" variant="secondary">Get a Quote</ButtonLink>
            <ButtonLink href={links.tel} size="md">Call Now</ButtonLink>
          </div>
        </Container>
      </div>
    </footer>
  );
}
