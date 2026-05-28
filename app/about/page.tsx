import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'About — Divinus Investment Group',
  description:
    'Divinus Investment Group is a multi-division group company building the infrastructure of growth — in organisations, in markets, and in people.',
};

const ARCHITECTURE = [
  { num: '01', name: 'Divinus AI · Vision Africa', mandate: 'Build, teach, and deploy African AI capability — for the institutions, businesses, and governments shaping the continent.', img: '/divisions/ai.jpg' },
  { num: '02', name: 'Divinus Advisory',           mandate: 'Where Strategy Meets Substance. We diagnose before we prescribe — and stay until the work has taken root.',               img: '/divisions/advisory.jpg' },
  { num: '03', name: 'Divinus Exchange',           mandate: 'The platform where substance meets community. Home of Men of Substance and Genesis Woman.',                              img: '/divisions/exchange.jpg' },
  { num: '04', name: 'Divinus Labs',               mandate: 'Software products and digital systems engineered for African markets, built to be owned, not rented.',                  img: '/divisions/labs.jpg' },
  { num: '05', name: 'Divinus Capital',            mandate: 'Education Before Action. A financial education division — not a signals group, not advisory, a school.',                img: '/divisions/capital.jpg' },
  { num: '06', name: 'Strategic Partners',         mandate: 'Long-horizon partnerships with the institutions building the continent — public, private, and philanthropic.',          img: '/divisions/partners.jpg' },
  { num: '07', name: 'The Divinus Foundation',     mandate: 'The philanthropic arm of the group — where conviction meets contribution.',                                              img: '/divisions/foundation.jpg' },
];

const VALUES = [
  { name: 'Precision', body: 'Every standard we set is a promise. We refuse to round down.',                icon: 'fa-solid fa-bullseye' },
  { name: 'Integrity', body: 'What we say privately and what we ship publicly are the same thing.',         icon: 'fa-solid fa-shield-halved' },
  { name: 'Ambition',  body: 'The scale of the work matches the scale of the continent we serve.',         icon: 'fa-solid fa-mountain' },
  { name: 'Impact',    body: 'Outcomes outlive the engagement. Substance over spectacle.',                 icon: 'fa-solid fa-bolt' },
];

