import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const SimpleBlockSchema = defineBlockSchema({
  flavour: 'affine:simple',
  metadata: {
    version: 1,
    role: 'content',
    //children: ['affine:mention'],
    parent: [
      'affine:note',
      'affine:database',
      //'affine:list',
      'affine:paragraph',
      //'affine:mention',
    ],
  },
});

export type SimpleBlockModel = SchemaToModel<typeof SimpleBlockSchema>;
