import Link from 'next/link';
import Image from 'next/image';
import ParticleField from './components/ParticleField';
import HomeAnimations from './components/HomeAnimations';
import BorderGlow from './components/BorderGlow';
import Aurora from './components/Aurora';
import HeroGlobe from './components/HeroGlobe';

export const metadata = {
  title: 'Divinus Investment Group — Capital. Intelligence. Community.',
  description:
    'Divinus Investment Group is a multi-division group company building the infrastructure of growth — in organisations, in markets, and in people. One Group. Seven Divisions. One Direction.',
};

const DIVISIONS = [
  { num: '01', anchor: 'ai',         name: 'Divinus AI · Vision Africa', tag: 'Intelligence',  line: 'African AI capability — built, taught, and deployed where it counts.',     img: 'https://picsum.photos/seed/divinus-div-ai/720/900' },
  { num: '02', anchor: 'advisory',   name: 'Divinus Advisory',           tag: 'Strategy',      line: 'Where Strategy Meets Substance. We diagnose before we prescribe.',          img: 'https://picsum.photos/seed/divinus-div-advisory/720/900' },
  { num: '03', anchor: 'exchange',   name: 'Divinus Exchange',           tag: 'Community',     line: 'The platform where substance meets community — Men of Substance and Genesis Woman.', img: 'https://picsum.photos/seed/divinus-div-exchange/720/900' },
  { num: '04', anchor: 'labs',       name: 'Divinus Labs',               tag: 'Products',      line: 'Software products and digital systems engineered for African markets.',     img: 'https://picsum.photos/seed/divinus-div-labs/720/900' },
  { num: '05', anchor: 'capital',    name: 'Divinus Capital',            tag: 'Education',     line: 'Education Before Action. This is not a signals group — it is a school.',    img: 'https://picsum.photos/seed/divinus-div-capital/720/900' },
  { num: '06', anchor: 'partners',   name: 'Strategic Partners',         tag: 'Alliances',     line: 'Long-horizon partnerships with the institutions building the continent.',   img: 'https://picsum.photos/seed/divinus-div-partners/720/900' },
  { num: '07', anchor: 'foundation', name: 'The Divinus Foundation',     tag: 'Impact',        line: 'Where conviction meets contribution — the philanthropic arm of the group.', img: 'https://picsum.photos/seed/divinus-div-foundation/720/900' },
];

const ROUTES = [
  { intent: 'Build or scale a business',  to: '/divisions#advisory',  cta: 'Advisory' },
  { intent: 'Join a community',           to: '/communities',         cta: 'Communities' },
  { intent: 'Partner with us',            to: '/divisions#partners',  cta: 'Partners' },
  { intent: 'Support a programme',        to: '/divisions#foundation',cta: 'Foundation' },
  { intent: 'Talk to the team',           to: '/contact',             cta: 'Contact' },
];

