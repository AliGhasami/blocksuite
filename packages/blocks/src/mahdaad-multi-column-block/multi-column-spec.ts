import {
  BlockViewExtension, CommandExtension,
  // CommandExtension,
  type ExtensionType,
  FlavourExtension,
  // WidgetViewMapExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import {mahdaadCalloutCommands} from './commands/index.js'
// import {ObjectBlockService,ObjectDragHandleOption} from './object-service.js'



export const MahdaadMultiColumnBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:mahdaad-multi-column'),
  // ObjectBlockService,
  CommandExtension(mahdaadCalloutCommands),
  BlockViewExtension('affine:mahdaad-multi-column', literal`affine-mahdaad-multi-column`),
  // ObjectDragHandleOption,
];

