import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export type TestBlockProps = {

}



export const TestBlockSchema = defineBlockSchema({
  flavour: 'affine:test-block',
  props: () => ({

  }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type TestBlockModel = SchemaToModel<typeof TestBlockSchema>;


declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:test-block': TestBlockModel;
    }
  }
}
