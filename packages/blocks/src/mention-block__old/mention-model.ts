import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';
import type { BundledLanguage, Highlighter, PlainTextLanguage } from 'shiki';

import { FALLBACK_LANG } from './utils/consts.js';

export const MentionBlockSchema = defineBlockSchema({
  flavour: 'affine:mention',
  props: internal => ({
    text: internal.Text(),
    language: FALLBACK_LANG,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: ['affine:note', 'affine:paragraph', 'affine:list'],
    children: [],
  },
});

export type MentionBlockModel = SchemaToModel<typeof MentionBlockSchema>;
export type HighlightOptionsGetter = () => {
  lang: BundledLanguage | PlainTextLanguage;
  highlighter: Highlighter | null;
};
