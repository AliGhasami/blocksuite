import {
  BlockViewExtension,
  type ExtensionType,
  FlavourExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

export const TestBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:test-block'),
  //ObjectBlockService,
  BlockViewExtension('affine:test-block', literal`affine-test-block`),
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
  //ObjectDragHandleOption,
  //ImageSelectionExtension,
];

