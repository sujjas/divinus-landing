// Pure data + types for the contact form.
// Kept in its own file so editing ContactForm.tsx doesn't force a
// Next.js Fast Refresh full reload.

export const SUBJECTS = [
  { id: 'divisions',    label: 'Work with a division',        helper: 'AI · Advisory · Labs · Capital · Foundation' },
  { id: 'communities',  label: 'Join a community',            helper: 'Men of Substance · Genesis Woman' },
  { id: 'partnerships', label: 'Partnerships & investors',    helper: 'Strategic partners and investor relations' },
  { id: 'press',        label: 'Press & media',               helper: 'Interviews, statements, editorial' },
  { id: 'general',      label: 'General enquiry',             helper: 'Anything else — we’ll route it' },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]['id'];
export type ContactMode = 'message' | 'call';

export const COMMUNITY_ROUTES = new Set(['men-of-substance', 'genesis-woman']);
