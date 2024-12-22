import { RootBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';
import mahdaadStyle from './mahdaad-style.css?raw'

console.log('1111',mahdaadStyle);

export const mahdaadRootBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: RootBlockSchema.model.flavour,
  toMatch: o => HastUtils.isElement(o.node) && o.node.tagName === 'header',
  fromMatch: o => o.node.flavour === RootBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      if (!HastUtils.isElement(o.node)) {
        return;
      }
      const { walkerContext } = context;
      if (o.node.tagName === 'header') {
        walkerContext.skipAllChildren();
      }
    },
  },
  fromBlockSnapshot: {
    enter: (_, context) => {
      const { walkerContext } = context;
      const htmlRootDocContext =
        walkerContext.getGlobalContext('hast:html-root-doc');
      const isRootDoc = htmlRootDocContext ?? true;
      if (!isRootDoc) {
        return;
      }


      walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'html',
            properties: {},
            children: [],
          },
          'children'
        )
        .openNode(
          {
            type: 'element',
            tagName: 'head',
            properties: {},
            children: [],
          },
          'children'
        )
        .openNode(
          {
            type: 'element',
            tagName: 'style',
            properties: {},
            children: [],
          },
          'children'
        )
        .openNode(
          {
            type: 'text',
            value: mahdaadStyle.replace(/\s\s+/g, ''),
          },
          'children'
        )
        .closeNode()
        .closeNode()
        .closeNode()
        .openNode(
          {
            type: 'element',
            tagName: 'body',
            properties: {},
            children: [],
          },
          'children'
        )
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              style: 'width: 70vw; margin: 60px auto;',
            },
            children: [],
          },
          'children'
        )
        .openNode({
          type: 'comment',
          value: 'BlockSuiteDocTitlePlaceholder',
        })
        .closeNode();
    },
    leave: (_, context) => {
      const { walkerContext } = context;
      const htmlRootDocContext =
        walkerContext.getGlobalContext('hast:html-root-doc');
      const isRootDoc = htmlRootDocContext ?? true;
      if (!isRootDoc) {
        return;
      }
      walkerContext.closeNode().closeNode().closeNode();
    },
  },
};

export const MahdaadRootBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadRootBlockHtmlAdapterMatcher
);
