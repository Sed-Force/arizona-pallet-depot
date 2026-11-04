import type { SvgIconComponent } from "@mui/icons-material";
import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
};

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface",
        padded && "p-5 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

type FeatureCardProps = { title: string; icon?: SvgIconComponent; children: React.ReactNode; className?: string };

export function FeatureCard({ title, icon: Icon, children, className }: FeatureCardProps) {
  return (
    // Row layout and the clipped background icon belong to feature cards only; the base Card stays
    // a plain box so other cards (pricing, calculator, forms) keep their own layouts.
    <Card className={cn("group relative flex flex-row items-center overflow-hidden", className)}>
      <div className="relative z-10 flex flex-col items-start gap-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-2 text-sm text-muted">{children}</div>
      </div>

      {Icon && <Icon className="absolute right-2 top-1/2 -translate-y-1/4 w-24 h-24 text-background group-hover:-translate-y-1/2 group-hover:text-surface-2 transform transition-all duration-300" />}
    </Card>
  );
}
