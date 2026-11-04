"use client";

import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";
import { links, navItems } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  // z-1000: top of the stacking order, above anything else that positions itself on the page.
  return (
    <header className="sticky top-0 z-1000 border-b border-border bg-surface/90 backdrop-blur">
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
              Get a Quote
            </ButtonLink>
          </nav>

          {/* Right of "Get a Quote" on lg+, left of the menu button below lg. */}
          <ThemeToggle className="lg:-mr-2 lg:ml-1" />

          {/* Below lg: a Headless UI dropdown. It handles open state, Escape, outside clicks,
              arrow-key navigation, and closes itself when an item is chosen. */}
          <Menu as="div" className="lg:hidden">
            <MenuButton
              aria-label="Menu"
              className="group -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground-2 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-primary data-open:bg-surface-2"
            >
              <MenuIcon aria-hidden className="group-data-open:hidden" />
              <CloseIcon aria-hidden className="hidden group-data-open:block" />
            </MenuButton>

            <MenuItems
              anchor={{ to: "bottom end", gap: 12 }}
              transition
              className="z-50 w-full rounded-b-xl border border-border bg-surface p-2 shadow-lg focus:outline-none transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0"
            >
              {navItems.map((item) => (
                <MenuItem key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 font-semibold data-focus:bg-surface-2",
                      isActive(pathname, item.href) ? "text-link" : "text-foreground-2",
                    )}
                  >
                    {item.label}
                  </Link>
                </MenuItem>
              ))}

              <MenuSeparator className="my-2 h-px bg-border" />

              <MenuItem>
                {/* Plain Link with button styling: MenuItem needs a child that accepts its props and ref. */}
                <Link href={links.quote} className={buttonClasses("primary", "md", "w-full")}>
                  Get a Quote
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </Container>
    </header>
  );
}
