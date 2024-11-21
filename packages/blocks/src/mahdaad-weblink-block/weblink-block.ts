/// <reference types="vite/client" />
import { assertExists } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ObjectLink } from '../root-block/widgets/mahdaad-object-picker/object-picker-popover.js';
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

  generateWeblink(event: CustomEvent) {
    const lnk: ObjectLink = event.detail;
    //debugger;
    this.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        object_id: lnk.object_id,
        type: lnk.type,
        link_id: lnk.link_id,
        show_type: 'card',
        //...this.model,
        //name: file.name,
        //size: file.size,
        //type: types[index],
      },
    ]);
    this.doc.deleteBlock(this.model);
    /*if (!this.inlineEditor.isValidInlineRange(this.targetInlineRange)) return;
    this.inlineEditor.insertText(this.targetInlineRange, REFERENCE_NODE, {
      mahdaadObjectLink: {
        object_id: lnk.object_id,
        link_id: lnk.link_id,
        type: lnk.type,
      },
      reference: null,
    });
    this.abortController.abort();*/
  }

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
        object-id="${this.doc.meta.object_id}"
        read-only="${this.doc.readonly}"
        show-type="${this.model.show_type}"
        url="${this.model.url}"
        title="${this.model.title}"
        @remove="${() => {
          this.removeBlock();
        }}"
        @save="${this.save}"
        @changeViewMode="${this.changeViewMode}"
        @generateWeblink="${this.generateWeblink}"
      ></mahdaad-weblink>
    </div>`;
  }

  save(event: CustomEvent) {
    const data = event.detail;
    this.doc.updateBlock(this.model, {
      title: data.title,
      url: data.url,
    });
    //this.model.propsUpdated
    //debugger;
    //this._onConfirm(data.title, data.url);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-weblink-block': MahdaadWeblinkBlockComponent;
  }
}
