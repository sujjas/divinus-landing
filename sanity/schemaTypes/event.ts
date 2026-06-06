import { defineField, defineType } from 'sanity';

// Event. Mirrors the EventItem type in app/events/events-data.ts.
export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL segment, e.g. /events/your-slug. Click "Generate".',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Forum', 'Retreat', 'Dinner', 'Programme', 'Open House'],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (for sorting)',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'displayDate',
      title: 'Display date',
      type: 'string',
      description: 'How the date reads on the page, e.g. "Sat · 14 Jun 2026" or "Sep 2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Short blurb',
      type: 'text',
      rows: 3,
      description: 'Card + header summary.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      description: 'e.g. "Request invite", "Apply", "View recap".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      description: 'e.g. /contact?route=men-of-substance',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'longBlurb',
      title: 'About this event (paragraphs)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'One entry per paragraph.',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'e.g. "Full day · in-person · closed".',
    }),
    defineField({
      name: 'capacity',
      title: 'Access / capacity',
      type: 'string',
      description: 'e.g. "By application · ~50 seats".',
    }),
    defineField({
      name: 'hosts',
      title: 'Hosts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        },
      ],
    }),
    defineField({
      name: 'agenda',
      title: 'Agenda',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'time', title: 'Time / label', type: 'string' },
            { name: 'item', title: 'Item', type: 'string' },
            { name: 'detail', title: 'Detail (optional)', type: 'string' },
          ],
          preview: { select: { title: 'item', subtitle: 'time' } },
        },
      ],
    }),
    defineField({
      name: 'expect',
      title: 'What to expect (bullets)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  orderings: [
    {
      title: 'Date, newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'displayDate', media: 'image' },
  },
});
