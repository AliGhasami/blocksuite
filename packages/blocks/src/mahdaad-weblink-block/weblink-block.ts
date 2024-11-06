/// <reference types="vite/client" />
import { assertExists } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { MahdaadWeblinkBlockModel } from './weblink-model.js';

import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';

@customElement('affine-mahdaad-weblink-block')
export class MahdaadWeblinkBlockComponent extends CaptionedBlockComponent<MahdaadWeblinkBlockModel> {
  changeViewMode(event: CustomEvent) {
    const mode = event.detail;
    if (mode == 'inline') {
      const { doc } = this.model;
      const parent = doc.getParent(this.model);
      assertExists(parent);
      const index = parent.children.indexOf(this.model);
      const yText = new DocCollection.Y.Text();
      const title = this.model.title ?? '';
      yText.insert(0, title);
      yText.format(0, title.length, {
        link: this.model.url,
        reference: null,
      });
      const text = new doc.Text(yText);
      doc.addBlock(
        'affine:paragraph',
        {
          text,
        },
        parent,
        index
      );
      doc.deleteBlock(this.model);
    } else {
      this.doc.updateBlock(this.model, {
        show_type: mode,
      });
    }
  }

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

  /*duplicate() {
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
  }*/

  removeBlock() {
    this.doc.deleteBlock(this.model);
  }

  override renderBlock() {
    //console.log('this is model and props', this.model);
    //.doc="${this.doc}"
    //this.model.propsUpdated({})

    return html`<div contenteditable="false">
      <mahdaad-weblink
        .model="${this.model}"
        read-only="${this.doc.readonly}"
        show-type="${this.model.show_type}"
        url="${this.model.url}"
        title="${this.model.title}"
        @remove="${() => {
          this.removeBlock();
        }}"
        @duplicate="${() => {
          // this.duplicate();
        }}"
        @changeViewMode="${this.changeViewMode}"
      ></mahdaad-weblink>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-weblink-block': MahdaadWeblinkBlockComponent;
  }
}
