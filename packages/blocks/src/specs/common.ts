import type { BlockSpec } from '@blocksuite/block-std';

import { AttachmentBlockSpec } from '../attachment-block/attachment-spec.js';
import { BookmarkBlockSpec } from '../bookmark-block/bookmark-spec.js';
import { CodeBlockSpec } from '../code-block/code-block-spec.js';
import { DataViewBlockSpec } from '../data-view-block/data-view-spec.js';
import { DatabaseBlockSpec } from '../database-block/database-spec.js';
import { DividerBlockSpec } from '../divider-block/divider-spec.js';
import { EmbedFigmaBlockSpec } from '../embed-figma-block/embed-figma-spec.js';
import { EmbedGithubBlockSpec } from '../embed-github-block/embed-github-spec.js';
import { EmbedHtmlBlockSpec } from '../embed-html-block/embed-html-spec.js';
import { EmbedLinkedDocBlockSpec } from '../embed-linked-doc-block/embed-linked-doc-spec.js';
import { EmbedLoomBlockSpec } from '../embed-loom-block/embed-loom-spec.js';
import { EmbedSyncedDocBlockSpec } from '../embed-synced-doc-block/embed-synced-doc-spec.js';
import { EmbedYoutubeBlockSpec } from '../embed-youtube-block/embed-youtube-spec.js';
import { HintBlockSpec } from '../hint-block/hint-block-spec.js';
/** disable for claytap */
//import { ImageBlockSpec } from '../image-block/image-spec.js';
import { ListBlockSpec } from '../list-block/list-spec.js';
import { ObjectBlockSpec } from '../mahdaad-object-block/object-spec.js';
import {
  EdgelessNoteBlockSpec,
  NoteBlockSpec,
} from '../note-block/note-spec.js';
import { ParagraphBlockSpec } from '../paragraph-block/paragraph-spec.js';

export const CommonFirstPartyBlockSpecs: BlockSpec[] = [
  ListBlockSpec,
  NoteBlockSpec,
  DatabaseBlockSpec,
  DataViewBlockSpec,
  DividerBlockSpec,
  CodeBlockSpec,
  /** disable for claytap */
  //ImageBlockSpec,
  ParagraphBlockSpec,
  BookmarkBlockSpec,
  AttachmentBlockSpec,
  EmbedFigmaBlockSpec,
  EmbedGithubBlockSpec,
  EmbedYoutubeBlockSpec,
  EmbedLoomBlockSpec,
  EmbedHtmlBlockSpec,
  EmbedSyncedDocBlockSpec,
  EmbedLinkedDocBlockSpec,
  HintBlockSpec,
  ObjectBlockSpec,
];

export const EdgelessFirstPartyBlockSpecs: BlockSpec[] = [
  ListBlockSpec,
  EdgelessNoteBlockSpec,
  DatabaseBlockSpec,
  DataViewBlockSpec,
  DividerBlockSpec,
  CodeBlockSpec,
  /** disable for claytap */
  //ImageBlockSpec,
  ParagraphBlockSpec,
  BookmarkBlockSpec,
  AttachmentBlockSpec,
  EmbedFigmaBlockSpec,
  EmbedGithubBlockSpec,
  EmbedYoutubeBlockSpec,
  EmbedLoomBlockSpec,
  EmbedHtmlBlockSpec,
  EmbedSyncedDocBlockSpec,
  EmbedLinkedDocBlockSpec,
  ObjectBlockSpec,
];
