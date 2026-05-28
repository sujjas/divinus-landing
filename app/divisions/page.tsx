import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'Divisions — Divinus Investment Group',
  description: 'Seven Divisions. One Direction. The architecture of Divinus Investment Group.',
};

const ANCHORS = [
  { id: 'ai',         label: 'AI' },
  { id: 'advisory',   label: 'Advisory' },
  { id: 'exchange',   label: 'Exchange' },
  { id: 'labs',       label: 'Labs' },
  { id: 'capital',    label: 'Capital' },
  { id: 'partners',   label: 'Partners' },
  { id: 'foundation', label: 'Foundation' },
];

type Division = {
  num: string;
  id: string;
  eyebrow: string;
  name: string;
  tagline?: string;
  intro: string;
  serviceTitle: string;
  services: { name: string; line: string }[];
  audience?: { title: string; items: string[] };
  img: string;
};

const DIVISIONS: Division[] = [
  {
    num: '01', id: 'ai', eyebrow: 'Intelligence', img: '/divisions/ai.jpg',
    name: 'Divinus AI · Vision Africa',
    tagline: 'African AI capability — built, taught, and deployed where it counts.',
    intro:
      'Africa’s AI opportunity is not a future story; it is a present one. We build and embed the AI capability the continent will run on — for the institutions, businesses, and governments shaping the next decade.',
    serviceTitle: 'What we do',
    services: [
      { name: 'Applied AI engineering',   line: 'Production systems — agents, retrieval, evaluation pipelines — engineered for African data and constraints.' },
      { name: 'AI strategy & adoption',   line: 'Where AI belongs in your operation, where it doesn’t, and the roadmap to get there responsibly.' },
      { name: 'Capability building',      line: 'Training programmes that turn teams from AI consumers into AI builders.' },
      { name: 'Vision Africa research',   line: 'Original research on African AI use cases, datasets, and policy direction.' },
      { name: 'Public-sector deployments',line: 'Working with governments and institutions on AI infrastructure of national consequence.' },
    ],
    audience: {
      title: 'Who we serve',
      items: ['Governments & public institutions', 'Enterprises and operators', 'Founders building AI-native products', 'Universities and research bodies'],
    },
  },
  {
    num: '02', id: 'advisory', eyebrow: 'Strategy', img: '/divisions/advisory.jpg',
    name: 'Divinus Advisory',
    tagline: 'Where Strategy Meets Substance.',
    intro:
      'We do not write decks for a living. We diagnose before we prescribe, build alongside our clients, and stay until the work has taken root. Advisory is for leaders who want the answer to compound.',
    serviceTitle: 'Service areas',
    services: [
      { name: 'Strategy & growth',           line: 'Market entry, growth strategy, and the operating model to deliver it.' },
      { name: 'Organisation design',         line: 'Structure, leadership, and accountability built for the next stage, not the last one.' },
      { name: 'Operations & performance',    line: 'Lifting the line by working on the system, not just the symptoms.' },
      { name: 'Transformation',              line: 'Digital, AI, and process transformation that survives the consulting engagement.' },
      { name: 'Capital strategy',            line: 'Positioning the business — and the founders — for the kind of capital they actually need.' },
      { name: 'Executive advisory',          line: 'A trusted seat for founders and CEOs navigating consequential decisions.' },
    ],
    audience: {
      title: 'Who we work with',
      items: ['Founders scaling beyond product-market fit', 'Established operators in transition', 'Public institutions and development partners', 'Family offices and group structures'],
    },
  },
  {
    num: '03', id: 'exchange', eyebrow: 'Community', img: '/divisions/exchange.jpg',
    name: 'Divinus Exchange',
    tagline: 'Where Substance Meets Community.',
    intro:
      'Exchange is the consumer platform of the group — the place individuals meet Divinus directly. Two communities live here: Men of Substance and Genesis Woman. Both run to one standard.',
    serviceTitle: 'The platform',
    services: [
      { name: 'Men of Substance',     line: 'Leadership. Discipline. Brotherhood. Standard. The men’s community of the group.' },
      { name: 'Genesis Woman',        line: 'Purpose. Clarity. Excellence. Sisterhood. The women’s community of the group.' },
      { name: 'Member experience',    line: 'Programmes, retreats, mentorship, and access — designed to compound across a lifetime, not a quarter.' },
      { name: 'Cross-division access',line: 'Members get priority access to Divinus Capital’s financial education programmes.' },
    ],
  },
  {
    num: '04', id: 'labs', eyebrow: 'Products', img: '/divisions/labs.jpg',
    name: 'Divinus Labs',
    intro:
      'Labs builds software products and digital systems engineered for African markets — built to be owned, not rented; built to scale, not to demo.',
    serviceTitle: 'What we build',
    services: [
      { name: 'Consumer products',     line: 'Mobile-first products with a real claim on daily attention.' },
      { name: 'Operator platforms',    line: 'Internal systems for businesses that have outgrown spreadsheets and SaaS sprawl.' },
      { name: 'Marketplace & fintech', line: 'Trust-heavy platforms — payments, lending adjacents, marketplaces — built with the right architecture from day one.' },
      { name: 'AI-native applications',line: 'Products where AI is the substrate, not a bolt-on.' },
      { name: 'Productised partnerships', line: 'Long-horizon partnerships where Labs is the engineering partner, not a vendor.' },
    ],
    audience: {
      title: 'How we work',
      items: ['Senior teams, no juniors fronting partners', 'Outcomes-aligned engagements', 'IP clarity from day one', 'Operating with — not for — the client'],
    },
  },
  {
    num: '05', id: 'capital', eyebrow: 'Education', img: '/divisions/capital.jpg',
    name: 'Divinus Capital',
    tagline: 'Education Before Action.',
    intro:
      'This is not a signals group. It is a school. Divinus Capital is the group’s financial education division — the place individuals come to learn how capital actually works, with the discipline to use it.',
    serviceTitle: 'What we offer',
    services: [
      { name: 'Financial foundations',  line: 'The literacy that should have been taught in school — applied to the African saver and operator.' },
      { name: 'Markets education',      line: 'How markets work, how they are priced, and how to think in years rather than days.' },
      { name: 'Personal capital design',line: 'Building a deliberate financial life — savings, investing, debt, and time horizon.' },
      { name: 'Divinus Investments Club',line: 'A member community for graduates of the programmes — peer accountability and continued learning.' },
    ],
  },
  {
    num: '06', id: 'partners', eyebrow: 'Alliances', img: '/divisions/partners.jpg',
    name: 'Strategic Partners',
    tagline: 'One Group. One Standard.',
    intro:
      'The continent will not be built by any one institution. Strategic Partners is the division through which Divinus enters long-horizon partnerships with the organisations whose mandate aligns with ours.',
    serviceTitle: 'Types of partnership',
    services: [
      { name: 'Institutional alliances',     line: 'Banks, asset managers, and public institutions building African financial infrastructure.' },
      { name: 'Capability partnerships',     line: 'AI, technology, and research partners with whom we share teams and standards.' },
      { name: 'Distribution partnerships',   line: 'Reach partners — media, community, and content — for the consumer divisions.' },
      { name: 'Programme partnerships',      line: 'Co-designed programmes with universities, governments, and corporates.' },
      { name: 'Philanthropic partnerships',  line: 'Anchor partners of the Divinus Foundation.' },
    ],
    audience: {
      title: 'Why partner with Divinus',
      items: ['A single accountable counterparty across seven divisions', 'A standard we hold internally, not just for clients', 'Long horizon, low theatre', 'Built where the work is, not where the headquarters are'],
    },
  },
  {
    num: '07', id: 'foundation', eyebrow: 'Impact', img: '/divisions/foundation.jpg',
    name: 'The Divinus Foundation',
    intro:
      'The Foundation is where conviction meets contribution. It is the philanthropic arm of the group — funded by the group, operated independently, accountable to mission first.',
    serviceTitle: 'Focus areas',
    services: [
      { name: 'Education access',     line: 'Scholarships, programmes, and infrastructure that move ambitious young Africans further, faster.' },
      { name: 'Economic dignity',     line: 'Initiatives that protect economic dignity — entrepreneurship, employment, and resilience.' },
      { name: 'Health & wellbeing',   line: 'Targeted programmes in the communities Divinus operates in.' },
      { name: 'Continental leadership',line: 'Fellowships and convenings that develop the next generation of African leadership.' },
    ],
    audience: {
      title: 'How to support',
      items: ['Anchor programme partnerships', 'Cohort sponsorships', 'In-kind capability contributions', 'Corporate-foundation alignments'],
    },
  },
];

