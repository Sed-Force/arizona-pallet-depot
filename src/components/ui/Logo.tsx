import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 hover:opacity-80 ${className ?? ""}`}>
      {/* Static import: the URL carries a content hash, so a new logo file is never served from cache. */}
      <Image src={logo} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
      <span className="text-lg font-semibold">{site.name}</span>
    </Link>
  );
}
