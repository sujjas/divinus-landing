import type { StructureResolver } from 'sanity/structure';

// Groups the desk into Insights and Events for a cleaner editing experience.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Insights'),
      S.documentTypeListItem('event').title('Events'),
    ]);
