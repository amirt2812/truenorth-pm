"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post, Category } from "@/lib/blog";
import { Icon } from "@/components/ui/Icon";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export function BlogList({ posts, categories }: { posts: Post[]; categories: readonly Category[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c ? "bg-navy-800 text-white" : "bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-shadow hover:shadow-card-hover">
            <div className="flex aspect-[16/9] items-center justify-center bg-navy-800 bg-compass">
              <Icon name="compass" className="h-10 w-10 text-gold-400/70" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">{p.category}</span>
              <h3 className="mt-2 font-display text-xl font-medium leading-snug text-navy-800">
                <Link href={`/resources/${p.slug}`} className="hover:text-gold-700">{p.title}</Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{fmtDate(p.date)}</span>
                <span>{p.readingMinutes} min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
