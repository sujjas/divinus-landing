import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from '../env';

const builder = createImageUrlBuilder({ projectId, dataset });

// Returns a CDN URL for a Sanity image source, or null when none is set.
export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!source) return null;
  try {
    return builder.image(source).auto('format').fit('max').url();
  } catch {
    return null;
  }
}
