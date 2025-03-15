import { ObjectBlockSchema } from '@blocksuite/affine-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  HastUtils,
} from '@blocksuite/affine-shared/adapters';


function convertToFullUrl(inputString : string) {
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
      const embedList : any[]=context.configs.has('mahdaad_config') ? context.configs.get('mahdaad_config')?.embedList ?? [] : []
      const include_embed : boolean=context.configs.get('mahdaad_config')?.include_embed ?? false
      const embedItem=embedList.find(item=> item.object_id==objectId)
      //@ts-ignore
      const storageUrl=context.configs.get('mahdaad_config')?.storageUrl ?? ''
      //@ts-ignore
      const minioStorageImageUrl=context.configs.get('mahdaad_config')?.minioStorageImageUrl ?? ''
      //console.log("object",object,o.node.props);
      const isEmbed=include_embed && o.node.props?.type=='document' && o.node.props?.show_type && o.node.props?.show_type=='embed' && embedItem
      walkerContext
        .openNode(
          {
            type: 'element',
            tagName: 'div',
            properties: {
              dir: o.node.props.dir as string,
              className: [`mahdaad-block-container `,isEmbed ? 'mahdaad-object-embed' : `mahdaad-object ${o.node.props?.show_type} ${o.node.props?.type} ${object?.meta?.color ?? ''} ${object.object_type=='file' ? object.meta.type : ''} `],
            },
            children: [],
          },
          'children'
        )

      if(include_embed && o.node.props?.type=='document' && o.node.props?.show_type && o.node.props?.show_type=='embed' && embedItem) {
          walkerContext.openNode({
            type:'raw',
            value:embedItem.context
          }).closeNode()
      }else{
        if(!(
          o.node.props?.type=='tag' ||
          (object.object_type=='image' && o.node.props?.show_type && o.node.props?.show_type=='embed'))) {
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
                src: object.meta &&  object.meta.bucket_name ? `${minioStorageImageUrl}/${object.meta.storage}` :  `${storageUrl}/${object.meta.storage}`,
                style:'width:100%',
                //className: [`title line-clamp-1`],
              },
              children:[]
            },
            'children'
          ).closeNode()
        }else{
         if(o.node.props?.type=='tag') {
           walkerContext.openNode(
             {
               type: 'element',
               tagName: 'span',
               properties: {
                 className: [`title line-clamp-1 card tag green`],
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

      }
      walkerContext.closeNode()

    },
  },
};

export const MahdaadObjectBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mahdaadObjectBlockHtmlAdapterMatcher
);
