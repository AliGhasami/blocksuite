import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const MentionBlockSchema = defineBlockSchema({
  flavour: 'affine:mention',
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type MentionBlockModel = SchemaToModel<typeof MentionBlockSchema>;
