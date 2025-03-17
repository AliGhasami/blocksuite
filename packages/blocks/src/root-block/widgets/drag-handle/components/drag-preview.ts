import type { EditorHost } from '@blocksuite/block-std';
import type { TemplateResult } from 'lit';

import { ShadowlessElement } from '@blocksuite/block-std';
import { Point } from '@blocksuite/global/utils';
import { baseTheme } from '@toeverything/theme';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

export class DragPreview extends ShadowlessElement {
  offset: Point;

  constructor(offset?: Point) {
    super();
    this.offset = offset ?? new Point(0, 0);
  }

  override disconnectedCallback() {
    if (this.onRemove) {
      this.onRemove();
    }
    super.disconnectedCallback();
  }

  override render() {
    return html`<style>
        affine-drag-preview {
          //background-color: red;
          box-sizing: border-box;
          position: absolute;
          display: block;
          //height: auto;
          //font-family: ${baseTheme.fontSansFamily};
          //font-size: var(--affine-font-base);
          //line-height: var(--affine-line-height);
          //color: var(--affine-text-primary-color);
          //font-weight: 400;
          top: 0;
          left: 0;
          transform-origin: 0 0;
         // opacity: 0.5;
          user-select: none;
          pointer-events: none;
          caret-color: transparent;
          z-index: 3;
        }

        .affine-drag-preview-grabbing * {
          cursor: grabbing !important;
        }</style
      ><!--${this.template}-->
      <div>
        <span class="hint">
          ${this.text ?? '-'}
        </span>
        ${ this.tooltipMessage ? 
            html`<div class="tooltip-message" >${this.tooltipMessage}</div>` : nothing
          }
        
      </div>
    `;
  }

  @property({ attribute: false })
  accessor onRemove: (() => void) | null = null;

  @property({ attribute: false })
  accessor template: TemplateResult | EditorHost | null = null;

  @property({ attribute: false })
  accessor text: string= '-';

  @property({ attribute: false })
  accessor tooltipMessage: string= '';


}

declare global {
  interface HTMLElementTagNameMap {
    'affine-drag-preview': DragPreview;
  }
}
