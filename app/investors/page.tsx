import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'Investors — Divinus Investment Group',
  description:
    'Divinus Investment Group · Capital Raise 2026. Early, validated, building — the infrastructure that converts African human potential into commercial and social outcomes at scale.',
};

const TRACTION = [
  { value: '57',    label: 'Clients served',     desc: 'Individuals and organisations through AI augmentation and capital-markets training programmes.' },
  { value: '800',   label: 'Community members',  desc: 'Active members across Men of Substance and Genesis Woman — ahead of the full platform launch.' },
  { value: '$110K', label: 'Revenue generated',  desc: 'Early revenue from Advisory, AI services, and training — generated prior to product launches.' },
  { value: '1,300', label: 'Waitlist',           desc: 'Pre-registered demand for Divinus Capital and Divinus Exchange ahead of the Q3 2026 launch.' },
];

type Stream = {
  num: string;
  name: string;
  body: string;
  status: { label: string; active: boolean };
};

const STREAMS: Stream[] = [
  {
    num: '01',
    name: 'Training & Coaching',
    body: 'Financial education programmes, AI augmentation training, and executive coaching delivered through Divinus Capital and Divinus Advisory. Recurring cohort-based revenue with a 1,300-person waitlist already validated.',
    status: { label: 'Active', active: true },
  },
  {
    num: '02',
    name: 'XA Trading Engine',
    body: 'A proprietary trading infrastructure platform connecting traders, brokers, agencies, and service providers. Revenue generated on trading lots — a volume-based model that scales with the network. Launching via strategic partnership.',
    status: { label: 'Launching Q3 2026', active: false },
  },
  {
    num: '03',
    name: 'SaaS Applications',
    body: 'Consumer and B2B software products built by Divinus Labs — including social AI applications and productivity tools engineered for African markets. Subscription-based recurring revenue. IP owned by Divinus.',
    status: { label: 'Launching Q4 2026', active: false },
  },
  {
    num: '04',
    name: 'Community Marketplace',
    body: 'A vetted e-commerce platform within the Men of Substance and Genesis Woman communities — a curated African marketplace where trusted providers carry the Divinus mark. Platform fees and partner revenue from day one of launch.',
    status: { label: 'In Development', active: false },
  },
];

const USE_OF_FUNDS = [
  { label: 'Technology infrastructure', value: 'XA Engine + core platform' },
  { label: 'Product development',       value: 'Labs applications & SaaS' },
  { label: 'Market activation',         value: 'Capital + Exchange launch' },
  { label: 'Operational scale',         value: 'Team + infrastructure' },
];

const ROADMAP = [
  { period: 'Now · Active', title: 'AI & Advisory live',         desc: 'Divinus AI and Divinus Advisory operational. 57 clients served. $110K revenue. Foundation established.', filled: true },
  { period: 'Q3 2026',      title: 'XA Engine + Capital launch', desc: 'XA trading engine launches via strategic partnership. Divinus Capital financial-education programme opens to the 1,300-person waitlist.', filled: false },
  { period: 'Q4 2026',      title: 'Labs + Exchange platform',   desc: 'Divinus Labs SaaS applications go to market. Men of Substance and Genesis Woman community platforms launch with marketplace.', filled: false },
  { period: 'Q2 2027',      title: 'Foundation + full architecture', desc: 'The Divinus Foundation launches. All seven divisions operational. The group enters its scale phase across African markets.', filled: false },
];

const WHY_NOW = [
  { numeral: 'I.',   title: 'Demand is already proven',     body: '$110K in revenue, 800 community members, and 1,300 on a waitlist — all generated before a single product launch. The market is not a hypothesis. It is confirmed and waiting.' },
  { numeral: 'II.',  title: 'The infrastructure gap is real', body: 'Africa’s human-capital development infrastructure is fragmented, imported, and underbuilt. Divinus is building natively — with African data, African constraints, and African ambition.' },
  { numeral: 'III.', title: 'The architecture compounds',   body: 'Seven divisions that reinforce each other — training feeds the community, the community feeds the marketplace, the marketplace feeds the platform, the platform feeds the data. Each investment pays dividends across all seven.' },
];

