import { assertExists } from '@blocksuite/global/utils';
import type { BlockModel } from '@blocksuite/store';
import { Text } from '@blocksuite/store';

//import { toggleEmbedCardCreateModal } from '../../../_common/components/embed-card/modal/index.js';
import {
  getImageFilesFromLocal,
  getInlineEditorByModel,
  openFileOrFiles,
} from '../../../_common/utils/index.js';
import { addSiblingAttachmentBlocks } from '../../../attachment-block/utils.js';
import { viewPresets } from '../../../database-block/index.js';
import { addSiblingImageBlock } from '../../../image-block/utils.js';
import type { RootBlockComponent } from '../../types.js';
import { onModelTextUpdated } from '../../utils/index.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';
import type { AffineMentionWidget } from '../mention/index.js';
/*import accordion_h1 from './icons/accordion_h1.svg?raw';
import accordion_h2 from './icons/accordion_h2.svg?raw';
import accordion_h3 from './icons/accordion_h3.svg?raw';
import audio from './icons/audio.svg?raw';
import bread_crumb from './icons/bread_crumb.svg?raw';*/
import bulleted_list from './icons/bulleted_list.svg?raw';
//import button_link from './icons/button_link.svg?raw';
import check_list from './icons/check_list.svg?raw';
import code from './icons/code.svg?raw';
import date from './icons/date.svg?raw';
import divider from './icons/divider.svg?raw';
//import empty_title from './icons/empty_title.svg?raw';
import file from './icons/file.svg?raw';
import h1 from './icons/h1.svg?raw';
import h2 from './icons/h2.svg?raw';
import h3 from './icons/h3.svg?raw';
import hint from './icons/hint.svg?raw';
import image from './icons/image.svg?raw';
//import link from './icons/link.svg?raw';
//import link_to_page from './icons/link_to_page.svg?raw';
import mention from './icons/mention.svg?raw';
//import multi_column from './icons/multi_column.svg?raw';
import numbered_list from './icons/numbered_list.svg?raw';
import quote from './icons/quote.svg?raw';
//import table_of_content from './icons/table_of_content.svg?raw';
import table_view from './icons/table_view.svg?raw';
import text from './icons/text.svg?raw';
import today from './icons/today.svg?raw';
//import video from './icons/video.svg?raw';
import { formatDate, insertContent, tryRemoveEmptyLine } from './utils.js';
export interface ClayTapSlashMenuGroup {
  groupName: string;
  children: ClayTapSlashMenu[];
}
export interface ClayTapSlashMenu {
  icon: string;
  title: string;
  group?: string;
  //key: string;
  description: string;
  action: ({
    rootElement,
    model,
  }: {
    rootElement: RootBlockComponent;
    model: BlockModel;
  }) => void | Promise<void>;
}
export const clayTapGroupMenu: ClayTapSlashMenuGroup[] = [
  {
    groupName: 'Text Style',
    children: [
      {
        title: 'Text',
        description: 'Normal Text',
        icon: text,
        action: ({ rootElement }) => {
          //console.log('this is root element', rootElement);
          runCommand(rootElement, 'affine:paragraph', 'text');
        },
      },
      {
        title: 'Heading 1',
        description: 'A Large Heading.',
        icon: h1,
        action: ({ rootElement }) => {
          //console.log('this is root element', rootElement);
          runCommand(rootElement, 'affine:paragraph', 'h1');
        },
      },
      {
        title: 'Heading 2',
        description: 'A Medium Heading.',
        icon: h2,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'h2');
        },
      },
      {
        title: 'Heading 3',
        description: 'A Small Heading',
        icon: h3,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'h3');
        },
      },
      {
        title: 'Bulleted List',
        description: 'Normal text + Bullet',
        icon: bulleted_list,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:list', 'bulleted');
        },
      },
      {
        title: 'Numbered List',
        description: 'Normal text + Number',
        icon: numbered_list,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:list', 'numbered');
        },
      },
      {
        title: 'Check List',
        description: 'Normal text + Checkbox',
        icon: check_list,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:list', 'todo');
        },
      },
      {
        title: 'Quote',
        description: 'Description',
        icon: quote,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'quote');
        },
      },
      {
        title: 'Hint',
        description: 'Description',
        icon: hint,
        action: ({ rootElement, model }) => {
          //console.log('rootElement', rootElement);
          console.log('rootElement', rootElement);
          console.log('model', model);
          rootElement.host.std.command
            .chain()
            .updateBlockType({
              flavour: 'affine:hint',
              props: {
                title: new Text('Title'),
                description: new Text('Description'),
                type: 'success',
              },
            })
            .inline((ctx, next) => {
              //console.log('this is inline in menu ', ctx);
              const newModels = ctx.updatedBlocks;
              if (!newModels || newModels.length == 0) {
                return false;
              }
              return next();
            })
            .run();
          /*rootElement.host.std.command
            .chain()
            .updateBlockType({
              flavour: 'affine:hint',
              props: {
                title: new Text('Title'),
                description: new Text('Description'),
                type: 'success',
              },
            })
            .inline((ctx, next) => {
              //console.log('this is inline in menu ', ctx);
              const newModels = ctx.updatedBlocks;
              if (!newModels || newModels.length == 0) {
                return false;
              }
              return next();
            })
            .run();*/
          //insertContent(rootElement.host, model, '11111');
          //runCommand(rootElement, 'affine:paragraph', 'text');
          //rootElement.doc.addBlock('affine:paragraph', {}, parent);
        },
      },
      {
        title: 'Divider',
        description: 'Description',
        icon: divider,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:divider', 'divider');
        },
      },
    ],
  },
  {
    groupName: 'Insert',
    children: [
      {
        title: 'Mention',
        description: 'Description',
        icon: mention,
        action: ({ rootElement, model }) => {
          const triggerKey = '@';
          insertContent(rootElement.host, model, triggerKey);
          assertExists(model.doc.root);
          //console.log('|11111', rootElement.widgetElements);
          //todo fix ali ghasami
          //@ts-ignore
          const widgetEle = rootElement.widgetElements['affine-mention-widget'];
          assertExists(widgetEle);
          // We have checked the existence of showLinkedDoc method in the showWhen
          const mentionWidget = widgetEle as AffineMentionWidget;
          // Wait for range to be updated
          setTimeout(() => {
            const inlineEditor = getInlineEditorByModel(
              rootElement.host,
              model
            );
            assertExists(inlineEditor);
            mentionWidget.showMention(inlineEditor, triggerKey);
            //linkedDocWidget.showLinkedDoc(inlineEditor, triggerKey);
          });
        },
      },
      {
        title: 'Date',
        description: 'Description',
        icon: date,
        action: ({ rootElement, model }) => {
          //old method
          const date = new Date();
          insertContent(rootElement.host, model, formatDate(date));
          //todo fix ali ghasami
          /*const triggerKey = '';
          insertContent(rootElement.host, model, triggerKey);
          assertExists(model.doc.root);
          //@ts-ignore
          const widgetEle = rootElement.widgetElements['affine-date-widget'];
          assertExists(widgetEle);
          // We have checked the existence of showLinkedDoc method in the showWhen
          const mentionWidget = widgetEle as AffineMentionWidget;
          // Wait for range to be updated
          setTimeout(() => {
            const inlineEditor = getInlineEditorByModel(
              rootElement.host,
              model
            );
            assertExists(inlineEditor);
            mentionWidget.showMention(inlineEditor, triggerKey);
            //linkedDocWidget.showLinkedDoc(inlineEditor, triggerKey);
          });*/
        },
      },
      {
        title: 'Today',
        description: 'Description',
        icon: today,
        action: ({ rootElement, model }) => {
          const date = new Date();
          insertContent(rootElement.host, model, formatDate(date));
        },
      },
      /*{
        title: 'Link To Page',
        description: 'Description',
        icon: link_to_page,
        action: () => {},
      },*/
      {
        title: 'Table View',
        description: 'Description',
        icon: table_view,
        action: ({ rootElement, model }) => {
          //return;
          const parent = rootElement.doc.getParent(model);
          assertExists(parent);
          const index = parent.children.indexOf(model);

          const id = rootElement.doc.addBlock(
            'affine:database',
            {},
            rootElement.doc.getParent(model),
            index + 1
          );
          const service = rootElement.std.spec.getService('affine:database');
          service.initDatabaseBlock(
            rootElement.doc,
            model,
            id,
            viewPresets.tableViewConfig,
            false
          );
          tryRemoveEmptyLine(model);
        },
      },
      {
        title: 'Image',
        description: 'Description',
        icon: image,
        action: async ({ rootElement, model }) => {
          //old method
          const parent = rootElement.doc.getParent(model);
          if (!parent) {
            return;
          }
          const imageFiles = await getImageFilesFromLocal();
          if (!imageFiles.length) return;
          const imageService = rootElement.host.spec.getService('affine:image');
          const maxFileSize = imageService.maxFileSize;
          addSiblingImageBlock(
            rootElement.host,
            imageFiles,
            maxFileSize,
            model
          );
          tryRemoveEmptyLine(model);
          rootElement.doc.addBlock('affine:paragraph', {}, parent);

          /*const parent = rootElement.doc.getParent(model);
          if (!parent) {
            return;
          }

          const imageFiles = await getImageFilesFromLocal();
          if (!imageFiles.length) return;

          const imageService = rootElement.host.spec.getService('affine:image');
          const maxFileSize = imageService.maxFileSize;

          addSiblingImageBlock(
            rootElement.host,
            imageFiles,
            maxFileSize,
            model
          );
          tryRemoveEmptyLine(model);*/
        },
      },
      /* {
        title: 'Video',
        description: 'Description',
        icon: video,
        action: () => {},
      },*/
      /*{
        title: 'Audio',
        description: 'Description',
        icon: audio,
        action: () => {},
      },*/
      {
        title: 'Code',
        description: 'Description',
        icon: code,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:code');
        },
      },
      {
        title: 'File',
        description: 'Description',
        icon: file,
        action: async ({ rootElement, model }) => {
          const file = await openFileOrFiles();
          if (!file) return;
          const attachmentService =
            rootElement.host.spec.getService('affine:attachment');
          assertExists(attachmentService);
          const maxFileSize = attachmentService.maxFileSize;

          await addSiblingAttachmentBlocks(
            rootElement.host,
            [file],
            maxFileSize,
            model
          );
          tryRemoveEmptyLine(model);
        },
      },
      /*{
        title: 'Link',
        description: 'Description',
        icon: link,
        action: () => {},
      },*/
      /*{
        title: 'Table Of Content',
        description: 'Description',
        icon: table_of_content,
        action: () => {},
      },*/
      /*{
        title: 'Button Link',
        description: 'Description',
        icon: button_link,
        action: () => {},
      },*/
      /*{
        title: 'Bread Crumb',
        description: 'Description',
        icon: bread_crumb,
        action: () => {},
      },*/
      /* {
        title: 'Accordion Heading 1',
        description: 'Description',
        icon: accordion_h1,
        action: () => {},
      },*/
      /*{
        title: 'Accordion Heading 2',
        description: 'Description',
        icon: accordion_h2,
        action: () => {},
      },*/
      /* {
        title: 'Accordion Heading 3',
        description: 'Description',
        icon: accordion_h3,
        action: () => {},
      },*/
      /*{
        title: 'Multi Column',
        description: 'Description',
        icon: multi_column,
        action: () => {},
      },*/
      /*{
        title: 'Link Doc',
        description: 'Description',
        icon: multi_column,
        action: ({ rootElement, model }) => {
          const triggerKey = '@';
          insertContent(rootElement.host, model, triggerKey);
          assertExists(model.doc.root);
          const widgetEle =
            rootElement.widgetElements['affine-linked-doc-widget'];
          assertExists(widgetEle);
          // We have checked the existence of showLinkedDoc method in the showWhen
          const linkedDocWidget = widgetEle as AffineLinkedDocWidget;
          // Wait for range to be updated
          setTimeout(() => {
            const inlineEditor = getInlineEditorByModel(
              rootElement.host,
              model
            );
            assertExists(inlineEditor);
            linkedDocWidget.showLinkedDoc(inlineEditor, triggerKey);
          });
        },
      },*/
      /*{
        title: 'Sketch',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
    ],
  },
  {
    groupName: 'Embed',
    children: [
      /* {
        title: 'Title ',
        description: 'Description',
        icon: empty_title,
        action: () => {},
      },*/
      /* {
        title: 'Title  ',
        description: 'Description',
        icon: empty_title,
        action: () => {},
      },*/
      /*{
        title: 'Title   ',
        description: 'Description',
        icon: empty_title,
        action: () => {},
      },*/
      /* {
        title: 'Title     ',
        description: 'Description',
        icon: empty_title,
        action: () => {},
      },*/
      /*{
        title: 'Title         ',
        description: 'Description',
        icon: empty_title,
        action: () => {},
      },*/
      /* {
        title: 'figma',
        description: 'Description',
        icon: empty_title,
        action: async ({ rootElement, model }) => {
          const parentModel = rootElement.doc.getParent(model);
          if (!parentModel) {
            return;
          }
          const index = parentModel.children.indexOf(model) + 1;
          await toggleEmbedCardCreateModal(
            rootElement.host,
            'Figma',
            'The added Figma link will be displayed as an embed view.',
            { mode: 'page', parentModel, index }
          );
          tryRemoveEmptyLine(model);
        },
      },*/
      /*{
        title: 'simple',
        description: 'simple',
        icon: empty_title,
        action: async ({ rootElement }) => {
          rootElement.host.std.command
            .chain()
            .updateBlockType({
              flavour: 'affine:simple',
              props: {
                test_props: 'test_value',
                title: new Text('Title'),
                //title: new Text('Hello World!---titiel '),
                description: new Text(''),
              }, //type
            })
            .inline((ctx, next) => {
              //console.log('this is inline in menu ', ctx);
              const newModels = ctx.updatedBlocks;
              if (!newModels || newModels.length == 0) {
                return false;
              }
              return next();
            })
            .run();
        },
      },*/
      /*{
        title: 'Embed',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Figma',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Github',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Jira',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Oktuple',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Google Drive',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Miro',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Trello',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },
      {
        title: 'Gitlab',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
    ],
  },
];

function runCommand(
  rootElement: RootBlockComponent,
  flavour: BlockSuite.Flavour,
  type?: string
) {
  /* rootElement.host.std.command
    .chain()
    .updateBlockType({
      flavour,
      props: { type },
    })
    .inline((ctx, next) => (ctx.updatedBlocks ? next() : false))
    .run();*/

  //console.log('this is root element', rootElement);
  rootElement.host.std.command
    .chain()
    .updateBlockType({
      flavour,
      props: { type },
    })
    .inline((ctx, next) => {
      const newModels = ctx.updatedBlocks;
      if (!newModels) {
        return false;
      }
      // Reset selection if the target is code block
      if (['affine:code'].includes(flavour)) {
        if (newModels.length !== 1) {
          console.error("Failed to reset selection! New model length isn't 1");
          return false;
        }
        const codeModel = newModels[0];
        onModelTextUpdated(rootElement.host, codeModel, richText => {
          const inlineEditor = richText.inlineEditor;
          assertExists(inlineEditor);
          inlineEditor.focusEnd();
        }).catch(console.error);
      }
      //console.log('next - change inline menu');
      return next();
    })
    .run();
}
