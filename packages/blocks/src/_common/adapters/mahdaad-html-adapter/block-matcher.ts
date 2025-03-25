import type { ExtensionType } from '@blocksuite/block-std';

/*import {
  EmbedFigmaBlockHtmlAdapterExtension,
  embedFigmaBlockHtmlAdapterMatcher,
  EmbedGithubBlockHtmlAdapterExtension,
  embedGithubBlockHtmlAdapterMatcher,
  embedLinkedDocBlockHtmlAdapterMatcher,
  EmbedLinkedDocHtmlAdapterExtension,
  EmbedLoomBlockHtmlAdapterExtension,
  embedLoomBlockHtmlAdapterMatcher,
  EmbedSyncedDocBlockHtmlAdapterExtension,
  embedSyncedDocBlockHtmlAdapterMatcher,
  EmbedYoutubeBlockHtmlAdapterExtension,
  embedYoutubeBlockHtmlAdapterMatcher,
} from '@blocksuite/affine-block-embed';
import {
  ListBlockHtmlAdapterExtension,
  listBlockHtmlAdapterMatcher,
} from '@blocksuite/affine-block-list';*/

import {
  MahdaadListBlockHtmlAdapterExtension,
  mahdaadListBlockHtmlAdapterMatcher
} from '@blocksuite/affine-block-list';
import {
  MahdaadParagraphBlockHtmlAdapterExtension,
  //ParagraphBlockHtmlAdapterExtension,
  //paragraphBlockHtmlAdapterMatcher,
  mahdaadParagraphBlockHtmlAdapterMatcher
} from '@blocksuite/affine-block-paragraph';

import {MahdaadAttachmentBlockHtmlAdapterExtension,mahdaadAttachmentBlockHtmlAdapterMatcher} from '../../../attachment-block/adapters/mahdaad-html.js'
import {
  MahdaadDatabaseBlockHtmlAdapterExtension,
  mahdaadDatabaseBlockHtmlAdapterMatcher,
} from '../../../database-block/adapters/mahdaad-html.js';
import {
  MahdaadDividerBlockHtmlAdapterExtension,
  mahdaadDividerBlockHtmlAdapterMatcher
} from '../../../divider-block/adapters/mahdaad-html.js';
import {MahdaadObjectBlockHtmlAdapterExtension ,mahdaadObjectBlockHtmlAdapterMatcher} from '../../../mahdaad-object-block/adapters/mahdaad-html.js'
import {MahdaadMultiColumnBlockHtmlAdapterExtension,mahdaadMultiColumnBlockHtmlAdapterMatcher} from '../../../mahdaad-multi-column-block/adapters/mahdaad-html.js'
import {MahdaadTableOfContentBlockHtmlAdapterExtension,mahdaadTableOfContentBlockHtmlAdapterMatcher} from '../../../mahdaad-table-of-content/adapters/mahdaad-html.js'
import {MahdaadNoteBlockHtmlAdapterExtension,mahdaadNoteBlockHtmlAdapterMatcher} from '../../../note-block/adapters/mahdaad-html.js'
import {MahdaadWeblinkBlockHtmlAdapterExtension,mahdaadWeblinkBlockHtmlAdapterMatcher} from '../../../mahdaad-weblink-block/adapters/mahdaad-html.js'
import {
  MahdaadRootBlockHtmlAdapterExtension,
  mahdaadRootBlockHtmlAdapterMatcher
} from '../../../root-block/adapters/mahdaad-html.js';
import {
  MahdaadCalloutBlockHtmlAdapterExtension,
  mahdaadCalloutBlockHtmlAdapterMatcher,
} from '../../../mahdaad-callout-block/adapters/index.js';


