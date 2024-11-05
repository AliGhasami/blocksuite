import type { InlineRange } from '@blocksuite/inline';

import type { AffineInlineEditor } from '../../../affine-inline-specs.js';

import './link-popup.js';
import { MahdaadWebLinkPopup } from './link-popup.js';

export function toggleLinkPopup(
  inlineEditor: AffineInlineEditor,
  type: MahdaadWebLinkPopup['type'],
  targetInlineRange: InlineRange,
  abortController: AbortController
): MahdaadWebLinkPopup {
  const popup = new MahdaadWebLinkPopup();
  popup.inlineEditor = inlineEditor;
  popup.type = type;
  popup.targetInlineRange = targetInlineRange;
  popup.abortController = abortController;
  document.body.append(popup);
  return popup;
}
