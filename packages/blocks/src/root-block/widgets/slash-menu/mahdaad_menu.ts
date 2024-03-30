import { assertExists } from '@blocksuite/global/utils';
import type { BlockModel } from '@blocksuite/store';

import type { RootBlockComponent } from '../../types.js';
import { onModelTextUpdated } from '../../utils/index.js';
import bulleted_list from './icons/bulleted_list.svg?raw';
import check_list from './icons/check_list.svg?raw';
import divider from './icons/divider.svg?raw';
import h1 from './icons/h1.svg?raw';
import h2 from './icons/h2.svg?raw';
import h3 from './icons/h3.svg?raw';
import numbered_list from './icons/numbered_list.svg?raw';
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
        title: 'Heading 1',
        description: 'Big Heading.',
        icon: h1,
        action: ({ rootElement }) => {
          //console.log('this is root element', rootElement);
          runCommand(rootElement, 'affine:paragraph', 'h1');
        },
      },
      {
        title: 'Heading 2',
        description: 'Medium Heading.',
        icon: h2,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'h2');
        },
      },
      {
        title: 'Heading 3',
        description: 'Small Heading',
        icon: h3,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'h3');
        },
      },
      {
        title: 'Bulleted List',
        description: 'Description Bulleted List',
        icon: bulleted_list,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:list', 'bulleted');
        },
      },
      {
        title: 'Numbered List',
        description: 'Description ',
        icon: numbered_list,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:list', 'numbered');
        },
      },
      {
        title: 'Check List',
        description: 'Description',
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
        description: 'Description Quote',
        icon: h1,
        action: ({ rootElement }) => {
          runCommand(rootElement, 'affine:paragraph', 'quote');
        },
      },
      {
        title: 'Divider',
        description: 'Description Divider',
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
        icon: h1,
        action: ({ rootElement, model }) => {
          const date = new Date();
          insertContent(rootElement.host, model, formatDate(date));
        },
      },
      {
        title: 'Today',
        description: 'Description',
        icon: h1,
        action: ({ rootElement, model }) => {
          const date = new Date();
          insertContent(rootElement.host, model, formatDate(date));
        },
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
  //todo
  /*{
    groupName: 'Embed',
    children: [
      {
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
      },
    ],
  },*/
];

function runCommand(
  rootElement: RootBlockComponent,
  flavour: BlockSuite.Flavour,
  type: string
) {
  console.log('this is root element', rootElement);
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
