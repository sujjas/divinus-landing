import NewsletterForm from '../contact/NewsletterForm';

type Props = {
  /** Heading id — pass when multiple cards appear on a page. */
  titleId?: string;
  /** Override the headline copy. */
  title?: React.ReactNode;
  /** Lede paragraph above the form. */
  lede?: React.ReactNode;
};

/**
 * Shared "raised light card" newsletter CTA. Used on /contact, /blog, and
 * individual /blog/[slug] pages. Renders a `<section>` so it can sit inside
 * a page flow on its own.
 */
export default function NewsletterCard({
  titleId = 'newsletter-title',
  title,
  lede,
}: Props) {
  return (
    <section className="bg-black py-20 sm:py-28" aria-labelledby={titleId}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative rounded-2xl bg-neutral-50 text-neutral-950 px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#9A7E2C]">
                <span aria-hidden="true">✦ </span>Stay in the loop
              </p>
              <h2 id={titleId} className="mt-6 text-[clamp(30px,4.4vw,60px)] font-bold display-tight text-neutral-950 text-balance">
                {title ?? (
                  <>
                    <span className="block">Intelligence, delivered.</span>
                    <span className="block text-neutral-500">No noise. No filler.</span>
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-[1.6] text-neutral-700 text-pretty">
                {lede ??
                  'Divinus perspectives on capital, strategy, and the African growth story — straight to your inbox.'}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-6">
              <NewsletterForm variant="light" />
              <p className="mt-3 text-xs text-neutral-500">
                One letter a month. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
