import {
  BlockViewExtension,
  CommandExtension,
  type ExtensionType,
  FlavourExtension,
  WidgetViewMapExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
//import { literal } from 'lit/static-html.js';
import {ObjectBlockService,ObjectDragHandleOption} from './object-service.js'
//import { ImageBlockService, ImageDragHandleOption } from '../image-block/index.js';
//import { commands } from '../image-block/commands/index.js';
//import { ImageSelectionExtension } from '@blocksuite/affine-shared/selection';

/*
export const ObjectBlockSpec: BlockSpec = {
  schema: ObjectBlockSchema,
  view: {
    component:
  },
};
*/


export const ObjectBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:mahdaad-object'),
  ObjectBlockService,
  BlockViewExtension('affine:mahdaad-object', literal`affine-mahdaad-object`),
  //CommandExtension(commands),
  /*BlockViewExtension('affine:image', model => {
    const parent = model.doc.getParent(model.id);

    if (parent?.flavour === 'affine:surface') {
      return literal`affine-edgeless-image`;
    }

    return literal`affine-image`;
  }),*/
  /*WidgetViewMapExtension('affine:mahdaad-object', {
    imageToolbar: literal`affine-image-toolbar-widget`,
  }),*/
  ObjectDragHandleOption,
  //ImageSelectionExtension,
];