const LEADERS = [
  {
    name: 'Danston Mugarura',
    img: '/team/danston-mugarura.jpg',
    socials: [
      { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/danston-m-88bbb172' },
    ],
  },
  {
    name: 'Mulondo Daniel',
    img: '/team/mulondo-daniel.jpg',
    socials: [
      { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/mulondodaniel' },
      { label: 'X',        icon: 'fa-brands fa-x-twitter',   href: 'https://x.com/mulondodaniel_' },
    ],
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER — full-bleed cinematic */}
      <section data-fx="gsap" data-section="about-header" data-above-fold className="group relative overflow-hidden min-h-[88vh] flex items-end" aria-labelledby="about-title">
        <Image
          src="/next-step-v3.jpg"
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
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">About</p>
          <h1 id="about-title" className="mt-8 max-w-[18ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">About Divinus</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">Investment Group.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            A multi-division group company building the infrastructure of growth —
            in organisations, in markets, and in people. Headquartered with global
            ambition and African conviction.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section data-fx="gsap" data-section="who" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="who-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Who we are</p>
              <h2 id="who-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">One organism.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Not a holding company.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                Divinus exists at the intersection of capital, intelligence, and community.
                Seven divisions, one direction — each accountable to the same standard,
                each contributing to the same architecture of growth.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                We work with organisations, governments, and individuals that take
                seriously the next decade of African enterprise. We do not chase
                trends. We build infrastructure.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                Divinus is led by a team with experience across strategy, technology,
                finance, and community development.
              </p>
            </div>
          </div>

          {/* Editorial image strip — duotone, color on hover */}
          <div className="group mt-16 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="relative aspect-[16/9] sm:col-span-8 overflow-hidden rounded-md">
              <Image
                src="/about-who-1.jpg"
                alt="One organism"
                fill
                sizes="(min-width: 640px) 66vw, 100vw"
                className="duotone object-cover"
              />
            </div>
            <div className="relative aspect-[16/9] sm:col-span-4 sm:aspect-auto overflow-hidden rounded-md">
              <Image
                src="/about-who-2.jpg"
                alt="Operational rhythm"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="duotone object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION — single hero-statement block */}
      <section data-fx="gsap" data-section="mission" data-pin-reveal className="group relative overflow-hidden border-t border-neutral-800 py-32 sm:py-44" aria-labelledby="mission-title">
        <Image
          src="/about-mission.jpg"
          alt=""
          fill
          sizes="100vw"
          className="duotone object-cover"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/55" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Mission</p>
          <h2 id="mission-title" className="mt-8 max-w-[20ch] text-[clamp(40px,6.4vw,104px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Build organisations.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Develop people.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">Create value that lasts.</span></span>
          </h2>
        </div>
      </section>

      {/* ARCHITECTURE — 7 rows */}
      <section data-fx="gsap" data-section="arch" className="py-24 sm:py-32" aria-labelledby="arch-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 mb-14 sm:mb-16">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The architecture</p>
              <h2 id="arch-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Seven divisions.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">One mandate each.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-3">
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                The seven divisions are not subsidiaries — they are limbs of a single body.
                Each carries one mandate. Together they form the infrastructure of growth.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800">
            {ARCHITECTURE.map((d) => (
              <article key={d.num} className="group grid grid-cols-12 gap-x-6 gap-y-4 py-10 sm:py-12 border-b border-neutral-800 items-start">
                <div className="col-span-12 sm:col-span-1">
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">{d.num}</span>
                </div>
                <div className="col-span-12 sm:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{d.name}</h3>
                  <p className="text-lg leading-[1.6] text-neutral-400 text-pretty max-w-xl">{d.mandate}</p>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={d.img}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="duotone object-cover"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/divisions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
            >
              Explore each division in full →
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section data-fx="gsap" data-section="values" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="values-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Values</p>
            <h2 id="values-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Precision · Integrity ·</span></span>
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Ambition · Impact.</span></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
            {VALUES.map((v, i) => (
              <article key={v.name} className="group relative bg-neutral-950 p-8 sm:p-10 min-h-[320px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <i className={`${v.icon} text-3xl text-neutral-400`} aria-hidden="true" />
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{v.name}</h3>
                  <p className="mt-4 text-base sm:text-sm leading-[1.7] text-neutral-300 text-pretty">{v.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY — Why We Were Built */}
      <section data-fx="gsap" data-section="story" className="py-24 sm:py-32" aria-labelledby="story-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Our story</p>
              <h2 id="story-title" className="mt-6 text-[clamp(34px,5vw,56px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Why we</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">were built.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-6 space-y-7 text-lg leading-[1.7] text-neutral-300 text-pretty">
              <p>
                Africa is not short on talent, ambition, or opportunity. It is short
                on infrastructure — the kind that compounds, the kind that survives
                a generation, the kind that converts capability into outcomes.
              </p>
              <div className="group relative aspect-[16/9] overflow-hidden rounded-md my-2">
                <Image
                  src="/divisions/labs.jpg"
                  alt="Why Divinus was built"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="duotone object-cover"
                />
              </div>
              <p className="text-neutral-400">
                Divinus was built to be that infrastructure. Not a fund, not a
                consultancy, not a community — but the architecture that ties capital,
                intelligence, and community into a single system. Seven divisions
                designed to reinforce one another, each running to a standard the
                next can rely on.
              </p>
              <p className="text-neutral-400">
                We are early. Most of what Divinus will become is still ahead of us.
                What is settled is the standard, the direction, and the kind of
                organisation we refuse to be.
              </p>
              <p className="text-neutral-200 italic">
                Premium. Purposeful. Precise. Never performative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section data-fx="gsap" data-section="leadership" className="border-t border-neutral-800 py-20 sm:py-24" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Intro — single block; eyebrow + tag, title + lede aligned to one column */}
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Leadership</p>
            <h2 id="leadership-title" className="mt-6 text-[clamp(36px,5.4vw,72px)] font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">The team</span></span>
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">behind the standard.</span></span>
            </h2>
            <p className="mt-8 text-lg leading-[1.65] text-neutral-300 text-pretty">
              Divinus is led by a team with experience across strategy, technology,
              finance, and community development.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
            {LEADERS.map((p) => (
              <article key={p.name} className="group relative bg-neutral-950 aspect-[3/4] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="duotone object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{p.name}</h3>
                  <ul className="mt-5 flex items-center gap-3">
                    {p.socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} on ${s.label}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950/60 text-neutral-300 hover:text-neutral-50 hover:border-neutral-500 transition"
                        >
                          <i className={`${s.icon} text-sm`} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50" aria-labelledby="cta-title">
        <Image
          src="/next-step-v3.jpg"
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
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The next step</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">If our standard</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">matches your ambition.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Partnerships, programmes, and conversations begin in the same place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Get in Touch
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
                <Link
                  href="/divisions"
                  className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                >
                  Explore the Divisions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
