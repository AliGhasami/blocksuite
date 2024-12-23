import type {
  InlineDeltaToHtmlAdapterMatcher,
  InlineHtmlAST,
} from '@blocksuite/affine-shared/adapters';

import { generateDocUrl } from '@blocksuite/affine-block-embed';

const EventIcon=`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--tabler"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1m6-10.273A11.05 11.05 0 0 0 18.206 3M3 6.727A11.05 11.05 0 0 1 5.792 3"></path></svg>`

const a=  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <circle cx="12" cy="12" r="10" fill="blue" />
</svg>`;


export const boldDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher = {
  name: 'bold',
  match: delta => !!delta.attributes?.bold,
  toAST: (_, context) => {
    return {
      type: 'element',
      tagName: 'strong',
      properties: {},
      children: [context.current],
    };
  },
};

export const italicDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'italic',
    match: delta => !!delta.attributes?.italic,
    toAST: (_, context) => {
      return {
        type: 'element',
        tagName: 'em',
        properties: {},
        children: [context.current],
      };
    },
  };

export const strikeDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'strike',
    match: delta => !!delta.attributes?.strike,
    toAST: (_, context) => {
      return {
        type: 'element',
        tagName: 'del',
        properties: {},
        children: [context.current],
      };
    },
  };

export const inlineCodeDeltaToMarkdownAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'inlineCode',
    match: delta => !!delta.attributes?.code,
    toAST: (_, context) => {
      return {
        type: 'element',
        tagName: 'code',
        properties: {},
        children: [context.current],
      };
    },
  };

export const underlineDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'underline',
    match: delta => !!delta.attributes?.underline,
    toAST: (_, context) => {
      return {
        type: 'element',
        tagName: 'u',
        properties: {},
        children: [context.current],
      };
    },
  };

export const referenceDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'reference',
    match: delta => !!delta.attributes?.reference,
    toAST: (delta, context) => {
      let hast: InlineHtmlAST = {
        type: 'text',
        value: delta.insert,
      };
      const reference = delta.attributes?.reference;
      if (!reference) {
        return hast;
      }

      const { configs } = context;
      const title = configs.get(`title:${reference.pageId}`);
      const url = generateDocUrl(
        configs.get('docLinkBaseUrl') ?? '',
        String(reference.pageId),
        reference.params ?? Object.create(null)
      );
      if (title) {
        hast.value = title;
      }
      hast = {
        type: 'element',
        tagName: 'a',
        properties: {
          href: url,
        },
        children: [hast],
      };

      return hast;
    },
  };

export const linkDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher = {
  name: 'link',
  match: delta => !!delta.attributes?.link,
  toAST: (delta, _) => {
    const hast: InlineHtmlAST = {
      type: 'text',
      value: delta.insert,
    };
    const link = delta.attributes?.link;
    if (!link) {
      return hast;
    }
    return {
      type: 'element',
      tagName: 'a',
      properties: {
        href: link,
      },
      children: [hast],
    };
  },
};


export const mentionDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'mention',
    match: delta => !!delta.attributes?.mention,
    toAST: (delta, context) => {
      //console.log("this is context",context,delta);
      //const user= delta.attributes.mention.user_id
      //debugger
      return {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['mahdaad-mention'],
        },
        children: [{
          type:'element',
          tagName:'span',
          children:[{
            type:'text',
            value:'@'
          }]
        },
          {
            type:'element',
            tagName:'span',
            children:[{
              type:'text',
              value:'ali ahamdi'//user
            }]
          }],
      };
    },
  };

export const DateTimeDeltaToHtmlAdapterMatcher: InlineDeltaToHtmlAdapterMatcher =
  {
    name: 'date',
    match: delta => !!delta.attributes?.date,
    toAST: (delta, context) => {
      console.log("this is context",context,delta);
      const _date=delta.attributes?.date
      //const user= delta.attributes.mention.user_id
      //debugger
      const children=[]
      children.push({
        type:'element',
        tagName:'span',
        properties: {
          className: ['date'],
        },
        children:[{
          type:'text',
          value:_date?.date,
        }]
      })

      if(_date) {
        if(_date.time) {
          children.push({
            type:'element',
            tagName:'span',
            properties: {
              className: ['time'],
            },
            children:[{
              type:'text',
              value:`- ${_date.time}`
            }]
          })
        }

        if(_date.event_at) {
          children.push({
            type:'element',
            tagName:'span',
            properties: {
              className: ['event'],
            },
            children:[{
              type: 'raw',
              value: EventIcon,
            }
            ]
          })
        }

        if(_date.meta) {
          const temp= JSON.parse(_date.meta);
          if(temp.title) {
            children.push({
              type:'element',
              tagName:'span',
              children:[{
                type:'text',
                value:temp.title,
              }]
            })
          }
        }
      }
      return {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['mahdaad-date-time'],
        },
        children,
      };
    },
  };




export const mahdaadInlineDeltaToHtmlAdapterMatchers: InlineDeltaToHtmlAdapterMatcher[] =
  [
    boldDeltaToHtmlAdapterMatcher,
    italicDeltaToHtmlAdapterMatcher,
    strikeDeltaToHtmlAdapterMatcher,
    underlineDeltaToHtmlAdapterMatcher,
    inlineCodeDeltaToMarkdownAdapterMatcher,
    referenceDeltaToHtmlAdapterMatcher,
    linkDeltaToHtmlAdapterMatcher,
    mentionDeltaToHtmlAdapterMatcher,
    DateTimeDeltaToHtmlAdapterMatcher,
  ];
