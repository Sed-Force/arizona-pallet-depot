import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { Prose } from "@/components/blog/Prose";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Hero } from "@/components/sections/Hero";
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
    <>
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

      <Hero
        eyebrow={post.eyebrow}
        title={post.title}
        description={<p>{post.heroLead}</p>}
        actions={[
          { label: "Get a Quote", href: links.quote },
          { label: `Call ${site.phone.display}`, href: links.tel, variant: "secondary" },
        ]}
        image={{ src: post.image, alt: post.heroImageAlt }}
      />

      <Container size="narrow" className="py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
          <Link href="/" className="hover:underline">Home</Link> /{" "}
          <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
        <Card className="md:p-8">
          <article>
            <Prose>
              <Content />
            </Prose>
          </article>
        </Card>
      </Container>

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
    </>
  );
}
