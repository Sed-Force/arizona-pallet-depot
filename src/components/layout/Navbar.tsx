"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";
import { links, navItems, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock page scroll while the mobile menu is open; close it on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface-2",
                  isActive(pathname, item.href) ? "text-link" : "text-foreground-2",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href={links.quote} size="sm" className="ml-2">
              Request Pricing
            </ButtonLink>
          </nav>

          {/* Right of "Request Pricing" on lg+, left of the menu button below lg. */}
          <ThemeToggle className="lg:-mr-2 lg:ml-1" />

          <button
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground-2 hover:bg-surface-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon aria-hidden /> : <MenuIcon aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-surface lg:hidden">
          <Container className="max-h-[calc(100dvh-4rem)] overflow-y-auto py-3">
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-semibold hover:bg-surface-2",
                    isActive(pathname, item.href) ? "text-link" : "text-foreground-2",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid gap-3 border-t border-border pt-4 pb-2 sm:grid-cols-2">
              <ButtonLink href={links.quote} className="w-full" onClick={() => setOpen(false)}>
                Request Pricing
              </ButtonLink>
              <ButtonLink href={links.tel} variant="secondary" className="w-full">
                Call {site.phone.display}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
