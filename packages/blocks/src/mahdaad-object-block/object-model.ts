import { type SchemaToModel, defineBlockSchema } from '@blocksuite/store';

export const ObjectBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-object',
  props: () => ({
    object_id: undefined,
    link_id: undefined,
    type: undefined,
  }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type ObjectBlockModel = SchemaToModel<typeof ObjectBlockSchema>;
