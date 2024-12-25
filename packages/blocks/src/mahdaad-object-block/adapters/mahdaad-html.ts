import { ObjectBlockSchema } from '@blocksuite/affine-model';
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
      const objectId=o.node.props.object_id
      //@ts-ignore
      const objectList : any[]=context.configs.has('mahdaad_config') ? context.configs.get('mahdaad_config')?.objectList ?? [] : []
      const object=objectList.find(item=> item._id==objectId);
      if(!object || (object.status && (object.status=='403'||object.status=='404')))
        return
      //@ts-ignore
      const storageUrl=context.configs.get('mahdaad_config')?.storageUrl ?? ''
      console.log("object",object,o.node.props);

      walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: [`mahdaad-block-container mahdaad-object ${o.node.props?.show_type} ${o.node.props?.type} ${object?.meta?.color ?? ''}`,object.object_type=='file' ? object.meta.type : ''],
            },
            children: [],
          },
          'children'
        )

      if(o.node.props?.type!='tag' && (object.object_type=='image' && o.node.props?.show_type && o.node.props?.show_type!='embed')) {
        walkerContext.openNode(
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`icon`],
            },
            children:[{
              type:'raw',
              value:object.iconSVG ?? ''
            }]
          },
          'children'
        ).closeNode();
      }


      if(object.object_type=='image' && o.node.props?.show_type && o.node.props?.show_type=='embed') {
        walkerContext.openNode(
          {
            type: 'element',
            tagName: 'img',
            properties: {
             src:`${storageUrl}/${object.meta.storage}`
              //className: [`title line-clamp-1`],
            },
            children:[]
          },
          'children'
        ).closeNode()
      }else{
        walkerContext.openNode(
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`title line-clamp-1`],
            },
            children: [
              {
                type:'text',
                value:object.title
              }
            ],
          },
          'children'
        ).closeNode()
      }




      if(o.node.props?.type=='weblink') {
        walkerContext.openNode(
          {
            type: 'element',
            tagName: 'a',
            properties: {
              className: [`link`],
              href:convertToFullUrl(object.meta.weblink)
            },
            children: [
              {
                type:'text',
                value:object.meta.weblink
              }
            ],
          },
          'children'
        ).closeNode()
      }


      walkerContext.closeNode()



      /*walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: [`mahdaad-block-container mahdaad-object ${o.node.props?.type}`],
            },
            children: [],
          },
          'children'
        )
        .openNode(
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`icon`],
            },
            children:o.node.props?.type!='tag'  ?  [{
              type:'raw',
              value:object.iconSVG ?? ''
            }] : []
          },
          'children'
        )
        .closeNode()
        .openNode(
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`title`],
            },
            children: [
              {
                type:'text',
                value:object.title
              }
            ],
          },
          'children'
        )
        .closeNode()
        .closeNode();*/
    },
  },
};

export const MahdaadObjectBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadObjectBlockHtmlAdapterMatcher
);
