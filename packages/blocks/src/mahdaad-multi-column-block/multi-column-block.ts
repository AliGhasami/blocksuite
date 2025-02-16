/// <reference types="vite/client" />
import type { MahdaadMultiColumnBlockModel } from "@blocksuite/affine-model";

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html } from 'lit';

//@customElement('affine-mahdaad-object')
export class MahdaadMultiColumnBlockComponent extends CaptionedBlockComponent<MahdaadMultiColumnBlockModel> {
  // static override styles = objectBlockStyles;

  override connectedCallback() {
    super.connectedCallback();
  }

  /*docId() {

  }*/


  parentId() {
    return (this.doc.meta && this.doc.meta?.object_id) ?? null
  }

  removeBlock() {
    this.doc.deleteBlock(this.model);
  }

  override renderBlock() {
    // console.log('this is model and props', this.model.meta);
    //.doc="${this.doc}"
    //this.model.propsUpdated({})
    console.log("this model",this.model);
    return html`<div contenteditable="false">
      ${this.model.children.length}
     <mahdaad-multi-column-component></mahdaad-multi-column-component>
    </div>`;
  }

  // updateProps(event: CustomEvent) {
  //   const props=event.detail;
  //   //console.log("this is props",props);
  //   this.doc.updateBlock(this.model, {
  //     //...this.model,
  //      meta:{...props}
  //   });
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-multi-column': MahdaadMultiColumnBlockComponent;
  }
}
