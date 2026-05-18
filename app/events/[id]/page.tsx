import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeadlines from '../../components/PageHeadlines';
import ParticleField from '../../components/ParticleField';
import { EVENTS, eventById, type EventItem } from '../events-data';

export function generateStaticParams() {
  return EVENTS.map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = eventById(id);
  if (!event) return { title: 'Event not found — Divinus Investment Group' };
  return {
    title: `${event.title} — Divinus Events`,
    description: event.blurb,
  };
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.img}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="duotone object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          aria-hidden="true"
        />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-neutral-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-200 border border-neutral-800">
          {event.type}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">{event.displayDate}</p>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-neutral-50 text-balance">
          {event.title}
        </h3>
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">{event.location}</p>
      </div>
    </Link>
  );
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = eventById(id);
  if (!event) notFound();

  const isUpcoming = event.status === 'upcoming';
  const related = EVENTS.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <main>
      <PageHeadlines />

      {/* HEADER */}
      <section className="group relative overflow-hidden min-h-[72vh] flex flex-col" aria-labelledby="event-title">
        <Image
          src={event.img}
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
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-28 sm:pt-32 w-full">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300 hover:text-neutral-50 transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to events
          </Link>
        </div>

        {/* Bottom-anchored content */}
        <div className="relative z-10 mt-auto mx-auto max-w-7xl px-6 lg:px-8 pb-16 sm:pb-20 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-neutral-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-200 border border-neutral-800">
              {event.type}
            </span>
            {!isUpcoming && (
              <span className="inline-flex items-center rounded-full bg-neutral-900/80 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 border border-neutral-800">
                Past event
              </span>
            )}
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#C9A84C]">{event.displayDate}</p>
          </div>
          <h1 id="event-title" className="mt-6 max-w-[22ch] text-[clamp(34px,5.2vw,80px)] font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            {event.title}
          </h1>
          <p className="mt-5 text-xs font-mono uppercase tracking-[0.16em] text-neutral-300">{event.location}</p>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-[1.55] text-neutral-200 text-pretty">
            {event.blurb}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              href={event.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
            >
              {event.ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="border-t border-neutral-800 py-20 sm:py-28" aria-label="Event details">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
            {/* Body */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">About this event</p>
              <div className="mt-6 space-y-5">
                {event.longBlurb.map((para, i) => (
                  <p key={i} className="text-base sm:text-lg leading-[1.7] text-neutral-300 text-pretty">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-14">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">What to expect</p>
                <ul className="mt-6 space-y-3">
                  {event.expect.map((line, i) => (
                    <li key={i} className="flex gap-3 text-base text-neutral-200 leading-[1.6]">
                      <span aria-hidden="true" className="mt-2 inline-block h-1 w-1 rounded-full bg-[#C9A84C] shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-14">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
                  {event.type === 'Programme' ? 'Programme outline' : 'Agenda'}
                </p>
                <ol className="mt-6 border-t border-neutral-800">
                  {event.agenda.map((slot, i) => (
                    <li key={i} className="grid grid-cols-12 gap-x-6 py-5 border-b border-neutral-800">
                      <p className="col-span-3 sm:col-span-2 text-sm font-mono uppercase tracking-[0.14em] text-[#C9A84C]">
                        {slot.time}
                      </p>
                      <div className="col-span-9 sm:col-span-10">
                        <p className="text-base font-semibold text-neutral-100">{slot.item}</p>
                        {slot.detail && (
                          <p className="mt-1 text-sm text-neutral-400 leading-[1.6]">{slot.detail}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Side panel */}
            <aside className="lg:col-span-5 lg:pl-4">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-7 sm:p-9">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Logistics</p>
                <dl className="mt-6 space-y-6">
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Date</dt>
                    <dd className="mt-1 text-base text-neutral-100">{event.displayDate}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Location</dt>
                    <dd className="mt-1 text-base text-neutral-100">{event.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Format</dt>
                    <dd className="mt-1 text-base text-neutral-100">{event.format}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Access</dt>
                    <dd className="mt-1 text-base text-neutral-100">{event.capacity}</dd>
                  </div>
                </dl>

                <div className="mt-8 pt-8 border-t border-neutral-800">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Hosts</p>
                  <ul className="mt-4 space-y-3">
                    {event.hosts.map((h, i) => (
                      <li key={i}>
                        <p className="text-base font-semibold text-neutral-100">{h.name}</p>
                        <p className="text-xs text-neutral-500">{h.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {isUpcoming && (
                  <div className="mt-8 pt-8 border-t border-neutral-800">
                    <Link
                      href={event.ctaHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                    >
                      {event.ctaLabel}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <p className="mt-3 text-xs text-neutral-500 text-center">
                      We will follow up within two working days.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-neutral-800 py-20 sm:py-28 bg-neutral-950/40" aria-labelledby="related-title">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">More gatherings</p>
              <h2 id="related-title" className="mt-6 text-[clamp(28px,4vw,48px)] font-bold display-tight text-neutral-50 text-balance">
                Other rooms.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="https://picsum.photos/seed/divinus-event-cta/2400/1200"
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
                <span className="block">Be in the next</span>
                <span className="block text-neutral-500">room with us.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Tell us what kind of rooms you want to be in. We&apos;ll route you to the right invite list.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact?route=general"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Get on the list
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
