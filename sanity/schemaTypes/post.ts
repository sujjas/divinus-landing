import { defineField, defineType } from 'sanity';

// Blog post / "Insight". Mirrors the original Post type in app/blog/posts.ts.
// The body is Portable Text restricted to the three block styles the site
// renders: Normal -> p, H2 -> subhead, Quote -> gold pull-quote.
export const postType = defineType({
  name: 'post',
  title: 'Insight',
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
      description: 'The URL segment, e.g. /blog/your-slug. Click "Generate".',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on cards and used for SEO.',
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Capital', value: 'Capital' },
          { title: 'Strategy', value: 'Strategy' },
          { title: 'AI', value: 'AI' },
          { title: 'Communities', value: 'Communities' },
          { title: 'Foundation', value: 'Foundation' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'readMins',
      title: 'Read time (minutes)',
      type: 'number',
      validation: (r) => r.required().min(1).max(60),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author role',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended 1600×1000 or larger.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          // Only the styles the front-end renders.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Subhead (H2)', value: 'h2' },
            { title: 'Pull quote', value: 'blockquote' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});
