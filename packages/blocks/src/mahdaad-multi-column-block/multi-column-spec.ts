import {
  BlockViewExtension,
  // CommandExtension,
  type ExtensionType,
  FlavourExtension,
  // WidgetViewMapExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
// import {ObjectBlockService,ObjectDragHandleOption} from './object-service.js'



export const MahdaadMultiColumnBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:mahdaad-multi-column'),
  // ObjectBlockService,
  BlockViewExtension('affine:mahdaad-multi-column', literal`affine-mahdaad-multi-column`),

  // ObjectDragHandleOption,
];

