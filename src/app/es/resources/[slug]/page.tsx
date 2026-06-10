import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { postsEs, getPostEs, categoriesEs } from "@/lib/blog-es";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { HtmlLang } from "@/components/layout/HtmlLang";

export function generateStaticParams() {
  return postsEs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostEs(params.slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/resources/${post.slug}`, lang: "es" });
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-US", { year: "numeric", month: "long", day: "numeric" });

export default function PostPageEs({ params }: { params: { slug: string } }) {
  const post = getPostEs(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    inLanguage: "es",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: categoriesEs[post.category],
    author: { "@type": "Organization", name: site.brand },
    publisher: { "@type": "Organization", name: site.brand },
    mainEntityOfPage: `${site.url}/es/resources/${post.slug}`,
  };

  const related = postsEs.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <>
      <HtmlLang lang="es" />
      <JsonLd data={articleSchema} />
      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-12 sm:py-16">
          <Breadcrumbs
            lang="es"
            items={[
              { name: "Recursos", path: "/es/resources" },
              { name: post.title, path: `/es/resources/${post.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold-300">{categoriesEs[post.category]}</span>
            <h1 className="mt-2 font-display text-display-md font-semibold !text-white">{post.title}</h1>
            <p className="mt-4 flex items-center gap-3 text-sm text-navy-200">
              <span>{fmtDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min de lectura</span>
            </p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <article className="prose-tn mx-auto">
          {post.body.map((block, i) => {
            switch (block.t) {
              case "h2":
                return <h2 key={i}>{block.text}</h2>;
              case "p":
                return <p key={i}>{block.text}</p>;
              case "ul":
                return (
                  <ul key={i}>
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              case "note":
                return (
                  <div key={i} className="my-6 flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4 not-prose">
                    <Icon name="compass" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
                    <p className="m-0 text-sm leading-relaxed text-navy-800">{block.text}</p>
                  </div>
                );
            }
          })}

          <div className="mt-10 flex flex-wrap gap-3 not-prose">
            <Button href="/es/free-rental-analysis" variant="gold">Análisis de Renta Gratis</Button>
            <Button href="/es/resources" variant="secondary">← Volver a Recursos</Button>
          </div>
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl border-t border-navy-100 pt-10">
            <h2 className="font-display text-xl font-medium text-navy-800">Lecturas relacionadas</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/es/resources/${r.slug}`} className="flex items-center gap-2 text-navy-700 hover:text-gold-600">
                    <Icon name="arrow-right" className="h-4 w-4 text-gold-600" />
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <CtaBand lang="es" />
    </>
  );
}
