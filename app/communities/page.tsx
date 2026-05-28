import Link from 'next/link';
import Image from 'next/image';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';
import ShrinkOnScroll from '../components/ShrinkOnScroll';

export const metadata = {
  title: 'Communities — Divinus Exchange',
  description: 'Divinus Exchange — Where Substance Meets Community. Home of Men of Substance and Genesis Woman.',
};

type Community = {
  id: string;
  eyebrow: string;
  name: string;
  standFor: string;
  intro: string;
  pillars: { name: string; line: string }[];
  audience: string[];
  route: string;
  img: string;
};

const COMMUNITIES: Community[] = [
  {
    id: 'men-of-substance',
    eyebrow: '01 / For men',
    name: 'Men of Substance',
    standFor: 'Leadership. Discipline. Brotherhood. Standard.',
    intro:
      'A community for men who are building something serious — in business, in family, in self. Men of Substance is not a networking group with a different name. It is a standard, a brotherhood, and a system for staying on the line.',
    pillars: [
      { name: 'Leadership',              line: 'The character, judgement, and presence required to lead — at work, at home, in public.' },
      { name: 'Financial Intelligence',  line: 'How to earn, hold, deploy, and protect capital with the discipline the next decade will demand.' },
      { name: 'Brotherhood & Network',   line: 'A circle of men who hold the same standard and refuse to let one another drift.' },
      { name: 'Personal Standard',       line: 'Discipline, health, faith, ambition — the work no one else can do for you.' },
    ],
    audience: [
      'Founders and operators in the building years',
      'Senior professionals stepping into greater responsibility',
      'Men committed to leading a family and a public life',
      'Men who would rather sharpen than perform',
    ],
    route: '/contact?route=men-of-substance',
    img: '/communities/men-of-substance.jpg',
  },
  {
    id: 'genesis-woman',
    eyebrow: '02 / For women',
    name: 'Genesis Woman',
    standFor: 'Purpose. Clarity. Excellence. Sisterhood.',
    intro:
      'Genesis Woman is for women who refuse the binary between ambition and depth. It is a community of professional and personal excellence — where purpose is named, clarity is built, and sisterhood is the structure that holds the work in place.',
    pillars: [
      { name: 'Professional & Business Growth', line: 'Career trajectory, business building, and operator skill — taught seriously, applied immediately.' },
      { name: 'Financial Empowerment',          line: 'Independent financial intelligence — earning, saving, investing, and protecting on your own terms.' },
      { name: 'Leadership & Influence',         line: 'Voice, executive presence, and the architecture of public-facing leadership.' },
      { name: 'Sisterhood & Network',           line: 'A sustained, accountable community — peers, mentors, and the next generation of women coming behind.' },
    ],
    audience: [
      'Founders and senior operators',
      'Professionals building toward leadership roles',
      'Women navigating consequential transitions',
      'Women who want a circle, not an audience',
    ],
    route: '/contact?route=genesis-woman',
    img: '/communities/genesis-woman.jpg',
  },
];

const MEMBER_EXPERIENCE = [
  { title: 'Programmes',             body: 'Structured cohort programmes built around the four pillars of each community — leadership, financial intelligence, brotherhood/sisterhood, and personal standard.', icon: 'fa-solid fa-list-check' },
  { title: 'Convenings',             body: 'In-person retreats, dinners, and forums where the work happens face-to-face and the relationships compound.',                                            icon: 'fa-solid fa-users' },
  { title: 'Mentorship',             body: 'Curated access to operators, leaders, and elders — not as panellists, but as relationships you can return to.',                                        icon: 'fa-solid fa-user-graduate' },
  { title: 'Capital education',      body: 'Priority access to Divinus Capital programmes — markets, personal finance, and capital design.',                                                       icon: 'fa-solid fa-chart-line' },
  { title: 'Cross-community access', body: 'Members of one community meet the other inside Divinus Exchange — partners, peers, and counterparts in the work of building.',                         icon: 'fa-solid fa-people-arrows' },
  { title: 'Continuity',             body: 'Membership is built to last decades, not seasons. The standard does not graduate.',                                                                    icon: 'fa-solid fa-infinity' },
];