function StatusPill({ status }: { status: { label: string; active: boolean } }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] ${
        status.active ? 'border-[#C9A84C]/40 text-[#C9A84C]' : 'border-neutral-700 text-neutral-400'
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          status.active ? 'bg-[#C9A84C]' : 'border border-neutral-500 bg-transparent'
        }`}
      />
      {status.label}
    </span>
  );
}

export default function InvestorsPage() {
  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER — full-bleed cinematic */}
      <section data-fx="gsap" data-section="inv-header" data-above-fold className="group relative overflow-hidden min-h-[88vh] flex items-end" aria-labelledby="inv-title">
        <Image
          src="/divisions/capital.jpg"
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
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Investor Relations · Capital Raise 2026</p>
          <h1 id="inv-title" className="mt-8 max-w-[16ch] text-[clamp(44px,7vw,108px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Investing in the highest-yield</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">asset on the continent.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            Africa’s greatest resource is its people. Divinus is building the
            infrastructure to convert that potential into commercial and social
            outcomes — at scale.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/documents/investment-brief.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition">
              View the investment brief <span aria-hidden="true">→</span>
            </a>
            <a href="#opportunity" className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition">
              Read the opportunity →
            </a>
          </div>
          <p className="mt-5 text-sm text-neutral-500">
            Prefer the short version?{' '}
            <a href="/documents/group-overview.html" target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline decoration-neutral-700 underline-offset-[5px] hover:decoration-neutral-50 hover:text-neutral-50 transition">
              Download the one-page group overview
            </a>.
          </p>
        </div>
      </section>

      {/* TRACTION */}
      <section data-fx="gsap" data-section="inv-traction" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="traction-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Where we stand today</p>
          <h2 id="traction-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Early. Validated. Building.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {TRACTION.map((t) => (
              <div key={t.label} className="bg-neutral-950 p-8 sm:p-10">
                <p className="text-[clamp(44px,5vw,72px)] font-semibold display-tight leading-none text-[#C9A84C]">{t.value}</p>
                <p className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">{t.label}</p>
                <p className="mt-3 text-sm leading-[1.6] text-neutral-500 text-pretty">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section data-fx="gsap" data-section="inv-opportunity" id="opportunity" className="scroll-mt-24 border-t border-neutral-800 bg-neutral-900/40 py-24 sm:py-32" aria-labelledby="opp-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">The opportunity</p>
          <h2 id="opp-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">The infrastructure Africa is missing.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid lg:grid-cols-2 gap-x-12 gap-y-12">
            <div>
              <div className="space-y-6 text-[16px] sm:text-lg leading-[1.8] text-neutral-300 text-pretty">
                <p>
                  Africa is not short on talent, ambition, or opportunity. It is short
                  on the infrastructure that converts human potential into economic
                  outcomes — the kind that compounds, the kind that survives a generation.
                </p>
                <p>
                  The continent’s <strong className="font-medium text-neutral-100">1.4 billion people</strong> represent
                  the world’s youngest and fastest-growing population. Yet the systems
                  that should develop, connect, and financially equip them — education,
                  capital-markets access, technology platforms, and community
                  infrastructure — remain fragmented, imported, or absent.
                </p>
                <p>
                  Divinus exists to build that infrastructure. Not as a fund, not as a
                  consultancy, not as a community app — but as a{' '}
                  <strong className="font-medium text-neutral-100">single integrated architecture</strong> that ties
                  capital, intelligence, and community into one system. Seven divisions.
                  One standard. One direction.
                </p>
              </div>

              <figure className="mt-10 border-l-2 border-[#C9A84C] pl-6 sm:pl-8">
                <blockquote>
                  <p className="text-[clamp(22px,2.6vw,32px)] font-semibold display-tight leading-[1.25] text-neutral-50 text-balance">
                    The elevation of the African individual is the highest-yield investment on the continent.
                  </p>
                </blockquote>
              </figure>
            </div>

            <div className="space-y-6 text-[16px] sm:text-lg leading-[1.8] text-neutral-300 text-pretty lg:pt-1">
              <p>
                <strong className="font-medium text-neutral-100">What we have built so far</strong> is proof of demand.
                $110K in revenue with no product launches. 800 community members before a
                platform exists. 1,300 people on a waitlist. 57 clients served through
                advisory and training alone.
              </p>
              <p>
                The capital raise is not a bet on an idea. It is the fuel that takes a
                validated thesis and builds the technology infrastructure to deliver it at
                scale — the XA trading engine, the consumer applications, the community
                marketplace, and the AI systems that run beneath all of it.
              </p>
              <p>
                We are raising <strong className="font-medium text-neutral-100">$2,000,000 USD</strong> to build what the
                traction has already proven people want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVENUE STREAMS */}
      <section data-fx="gsap" data-section="inv-revenue" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="rev-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Business model</p>
          <h2 id="rev-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Four revenue streams. One architecture.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
            {STREAMS.map((s) => (
              <article key={s.num} className="bg-neutral-950 p-8 sm:p-10">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">{s.num} / Revenue</p>
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{s.name}</h3>
                <p className="mt-4 text-base leading-[1.7] text-neutral-400 text-pretty">{s.body}</p>
                <div className="mt-6"><StatusPill status={s.status} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE ASK */}
      <section data-fx="gsap" data-section="inv-ask" className="border-t border-neutral-800 bg-neutral-900/40 py-24 sm:py-32" aria-labelledby="ask-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">The raise</p>
          <h2 id="ask-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">A clear ask. A clear plan.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid lg:grid-cols-2 gap-x-12 gap-y-12 items-start">
            <div>
              <p className="text-[clamp(64px,8vw,104px)] font-semibold display-tight leading-none text-[#C9A84C]">$2M</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500">USD · Seed round · 2026</p>

              <dl className="mt-10 border-t border-neutral-800">
                {USE_OF_FUNDS.map((u) => (
                  <div key={u.label} className="flex items-center justify-between gap-6 border-b border-neutral-800 py-5">
                    <dt className="text-sm text-neutral-400">{u.label}</dt>
                    <dd className="text-right text-base sm:text-lg font-medium text-neutral-100 tracking-tight">{u.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-6 text-[16px] sm:text-lg leading-[1.8] text-neutral-300 text-pretty">
              <p>
                The $2,000,000 raise funds the technology that turns a validated thesis
                into a scalable business. The infrastructure — the XA trading engine, the
                consumer applications, the community marketplace platform, and the AI
                systems underlying all of it — requires a single, focused build phase.
              </p>
              <p>
                The traction already on the board — $110K in revenue, 800 community
                members, 1,300 on waitlist — was generated with no dedicated technology
                investment. This raise changes that equation entirely.
              </p>
              <p>
                We are seeking investors who understand the African opportunity, take a
                long-horizon view, and want a single accountable counterparty across a
                multi-division architecture that is built to compound.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a href="/documents/investment-brief.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition">
                  Read the full brief <span aria-hidden="true">→</span>
                </a>
                <Link href="/contact" className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition">
                  Talk to the founders →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section data-fx="gsap" data-section="inv-roadmap" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="road-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Execution roadmap</p>
          <h2 id="road-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">What happens next.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {ROADMAP.map((r) => (
              <div key={r.period} className="relative bg-neutral-950 p-8 sm:p-10">
                <span
                  aria-hidden="true"
                  className={`block h-3 w-3 rounded-full border-2 border-[#C9A84C] ${r.filled ? 'bg-[#C9A84C]' : 'bg-neutral-950'}`}
                />
                <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[#C9A84C]">{r.period}</p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-neutral-50 leading-[1.2]">{r.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-neutral-500 text-pretty">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section data-fx="gsap" data-section="inv-why" className="border-t border-neutral-800 bg-neutral-900/40 py-24 sm:py-32" aria-labelledby="why-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C9A84C]">Why Divinus. Why now.</p>
          <h2 id="why-title" className="mt-6 max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance leading-[1.05]">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Three reasons this is the moment.</span></span>
          </h2>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {WHY_NOW.map((w) => (
              <div key={w.numeral} className="bg-neutral-950 p-8 sm:p-10">
                <p className="text-4xl font-semibold display-tight leading-none text-[#C9A84C]">{w.numeral}</p>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-neutral-50">{w.title}</h3>
                <p className="mt-4 text-base leading-[1.7] text-neutral-400 text-pretty">{w.body}</p>
              </div>
            ))}
          </div>

          {/* Mandatory Capital disclaimer */}
          <p className="mt-12 max-w-3xl text-xs leading-[1.7] text-neutral-500 italic">
            Divinus Capital is a financial education division. We do not provide regulated
            financial advice, manage client funds, or make investment recommendations. This
            page does not constitute regulated financial advice or a public offer of securities.
          </p>
        </div>
      </section>

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
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
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">If this matches your horizon</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Let’s talk.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                We are seeking capital partners who understand that the most valuable
                investment in Africa is the African individual. The brief is available on request.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Request the investment brief
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                >
                  Read about the Group →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
