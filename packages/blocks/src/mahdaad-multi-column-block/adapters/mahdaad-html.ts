import { MahdaadMultiColumnBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';



export const mahdaadMultiColumnBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: MahdaadMultiColumnBlockSchema.model.flavour,
  toMatch: o => HastUtils.isElement(o.node) && o.node.tagName === 'img',
  fromMatch: o => o.node.flavour === MahdaadMultiColumnBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      if (!HastUtils.isElement(o.node)) {
        return;
      }
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      const {  walkerContext } = context;
      console.log("1111",context)
      walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: [`mahdaad-block-container mahdaad-multi-column`],
            },
            children:[],
          },
          'children'
        )
    },
    leave: (_, context) => {
      const { walkerContext } = context;
      console.log("111111",walkerContext);
      /*const htmlRootDocContext =
        walkerContext.getGlobalContext('hast:html-root-doc');
      const isRootDoc = htmlRootDocContext ?? true;
      if (!isRootDoc) {
        return;
      }*/
      walkerContext.closeNode();
    },
  },
};

export const MahdaadMultiColumnBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadMultiColumnBlockHtmlAdapterMatcher
);
