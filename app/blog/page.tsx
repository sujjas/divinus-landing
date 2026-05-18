import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';
import NewsletterCard from '../components/NewsletterCard';
import { POSTS, CATEGORIES, type Category, type Post } from './posts';

export const metadata = {
  title: 'Insights — Divinus Investment Group',
  description:
    'Divinus perspectives on capital, strategy, AI, and the African growth story — written by the team, for operators and leaders.',
};

function CategoryPill({ category }: { category: Category }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-300">
      {category}
    </span>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
      <span className="text-[#C9A84C]">{post.displayDate}</span>
      <span className="px-2 text-neutral-700">·</span>
      <span>{post.readMins} min read</span>
      <span className="px-2 text-neutral-700">·</span>
      <span>{post.author}</span>
    </p>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <main>
      <PageHeadlines />

      {/* HEADER */}
      <section data-fx="gsap" data-section="blog-header" data-above-fold className="group relative overflow-hidden min-h-[78vh] flex items-end" aria-labelledby="blog-title">
        <Image
          src="https://picsum.photos/seed/divinus-blog-hero/2400/1600"
          alt=""
          fill
          sizes="100vw"
          priority
          className="duotone object-cover"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 sm:pb-28 w-full">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">Insights · Writing</p>
          <h1 id="blog-title" className="mt-8 max-w-[16ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Substance in writing.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">No noise. No filler.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            Perspectives on capital, strategy, AI, and the African growth story — written by the
            team, for operators and leaders.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
            {CATEGORIES.map(c => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-neutral-200/30 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-neutral-800 py-20 sm:py-28" aria-labelledby="featured-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-10">Featured</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-12 gap-x-12 gap-y-8 items-center"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-800">
              <Image
                src={featured.img}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="duotone object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                aria-hidden="true"
              />
            </div>
            <div className="lg:col-span-5 lg:pl-4">
              <div className="flex items-center gap-3">
                <CategoryPill category={featured.category} />
                <PostMeta post={featured} />
              </div>
              <h2 id="featured-title" className="mt-6 text-[clamp(28px,3.8vw,48px)] font-bold display-tight text-neutral-50 text-balance">
                {featured.title}
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-[1.6] text-neutral-300 text-pretty">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-100 underline decoration-neutral-700 underline-offset-[6px] group-hover:decoration-neutral-50 transition">
                Read the piece
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="border-t border-neutral-800 py-20 sm:py-28 bg-neutral-950/40" aria-labelledby="all-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">All writing</p>
              <h2 id="all-title" className="mt-6 text-[clamp(28px,4vw,56px)] font-bold display-tight text-neutral-50 text-balance">
                Recent pieces.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-4">
              <p className="text-base leading-[1.65] text-neutral-400 text-pretty">
                Long-form perspectives from across the group — Capital, Advisory, AI, Exchange, and
                the Foundation.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <Link
                key={post.slug}
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
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <PostMeta post={post} />
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-neutral-50 text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.6] text-neutral-400 text-pretty">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-200">
                    Read
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCard
        titleId="blog-newsletter-title"
        lede="New pieces, straight to your inbox — once a month, nothing more."
      />

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="https://picsum.photos/seed/divinus-blog-cta/2400/1200"
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
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Read it. Then</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">let&apos;s build.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                If a piece prompted a question, tell us what you&apos;re trying to do. We&apos;ll route it
                to the right division.
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
