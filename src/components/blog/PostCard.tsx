import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/content/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs tracking-wide text-slate-500 uppercase">{post.category}</p>
        <h2 className="mt-1 text-xl font-semibold group-hover:underline">{post.cardTitle ?? post.title}</h2>
        <p className="mt-2 text-slate-700">{post.excerpt}</p>
        <p className="mt-auto pt-3 text-sm text-slate-500">{post.readingTime}</p>
      </div>
    </Link>
  );
}
