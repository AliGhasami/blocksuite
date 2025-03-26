import {
  BlockViewExtension, CommandExtension,
  // CommandExtension,
  type ExtensionType,
  FlavourExtension,
  // WidgetViewMapExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

// import {mahdaadCalloutCommands} from './commands/index.js'
// import {ObjectBlockService,ObjectDragHandleOption} from './object-service.js'



export const MahdaadTableOfContentBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:mahdaad-table-of-content'),
  // ObjectBlockService,
  // CommandExtension(mahdaadCalloutCommands),
  BlockViewExtension('affine:mahdaad-table-of-content', literal`affine-mahdaad-table-of-content`),
  // ObjectDragHandleOption,
];

