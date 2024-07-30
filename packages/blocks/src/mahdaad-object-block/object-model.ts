import { type SchemaToModel, defineBlockSchema } from '@blocksuite/store';

export const ObjectBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-object',
  props: () => ({
    //type: 'bulleted' as ListType,
    //text: internal.Text(),
    //checked: false,
    //collapsed: false as ListCollapsed,
  }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type ObjectBlockModel = SchemaToModel<typeof ObjectBlockSchema>;
