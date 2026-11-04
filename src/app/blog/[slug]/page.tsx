import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { Prose } from "@/components/blog/Prose";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPost, posts } from "@/content/posts";
import { breadcrumbSchema } from "@/lib/schema";
import { links, site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.metaTitle, description: post.description, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="w-full">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: `${site.url}${post.image}`,
          url: `${site.url}/blog/${post.slug}`,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      {/* Wide screens: three columns, the post's text in the first two and the featured image alone in
          the third, sticky. Below lg the image leads and everything stacks. The -mt-16/pt-16 and gradient
          match the shared Hero, which can't be used here because its text and image share one row. */}
      <div className="-mt-16 bg-gradient-to-b from-surface to-background pt-16">
        <Container className="grid gap-8 py-8 md:py-12 lg:grid-cols-3 lg:gap-10">
          <div className="min-w-0 lg:col-span-2">
            {/* data-hero: MobileActionBar stays hidden until this header scrolls out of view. */}
            <header data-hero>
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-subtle font-bold">
                <Link href="/" className="hover:text-link">Home</Link> /{" "}
                <Link href="/blog" className="hover:text-link">Blog</Link>
              </nav>
              {post.eyebrow && <p className="text-sm text-subtle">{post.eyebrow}</p>}
              <h1 className="text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-5xl">{post.title}</h1>
              <p className="mt-4 text-lg text-body">{post.heroLead}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={links.quote} variant="secondary">Get a Quote</ButtonLink>
                <ButtonLink href={links.tel}>Call Now</ButtonLink>
              </div>
            </header>

            <article className="mt-8 md:mt-10">
              <Prose>
                <Content />
              </Prose>
            </article>
          </div>

          {/* self-start keeps the column its own height so the image can travel; top-24 clears the navbar. */}
          <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface-3 lg:aspect-[4/5]">
              <Image
                src={post.image}
                alt={post.heroImageAlt}
                fill
                priority
                sizes="(min-width: 1152px) 360px, (min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </aside>
        </Container>
      </div>

      {related.length > 0 && (
        <Container className="pb-4">
          <h2 className="text-2xl font-bold">More guides</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}

      <CtaPanel
        title="Need pallets this week?"
        description="Tell us your quantity and timing—we’ll confirm availability, pickup or delivery options, and pricing."
      />
    </div>
  );
}
