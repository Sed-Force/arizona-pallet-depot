"use client";

import { useDeferredValue, useState } from "react";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/content/posts";
import { PostCard } from "./PostCard";

type BlogBrowserProps = { posts: PostMeta[] };

export function BlogBrowser({ posts }: BlogBrowserProps) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visible = posts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (!deferredQuery) return true;
    return `${p.title} ${p.excerpt}`.toLowerCase().includes(deferredQuery);
  });

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                category === c
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="post-search">Search posts</label>
        <input
          id="post-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 sm:w-64"
        />
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          No posts match your search.
        </p>
      )}
    </>
  );
}
