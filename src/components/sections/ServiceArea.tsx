import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function ServiceArea({ note }: { note?: string }) {
  return (
    <Section tone="surface">
      <SectionHeading title="Service Area" />
      <ul className="mt-4 flex flex-wrap gap-2">
        {site.serviceArea.map((city) => (
          <li key={city} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
            {city}
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-sm text-slate-600">{note}</p>}
    </Section>
  );
}
