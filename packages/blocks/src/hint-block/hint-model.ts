import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export type ListType = 'bulleted' | 'numbered' | 'todo' | 'toggle';

declare const BackwardUndefined: unique symbol;
/**
 * The `collapsed` property may be `undefined` due to legacy data,
 * but you should not manually set it to undefined.
 */
type ListCollapsed = boolean | typeof BackwardUndefined;

export const HintBlockSchema = defineBlockSchema({
  flavour: 'affine:hint',
  props: internal => ({
    type: 'bulleted' as ListType,
    text: internal.Text(),
    checked: false,
    collapsed: false as ListCollapsed,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'affine:note',
      'affine:database',
      'affine:list',
      'affine:paragraph',
    ],
  },
});

export type HintBlockModel = SchemaToModel<typeof HintBlockSchema>;
