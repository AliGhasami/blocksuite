import { type SchemaToModel, defineBlockSchema } from '@blocksuite/store';

export const MahdaadWeblinkBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-weblink-block',
  props: () => ({
    title: undefined,
    url: undefined,
    show_type: 'card',
    //object_id: undefined,
    //link_id: undefined,
    //type: undefined,
  }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type MahdaadWeblinkBlockModel = SchemaToModel<
  typeof MahdaadWeblinkBlockSchema
>;
