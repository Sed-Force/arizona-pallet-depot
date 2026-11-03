import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  description?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ title, description, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Tag className="text-2xl font-bold md:text-3xl">{title}</Tag>
      {description && <p className={cn("mt-3 text-body")}>{description}</p>}
    </div>
  );
}
