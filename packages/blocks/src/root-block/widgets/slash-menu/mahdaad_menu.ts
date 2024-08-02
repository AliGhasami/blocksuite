import { assertExists } from '@blocksuite/global/utils';
import { type BlockModel, uuidv4 } from '@blocksuite/store';

import type { RootBlockComponent } from '../../types.js';
import type { AffineDateTimeWidget } from '../date-time-picker/index.js';

//import { toggleEmbedCardCreateModal } from '../../../_common/components/embed-card/modal/index.js';
import {
  getInlineEditorByModel,
  openFileOrFiles,
} from '../../../_common/utils/index.js';
import { addSiblingAttachmentBlocks } from '../../../attachment-block/utils.js';
import { viewPresets } from '../../../database-block/index.js';
import { onModelTextUpdated } from '../../utils/index.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';
//import link_to_page from './icons/link_to_page.svg?raw';
import dayjs from 'dayjs';

import type { AffineMahdaadObjectPickerWidget } from '../mahdaad-object-picker/index.js';
import type { IObjectType } from '../mahdaad-object-picker/type.js';
//import link from './icons/link.svg?raw';
import type { SlashMenuContext } from './config.js';

import { REFERENCE_NODE } from '../../../_common/inline/presets/nodes/consts.js';
/*import accordion_h1 from './icons/accordion_h1.svg?raw';
import accordion_h2 from './icons/accordion_h2.svg?raw';
import accordion_h3 from './icons/accordion_h3.svg?raw';
import audio from './icons/audio.svg?raw';
import bread_crumb from './icons/bread_crumb.svg?raw';*/
import bulleted_list from './icons/bulleted_list.svg?raw';
//import button_link from './icons/button_link.svg?raw';
import check_list from './icons/check_list.svg?raw';
import date from './icons/date.svg?raw';
import divider from './icons/divider.svg?raw';
//import empty_title from './icons/empty_title.svg?raw';
import file from './icons/file.svg?raw';
import h1 from './icons/h1.svg?raw';
import h2 from './icons/h2.svg?raw';
import h3 from './icons/h3.svg?raw';
import notebook from './icons/notebook.svg?raw';
import hint from './icons/hint.svg?raw';
//import multi_column from './icons/multi_column.svg?raw';
import numbered_list from './icons/numbered_list.svg?raw';
import quote from './icons/quote.svg?raw';
//import table_of_content from './icons/table_of_content.svg?raw';
import table_view from './icons/table_view.svg?raw';
import tabler_files from './icons/tabler_files.svg?raw';
import text from './icons/text.svg?raw';
//import video from './icons/video.svg?raw';
import { insertContent, tryRemoveEmptyLine } from './utils.js';
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
  action: (ctx: SlashMenuContext) => void | Promise<void>;
}
export const clayTapGroupMenu: ClayTapSlashMenuGroup[] = [
  {
    groupName: 'Basic',
    children: [
      {
        title: 'Text',
        description: 'Normal Text',
        icon: text,
        action: ({ rootComponent }) => {
          //console.log('this is root element', rootElement);
          runCommand(rootComponent, 'affine:paragraph', 'text');
        },
      },
      {
        title: 'Heading 1',
        description: 'A Large Heading.',
        icon: h1,
        action: ({ rootComponent }) => {
          //console.log('this is root element', rootElement);
          runCommand(rootComponent, 'affine:paragraph', 'h1');
        },
      },
      {
        title: 'Heading 2',
        description: 'A Medium Heading.',
        icon: h2,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:paragraph', 'h2');
        },
      },
      {
        title: 'Heading 3',
        description: 'A Small Heading',
        icon: h3,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:paragraph', 'h3');
        },
      },
      {
        title: 'Bulleted List',
        description: 'Normal text + Bullet',
        icon: bulleted_list,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:list', 'bulleted');
        },
      },
      {
        title: 'Numbered List',
        description: 'Normal text + Number',
        icon: numbered_list,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:list', 'numbered');
        },
      },
      {
        title: 'Check List',
        description: 'Normal text + Checkbox',
        icon: check_list,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:list', 'todo');
        },
      },
      {
        title: 'Quote',
        description: 'Description',
        icon: quote,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:paragraph', 'quote');
        },
      },
      /* {
        title: 'Hint',
        description: 'Description',
        icon: hint,
        action: ({ rootComponent }) => {
          //console.log('rootElement', rootElement);
          //console.log('rootElement', rootComponent);
          //console.log('model', model);
          rootComponent.host.std.command
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

        },
      }*/
    ],
  },
  {
    groupName: 'Insert',
    children: [
      /*{
        title: 'Mention',
        description: 'Description',
        icon: mention,
        action: ({ rootComponent, model }) => {
          const triggerKey = '@';
          insertContent(rootComponent.host, model, triggerKey);
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
              rootComponent.host,
              model
            );
            assertExists(inlineEditor);
            mentionWidget.showMention(inlineEditor, triggerKey);
            //linkedDocWidget.showLinkedDoc(inlineEditor, triggerKey);
          });
        },
      },*/
      {
        title: 'Date',
        description: 'Description',
        icon: date,
        action: ({ rootComponent, model }) => {
          const triggerKey = dayjs().format('YYYY-MM-DD');

          const temp = {
            date: triggerKey,
            time: null,
            id: uuidv4(),
          };
          insertContent(rootComponent.host, model, REFERENCE_NODE, {
            date: temp,
          });
          assertExists(model.doc.root);
          const widgetEle =
            rootComponent.widgetComponents['affine-date-time-widget'];
          assertExists(widgetEle);
          // We have checked the existence of showLinkedDoc method in the showWhen
          const dateWidget = widgetEle as AffineDateTimeWidget;
          // Wait for range to be updated
          setTimeout(() => {
            const inlineEditor = getInlineEditorByModel(
              rootComponent.host,
              model
            );
            assertExists(inlineEditor);
            dateWidget.showDateTime(inlineEditor, triggerKey);
          });
        },
      },
      /*{
        title: 'Today',
        description: 'Description',
        icon: today,
        action: ({ rootComponent, model }) => {
          const date = new Date();
          insertContent(rootComponent.host, model, formatDate(date));
        },
      },*/
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
        action: ({ rootComponent, model }) => {
          //return;
          const parent = rootComponent.doc.getParent(model);
          assertExists(parent);
          const index = parent.children.indexOf(model);

          const id = rootComponent.doc.addBlock(
            'affine:database',
            {},
            rootComponent.doc.getParent(model),
            index + 1
          );
          const service = rootComponent.std.spec.getService('affine:database');
          service.initDatabaseBlock(
            rootComponent.doc,
            model,
            id,
            viewPresets.tableViewConfig,
            false
          );
          tryRemoveEmptyLine(model);
        },
      },
      {
        title: 'Divider',
        description: 'Description',
        icon: divider,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:divider', 'divider');
        },
      },
      /*{
        title: 'Image',
        description: 'Description',
        icon: image,
        action: async ({ rootComponent, model }) => {
          //old method
          const parent = rootComponent.doc.getParent(model);
          if (!parent) {
            return;
          }
          const imageFiles = await getImageFilesFromLocal();
          if (!imageFiles.length) return;
          const imageService =
            rootComponent.host.spec.getService('affine:image');
          const maxFileSize = imageService.maxFileSize;
          addSiblingImageBlock(
            rootComponent.host,
            imageFiles,
            maxFileSize,
            model
          );
          tryRemoveEmptyLine(model);
          rootComponent.doc.addBlock('affine:paragraph', {}, parent);

          /!*const parent = rootElement.doc.getParent(model);
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
          tryRemoveEmptyLine(model);*!/
        },
      },*/
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
      /* {
        title: 'Code',
        description: 'Description',
        icon: code,
        action: ({ rootComponent }) => {
          runCommand(rootComponent, 'affine:code');
        },
      },*/

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
    groupName: 'Media',
    children: [
      {
        title: 'Attachment',
        description: 'Attachment  Description',
        icon: file,
        action: async ({ rootComponent, model }) => {
          const file = await openFileOrFiles();
          if (!file) return;
          const attachmentService =
            rootComponent.host.spec.getService('affine:attachment');
          assertExists(attachmentService);
          const maxFileSize = attachmentService.maxFileSize;

          await addSiblingAttachmentBlocks(
            rootComponent.host,
            [file],
            maxFileSize,
            model
          );
          tryRemoveEmptyLine(model);
        },
      },
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
  {
    groupName: 'Object',
    children: [
      {
        title: 'Page',
        description: 'Create a page or link an existing one.',
        icon: notebook,
        action: ({ rootComponent, model }) => {
          //rootComponent.doc.deleteBlock(model)
          openObjectPicker(rootComponent, model, 'document');
        },
      },
      {
        title: 'File',
        description: 'Create a file or link an existing one.',
        icon: tabler_files,
        action: ({ rootComponent, model }) => {
          openObjectPicker(rootComponent, model, 'file');
        },
      },
      {
        title: 'Image',
        description: 'Upload a image or link an existing one.',
        icon: file,
        action: ({ rootComponent, model }) => {
          openObjectPicker(rootComponent, model, 'image');
        },
      },
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

function openObjectPicker(
  rootComponent: RootBlockComponent,
  model: BlockModel,
  obj_type: IObjectType
) {
  //console.log('111', rootComponent.host);
  /*rootComponent.host.std.command
    .chain()
    .updateBlockType({
      flavour: 'affine:code',
      props: {},
      //props: { type },
    })
    .inline((ctx, next) => {
      const newModels = ctx.updatedBlocks;
      if (!newModels) {
        return false;
      }
      // Reset selection if the target is code block
      if (['affine:code'].includes('affine:code')) {
        if (newModels.length !== 1) {
          console.error("Failed to reset selection! New model length isn't 1");
          return false;
        }
        const codeModel = newModels[0];
        onModelTextUpdated(rootComponent.host, codeModel, richText => {
          const inlineEditor = richText.inlineEditor;
          assertExists(inlineEditor);
          inlineEditor.focusEnd();
        }).catch(console.error);
      }
      //console.log('next - change inline menu');
      return next();
    })
    .run();

  return;*/

  const triggerKey = '';
  const widgetEle =
    // @ts-ignore
    rootComponent.widgetComponents['affine-mahdaad-object-picker-widget'];
  assertExists(widgetEle);
  // We have checked the existence of showLinkedDoc method in the showWhen
  const objectPickerWidget = widgetEle as AffineMahdaadObjectPickerWidget;
  // Wait for range to be updated
  setTimeout(() => {
    const inlineEditor = getInlineEditorByModel(rootComponent.host, model);
    assertExists(inlineEditor);
    objectPickerWidget.showObjectPicker(
      inlineEditor,
      triggerKey,
      obj_type,
      model
    );
  });

  /*setTimeout(() => {
    const inlineEditor = getInlineEditorByModel(rootElement.host, model);
    assertExists(inlineEditor);
    linkedDocWidget.showLinkedDoc(inlineEditor, triggerKey);
  });*/
}

function runCommand(
  rootComponent: RootBlockComponent,
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
  rootComponent.host.std.command
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
        onModelTextUpdated(rootComponent.host, codeModel, richText => {
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

