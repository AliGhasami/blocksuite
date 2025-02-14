import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';

import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import {pick} from 'lodash-es'

import type { MahdaadCalloutBlockService } from './callout-service.js';
import { BlockModel } from '@blocksuite/store';
import { transformModel } from '../root-block/utils/operations/model.js';


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

  convertToType(blocksModel:BlockModel[],flavour:string,type:string){
    blocksModel.forEach(blockModel=>{
      /*this.std.command
        .chain()
        .updateBlockType({
          flavour,
          props:{ type } ,
        })
        .run();*/
      //this.std.doc.updateBlock(blockModel,{flavour,type})
      if(blockModel.flavour==flavour){
        this.std.doc.updateBlock(blockModel,{flavour,type})
      }else{
        transformModel(blockModel, flavour, {type});
      }
      this.convertToType(blockModel.children,flavour,type)
    })
  }


  changeOptions(event:CustomEvent){
    const key=event.detail[0]
    switch (key){
      case 'delete':
        this.std.doc.deleteBlock(this.model)
        break
      case 'text':
        this.convertToType(this.model.children,'affine:paragraph','text')
        break
      case 'heading_1':
        this.convertToType(this.model.children,'affine:paragraph','h1')
        break
      case 'heading_2':
        this.convertToType(this.model.children,'affine:paragraph','h2')
        break
      case 'heading_3':
        this.convertToType(this.model.children,'affine:paragraph','h3')
        break
      case 'bullet_list':
        this.convertToType(this.model.children,'affine:list', 'bulleted')
        break
      case 'number_list':
        this.convertToType(this.model.children,'affine:list', 'numbered')
        break
    }
  }



  override renderBlock() {
    return html`
      <mahdaad-callout-component
        type="${this.model.type}"
        background="${this.model.background}"
        icon="${this.model.icon}"
        @changeProps="${this.changeProps}"
        @mount="${() => {
          this._isLoad = true;
        }}"
        @changeOption="${this.changeOptions}"
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
