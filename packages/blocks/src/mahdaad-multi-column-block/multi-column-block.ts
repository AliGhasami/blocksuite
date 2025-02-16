/// <reference types="vite/client" />
import type { MahdaadMultiColumnBlockModel } from "@blocksuite/affine-model";

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

//@customElement('affine-mahdaad-object')
export class MahdaadMultiColumnBlockComponent extends CaptionedBlockComponent<MahdaadMultiColumnBlockModel> {
  // static override styles = objectBlockStyles;

  override connectedCallback() {
    super.connectedCallback();
  }

  parentId() {
    return (this.doc.meta && this.doc.meta?.object_id) ?? null
  }

  /*docId() {

  }*/


  removeBlock() {
    this.doc.deleteBlock(this.model);
  }

  override renderBlock() {
    // console.log('this is model and props', this.model.meta);
    //.doc="${this.doc}"
    //this.model.propsUpdated({})
    //console.log("this model",this.model);
    return html`<div contenteditable="false" style="border:1px solid pink">
      ${this.model.children.length} 
    
      
     <mahdaad-multi-column-component
       column-count="${this.model.children.length}"
       @mount="${() => {
       this._isLoad = true;
     }}">
      <!-- ${this.model.children.map((item,index)=>{
         return html`<span slot="slot_${index}" >${this._isLoad ? this.renderChildren(this.model.children[index]) : ''}</span>`
       })} -->
       <span slot="slot_0">
         ${this._isLoad ? this.renderChildren(this.model.children[0]) : ''}
       </span>
     </mahdaad-multi-column-component> 
    </div>`;
  }

  @property({ attribute: false })
  accessor _isLoad: boolean = false;


  /*
  ${this.model.children.map((item,index)=>{
            html`<span>${index}</span>`
       })}
       <span slot="slot_1">
         ${this._isLoad ? this.renderChildren(this.model.children[0]) : ''}
       </span>
       <span slot="slot_2">
         ${this._isLoad ? this.renderChildren(this.model.children[1]) : ''}
       </span>
*/
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
