import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';


interface Item {
  title?: string;
  icon?: string;
  children?: Item[];
}
export type MultiColumnProps = {
  dir?:  null |'rtl' | 'ltr',
  data: Item[];
}
export const MahdaadTableOfContentBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-table-of-content',
  props: () => ({
    dir:'ltr',
    data: [],
    //sizes:[]
    // type:'info',
    // icon:null,
    // background:null,
  }),
  metadata: {
    version: 1,
    role: 'content',
    // parent: [],
    children: [
      // 'affine:note'
      // 'affine:paragraph',
      // 'affine:list',
      // 'affine:hint',
      // 'affine:code',
      // 'affine:divider',
      // 'affine:mahdaad-object',
      // 'affine:mahdaad-weblink-block',
      // //'affine:mention',
      // 'affine:simple',
      // 'affine:database',
      // 'affine:data-view',
      // 'affine:image',
      // 'affine:bookmark',
      // 'affine:attachment',
      // 'affine:surface-ref',
      // 'affine:embed-*',
      // 'affine:latex',
      //'affine:note'
    ],
  },
  /*toModel: () => {
    return new MahdaadCalloutBlockModel();
  },*/
});


export type MahdaadTableOfContentBlockModel = SchemaToModel<typeof MahdaadTableOfContentBlockSchema>;



declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-table-of-content': MahdaadTableOfContentBlockModel;
    }
    /*interface EdgelessBlockModelMap {
      'affine:note': NoteBlockModel;
    }*/
  }
}
