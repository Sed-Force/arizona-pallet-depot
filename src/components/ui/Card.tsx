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

type FeatureCardProps = { title: string; children: React.ReactNode; className?: string };

export function FeatureCard({ title, children, className }: FeatureCardProps) {
  return (
    <Card className={className}>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 text-sm text-muted">{children}</div>
    </Card>
  );
}
