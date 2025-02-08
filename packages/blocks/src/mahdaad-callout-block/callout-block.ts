import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';

import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import type { MahdaadCalloutBlockService } from './callout-service.js';


export class MahdaadCalloutBlockComponent extends BlockComponent<
  MahdaadCalloutBlockModel,
  MahdaadCalloutBlockService
> {
  /*static override properties = {
    isReady: { type: Boolean },
  };*/

  // static override properties = {
  //   _isLoad: { type: Boolean, state: true },
  // };

  static override styles = css`
    .affine-note-block-container {
      display: flow-root;
    }
    .affine-note-block-container.selected {
      background-color: var(--affine-hover-color);
    }
  `;

  //temp = null;

  //isLoad=false

  override connectedCallback() {
    super.connectedCallback();
  }
  //protected _isLoad: boolean = false;


  override renderBlock() {
    //console.log('this is load ', this._isLoad);
    //const temp = this.renderChildren(this.model);
    //const a=
    return html`
      <mahdaad-callout-component
        @mount="${() => {
          //console.log('mount event');
          this._isLoad = true;
        }}"
      >
        <div class="nest-editor">
          <div class="affine-note-block-container">
            <div class="affine-block-children-container">
              ${this._isLoad ? this.renderChildren(this.model) : ''}
            </div>
          </div>
        </div>
      </mahdaad-callout-component>
    `;
  }

  @property({ attribute: false })
  accessor _isLoad: boolean = false;

}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-callout': MahdaadCalloutBlockComponent;
  }
}
