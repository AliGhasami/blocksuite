import { type BlockModel, Slice } from '@blocksuite/store';
import { html, nothing } from 'lit';
import { ref, type RefOrCallback } from 'lit/directives/ref.js';

import { toast } from '../../_common/components/toast.js';
import {
  CancelWrapIcon,
  CopyIcon,
  DeleteIcon,
  WrapIcon,
} from '../../_common/icons/index.js';
import { HighlightButton } from './highlight-button.js';
//import type { CodeBlockComponent } from '../code-block.js';

export function HintOptionTemplate({
  ref: containerRef,
  model,
  wrap,
  onClickWrap,
  anchor,
}: {
  ref?: RefOrCallback;
  //anchor: CodeBlockComponent;
  model: BlockModel;
  wrap: boolean;
  abortController: AbortController;
  onClickWrap: () => void;
}) {
  const page = model.doc;
  const readonly = page.readonly;

  return html`
    <style>
      :host {
        z-index: 1;
      }
      .affine-codeblock-option {
        box-shadow: var(--affine-shadow-2);
        padding: 8px;
        border-radius: 8px;
        z-index: var(--affine-z-index-popover);
        background: var(--affine-background-overlay-panel-color);
      }
      .delete-code-button:hover {
        background: var(--affine-background-error-color);
        color: var(--affine-error-color);
      }
      .delete-code-button:hover > svg {
        color: var(--affine-error-color);
      }
    </style>

    <div ${ref(containerRef)} class="affine-codeblock-option">
      11111111111111111
      <div style="position: relative">
        <div style="position: absolute">55555</div>
        111111
      </div>
      ${HighlightButton(anchor)}
      <my-foo></my-foo>
    </div>
  `;
}
