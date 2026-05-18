export type Category = 'Capital' | 'Strategy' | 'AI' | 'Communities' | 'Foundation';

export type Section =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'pull'; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;          // ISO yyyy-mm-dd
  displayDate: string;
  readMins: number;
  author: string;
  authorRole: string;
  img: string;
  body: Section[];
};

export const CATEGORIES: Category[] = ['Capital', 'Strategy', 'AI', 'Communities', 'Foundation'];

export const POSTS: Post[] = [
  {
    slug: 'education-before-action',
    title: 'Education before action: why we built Capital as a school, not a signals group.',
    excerpt:
      'Most retail capital is destroyed by people who acted before they understood. The Divinus Capital position — and why the disclaimer matters.',
    category: 'Capital',
    date: '2026-05-02',
    displayDate: '02 May 2026',
    readMins: 8,
    author: 'Divinus Capital',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-capital/1600/1000',
    body: [
      { kind: 'p', text: 'Most retail capital is destroyed by people who acted before they understood. The instinct is to look for a tip, a signal, a hot pick — anything that promises to skip the work of becoming someone who can hold capital responsibly. The market is happy to take that money. It always has been.' },
      { kind: 'p', text: 'Divinus Capital is built on the opposite premise. We are not a signals group. We do not run a portfolio for members. We are a school.' },
      { kind: 'h2', text: 'What the school teaches' },
      { kind: 'p', text: 'Three things, in sequence. First, foundations: what money is, how markets price risk, what the major asset classes actually do, and why most of the advice in a member’s newsfeed is downstream of someone else’s incentive. Second, application: how a serious person designs their own capital — earning, saving, deploying, protecting — across a lifetime, not a quarter. Third, discipline: the operating habits that turn knowledge into outcomes when fear and greed both want a different decision.' },
      { kind: 'pull', text: 'Education before action. The discipline lasts longer than any single trade.' },
      { kind: 'h2', text: 'Why the disclaimer is non-negotiable' },
      { kind: 'p', text: 'Wherever Capital appears on this site, we run the same sentence: "Divinus Capital is a financial education division. We do not provide regulated financial advice, manage client funds, or make investment recommendations." That is not a legal afterthought. It is the position itself. The day we let the line blur is the day the school stops working.' },
      { kind: 'p', text: 'If you came looking for someone to trade for you, this division will disappoint you. If you came to become the person who can — patiently, and with your eyes open — you are in the right room.' },
    ],
  },
  {
    slug: 'one-group-seven-divisions',
    title: 'One group, seven divisions: how the architecture compounds.',
    excerpt:
      'Why a multi-division group is the right shape for the work — and what each division gives the others.',
    category: 'Strategy',
    date: '2026-04-18',
    displayDate: '18 Apr 2026',
    readMins: 6,
    author: 'Divinus Advisory',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-architecture/1600/1000',
    body: [
      { kind: 'p', text: 'A pure consultancy ages out. A pure capital business runs out of imagination. A pure community runs out of substance. Each one alone is a partial answer to a question the continent is asking in full.' },
      { kind: 'p', text: 'Divinus is structured as one group with seven divisions because the divisions feed each other. The Advisory work surfaces problems that Labs builds for. Labs ships products that Capital members learn to evaluate. Capital members fill the rooms Exchange convenes. Exchange relationships compound into Partners. Partners open doors Foundation walks through. AI sits across all of it as the capability layer the next decade will run on.' },
      { kind: 'h2', text: 'Compounding, not bundling' },
      { kind: 'p', text: 'Bundling is when you offer five things and call them a suite. Compounding is when the output of one division is the input of another, on a real time scale. The first is a brochure. The second is a business.' },
      { kind: 'pull', text: 'One Group. Seven Divisions. One Direction.' },
      { kind: 'h2', text: 'What it asks of the team' },
      { kind: 'p', text: 'A multi-division group is unforgiving of slack. Each division has to be a serious business in its own right or it becomes a tax on the others. The bar inside Divinus is the bar each division would have to clear if it were operating alone.' },
    ],
  },
  {
    slug: 'vision-africa-applied-ai',
    title: 'Vision Africa: applied AI, not imported AI.',
    excerpt:
      'Building AI capability for institutions and governments on the continent — what works, what doesn’t, and what we’re betting on.',
    category: 'AI',
    date: '2026-04-04',
    displayDate: '04 Apr 2026',
    readMins: 9,
    author: 'Divinus AI',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-ai/1600/1000',
    body: [
      { kind: 'p', text: 'There is a version of "AI for Africa" that is mostly imported demos with the country name swapped in. It does not change much, and it does not last. The version we are building is different. It starts from the actual workflows of African institutions and works backwards to the model.' },
      { kind: 'h2', text: 'Applied, not imported' },
      { kind: 'p', text: 'Applied means three things. It means the problem is real — sourced from inside a ministry, a bank, a hospital, an operator — not invented to fit a model. It means the engineering can run in the constraints of the place: intermittent connectivity, lean teams, regulated data. And it means the institution keeps the capability after the project ends.' },
      { kind: 'pull', text: 'Capability that does not leave when the consultants do.' },
      { kind: 'h2', text: 'Where we are betting' },
      { kind: 'p', text: 'Three areas, in order of conviction. Operator copilots inside large institutions where most of the value of AI is captured by the front-line user, not the headline product. Data platforms that make the institution\'s own data legible to its own people before any model touches it. And local-language capability — because the continent does not run in English alone, and pretending otherwise is the surest way to keep AI value off-shore.' },
    ],
  },
  {
    slug: 'standard-not-network',
    title: 'A standard, not a network: what Men of Substance is actually for.',
    excerpt:
      'Networking groups are everywhere. A standard is rare. The brief difference — and what membership really demands.',
    category: 'Communities',
    date: '2026-03-21',
    displayDate: '21 Mar 2026',
    readMins: 5,
    author: 'Divinus Exchange',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-mos/1600/1000',
    body: [
      { kind: 'p', text: 'There is no shortage of networking groups for men. There is a shortage of standards. Men of Substance is the second thing, not the first.' },
      { kind: 'p', text: 'A network optimises for proximity to power. A standard optimises for the character that justifies it. The first answers the question "who do you know?". The second answers a harder one: "what are you in the room for?".' },
      { kind: 'h2', text: 'The four pillars' },
      { kind: 'p', text: 'Leadership. Discipline. Brotherhood. Standard. The pillars are not a slogan. They are the actual demands of membership — the things we expect a man to bring to the room and the things the room exists to sharpen.' },
      { kind: 'pull', text: 'A circle of men who hold the same standard and refuse to let one another drift.' },
      { kind: 'h2', text: 'What membership demands' },
      { kind: 'p', text: 'Show up. Tell the truth. Bring your best work and your worst questions. Refuse the performance that the rest of public life rewards. If that sounds easy in writing, it is not easy in practice. That is the point.' },
    ],
  },
  {
    slug: 'genesis-clarity-over-volume',
    title: 'Genesis: clarity over volume.',
    excerpt:
      'Why the Genesis Woman membership is deliberately small, deliberately demanding, and built to last decades.',
    category: 'Communities',
    date: '2026-03-08',
    displayDate: '08 Mar 2026',
    readMins: 4,
    author: 'Divinus Exchange',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-genesis/1600/1000',
    body: [
      { kind: 'p', text: 'There are many places online where a woman can be told she is enough. Genesis Woman is for the women who already know that — and now want a circle, not an audience.' },
      { kind: 'h2', text: 'Clarity, not volume' },
      { kind: 'p', text: 'The community is deliberately small. The work is deliberately demanding. The point is not to grow a membership number; the point is to build a circle of women whose lives compound over decades because they sharpened each other on the way through.' },
      { kind: 'pull', text: 'Purpose. Clarity. Excellence. Sisterhood.' },
      { kind: 'p', text: 'If you are looking for a feed, this is not it. If you are looking for a structure that holds the work in place, you are in the right room.' },
    ],
  },
  {
    slug: 'foundation-conviction-contribution',
    title: 'Where conviction meets contribution.',
    excerpt:
      'The case for a foundation arm inside an operating group — and the four mandates we’ll be backing first.',
    category: 'Foundation',
    date: '2026-02-22',
    displayDate: '22 Feb 2026',
    readMins: 6,
    author: 'The Divinus Foundation',
    authorRole: 'Division team',
    img: 'https://picsum.photos/seed/divinus-blog-foundation/1600/1000',
    body: [
      { kind: 'p', text: 'A foundation that lives outside the operating group it belongs to is a press release. A foundation that lives inside one inherits its operating discipline. We chose the second shape on purpose.' },
      { kind: 'h2', text: 'Four mandates' },
      { kind: 'p', text: 'Education. Economic dignity. Health. Continental leadership. The Foundation is not trying to do everything; it is trying to back the kinds of work that compound when the continent does. Each mandate is held to the same standard the rest of the group is held to — long-horizon, structured, measurable, accountable.' },
      { kind: 'pull', text: 'Where conviction meets contribution.' },
      { kind: 'h2', text: 'Why the Foundation matters to the Group' },
      { kind: 'p', text: 'A group company without a public-good arm slowly drifts into being only what its clients pay for. The Foundation is the part of Divinus that refuses that drift — and the part the rest of the divisions are accountable to.' },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug);
}
