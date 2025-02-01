import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';

import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';

import type { MahdaadCalloutBlockService } from './callout-service.js';


export class MahdaadCalloutBlockComponent extends BlockComponent<
  MahdaadCalloutBlockModel,
  MahdaadCalloutBlockService
> {
  static override styles = css`
    .affine-note-block-container {
      display: flow-root;
    }
    .affine-note-block-container.selected {
      background-color: var(--affine-hover-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  override renderBlock() {
    return html`
      <div class="affine-note-block-container" style="border: 1px solid red;padding-left: 15px">
        <div class="affine-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-callout': MahdaadCalloutBlockComponent;
  }
}