export default function CommunitiesPage() {
  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER — full-bleed cinematic */}
      <section data-fx="gsap" data-section="comm-header" data-above-fold className="group relative overflow-hidden min-h-[88vh] flex items-end" aria-labelledby="comm-title">
        <Image
          src="/communities/hero.jpg"
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
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">Communities · Divinus Exchange</p>
          <h1 id="comm-title" className="mt-8 max-w-[18ch] text-[clamp(44px,7vw,108px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Where substance</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">meets community.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            Divinus Exchange is the consumer platform of the group — the place
            individuals meet Divinus directly. Two communities live here, distinct
            in voice and united in standard.
          </p>
        </div>
      </section>

      {/* PLATFORM OVERVIEW — wide image header, contracts on scroll */}
      <section data-fx="gsap" data-section="platform" className="border-t border-neutral-800 py-20 sm:py-28" aria-labelledby="platform-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ShrinkOnScroll className="group relative aspect-[21/8] overflow-hidden">
            <Image
              src="/divisions/exchange.jpg"
              alt="The Exchange"
              fill
              sizes="100vw"
              className="duotone object-cover"
            />
          </ShrinkOnScroll>
          <div className="mt-14 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The platform</p>
              <h2 id="platform-title" className="mt-6 text-[clamp(30px,4.4vw,56px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Two communities.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">One standard.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                Exchange exists because community, done seriously, is a form of
                infrastructure. The conversations that move careers, families, and
                capital happen between trusted people — not on feeds.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                Men of Substance and Genesis Woman are not parallel attempts to be
                the same thing for different audiences. Each is shaped by what its
                members actually need. What they share is the line: premium,
                purposeful, precise, never performative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTIONS */}
      {COMMUNITIES.map((c) => (
        <section
          key={c.id}
          id={c.id}
          data-fx="gsap"
          data-section={c.id}
          className="scroll-mt-32 border-t border-neutral-800 py-24 sm:py-32"
          aria-labelledby={`${c.id}-title`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="group relative aspect-[16/8] overflow-hidden rounded-md mb-14 sm:mb-16">
              <Image
                src={c.img}
                alt={c.name}
                fill
                sizes="100vw"
                className="duotone object-cover"
              />
            </div>
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">{c.eyebrow}</p>
                <h2 id={`${c.id}-title`} className="mt-6 text-[clamp(36px,5vw,72px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                  <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">{c.name}</span></span>
                </h2>
                <p className="mt-7 text-lg sm:text-xl font-medium text-neutral-200 italic text-pretty">
                  {c.standFor}
                </p>
                <p className="mt-7 text-lg leading-[1.65] text-neutral-400 text-pretty max-w-md">
                  {c.intro}
                </p>

                <Link
                  href={c.route}
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Apply to {c.name}
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              </div>

              <div className="lg:col-span-7 lg:pl-6 space-y-10">
                {/* Pillars */}
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-5">
                    The four pillars
                  </p>
                  <ul className="border-t border-neutral-800">
                    {c.pillars.map((p, i) => (
                      <li key={p.name} className="grid grid-cols-12 gap-x-6 gap-y-2 py-6 border-b border-neutral-800">
                        <div className="col-span-12 sm:col-span-4 flex items-start gap-3">
                          <span className="text-xs font-mono text-neutral-600 mt-1">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-base font-semibold text-neutral-100 tracking-tight">{p.name}</p>
                        </div>
                        <div className="col-span-12 sm:col-span-8">
                          <p className="text-base sm:text-sm leading-[1.7] text-neutral-400 text-pretty">{p.line}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who it's for */}
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">
                    Who it’s for
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {c.audience.map((a) => (
                      <li key={a} className="flex gap-3 text-base sm:text-sm leading-[1.6] text-neutral-300">
                        <span className="text-neutral-600 mt-0.5">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MEMBER EXPERIENCE */}
      <section data-fx="gsap" data-section="experience" className="border-t border-neutral-800 bg-neutral-900/40 py-24 sm:py-32" aria-labelledby="exp-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 mb-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Member experience</p>
              <h2 id="exp-title" className="mt-6 text-[clamp(30px,4.4vw,56px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">What members</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">actually do.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 lg:pt-2">
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                The same architecture runs through both communities. The voice
                changes; the standard does not.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {MEMBER_EXPERIENCE.map((m, i) => (
              <article key={m.title} className="group relative bg-neutral-950 p-8 sm:p-10 min-h-[300px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <i className={`${m.icon} text-3xl text-neutral-400`} aria-hidden="true" />
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-50">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-sm leading-[1.7] text-neutral-300 text-pretty">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINK TO CAPITAL */}
      <section data-fx="gsap" data-section="capital-bridge" className="py-20 sm:py-28" aria-labelledby="capital-link">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end pt-4">
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">A bridge to Capital</p>
              <h2 id="capital-link" className="mt-6 text-[clamp(28px,4vw,48px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Members get priority access</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">to Divinus Capital’s financial education programmes.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-6">
              <p className="text-base leading-[1.65] text-neutral-400 text-pretty">
                This is not a signals group. It is a school. Members move through the
                Capital programmes alongside their community cohort.
              </p>
              <Link
                href="/divisions#capital"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
              >
                Read about Divinus Capital →
              </Link>
              <p className="mt-6 text-xs leading-[1.65] text-neutral-500 italic max-w-md">
                Divinus Capital is a financial education division. We do not provide
                regulated financial advice, manage client funds, or make investment recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="group bg-black text-neutral-50 border-t border-neutral-900" aria-labelledby="cta-title">
        <Image
          src="/communities/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="duotone object-cover object-top opacity-55"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/55" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-44">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Apply</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-semibold sm:font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Choose your</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">community.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Both communities run by application. Tell us which standard you are coming to meet.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/contact?route=men-of-substance"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Men of Substance
                </Link>
                <Link
                  href="/contact?route=genesis-woman"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-transparent px-5 py-3 text-sm font-semibold text-neutral-100 hover:bg-neutral-900 transition"
                >
                  Genesis Woman
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
