import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export type ObjectBlockProps = {
  object_id: undefined | string,
  link_id: undefined | string,
  type: undefined | string,
  show_type: 'inline' | 'embed',
  meta?:Record<string, string | null | any>
  file_id?:string
}



export const ObjectBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-object',
  props: () => ({
    object_id: undefined,
    link_id: undefined,
    type: undefined,
    //id:undefined,
    show_type: 'inline',
    meta:{},
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
