import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

// import { type StrokeStyle } from '../../consts/index.js';
//import { CodeBlockSchema } from '../code/index.js';
export type MultiColumnProps = {}
export const MahdaadMultiColumnBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-multi-column',
  props: () => ({
    // type:'info',
    // icon:null,
    // background:null,
  }),
  metadata: {
    version: 1,
    role: 'hub',
    parent: ['affine:note'],
    children: [
      'affine:note'
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


// export type NoteEdgelessProps = {
//   style: {
//     borderRadius: number;
//     borderSize: number;
//     borderStyle: StrokeStyle;
//     shadowType: string;
//   };
//   collapse?: boolean;
//   collapsedHeight?: number;
//   scale?: number;
// };


export type MahdaadMultiColumnBlockModel = SchemaToModel<typeof MahdaadMultiColumnBlockSchema>;



declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-multi-column': MahdaadMultiColumnBlockModel;
    }
    /*interface EdgelessBlockModelMap {
      'affine:note': NoteBlockModel;
    }*/
  }
}
