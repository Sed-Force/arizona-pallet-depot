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
      {/* A div, not a p: description can be any ReactNode, including block elements. */}
      {description && <div className="mt-3 text-body">{description}</div>}
    </div>
  );
}
