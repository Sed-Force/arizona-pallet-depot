import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 hover:opacity-80 ${className ?? ""}`}>
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white"
      >
        {site.shortName}
      </span>
      <span className="text-lg font-semibold">{site.name}</span>
    </Link>
  );
}
