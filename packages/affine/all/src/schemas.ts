/** ok-alighasami for check merge **/
//ali ghasami-check version 3
// Import models only, the bundled file should not include anything else.
import { DataViewBlockSchema } from '@blocksuite/affine-block-data-view';
import { SurfaceBlockSchema } from '@blocksuite/affine-block-surface';
import {
  AttachmentBlockSchema,
  BookmarkBlockSchema,
  CalloutBlockSchema,
  CodeBlockSchema,
  DatabaseBlockSchema,
  DividerBlockSchema,
  EdgelessTextBlockSchema,
  EmbedFigmaBlockSchema,
  EmbedGithubBlockSchema,
  EmbedHtmlBlockSchema,
  EmbedLinkedDocBlockSchema,
  EmbedLoomBlockSchema,
  EmbedSyncedDocBlockSchema,
  EmbedYoutubeBlockSchema,
  FrameBlockSchema,
  ImageBlockSchema,
  LatexBlockSchema,
  ListBlockSchema,
  MahdaadCalloutBlockSchema,
  MahdaadMultiColumnBlockSchema,
  MahdaadTableOfContentBlockSchema,
  MahdaadWeblinkBlockSchema,
  NoteBlockSchema,
  ObjectBlockSchema,
  ParagraphBlockSchema,
  RootBlockSchema,
  SurfaceRefBlockSchema,
  TableBlockSchema,
  TranscriptionBlockSchema,
} from '@blocksuite/affine-model';

import { DataViewBlockSchema } from './data-view-block/data-view-model.js';
import { HintBlockSchema } from './hint-block/hint-model.js';

import type { BlockSchema } from '@blocksuite/store';
import type { z } from 'zod';

/** Built-in first party block models built for affine */
export const AffineSchemas: z.infer<typeof BlockSchema>[] = [
  CodeBlockSchema,
  ParagraphBlockSchema,
  RootBlockSchema,
  ListBlockSchema,
  NoteBlockSchema,
  DividerBlockSchema,
  ImageBlockSchema,
  SurfaceBlockSchema,
  BookmarkBlockSchema,
  FrameBlockSchema,
  DatabaseBlockSchema,
  SurfaceRefBlockSchema,
  DataViewBlockSchema,
  AttachmentBlockSchema,
  EmbedYoutubeBlockSchema,
  EmbedFigmaBlockSchema,
  EmbedGithubBlockSchema,
  EmbedHtmlBlockSchema,
  EmbedLinkedDocBlockSchema,
  EmbedSyncedDocBlockSchema,
  EmbedLoomBlockSchema,
  EdgelessTextBlockSchema,
  LatexBlockSchema,
  HintBlockSchema,
  ObjectBlockSchema,
  MahdaadWeblinkBlockSchema,
  MahdaadCalloutBlockSchema,
  MahdaadMultiColumnBlockSchema,
  MahdaadTableOfContentBlockSchema,
  TableBlockSchema,
  CalloutBlockSchema,
  TranscriptionBlockSchema,
];
