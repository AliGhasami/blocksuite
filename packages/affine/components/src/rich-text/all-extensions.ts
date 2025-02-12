import type { ExtensionType } from '@blocksuite/block-std';

import { InlineManagerExtension } from './extension/index.js';
import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  InlineSpecExtensions,
  ItalicInlineSpecExtension,
  LatexInlineSpecExtension,
  LinkInlineSpecExtension,
  MahdaadDateTimeSpecExtension,
  MahdaadMentionSpecExtension,
  MahdaadObjectLinkSpecExtension,
  MarkdownExtensions,
  ReferenceInlineSpecExtension,
  StrikeInlineSpecExtension,
  TestInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from './inline/index.js';
import { LatexEditorInlineManagerExtension } from './inline/presets/nodes/latex-node/latex-editor-menu.js';

export const DefaultInlineManagerExtension = InlineManagerExtension({
  id: 'DefaultInlineManager',
  specs: [
    BoldInlineSpecExtension.identifier,
    ItalicInlineSpecExtension.identifier,
    UnderlineInlineSpecExtension.identifier,
    StrikeInlineSpecExtension.identifier,
    CodeInlineSpecExtension.identifier,
    BackgroundInlineSpecExtension.identifier,
    ColorInlineSpecExtension.identifier,
    LatexInlineSpecExtension.identifier,
    ReferenceInlineSpecExtension.identifier,
    LinkInlineSpecExtension.identifier,
    MahdaadMentionSpecExtension.identifier,
    MahdaadObjectLinkSpecExtension.identifier,
    MahdaadDateTimeSpecExtension.identifier,
    TestInlineSpecExtension.identifier,
  ],
});

export const RichTextExtensions: ExtensionType[] = [
  InlineSpecExtensions,
  MarkdownExtensions,
  LatexEditorInlineManagerExtension,
  DefaultInlineManagerExtension,
].flat();
