import { ObjectBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';



export const mahdaadObjectBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: ObjectBlockSchema.model.flavour,
  //todo ali ghasami for implement after
  toMatch: o => HastUtils.isElement(o.node) && o.node.tagName === 'img',
  fromMatch: o => o.node.flavour === ObjectBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: async (o, context) => {
      if (!HastUtils.isElement(o.node)) {
        return;
      }
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      const {  walkerContext } = context;
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
        ).openNode({
        type:'element',
        tagName:'div',
        properties: {
          //style:`color:${style.textColor}`,
          className:['icon'],
        },
        children:[]
      })
    },
  },
};

export const MahdaadObjectBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadObjectBlockHtmlAdapterMatcher
);
