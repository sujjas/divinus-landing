import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeadlines from '../../components/PageHeadlines';
import ParticleField from '../../components/ParticleField';
import NewsletterCard from '../../components/NewsletterCard';
import { POSTS, postBySlug, type Category, type Post } from '../posts';

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: 'Insight not found — Divinus Investment Group' };
  return {
    title: `${post.title} — Divinus Insights`,
    description: post.excerpt,
  };
}

function CategoryPill({ category }: { category: Category }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-300">
      {category}
    </span>
  );
}

function RelatedCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.img}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="duotone object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          aria-hidden="true"
        />
        <span className="absolute top-4 left-4">
          <CategoryPill category={post.category} />
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
          <span className="text-[#C9A84C]">{post.displayDate}</span>
          <span className="px-2 text-neutral-700">·</span>
          <span>{post.readMins} min</span>
        </p>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-neutral-50 text-balance">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const related = POSTS.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallback = POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallback;

  return (
    <main>
      <PageHeadlines />

      {/* HEADER */}
      <section className="group relative overflow-hidden min-h-[68vh] flex flex-col" aria-labelledby="post-title">
        <Image
          src={post.img}
          alt=""
          fill
          sizes="100vw"
          priority
          className="duotone object-cover"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/55" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Top utility bar — Back link */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 pt-28 sm:pt-32 w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 hover:text-neutral-50 transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All insights
          </Link>
        </div>

        {/* Bottom-anchored content */}
        <div className="relative z-10 mt-auto mx-auto max-w-5xl px-6 lg:px-8 pb-16 sm:pb-20 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryPill category={post.category} />
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-300">
              <span className="text-[#C9A84C]">{post.displayDate}</span>
              <span className="px-2 text-neutral-600">·</span>
              <span>{post.readMins} min read</span>
              <span className="px-2 text-neutral-600">·</span>
              <span>{post.author}</span>
            </p>
          </div>
          <h1 id="post-title" className="mt-6 text-[clamp(30px,4.6vw,68px)] font-bold display-tight text-neutral-50 text-balance leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-[1.55] text-neutral-200 text-pretty">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="border-t border-neutral-800 py-20 sm:py-28" aria-label="Article body">
        <article className="mx-auto max-w-3xl px-6 lg:px-8">
          {post.body.map((section, i) => {
            if (section.kind === 'h2') {
              return (
                <h2 key={i} className="mt-12 first:mt-0 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50 text-balance">
                  {section.text}
                </h2>
              );
            }
            if (section.kind === 'pull') {
              return (
                <blockquote
                  key={i}
                  className="my-12 border-l-2 border-[#C9A84C] pl-6 text-xl sm:text-2xl leading-[1.45] text-neutral-100 italic text-pretty"
                >
                  {section.text}
                </blockquote>
              );
            }
            return (
              <p key={i} className="mt-6 text-base sm:text-lg leading-[1.75] text-neutral-300 text-pretty">
                {section.text}
              </p>
            );
          })}

          {/* Author footer */}
          <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Written by</p>
              <p className="mt-1 text-base font-semibold text-neutral-100">{post.author}</p>
              <p className="text-xs text-neutral-500">{post.authorRole}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-neutral-50 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              All insights
            </Link>
          </div>
        </article>
      </section>

      <NewsletterCard titleId="post-newsletter-title" />

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-neutral-800 py-20 sm:py-28 bg-neutral-950/40" aria-labelledby="related-title">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">More writing</p>
              <h2 id="related-title" className="mt-6 text-[clamp(28px,4vw,48px)] font-bold display-tight text-neutral-50 text-balance">
                Keep reading.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(p => <RelatedCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="https://picsum.photos/seed/divinus-post-cta/2400/1200"
          alt=""
          fill
          sizes="100vw"
          className="duotone object-cover opacity-55"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/55" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-44">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Work with us</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block">Read it. Then</span>
                <span className="block text-neutral-500">let&apos;s build.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                If this piece prompted a question, tell us what you&apos;re trying to do.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Get in touch
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
