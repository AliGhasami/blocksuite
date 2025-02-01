import {
  BlockViewExtension,
  CommandExtension,
  type ExtensionType,
  FlavourExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { calloutDragHandleOption } from './callout-service.js';
/*import {
  DocNoteBlockAdapterExtensions,
} from './adapters/index.js';*/
import { calloutCommands } from './commands/index.js';

export const MahdaadCalloutBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:mahdaad-callout'),
  calloutDragHandleOption,
  CommandExtension(calloutCommands),
  BlockViewExtension('affine:mahdaad-callout', literal`affine-mahdaad-callout`),
  //DocNoteBlockAdapterExtensions,
].flat();

/*export const EdgelessNoteBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:note'),
  NoteBlockService,
  CommandExtension(commands),
  BlockViewExtension('affine:note', literal`affine-edgeless-note`),
  NoteDragHandleOption,
  EdgelessNoteBlockAdapterExtensions,
].flat();*/
