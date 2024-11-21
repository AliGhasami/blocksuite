/// <reference types="vite/client" />
import { assertExists } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ObjectBlockModel } from './object-model.js';

import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';
import { REFERENCE_NODE } from '../_common/inline/presets/nodes/consts.js';
import { tryRemoveEmptyLine } from '../root-block/widgets/slash-menu/utils.js';
import { objectBlockStyles } from './styles.js';

@customElement('affine-mahdaad-object')
export class ObjectBlockComponent extends CaptionedBlockComponent<ObjectBlockModel> {
  static override styles = objectBlockStyles;

  _convertLink(event: CustomEvent) {
    const data = event.detail;
    const { doc } = this.model;
    const parent = doc.getParent(this.model);
    assertExists(parent);
    const index = parent.children.indexOf(this.model);
    const yText = new DocCollection.Y.Text();
    yText.insert(0, data.title);
    yText.format(0, data.title.length, {
      link: data.url,
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
  }

  changeViewMode(event: CustomEvent) {
    const mode = event.detail;
    if (['document', 'weblink'].includes(this.model.type) && mode == 'inline') {
      const { doc } = this.model;
      const parent = doc.getParent(this.model);
      assertExists(parent);
      const index = parent.children.indexOf(this.model);
      const yText = new DocCollection.Y.Text();
      yText.insert(0, REFERENCE_NODE);
      yText.format(0, REFERENCE_NODE.length, {
        mahdaadObjectLink: {
          object_id: this.model.object_id,
          link_id: this.model.link_id,
          type: this.model.type,
        },
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
    //this.model.propsUpdated({})

    return html`<div contenteditable="false">
      <mahdaad-object-link-component
        .model="${this.model}"
        read-only="${this.doc.readonly}"
        object-id="${this.model.object_id}"
        link-id="${this.model.link_id}"
        type="${this.model.type}"
        show-type="${this.model.show_type}"
        @remove="${() => {
          this.removeBlock();
        }}"
        @duplicate="${() => {
          this.duplicate();
        }}"
        @changeViewMode="${this.changeViewMode}"
        @convertToLink="${this._convertLink}"
      ></mahdaad-object-link-component>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-object': ObjectBlockComponent;
  }
}
