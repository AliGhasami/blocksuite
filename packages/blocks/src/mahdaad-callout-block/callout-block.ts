import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';

import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import {pick} from 'lodash-es'

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

  changeProps(event:CustomEvent) {
    const data=event.detail[0]
    if(data) {
      const normal=pick(data,['type','icon','background'])
      this.doc.updateBlock(this.model,{
        ...normal
      })
    }
  }

  override connectedCallback() {
    super.connectedCallback();
  }


  override renderBlock() {
    //const props=this.model
    //console.log("props",props);
    return html`
      <mahdaad-callout-component
        type="${this.model.type}"
        background="${this.model.background}"
        icon="${this.model.icon}"
        @changeProps="${this.changeProps}"
        @mount="${() => {
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
