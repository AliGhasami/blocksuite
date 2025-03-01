import { MahdaadMultiColumnBlockSchema,NoteBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';


export const mahdaadNoteBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour:  NoteBlockSchema.model.flavour,
  toMatch: o => HastUtils.isElement(o.node) && o.node.tagName === 'img',
  fromMatch: o => o.node.flavour === NoteBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      if (!HastUtils.isElement(o.node)) {
        return;
      }
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      console.log("fromBlockSnapshot note block");
      if(o.parent && o.parent.node.flavour==MahdaadMultiColumnBlockSchema.model.flavour) {
        const sizes= o.parent.node.props.sizes
        //console.log("bbbbb",sizes[o.index]);
        const {  walkerContext } = context;
        walkerContext
          .openNode(
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: [`column`],
                style:`width:${sizes[o.index]}%`
              },
              children:[],
            },
            'children'
          )
      }

      return
    },
    leave: (o, context) => {
      const {  walkerContext } = context;
      if(o.parent && o.parent.node.flavour==MahdaadMultiColumnBlockSchema.model.flavour) {

        walkerContext.closeNode()
      }
      //walkerContext.closeNode()
      //return
    },
  },
};

export const MahdaadNoteBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadNoteBlockHtmlAdapterMatcher
);
