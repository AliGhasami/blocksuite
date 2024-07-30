/// <reference types="vite/client" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ObjectBlockModel } from './object-model.js';

import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';
import { objectBlockStyles } from './styles.js';

@customElement('affine-mahdaad-object')
export class ObjectBlockComponent extends CaptionedBlockComponent<ObjectBlockModel> {
  static override styles = objectBlockStyles;

  override connectedCallback() {
    super.connectedCallback();

    /*this.contentEditable = 'false';

    this.handleEvent('click', () => {
      this.host.selection.setGroup('note', [
        this.host.selection.create('block', {
          blockId: this.blockId,
        }),
      ]);
    });*/
  }

  override renderBlock() {
    return html`<div>
      <mahdaad-object-link-component></mahdaad-object-link-component>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-object': ObjectBlockComponent;
  }
}

/*<mahdaad-object-container
          @click=${data :any => {
            console.log('this is data in click', data);
            //alert('1111');
          }}
          @change=${data => {
            console.log('this is data in change', data);
          }}
        ></mahdaad-object-container>*/
