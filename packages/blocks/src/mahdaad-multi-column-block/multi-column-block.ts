/// <reference types="vite/client" />
import type { MahdaadMultiColumnBlockModel } from "@blocksuite/affine-model";

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { BlockModel } from '@blocksuite/store';
import { html, nothing } from 'lit';
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
    const children= this.model.children.map((item)=>{
      const temp= new BlockModel()
      temp.children.push(item)
      return  temp
    })

    return html`<div style="border:1px solid pink">
     <mahdaad-multi-column-component
       column-count="${children.length}"
       @mount="${() => {
         this._isLoad = true;
     }}">
       <div slot="slot_0">${ this._isLoad && children[0]  ? this.renderChildren(children[0]) : nothing }</div>
       <div slot="slot_1">${ this._isLoad && children[1] ? this.renderChildren(children[1]) : nothing }</div>
       <div slot="slot_2">${ this._isLoad && children[2] ? this.renderChildren(children[2]) : nothing }</div>
       <div slot="slot_3">${ this._isLoad && children[3] ? this.renderChildren(children[3]) : nothing }</div>
     </mahdaad-multi-column-component>   
    </div>`;
  }

  @property({ attribute: false })
  accessor _isLoad: boolean = false;


/*${this._isLoad ? children.map((item,index)=>{
  return html`<div  class="split-pan ps-4" >${this.renderChildren(item)}</div>`
}) : nothing } */




  /*${this._isLoad ? childs.map((item,index)=>{
  return html`<span slot="slot_${index}">${this.renderChildren(item) }</span>`
}) : '1111'}*/


/*
<!-- <span slot="slot_0">
    ${this.renderChildren(childs[0])}
</span>
<span slot="slot_1">
  ${this.renderChildren(childs[1])}
</span> -->
*/


/*<!-- ${this.model.children.map((item,index)=>{
  return html`<span slot="slot_${index}" >${this._isLoad ? this.renderChildren(this.model.children[index]) : ''}</span>`
})} -->
<span slot="slot_0">
${this._isLoad ? this.renderChildren(this.model.children[0]) : ''}
</span>
<!-- <span slot="slot_1">
${this._isLoad ? this.renderChildren(this.model.children[1]) : ''}
</span> -->*/

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