export default function Home() {
  return (
    <main>
      <HomeAnimations />

      {/* HERO */}
      <section data-fx="gsap" data-section="hero" className="relative" aria-label="Introduction">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <Aurora
            colorStops={['#7C3AED', '#7C3AED', '#5227FF']}
            blend={0.97}
            amplitude={1.0}
            speed={0.4}
          />
        </div>
        <HeroGlobe />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
            Divinus Investment Group · Global focus, African conviction
          </p>

          <h1 data-anim="headline" className="mt-8 max-w-[14ch] text-[clamp(44px,7.4vw,116px)] font-bold display-tight text-neutral-50 text-balance">
            <span data-anim-line className="block">Capital. Intelligence. Community.</span>
            <span data-anim-line className="block text-neutral-500 text-[clamp(22px,3.2vw,48px)] mt-3 tracking-tight">This is Divinus.</span>
          </h1>

          <div className="mt-14 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-7 max-w-2xl">
              <p data-anim="sub" className="text-lg sm:text-xl leading-[1.55] text-neutral-400 text-pretty">
                A multi-division group company building the infrastructure of growth —
                in organisations, in markets, and in people.
              </p>

              <div data-anim="cta" className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/divisions"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Explore the Divisions
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
                <span className="text-sm text-neutral-600">or</span>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                >
                  Get in touch with the team →
                </Link>
              </div>
            </div>

            <dl data-anim="triplet" className="lg:col-span-5 grid grid-cols-3 gap-y-6 gap-x-6 text-sm border-t border-neutral-800 pt-8">
              <div>
                <dt className="text-xs font-medium text-neutral-500 mb-1.5">Group</dt>
                <dd className="text-lg font-semibold tracking-tight">One</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-neutral-500 mb-1.5">Divisions</dt>
                <dd className="text-lg font-semibold tracking-tight tabular-nums">Seven</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-neutral-500 mb-1.5">Direction</dt>
                <dd className="text-lg font-semibold tracking-tight">One</dd>
              </div>
            </dl>
          </div>
        </div>

      </section>

      {/* GROUP OVERVIEW */}
      <section data-fx="gsap" data-section="group" className="py-24 sm:py-32" aria-labelledby="group-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500" data-anim="group-line">The architecture</p>
              <h2 id="group-title" className="mt-6 text-[clamp(34px,5vw,72px)] font-bold display-tight text-neutral-50 text-balance">
                <span data-anim="group-line" className="block">One Group.</span>
                <span data-anim="group-line" className="block">Seven Divisions.</span>
                <span data-anim="group-line" className="block text-neutral-500">One Direction.</span>
              </h2>
            </div>
            <div data-anim="group-body" className="lg:col-span-5 lg:pl-6 lg:pt-2">
              <p className="text-lg leading-[1.6] text-neutral-400 text-pretty">
                Divinus is not a holding company stitched together by ownership.
                It is a single organism — seven divisions building the
                infrastructure of growth across capital, intelligence, and community.
              </p>
              <p className="mt-6 text-lg leading-[1.6] text-neutral-400 text-pretty">
                Headquartered with global ambition and African conviction.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SEVEN DIVISIONS */}
      <section data-fx="gsap" data-section="divisions" id="divisions" data-preview-host className="relative pb-24 sm:pb-32" aria-labelledby="divisions-title">
        {/* Cursor-tracking preview stack — one tile per division, GSAP swaps which is active */}
        <div
          data-preview-stack
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-20 hidden md:block"
          style={{ width: 280, height: 360, opacity: 0, willChange: 'transform, opacity' }}
        >
          {DIVISIONS.map((d, i) => (
            <div
              key={d.anchor}
              data-preview-tile={d.anchor}
              className="absolute inset-0 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl bg-neutral-950"
              style={{ opacity: i === 0 ? 1 : 0, willChange: 'opacity' }}
            >
              <Image
                src={d.img}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
                aria-hidden="true"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/80">
                  {d.num} / {d.tag}
                </p>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 mb-2">
                    Divinus · Division
                  </p>
                  <p className="text-xl font-bold leading-[1.1] tracking-tight text-white">
                    {d.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div data-anim="div-head" className="flex items-end justify-between mb-10 sm:mb-12">
            <h3 id="divisions-title" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
              The seven divisions
            </h3>
            <Link
              href="/divisions"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
            >
              View the full architecture →
            </Link>
          </div>

          <div className="border-t border-neutral-800">
            {DIVISIONS.map((d) => (
              <article
                key={d.anchor}
                data-anim="div-row"
                data-preview-row={d.anchor}
                className="group grid grid-cols-12 gap-x-6 gap-y-4 py-10 sm:py-12 border-b border-neutral-800"
              >
                <div className="col-span-12 sm:col-span-2">
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
                    {d.num} / {d.tag}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <h4 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">
                    {d.name}
                  </h4>
                  <p className="mt-3 text-lg leading-[1.55] text-neutral-400 max-w-xl text-pretty">
                    {d.line}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-3 flex items-end justify-start sm:justify-end">
                  <Link
                    href={`/divisions#${d.anchor}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-neutral-700 underline-offset-[6px] group-hover:decoration-neutral-50 transition"
                  >
                    Learn more <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITIES TEASER */}
      <section data-fx="gsap" data-section="communities" className="py-24 sm:py-32 bg-neutral-900/40 border-y border-neutral-800/70" aria-labelledby="communities-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div data-anim="comm-head" className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">For individuals</p>
            <h2 id="communities-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
              Where substance<br/>meets community.
            </h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-xl text-pretty">
              Two consumer communities under Divinus Exchange — distinct in voice,
              united in standard.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <BorderGlow
              data-anim="comm-card"
              edgeSensitivity={45}
              glowColor="0 0 100"
              backgroundColor="#0a0a0a"
              borderRadius={14}
              glowRadius={36}
              glowIntensity={1.0}
              coneSpread={40}
              animated={false}
              colors={['#fafafa', '#a3a3a3', '#525252']}
              fillOpacity={0.5}
            >
              <Link href="/communities#men-of-substance" className="group block p-[2px] rounded-[14px]">
                <div className="overflow-hidden rounded-[12px]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="https://picsum.photos/seed/divinus-mos/1600/1000"
                      alt="Men of Substance — community gathering"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="duotone object-cover"
                    />
                  </div>
                  <div className="p-8 sm:p-10">
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">01 / For men</p>
                    <h3 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">Men of Substance</h3>
                    <p className="mt-4 text-base sm:text-sm leading-[1.7] text-neutral-400">
                      <span className="text-neutral-200">Leadership.</span>{' '}
                      <span className="text-neutral-200">Discipline.</span>{' '}
                      <span className="text-neutral-200">Brotherhood.</span>{' '}
                      <span className="text-neutral-200">Standard.</span>
                    </p>
                    <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 group-hover:text-neutral-50 transition">
                      Explore Men of Substance <span className="transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </BorderGlow>

            <BorderGlow
              data-anim="comm-card"
              edgeSensitivity={45}
              glowColor="0 0 100"
              backgroundColor="#0a0a0a"
              borderRadius={14}
              glowRadius={36}
              glowIntensity={1.0}
              coneSpread={40}
              animated={false}
              colors={['#fafafa', '#a3a3a3', '#525252']}
              fillOpacity={0.5}
            >
              <Link href="/communities#genesis-woman" className="group block p-[2px] rounded-[14px]">
                <div className="overflow-hidden rounded-[12px]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="https://picsum.photos/seed/divinus-gw/1600/1000"
                      alt="Genesis Woman — community gathering"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="duotone object-cover"
                    />
                  </div>
                  <div className="p-8 sm:p-10">
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">02 / For women</p>
                    <h3 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50">Genesis Woman</h3>
                    <p className="mt-4 text-base sm:text-sm leading-[1.7] text-neutral-400">
                      <span className="text-neutral-200">Purpose.</span>{' '}
                      <span className="text-neutral-200">Clarity.</span>{' '}
                      <span className="text-neutral-200">Excellence.</span>{' '}
                      <span className="text-neutral-200">Sisterhood.</span>
                    </p>
                    <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 group-hover:text-neutral-50 transition">
                      Explore Genesis Woman <span className="transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* FIND YOUR PLACE */}
      <section data-fx="gsap" data-section="routing" className="py-24 sm:py-32" aria-labelledby="routing-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div data-anim="route-head" className="max-w-3xl mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Where to begin</p>
            <h2 id="routing-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
              Find your place<br/>in the group.
            </h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-xl text-pretty">
              Whatever brought you here, there is a door. Start with the one that matches what you want to do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800/70 border border-neutral-800/70">
            {ROUTES.map((r, i) => (
              <Link
                key={r.intent}
                href={r.to}
                data-anim="route-row"
                className="group relative bg-neutral-950 p-8 lg:p-10 flex flex-col justify-between min-h-[260px] overflow-hidden transition"
              >
                <Image
                  src={`https://picsum.photos/seed/divinus-route-${r.cta.toLowerCase()}/1200/800`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="duotone object-cover opacity-70"
                  aria-hidden="true"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="relative flex items-start justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 group-hover:text-neutral-300 transition">
                    {String(i + 1).padStart(2, '0')} / {r.cta}
                  </span>
                  <span className="text-neutral-600 transition group-hover:text-neutral-50 group-hover:translate-x-1">→</span>
                </div>
                <div className="relative">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">I want to</p>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-neutral-50 text-balance">
                    {r.intent.toLowerCase()}.
                  </p>
                </div>
              </Link>
            ))}
            <div aria-hidden="true" className="hidden lg:block bg-neutral-950 min-h-[260px]" />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50" aria-labelledby="cta-title">
        <Image
          src="https://picsum.photos/seed/divinus-cta/2400/1200"
          alt=""
          fill
          sizes="100vw"
          className="duotone object-cover opacity-55"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/55" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-36 sm:py-48">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The next step</p>
              <h2 id="cta-title" data-anim="cta-headline" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-bold display-tight text-neutral-50 text-balance">
                <span data-anim-line className="block">Build organisations.</span>
                <span data-anim-line className="block">Develop people.</span>
                <span data-anim-line className="block text-neutral-500">Create value that lasts.</span>
              </h2>
            </div>
            <div data-anim="cta-body" className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                If what we are building resonates — partnership, programme, or
                conversation — start here.
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
                  href="/about"
                  className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                >
                  Read about Divinus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
