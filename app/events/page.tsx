import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';
import { UPCOMING_EVENTS, PAST_EVENTS, type EventItem } from './events-data';

export const metadata = {
  title: 'Events — Divinus Investment Group',
  description:
    'Convenings, forums, and retreats hosted by Divinus Investment Group — where the work happens face-to-face and the relationships compound.',
};

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition">
      <Link href={`/events/${event.id}`} aria-label={event.title}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.img}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="duotone object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            aria-hidden="true"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-neutral-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-200 border border-neutral-800">
            {event.type}
          </span>
        </div>
        <div className="p-6 sm:p-7">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">{event.displayDate}</p>
          <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-neutral-50 text-balance">
            {event.title}
          </h3>
          <p className="mt-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">{event.location}</p>
          <p className="mt-4 text-sm leading-[1.6] text-neutral-400 text-pretty">{event.blurb}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-100 underline decoration-neutral-700 underline-offset-[6px] group-hover:decoration-neutral-50 transition">
            View event
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function EventsPage() {
  return (
    <main>
      <PageHeadlines />

      {/* HEADER */}
      <section data-fx="gsap" data-section="events-header" data-above-fold className="group relative overflow-hidden min-h-[78vh] flex items-end" aria-labelledby="events-title">
        <Image
          src="https://picsum.photos/seed/divinus-events-hero/2400/1600"
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
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">Events · Convenings</p>
          <h1 id="events-title" className="mt-8 max-w-[16ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Where we gather.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">In rooms that matter.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            Forums, retreats, programmes, and dinners — closed and open. Where the work happens
            face-to-face and the relationships compound.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a
              href="#upcoming"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
            >
              See what&apos;s upcoming
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 px-5 py-3 text-sm font-semibold text-neutral-50 hover:bg-neutral-50/10 transition"
            >
              Host with us
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section id="upcoming" className="border-t border-neutral-800 py-20 sm:py-28" aria-labelledby="upcoming-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Upcoming</p>
              <h2 id="upcoming-title" className="mt-6 text-[clamp(28px,4vw,56px)] font-bold display-tight text-neutral-50 text-balance">
                What&apos;s on the calendar.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-4">
              <p className="text-base leading-[1.65] text-neutral-400 text-pretty">
                Most events are by application or invitation. Tell us which room you&apos;d like to be in
                and we&apos;ll come back within two working days.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* PAST */}
      <section className="border-t border-neutral-800 py-20 sm:py-28 bg-neutral-950/40" aria-labelledby="past-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Past</p>
              <h2 id="past-title" className="mt-6 text-[clamp(28px,4vw,56px)] font-bold display-tight text-neutral-50 text-balance">
                Recent gatherings.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-4">
              <p className="text-base leading-[1.65] text-neutral-400 text-pretty">
                Highlights and recaps from the rooms we&apos;ve already been in.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_EVENTS.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="https://picsum.photos/seed/divinus-events-cta/2400/1200"
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
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Stay close</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Be in the next</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">room with us.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Tell us what kind of rooms you want to be in. We&apos;ll route you to the right invite list.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/contact?route=general"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Get on the list
                </Link>
                <Link
                  href="/contact?mode=call"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-transparent px-5 py-3 text-sm font-semibold text-neutral-100 hover:bg-neutral-900 transition"
                >
                  Host with us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
