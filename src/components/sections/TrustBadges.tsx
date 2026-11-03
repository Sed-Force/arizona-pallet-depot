const badges = [
  { label: "Same-day options", color: "bg-green-500" },
  { label: "Bulk discounts", color: "bg-blue-600" },
  { label: "Valley-wide delivery", color: "bg-amber-500" },
];

export function TrustBadges() {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
      {badges.map((b) => (
        <li key={b.label} className="flex items-center gap-2">
          <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${b.color}`} />
          {b.label}
        </li>
      ))}
    </ul>
  );
}
