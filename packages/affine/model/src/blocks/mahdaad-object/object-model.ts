import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const ObjectBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-object',
  props: () => ({
    object_id: undefined,
    link_id: undefined,
    type: undefined,
    //id:undefined,
    show_type: 'inline',
  }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type ObjectBlockModel = SchemaToModel<typeof ObjectBlockSchema>;


declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-object': ObjectBlockModel;
    }
  }
}
