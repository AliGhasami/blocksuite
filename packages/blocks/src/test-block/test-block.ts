import type { ObjectBlockModel } from "@blocksuite/affine-model";

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html } from 'lit';

//@customElement('affine-mahdaad-object')
export class TestBlockComponent extends CaptionedBlockComponent<ObjectBlockModel> {

  override connectedCallback() {
    super.connectedCallback();
  }



  override renderBlock() {
    //console.log('this is model and props', this.model.meta);
    //.doc="${this.doc}"
    //this.model.propsUpdated({})

    return html`<div contenteditable="false">
      test block
      <mahdaad-test-block-component></mahdaad-test-block-component>
    </div>`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'affine-test-block': TestBlockComponent;
  }
}
