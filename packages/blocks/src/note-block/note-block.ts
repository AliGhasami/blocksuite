import type { NoteBlockModel } from '@blocksuite/affine-model';

import { checkNotEmptyNote } from '@blocksuite/affine-shared/utils';
import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';

import type { NoteBlockService } from './note-service.js';

export class NoteBlockComponent extends BlockComponent<
  NoteBlockModel,
  NoteBlockService
> {
  static override styles = css`
    .affine-note-block-container {
      display: flow-root;
    }
    .affine-note-block-container.selected {
      background-color: var(--affine-hover-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    /*this.disposables.add()*/
  }

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    checkNotEmptyNote(this.model,this.doc)
    /*try{
      let  lastChild :  null | BlockModel = null
      if(this.model.children.length > 0) {
        lastChild=this.model.children[this.model.children.length - 1]
      }
      if (
        this.model.children.length == 0 ||
        (lastChild &&
          (lastChild.flavour != 'affine:paragraph' ||  (lastChild.flavour == 'affine:paragraph' && lastChild.type && lastChild.type=='quote' )))
      ) {
        this.doc.addBlock('affine:paragraph', {}, this.model);
      }
    }catch (e) {
      console.log("error",e);
    }finally {

    }*/
    return result;
  }


  override renderBlock() {
    return html`
      <div class="affine-note-block-container">
        <div class="affine-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-note': NoteBlockComponent;
  }
}
