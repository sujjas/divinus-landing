import type { SchemaTypeDefinition } from 'sanity';
import { postType } from './post';
import { eventType } from './event';

export const schemaTypes: SchemaTypeDefinition[] = [postType, eventType];
