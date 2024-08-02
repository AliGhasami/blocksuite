/// <reference types="vite/client" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ObjectBlockModel } from './object-model.js';

import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';
import { tryRemoveEmptyLine } from '../root-block/widgets/slash-menu/utils.js';
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

  duplicate() {
    this.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        object_id: this.model.object_id,
        type: this.model.type,
        show_type: this.model.show_type,
        //...this.model,
        //name: file.name,
        //size: file.size,
        //type: types[index],
      },
    ]);
    tryRemoveEmptyLine(this.model);
  }

  removeBlock() {
    this.doc.deleteBlock(this.model);
  }

  override renderBlock() {
    //console.log('this is model and props', this.model);
    //.doc="${this.doc}"
    return html`<div contenteditable="false">
      <mahdaad-object-link-component
        .model="${this.model}"
        object-id="${this.model.object_id}"
        link-id="${this.model.link_id}"
        type="${this.model.type}"
        show-type="${this.model.show_type}"
        @remove="${() => {
          this.removeBlock();
        }}"
        @duplicate="${() => {
          //debugger;
          this.duplicate();
        }}"
      ></mahdaad-object-link-component>
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
