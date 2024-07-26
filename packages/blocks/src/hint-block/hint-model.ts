//import type { DeltaInsert } from '@blocksuite/inline';
import { type SchemaToModel, Text, defineBlockSchema } from '@blocksuite/store';
//import type * as Y from 'yjs';
export type HintType = 'default' | 'warning' | 'info' | 'success' | 'error';
export type HintBlockProps = {
  description: any; //Y.Text | string | DeltaInsert[];
  title: any;
  type: HintType;
};

const defaultHintProps: HintBlockProps = {
  title: new Text('this is title'),
  type: 'default',
  description: new Text('this is description'),
};

export const HintBlockSchema = defineBlockSchema({
  flavour: 'affine:hint',
  metadata: {
    version: 1,
    role: 'content',
    props: () => defaultHintProps,
    //children: ['affine:mention'],
    parent: [
      'affine:note',
      'affine:database',
      //'affine:list',
      'affine:paragraph',
      // 'affine:mention',
    ],
  },
});

export type HintBlockModel = SchemaToModel<typeof HintBlockSchema>;
