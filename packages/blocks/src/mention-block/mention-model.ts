import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const MentionBlockSchema = defineBlockSchema({
  flavour: 'affine:mention',
  metadata: {
    version: 1,
    role: 'content',
    //children: [],
    parent: [
      'affine:note',
      'affine:database',
      'affine:list',
      'affine:paragraph',
    ],
  },
});

export type MentionBlockModel = SchemaToModel<typeof MentionBlockSchema>;