export default function DivisionsPage() {
  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER — full-bleed cinematic */}
      <section data-fx="gsap" data-section="div-header" data-above-fold className="group relative overflow-hidden min-h-[88vh] flex items-end" aria-labelledby="div-title">
        <Image
          src="/divisions/hero.jpg"
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
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">Divisions</p>
          <h1 id="div-title" className="mt-8 max-w-[18ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Seven divisions.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">One direction.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            One Group. Seven Divisions. One Direction. Each carries a single mandate.
            Together they form the infrastructure of growth Divinus exists to build.
          </p>
        </div>
      </section>

      {/* STICKY ANCHOR NAV */}
      <div className="sticky top-16 z-30 bg-neutral-950/85 backdrop-blur border-y border-neutral-800/70">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Divisions">
          <ul className="flex gap-x-7 overflow-x-auto whitespace-nowrap py-3.5 text-sm">
            {ANCHORS.map((a, i) => (
              <li key={a.id} className="flex items-center gap-x-7">
                <a href={`#${a.id}`} className="text-neutral-400 hover:text-neutral-50 transition">
                  <span className="text-neutral-600 font-mono text-xs mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {a.label}
                </a>
                {i < ANCHORS.length - 1 && <span className="text-neutral-700">·</span>}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* DIVISION SECTIONS */}
      {DIVISIONS.map((d) => (
        <section
          key={d.id}
          id={d.id}
          data-fx="gsap"
          data-section={d.id}
          className="scroll-mt-32 border-t border-neutral-800 py-24 sm:py-32"
          aria-labelledby={`${d.id}-title`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Capital disclaimer band — appears immediately at the top of /capital */}
            {d.id === 'capital' && (
              <aside className="mb-12 border border-amber-500/30 bg-amber-500/[0.04] px-6 py-5 rounded-md">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-amber-200/80 mb-2">
                  Important
                </p>
                <p className="text-base sm:text-sm leading-[1.65] text-amber-100/90 text-pretty">
                  Divinus Capital is a financial education division. We do not provide
                  regulated financial advice, manage client funds, or make investment recommendations.
                </p>
              </aside>
            )}

            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-stretch">
              <div className="group lg:col-span-5 flex flex-col justify-between gap-10">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
                    {d.num} / {d.eyebrow}
                  </p>
                  <h2 id={`${d.id}-title`} className="mt-6 text-[clamp(34px,4.6vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                    <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">{d.name}</span></span>
                  </h2>
                  {d.tagline && (
                    <p className="mt-6 text-lg sm:text-xl font-medium text-neutral-200 italic text-pretty">
                      {d.tagline}
                    </p>
                  )}
                </div>
                <div className="relative aspect-[4/3] w-full max-w-[88%] overflow-hidden rounded-md">
                  <Image
                    src={d.img}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="duotone object-cover"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-6 space-y-7">
                <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                  {d.intro}
                </p>

                <div className="pt-3">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-5">
                    {d.serviceTitle}
                  </p>
                  <ul className="border-t border-neutral-800">
                    {d.services.map((s) => (
                      <li key={s.name} className="grid grid-cols-12 gap-x-6 gap-y-2 py-5 border-b border-neutral-800">
                        <div className="col-span-12 sm:col-span-4">
                          <p className="text-base font-semibold text-neutral-100 tracking-tight">{s.name}</p>
                        </div>
                        <div className="col-span-12 sm:col-span-8">
                          <p className="text-base sm:text-sm leading-[1.65] text-neutral-400 text-pretty">{s.line}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {d.audience && (
                  <div className="pt-2">
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">
                      {d.audience.title}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {d.audience.items.map((it) => (
                        <li key={it} className="text-base sm:text-sm text-neutral-300 leading-[1.6] flex gap-3">
                          <span className="text-neutral-600 mt-0.5">→</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cross-link for Exchange → Communities */}
                {d.id === 'exchange' && (
                  <div className="pt-4">
                    <Link
                      href="/communities"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                    >
                      Visit Men of Substance and Genesis Woman →
                    </Link>
                  </div>
                )}

                {/* Capital footer repeats the disclaimer at the bottom of the section too */}
                {d.id === 'capital' && (
                  <p className="pt-6 text-xs leading-[1.65] text-neutral-500 italic">
                    Divinus Capital is a financial education division. We do not provide
                    regulated financial advice, manage client funds, or make investment recommendations.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="/divisions/hero.jpg"
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
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">One conversation.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">Seven possible doors.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Tell us which division fits — or let us help you find it.
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
