import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const HintBlockSchema = defineBlockSchema({
  flavour: 'affine:hint',
  metadata: {
    version: 1,
    role: 'content',
    //children: ['affine:mention'],
    parent: [
      'affine:note',
      'affine:database',
      //'affine:list',
      'affine:paragraph',
      'affine:mention',
    ],
  },
});

export type HintBlockModel = SchemaToModel<typeof HintBlockSchema>;
