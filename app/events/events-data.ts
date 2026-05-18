export type EventType = 'Forum' | 'Retreat' | 'Dinner' | 'Programme' | 'Open House';

export type EventItem = {
  id: string;
  date: string;            // ISO yyyy-mm-dd
  displayDate: string;
  title: string;
  type: EventType;
  location: string;
  blurb: string;
  ctaLabel: string;
  ctaHref: string;
  img: string;
  status: 'upcoming' | 'past';
  // Detail-page fields
  longBlurb: string[];     // paragraphs
  format: string;          // e.g. "Full day, in-person"
  capacity: string;        // e.g. "By application · 40 seats"
  hosts: { name: string; role: string }[];
  agenda: { time: string; item: string; detail?: string }[];
  expect: string[];        // bullets
};

export const EVENTS: EventItem[] = [
  {
    id: 'mos-leadership-forum-2026',
    date: '2026-06-14',
    displayDate: 'Sat · 14 Jun 2026',
    title: 'Men of Substance · Leadership Forum',
    type: 'Forum',
    location: 'In-person · Africa region',
    blurb:
      'A full-day forum on leadership under pressure — character, judgement, and presence for the men leading at work, at home, and in public.',
    ctaLabel: 'Request invite',
    ctaHref: '/contact?route=men-of-substance',
    img: 'https://picsum.photos/seed/divinus-event-mos-forum/1200/800',
    status: 'upcoming',
    longBlurb: [
      'The Leadership Forum is the flagship convening of Men of Substance — a single, deliberate day spent on the work of leading under real pressure. No keynotes for the sake of keynotes. No panels of the same five faces. A working room.',
      'Participants come from the founding cohort and a small invited group. The conversations stay in the room; the work leaves with the men.',
    ],
    format: 'Full day · in-person · closed',
    capacity: 'By application · ~50 seats',
    hosts: [
      { name: 'Men of Substance', role: 'Convening team' },
      { name: 'Invited operators', role: 'Speakers and discussants' },
    ],
    agenda: [
      { time: '08:30', item: 'Arrival and breakfast', detail: 'Quiet start. Briefing pack on the table.' },
      { time: '09:30', item: 'Opening: what we are here to do', detail: 'The standard, restated. The day, framed.' },
      { time: '10:30', item: 'Session 1 — Character under pressure', detail: 'How serious men hold the line when it costs them.' },
      { time: '12:30', item: 'Lunch · structured conversation' },
      { time: '14:00', item: 'Session 2 — Judgement and decision under uncertainty' },
      { time: '15:30', item: 'Session 3 — Presence: at work, at home, in public' },
      { time: '17:30', item: 'Close · commitments out loud' },
      { time: '19:00', item: 'Dinner · for those staying' },
    ],
    expect: [
      'Working sessions, not keynotes',
      'A circle of operators who will be in the room with you for years',
      'Pre-read sent two weeks before',
      'Chatham House throughout',
    ],
  },
  {
    id: 'capital-foundations-cohort-4',
    date: '2026-07-08',
    displayDate: 'Mon · 08 Jul 2026',
    title: 'Capital Foundations · Cohort 4',
    type: 'Programme',
    location: 'Online · 8 weeks',
    blurb:
      'The flagship cohort for Divinus Capital — markets, foundations, and personal capital design. Education before action.',
    ctaLabel: 'Apply',
    ctaHref: '/contact?route=capital',
    img: 'https://picsum.photos/seed/divinus-event-capital-cohort/1200/800',
    status: 'upcoming',
    longBlurb: [
      'Capital Foundations is the entry programme into Divinus Capital. It is a structured, eight-week cohort that takes serious people from "I want to understand markets" to "I can design my own capital with discipline".',
      'It is taught as a school. It is not a signals service. The disclaimer holds throughout: Divinus Capital is a financial education division. We do not provide regulated financial advice, manage client funds, or make investment recommendations.',
    ],
    format: '8 weeks · online · live + recorded',
    capacity: 'By application · 80 seats',
    hosts: [
      { name: 'Divinus Capital', role: 'Faculty' },
      { name: 'Guest practitioners', role: 'Weekly case sessions' },
    ],
    agenda: [
      { time: 'Week 1', item: 'Foundations of money and markets' },
      { time: 'Week 2', item: 'Asset classes and how they actually behave' },
      { time: 'Week 3', item: 'Risk, return, and the maths that matters' },
      { time: 'Week 4', item: 'Personal capital design' },
      { time: 'Week 5', item: 'Building positions with discipline' },
      { time: 'Week 6', item: 'Protecting capital across cycles' },
      { time: 'Week 7', item: 'Designing your own playbook' },
      { time: 'Week 8', item: 'Final review · commitments · next steps' },
    ],
    expect: [
      'Two live sessions per week · all recorded',
      'A written workbook, not slides',
      'Weekly office hours with faculty',
      'A peer cohort that holds the standard',
    ],
  },
  {
    id: 'genesis-retreat-2026',
    date: '2026-09-05',
    displayDate: 'Sep 2026',
    title: 'Genesis Woman · Annual Retreat',
    type: 'Retreat',
    location: 'In-person · Location on application',
    blurb:
      'Three days of purpose, clarity, and excellence — closed retreat for the Genesis Woman membership and a small invited cohort.',
    ctaLabel: 'Request invite',
    ctaHref: '/contact?route=genesis-woman',
    img: 'https://picsum.photos/seed/divinus-event-gw-retreat/1200/800',
    status: 'upcoming',
    longBlurb: [
      'The annual retreat is the deepest convening on the Genesis calendar. Three days, closed setting, off the record. The work moves from the digital cadence of the community to the slower pace of being together in a room.',
      'It is a circle, not an audience. The faces in the room are the faces you will continue working with throughout the year.',
    ],
    format: 'Three days · in-person · residential',
    capacity: 'By application · ~40 seats',
    hosts: [
      { name: 'Genesis Woman', role: 'Convening team' },
      { name: 'Invited mentors', role: 'Sessions and discussions' },
    ],
    agenda: [
      { time: 'Day 1', item: 'Arrival · framing · opening dinner' },
      { time: 'Day 2', item: 'Working sessions on purpose, leadership, and capital' },
      { time: 'Day 3', item: 'Commitments · close · onward plan' },
    ],
    expect: [
      'No press, no recordings',
      'Pre-read sent four weeks before',
      'Designed for women already in the building years',
      'Continuity into the community for the year that follows',
    ],
  },
  {
    id: 'inaugural-dinner-2026',
    date: '2026-03-22',
    displayDate: '22 Mar 2026',
    title: 'Inaugural Founders Dinner',
    type: 'Dinner',
    location: 'In-person · Closed',
    blurb:
      'A private dinner with the founding cohort of operators, leaders, and elders shaping the Divinus standard.',
    ctaLabel: 'View recap',
    ctaHref: '/contact?route=general',
    img: 'https://picsum.photos/seed/divinus-event-founders-dinner/1200/800',
    status: 'past',
    longBlurb: [
      'The Inaugural Founders Dinner gathered the first cohort of operators, leaders, and elders helping shape the Divinus standard. A long table, a quiet room, no slides.',
      'The conversation set the tone for the work the group is now doing in public.',
    ],
    format: 'One evening · in-person · closed',
    capacity: 'By invitation',
    hosts: [
      { name: 'Divinus Investment Group', role: 'Hosts' },
    ],
    agenda: [
      { time: '18:30', item: 'Arrival · drinks' },
      { time: '19:30', item: 'Dinner · framed conversation in three parts' },
      { time: '22:00', item: 'Close · commitments noted, not promised' },
    ],
    expect: [
      'Chatham House throughout',
      'No press, no recordings',
      'Working dinner, not a gala',
    ],
  },
  {
    id: 'open-house-jan-2026',
    date: '2026-01-30',
    displayDate: '30 Jan 2026',
    title: 'Divinus Exchange · Open House',
    type: 'Open House',
    location: 'Online · 90 minutes',
    blurb:
      'A first look inside Divinus Exchange for prospective members of Men of Substance and Genesis Woman.',
    ctaLabel: 'View recap',
    ctaHref: '/contact?route=communities',
    img: 'https://picsum.photos/seed/divinus-event-exchange-openhouse/1200/800',
    status: 'past',
    longBlurb: [
      'A 90-minute open session for prospective members. The convening team walked through what Men of Substance and Genesis Woman actually are — what membership demands, and what it does not.',
      'The recording is not public. A recap is available to applicants who request it.',
    ],
    format: '90 minutes · online · live + Q&A',
    capacity: 'Open · with sign-up',
    hosts: [
      { name: 'Divinus Exchange', role: 'Convening team' },
    ],
    agenda: [
      { time: '00:00', item: 'What Divinus Exchange is' },
      { time: '00:15', item: 'Men of Substance — the four pillars' },
      { time: '00:35', item: 'Genesis Woman — the four pillars' },
      { time: '00:55', item: 'Application, membership, and what we ask' },
      { time: '01:15', item: 'Q&A' },
    ],
    expect: [
      'Two clear pictures, not a sales pitch',
      'A walk-through of the application process',
      'Honest answers about who the communities are not for',
    ],
  },
];

export const UPCOMING_EVENTS = EVENTS.filter(e => e.status === 'upcoming');
export const PAST_EVENTS = EVENTS.filter(e => e.status === 'past');

export function eventById(id: string): EventItem | undefined {
  return EVENTS.find(e => e.id === id);
}
