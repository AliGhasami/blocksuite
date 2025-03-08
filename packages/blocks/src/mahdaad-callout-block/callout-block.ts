import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';
import type { BlockModel } from '@blocksuite/store';

import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import {pick} from 'lodash-es'

import type { MahdaadCalloutBlockService } from './callout-service.js';

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

  changeOptions(event:CustomEvent) {
    const key=event.detail[0]
    switch (key) {
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
      case 'right_to_left':
        this.doc.updateBlock(this.model, { dir: 'rtl'})
        break
      case 'left_to_right':
        delete this.model.dir
        this.doc.updateBlock(this.model, { })
        break
    }
  }

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

  convertToType(blocksModel:BlockModel[],flavour:string,type:string) {
    blocksModel.forEach(blockModel=>{
      /*this.std.command
        .chain()
        .updateBlockType({
          flavour,
          props:{ type } ,
        })
        .run();*/
      //this.std.doc.updateBlock(blockModel,{flavour,type})
      if(blockModel.flavour==flavour) {
        this.std.doc.updateBlock(blockModel,{flavour,type})
      }else{
        transformModel(blockModel, flavour, {type});
      }
      this.convertToType(blockModel.children,flavour,type)
    })
  }

  /*protected override firstUpdated() {
    //super.firstUpdated(_changedProperties);
    console.log("this is first updtedddd");
    setTimeout(()=>{
      this.renderBlock()
      const i=nanoid()
      console.log("uuuuuuuuuuuu",i);
      //this.model.id=i
      this.doc.updateBlock(this.model,{id:i})
      this.requestUpdate()
    },5000)
    this.std.view.rendered()

  }
*/

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    if (
      this.model.children.length == 0 ||
      (this.model.children.length > 0 &&
        this.model.children[this.model.children.length - 1].flavour != 'affine:paragraph')
    ) {
      this.doc.addBlock('affine:paragraph', {}, this.model);
    }
    this.requestUpdate()
    return result;
  }

  override renderBlock() {
    //console.log("this is is_loadeeed",this._isLoad);
    const aa=this.renderChildren(this.model).strings
    ///console.log("aaaa",aa);


    /*const gg=()=> {
      return this.renderChildren(this.model)
    }*/

    return html`
      <div dir=${this.model.dir}>
       <mahdaad-callout-component>
         sample text 
          <span>this is default  slot </span>
          <span slot="sl">this is sl slot </span>
        </mahdaad-callout-component> 
      <!-- <mahdaad-callout-component
        style="min-height: 350px;border: 1px solid pink"
        type="${this.model.type}"
        background="${this.model.background}"
        icon="${this.model.icon}"
        @changeProps="${this.changeProps}"
        @mount="${() => {
          console.log("this is true is_load");
          this._isLoad = true;
        }}"
        @changeOption="${this.changeOptions}"
        direction="${this.model.dir}"
      >
        <div>
          1111111
          <div class="nest-editor">
            <div class="affine-note-block-container">
              <div class="affine-block-children-container">
                ${this._isLoad ? this.renderChildren(this.model) : ''}
              </div>
            </div>
          </div>
        </div>
      </mahdaad-callout-component> -->
      </div>
    `;
  }

  @property({ attribute: false })
  accessor _isLoad: boolean = false;

  @property({ attribute: false })
  accessor key:string = '1111';

}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-callout': MahdaadCalloutBlockComponent;
  }
}
