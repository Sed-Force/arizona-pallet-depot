import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/content/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-4 transition-shadow hover:shadow-md sm:p-5 hover:cursor-pointer hover:border-primary hover:text-on-primary transform duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-3">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs tracking-wide text-subtle uppercase">{post.category}</p>
        <h2 className="mt-1 text-xl font-semibold group-hover:text-link">{post.cardTitle ?? post.title}</h2>
        <p className="mt-2 text-body">{post.excerpt}</p>
        <p className="mt-auto pt-3 text-sm text-subtle">{post.readingTime}</p>
      </div>
    </Link>
  );
}