/*import {
  BookmarkBlockHtmlAdapterExtension,
  bookmarkBlockHtmlAdapterMatcher,
} from '../../../bookmark-block/adapters/html.js';
import {
  CodeBlockHtmlAdapterExtension,
  codeBlockHtmlAdapterMatcher,
} from '../../../code-block/adapters/html.js';
import {
  DatabaseBlockHtmlAdapterExtension,
  databaseBlockHtmlAdapterMatcher,
} from '../../../database-block/adapters/html.js';
import {
  DividerBlockHtmlAdapterExtension,
  dividerBlockHtmlAdapterMatcher,
} from '../../../divider-block/adapters/html.js';
import {
  ImageBlockHtmlAdapterExtension,
  imageBlockHtmlAdapterMatcher,
} from '../../../image-block/adapters/html.js';
*/




export const mahdaadDefaultBlockHtmlAdapterMatchers = [
  mahdaadRootBlockHtmlAdapterMatcher,
  mahdaadParagraphBlockHtmlAdapterMatcher,
  mahdaadListBlockHtmlAdapterMatcher,
  mahdaadObjectBlockHtmlAdapterMatcher,
  mahdaadDividerBlockHtmlAdapterMatcher,
  mahdaadWeblinkBlockHtmlAdapterMatcher,
  mahdaadAttachmentBlockHtmlAdapterMatcher,
  mahdaadDatabaseBlockHtmlAdapterMatcher,
  mahdaadCalloutBlockHtmlAdapterMatcher,
  mahdaadMultiColumnBlockHtmlAdapterMatcher,
  mahdaadNoteBlockHtmlAdapterMatcher,
  mahdaadTableOfContentBlockHtmlAdapterMatcher
  //listBlockHtmlAdapterMatcher,
  /*codeBlockHtmlAdapterMatcher,
  dividerBlockHtmlAdapterMatcher,
  imageBlockHtmlAdapterMatcher,
  rootBlockHtmlAdapterMatcher,
  embedYoutubeBlockHtmlAdapterMatcher,
  embedFigmaBlockHtmlAdapterMatcher,
  embedLoomBlockHtmlAdapterMatcher,
  embedGithubBlockHtmlAdapterMatcher,
  bookmarkBlockHtmlAdapterMatcher,
  databaseBlockHtmlAdapterMatcher,
  embedLinkedDocBlockHtmlAdapterMatcher,
  embedSyncedDocBlockHtmlAdapterMatcher,*/
];

export const mahdaadBlockHtmlAdapterExtensions: ExtensionType[] = [
  MahdaadRootBlockHtmlAdapterExtension,
  MahdaadParagraphBlockHtmlAdapterExtension,
  MahdaadListBlockHtmlAdapterExtension,
  MahdaadObjectBlockHtmlAdapterExtension,
  MahdaadDividerBlockHtmlAdapterExtension,
  MahdaadWeblinkBlockHtmlAdapterExtension,
  MahdaadAttachmentBlockHtmlAdapterExtension,
  MahdaadDatabaseBlockHtmlAdapterExtension,
  MahdaadCalloutBlockHtmlAdapterExtension,
  MahdaadMultiColumnBlockHtmlAdapterExtension,
  MahdaadNoteBlockHtmlAdapterExtension,
  MahdaadTableOfContentBlockHtmlAdapterExtension
  /*ListBlockHtmlAdapterExtension,
  ParagraphBlockHtmlAdapterExtension,
  CodeBlockHtmlAdapterExtension,
  DividerBlockHtmlAdapterExtension,
  ImageBlockHtmlAdapterExtension,
  RootBlockHtmlAdapterExtension,
  EmbedYoutubeBlockHtmlAdapterExtension,
  EmbedFigmaBlockHtmlAdapterExtension,
  EmbedLoomBlockHtmlAdapterExtension,
  EmbedGithubBlockHtmlAdapterExtension,
  BookmarkBlockHtmlAdapterExtension,
  DatabaseBlockHtmlAdapterExtension,
  EmbedLinkedDocHtmlAdapterExtension,
  EmbedSyncedDocBlockHtmlAdapterExtension,*/
];
