import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'About — Divinus Investment Group',
  description:
    'Divinus Investment Group is a multi-division group company building the infrastructure of growth — in organisations, in markets, and in people.',
};

const LEADERS = [
  {
    name: 'Danston Mugarura',
    title: 'CEO, Divinus Group',
    img: '/team/danston-mugarura.jpg',
    bio: [
      'Danston Mugarura is an entrepreneur, author, investor, and transformational leader with over three decades of experience building businesses, developing people, and leading high-performing organisations across Europe, Africa, the Middle East, and the United States.',
      'As CEO of Divinus Group, he builds purpose-driven ventures at the intersection of business, technology, innovation, and human development — helping individuals and companies unlock potential and create sustainable impact.',
      'Having built multimillion-dollar enterprises and led large commercial teams across Europe, Danston is recognised for his ability to see potential, develop talent, and transform ideas into scalable solutions. He is also the founder of Code 1, a human transformation and leadership platform.',
      'Known as “The Restorer,” Danston believes true transformation begins by restoring people before rebuilding systems — unlocking human potential and developing the leaders of what comes next.',
    ],
    socials: [
      { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/danston-m-88bbb172' },
    ],
  },
  {
    name: 'Mulondo Daniel',
    title: 'Hybrid Institutional Strategist',
    img: '/team/mulondo-daniel.jpg',
    bio: [
      'Mulondo Daniel is a hybrid institutional strategist, financial markets advisor, and portfolio architect with over twelve years of experience navigating global capital markets — spanning digital assets, equities, precious metals, and AI-driven infrastructure.',
      'At Divinus Group, Daniel leads private capital, digital asset advisory, and portfolio structuring — bridging institutional risk discipline with the new frontier of crypto, AI, and emerging-market opportunity. His philosophy rests on three pillars: alpha generation, institutional risk architecture, and long-term compounding.',
      'He has delivered eight consecutive profitable years across spot and derivatives markets, with risk-managed exposure across BTC, ETH, SOL, and BNB, gold as a global macro hedge, and selective positions in AI-driven equities including NVDA, TSLA, and META.',
      'Beyond Divinus, Daniel leads Vision Africa AI Global — a platform advancing AI education, financial intelligence, and investor ecosystem development across the continent, bringing institutional-grade strategy to a new generation of African investors long underserved by global capital markets.',
    ],
    socials: [
      { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/mulondodaniel' },
      { label: 'X',        icon: 'fa-brands fa-x-twitter',   href: 'https://x.com/mulondodaniel_' },
    ],
  },
];

const CATEGORIES = [
  {
    num: '01',
    name: 'Communities',
    href: '/communities',
    img: '/communities/hero.jpg',
    line: 'Men of Substance and Genesis Woman — where African men and women of standard find their people.',
  },
  {
    num: '02',
    name: 'Events',
    href: '/events',
    img: '/events.jpg',
    line: 'Gatherings, briefings, and convenings where the Divinus standard is set in person.',
  },
  {
    num: '03',
    name: 'Insights',
    href: '/blog',
    img: '/insights-hero.jpg',
    line: 'Essays, analysis, and field notes on capital, intelligence, and the African century.',
  },
  {
    num: '04',
    name: 'Investors',
    href: '/investors',
    img: '/divisions/capital.jpg',
    line: 'The traction, the opportunity, and the round — for those building the continent with us.',
  },
];

// Open roles. Descriptions to follow — titles only for now.
const ROLES = [
  'Agility Officer',
  'AI Training Facilitators',
  'Digital Lead',
  'Business Analysts',
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
          <h1 id="about-title" className="mt-8 max-w-[18ch] text-[clamp(44px,7vw,108px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">About Divinus</span></span>
            <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block text-neutral-400">Investment Group.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            A multi-division group company building the infrastructure of growth —
            in organisations, in markets, and in people. Headquartered with global
            ambition and African conviction.
          </p>
        </div>
      </section>

      {/* THE TEAM — leads the page */}
      <section data-fx="gsap" data-section="leadership" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Intro — single block; eyebrow + tag, title + lede aligned to one column */}
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The team</p>
            <h2 id="leadership-title" className="mt-6 text-[clamp(36px,5.4vw,72px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
              <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">The team</span></span>
              <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">behind the standard.</span></span>
            </h2>
            <p className="mt-8 text-lg leading-[1.65] text-neutral-300 text-pretty">
              Divinus is led by a team with experience across strategy, technology,
              finance, and community development.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-24">
            {LEADERS.map((p, i) => (
              <article
                key={p.name}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-start"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="duotone object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">{p.name}</h3>
                  <p className="mt-2 text-sm font-mono uppercase tracking-[0.18em] text-[#C9A84C]">{p.title}</p>
                  <div className="mt-8 space-y-5 text-[15px] sm:text-base leading-[1.7] text-neutral-300 text-pretty">
                    {p.bio.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                  <ul className="mt-8 flex items-center gap-3">
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

      {/* JOIN THE TEAM — recruitment; open roles arrive here */}
      <section data-fx="gsap" data-section="careers" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="careers-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Join the team</p>
              <h2 id="careers-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">Build the standard</span></span>
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block text-neutral-500">with us.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                We are assembling a team of operators, builders, and thinkers who hold
                themselves to the same standard we set for the work — premium,
                purposeful, precise, never performative.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                These are the roles we are hiring for now. Full descriptions are on the
                way — if you see yourself in one, we would rather hear from you early
                than late.
              </p>

              {/* Open roles. Add a description per role under the title when copy lands. */}
              <div className="mt-2 rounded-md border border-neutral-800 bg-neutral-900/40 overflow-hidden">
                <p className="px-8 sm:px-10 pt-8 sm:pt-10 text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Open roles</p>
                <ul className="mt-5 divide-y divide-neutral-800 border-t border-neutral-800">
                  {ROLES.map((role) => (
                    <li key={role}>
                      <Link
                        href="/contact?route=careers"
                        className="group flex items-center justify-between gap-4 px-8 sm:px-10 py-5 hover:bg-neutral-900/60 transition"
                      >
                        <span className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-50">{role}</span>
                        <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-neutral-400 group-hover:text-neutral-50 transition">
                          Apply <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-8 sm:px-10 py-6 border-t border-neutral-800">
                  <p className="text-sm leading-[1.6] text-neutral-500 text-pretty">
                    Don’t see your role but believe you belong here?{' '}
                    <Link href="/contact?route=careers" className="font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[4px] hover:text-neutral-50 hover:decoration-neutral-50 transition">
                      Register your interest
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE DIVINUS CONVICTION — ported from the home page */}
      <section data-section="conviction" className="relative border-t border-neutral-800/70 bg-neutral-900/40 py-24 sm:py-32" aria-labelledby="conviction-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C9A84C]">The Divinus Conviction</p>
                <h2 id="conviction-title" className="mt-8 text-[clamp(34px,4.4vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
                  <span className="block">We don’t manage funds.</span>
                  <span className="block text-neutral-500">We develop people.</span>
                </h2>
                <p className="mt-8 max-w-md text-lg leading-[1.55] text-neutral-400 text-pretty">
                  Every division in this group exists for one reason — to close the gap
                  between the potential Africa carries and the outcomes it deserves.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pt-2">
              <div className="space-y-7 text-[16px] sm:text-lg leading-[1.7] text-neutral-300 text-pretty">
                <p>
                  Africa’s greatest asset is not its land, its resources, or its markets.
                  It is its people.
                </p>
                <p>
                  Divinus Investment Group exists to invest in that asset — the African
                  human. Through education, mentorship, AI augmentation, financial
                  literacy, and community, every division of the group is designed to
                  close the gap between raw potential and realised achievement. We do not
                  manage funds. We develop people — and we build the infrastructure
                  around them so that development compounds.
                </p>
                <p>
                  This is what we mean by investment. Capital deployed into capability.
                  Intelligence applied to ambition. Community built around standard. When
                  a person understands how markets work, leads with discipline, builds
                  with technology, and is surrounded by others doing the same — that is a
                  return no balance sheet can fully capture. That is the Divinus mandate.
                </p>
              </div>

              <figure className="mt-12 border-l-2 border-[#C9A84C] pl-6 sm:pl-8">
                <blockquote>
                  <p className="text-[clamp(22px,2.6vw,34px)] font-semibold display-tight leading-[1.2] text-neutral-50 text-balance">
                    The elevation of the African individual is the highest-yield investment on the continent.
                  </p>
                </blockquote>
              </figure>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link href="/divisions" className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition">
                  Explore the Divisions <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition">
                  Get in touch <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE DIVINUS — category cards linking out to the pages */}
      <section data-fx="gsap" data-section="explore" className="py-24 sm:py-32" aria-labelledby="explore-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 mb-14 sm:mb-16">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Explore Divinus</p>
              <h2 id="explore-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">Where to go</span></span>
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block text-neutral-500">from here.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-3">
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                The work lives across the group. Start with the door that matches what
                you came for.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800/70 border border-neutral-800/70">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="group relative bg-neutral-950 p-8 lg:p-10 flex flex-col justify-between min-h-[300px] overflow-hidden transition"
              >
                <Image
                  src={c.img}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="duotone object-cover opacity-70"
                  aria-hidden="true"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/45 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="relative flex items-start justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 group-hover:text-neutral-300 transition">
                    {c.num} / {c.name}
                  </span>
                  <span className="text-neutral-600 transition group-hover:text-neutral-50 group-hover:translate-x-1">→</span>
                </div>
                <div className="relative">
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">{c.name}</h3>
                  <p className="mt-3 text-base leading-[1.55] text-neutral-400 max-w-md text-pretty">{c.line}</p>
                </div>
              </Link>
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
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block">If our standard</span></span>
                <span className="block overflow-hidden pb-[0.2em] -mb-[0.15em]"><span data-anim-line className="block text-neutral-500">matches your ambition.</span></span>
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
