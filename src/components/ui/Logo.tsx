import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 hover:opacity-80 ${className ?? ""}`}>
      <Image src="/images/logo.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
      <span className="text-lg font-semibold">{site.name}</span>
    </Link>
  );
}
