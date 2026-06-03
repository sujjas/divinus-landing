import PageHeadlines from './PageHeadlines';

/**
 * Shared chrome for long-form legal pages (Privacy, Terms).
 * Text-only header (no cinematic image) + a constrained prose column.
 * Children should be a sequence of <section> blocks with h2 + prose.
 */
export default function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <PageHeadlines />

      {/* HEADER */}
      <section data-fx="gsap" data-section="legal-header" data-above-fold className="border-b border-neutral-800 pt-36 pb-16 sm:pt-44 sm:pb-20" aria-labelledby="legal-title">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">{eyebrow}</p>
          <h1 id="legal-title" className="mt-7 text-[clamp(38px,6vw,72px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.04]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">{title}</span></span>
          </h1>
          <p className="mt-7 text-lg leading-[1.6] text-neutral-400 text-pretty">{lede}</p>
          <p className="mt-6 text-xs font-mono uppercase tracking-[0.16em] text-neutral-600">Last updated · {lastUpdated}</p>
        </div>
      </section>

      {/* BODY */}
      <div className="py-16 sm:py-20">
        <div className="legal-prose mx-auto max-w-3xl px-6 lg:px-8">
          {children}
        </div>
      </div>
    </main>
  );
}
