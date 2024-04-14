import { assertExists } from '@blocksuite/global/utils';
import type { BlockModel } from '@blocksuite/store';

import type { RootBlockComponent } from '../../types.js';
import { onModelTextUpdated } from '../../utils/index.js';
import accordion_h1 from './icons/accordion_h1.svg?raw';
import accordion_h2 from './icons/accordion_h2.svg?raw';
import accordion_h3 from './icons/accordion_h3.svg?raw';
import audio from './icons/audio.svg?raw';
import bread_crumb from './icons/bread_crumb.svg?raw';
import bulleted_list from './icons/bulleted_list.svg?raw';
import button_link from './icons/button_link.svg?raw';
import check_list from './icons/check_list.svg?raw';
import code from './icons/code.svg?raw';
import date from './icons/date.svg?raw';
import divider from './icons/divider.svg?raw';
import empty_title from './icons/empty_title.svg?raw';
import file from './icons/file.svg?raw';
import h1 from './icons/h1.svg?raw';
import h2 from './icons/h2.svg?raw';
import h3 from './icons/h3.svg?raw';
import hint from './icons/hint.svg?raw';
import image from './icons/image.svg?raw';
import link from './icons/link.svg?raw';
import link_to_page from './icons/link_to_page.svg?raw';
import mention from './icons/mention.svg?raw';
import multi_column from './icons/multi_column.svg?raw';
import numbered_list from './icons/numbered_list.svg?raw';
import quote from './icons/quote.svg?raw';
import table_of_content from './icons/table_of_content.svg?raw';
import table_view from './icons/table_view.svg?raw';
import text from './icons/text.svg?raw';
import today from './icons/today.svg?raw';
import video from './icons/video.svg?raw';
import { formatDate, insertContent } from './utils.js';
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
      //TODO(@alighasami) implement after
      /*{
        title: 'Hint',
        description: 'Description',
        icon: check_list,
        action: ({ rootElement }) => {
          //console.log(1111);
        },
      },*/
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
        action: ({ rootElement }) => {},
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
          runCommand(rootElement, 'affine:mention', 'mention');
          //runCommand(rootElement, 'affine:mention', 'mention');
          //runCommand(rootElement, 'affine:mention', 'h1');
        },
      },
      //todo for implement
      /*{
        title: 'Calendar',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {
        },
      },*/
      {
        title: 'Date',
        description: 'Description',
        icon: date,
        action: ({ rootElement, model }) => {
          const date = new Date();
          insertContent(rootElement.host, model, formatDate(date));
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
      {
        title: 'Link To Page',
        description: 'Description',
        icon: link_to_page,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Table View',
        description: 'Description',
        icon: table_view,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Image',
        description: 'Description',
        icon: image,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Video',
        description: 'Description',
        icon: video,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Audio',
        description: 'Description',
        icon: audio,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Code',
        description: 'Description',
        icon: code,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'File',
        description: 'Description',
        icon: file,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Link',
        description: 'Description',
        icon: link,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Table Of Content',
        description: 'Description',
        icon: table_of_content,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Button Link',
        description: 'Description',
        icon: button_link,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Bread Crumb',
        description: 'Description',
        icon: bread_crumb,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Accordion Heading 1',
        description: 'Description',
        icon: accordion_h1,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Accordion Heading 2',
        description: 'Description',
        icon: accordion_h2,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Accordion Heading 3',
        description: 'Description',
        icon: accordion_h3,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Multi Column',
        description: 'Description',
        icon: multi_column,
        action: ({ rootElement, model }) => {},
      },
      //todo
      /*{
        title: 'Sketch',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /* {
        title: 'Table',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /* {
        title: 'Table of Content',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /*{
        title: 'Mention',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /*{
        title: 'Link',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /*{
        title: 'Image',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /*{
        title: 'Video',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
      //todo
      /*{
        title: 'Code blank',
        description: 'Description',
        icon: h1,
        action: ({ rootElement }) => {},
      },*/
    ],
  },
  {
    groupName: 'Embed',
    children: [
      {
        title: 'Title ',
        description: 'Description',
        icon: empty_title,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Title  ',
        description: 'Description',
        icon: empty_title,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Title   ',
        description: 'Description',
        icon: empty_title,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Title     ',
        description: 'Description',
        icon: empty_title,
        action: ({ rootElement, model }) => {},
      },
      {
        title: 'Title         ',
        description: 'Description',
        icon: empty_title,
        action: ({ rootElement, model }) => {},
      },
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
  type: string
) {
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
      if (flavour === 'affine:code') {
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

      return next();
    })
    .run();
}
