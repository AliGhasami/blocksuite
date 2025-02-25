import {  MahdaadCalloutBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  FetchUtils,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';
import { getFilenameFromContentDisposition } from '@blocksuite/affine-shared/utils';
import { sha } from '@blocksuite/global/utils';
import { nanoid } from '@blocksuite/store';

/*
export function ObjectIcon(type:string,context) {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      /!*src: `assets/${blobName}`,
      alt: blobName,
      title: (o.node.props.caption as string | undefined) ?? null,
      ...widthStyle,*!/
    },
    children: [],
  }
}
*/

function convertToFullUrl(inputString) {
  // Check if the input string starts with 'http' or 'www' to avoid duplication
  if (!inputString.startsWith('http')) {
    // Add 'https://' at the beginning if not present
    inputString = `https://${inputString}`;
  }

  // Check if the input string includes 'www.'
  if (!inputString.includes('www.')) {
    // Add 'www.' after the protocol
    inputString = inputString.replace(/^(https?:\/\/)/, '$1www.');
  }

  return inputString;
}


export const mahdaadCalloutBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: MahdaadCalloutBlockSchema.model.flavour,
  //todo ali ghasami for implement after
  toMatch: o => HastUtils.isElement(o.node) && o.node.tagName === 'div',
  fromMatch: o => o.node.flavour === MahdaadCalloutBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: async (o, context) => {
      if (!HastUtils.isElement(o.node)) {
        return;
      }
      const { assets, walkerContext, configs } = context;
      if (!assets) {
        return;
      }
      const image = o.node;
      const imageURL =
        typeof image?.properties.src === 'string' ? image.properties.src : '';
      if (imageURL) {
        let blobId = '';
        if (!FetchUtils.fetchable(imageURL)) {
          const imageURLSplit = imageURL.split('/');
          while (imageURLSplit.length > 0) {
            const key = assets
              .getPathBlobIdMap()
              .get(decodeURIComponent(imageURLSplit.join('/')));
            if (key) {
              blobId = key;
              break;
            }
            imageURLSplit.shift();
          }
        } else {
          try {
            const res = await FetchUtils.fetchImage(
              imageURL,
              undefined,
              configs.get('imageProxy') as string
            );
            if (!res) {
              return;
            }
            const clonedRes = res.clone();
            const name =
              getFilenameFromContentDisposition(
                res.headers.get('Content-Disposition') ?? ''
              ) ??
              (imageURL.split('/').at(-1) ?? 'image') +
                '.' +
                (res.headers.get('Content-Type')?.split('/').at(-1) ?? 'png');
            const file = new File([await res.blob()], name, {
              type: res.headers.get('Content-Type') ?? '',
            });
            blobId = await sha(await clonedRes.arrayBuffer());
            assets?.getAssets().set(blobId, file);
            await assets?.writeToBlob(blobId);
          } catch (_) {
            return;
          }
        }
        walkerContext
          .openNode(
            {
              type: 'block',
              id: nanoid(),
              flavour: 'affine:image',
              props: {
                sourceId: blobId,
              },
              children: [],
            },
            'children'
          )
          .closeNode();
        walkerContext.skipAllChildren();
      }
    },
  },
  fromBlockSnapshot: {
    enter: async (o, context) => {

      const {  walkerContext } = context;

      const style ={
          textColor: `rgb(var(--mt-${o.node.props.background}-5))`,
          backgroundColor:
        o.node.props.background == 'gray'
          ? `rgb(var(--mt-${o.node.props.background}-1))`
          : `rgb(var(--mt-${o.node.props.background}-0))`,
          borderColor: `rgb(var(--mt-${o.node.props.background}-1))`,
      }

      walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              dir: o.node.props.dir as string,
              className: [`mahdaad-block-container mahdaad-callout`],
              style:`background-color:${style.backgroundColor};border-color:${style.borderColor}`
            },
            children:[],
          },
          'children'
        ).openNode({
        type:'element',
        tagName:'div',
        properties: {
          style:`color:${style.textColor}`,
          className:['icon'],
        },
        children:[]
      }).openNode({
          type: 'element',
          tagName: 'iconify-icon',
          properties: {
            className: [],
            //src:'https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js'
            icon:o.node.props.icon,
            style:"font-size: 24px"
          },
          children:[],
        },
        'children').closeNode()
        .closeNode().openNode({
        type:'element',
        tagName:'div',
        properties:{
          className:['content']
        },
        children:[]
      })
    },
    leave: (_, context) => {
      const { walkerContext } = context;
      //console.log("111111",walkerContext);
      /*const htmlRootDocContext =
        walkerContext.getGlobalContext('hast:html-root-doc');
      const isRootDoc = htmlRootDocContext ?? true;
      if (!isRootDoc) {
        return;
      }*/
      walkerContext.closeNode().closeNode();
    },
  },
};

export const MahdaadCalloutBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadCalloutBlockHtmlAdapterMatcher
);
