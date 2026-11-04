import { FeatureCard } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SvgIconComponent } from "@mui/icons-material";
import { cn } from "@/lib/cn";

export type Feature = { title: string; description: React.ReactNode; icon?: SvgIconComponent };

type FeatureGridProps = {
  title: string;
  features: Feature[];
  tone?: "muted" | "surface";
  columns?: 2 | 4;
};

export function FeatureGrid({ title, features, tone, columns = 2 }: FeatureGridProps) {
  return (
    <Section tone={tone}>
      <SectionHeading title={title} />
      <div
        className={cn(
          "mt-6 grid gap-4",
          columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2",
        )}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} title={f.title} icon={f.icon} className={tone === "surface" ? "bg-transparent" : undefined}>
            {f.description}
          </FeatureCard>
        ))}
      </div>
    </Section>
  );
}
