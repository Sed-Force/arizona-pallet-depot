import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Transparent borders keep filled buttons the same height as the outlined ones.
  primary: "border border-transparent bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border-strong bg-surface text-foreground hover:bg-surface-2",
  dark: "border border-transparent bg-inverse text-on-inverse hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "rounded-lg px-4 py-2 text-sm",
  md: "rounded-lg px-4 py-2",
  lg: "rounded-xl px-5 py-3",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(
    "inline-flex items-center justify-center text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

/** Internal routes use next/link; tel:, sms:, mailto: and external URLs use a plain anchor. */
export function ButtonLink({ href, children, variant, size, className, onClick }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
