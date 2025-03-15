import type { ObjectBlockModel } from "@blocksuite/affine-model";

/// <reference types="vite/client" />
import { assertExists } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html } from 'lit';

//import { customElement } from 'lit/decorators.js';
import {merge} from 'lodash-es'

//import type { ObjectBlockModel } from './object-model.js';
//import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import {
  REFERENCE_NODE,
} from '@blocksuite/affine-components/rich-text';

import type {ObjectBlockService} from './object-service.js'

import { tryRemoveEmptyLine } from '../root-block/widgets/slash-menu/utils.js';
import { objectBlockStyles } from './styles.js';
//@customElement('affine-mahdaad-object')
export class ObjectBlockComponent extends CaptionedBlockComponent<
  ObjectBlockModel,
  ObjectBlockService
> {
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
    //console.log("111111",this.model.type);
    if (
      ['document', 'image', 'weblink'].includes(this.model.type) &&
      mode == 'inline'
    ) {
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

  /*docId() {

  }*/

  parentId() {
    return (this.doc.meta && this.doc.meta?.object_id) ?? null;
  }

  override previewName(): string {
    //return super.previewName();
    switch (this.model.type) {
      case 'document':
        return 'Page'
      case 'file':
        return 'File'
      case 'image':
        return 'Image'
      case 'weblink':
        return 'Weblink'
      default:
        return 'Object'
    }
    //return super.previewName();
  }

  removeBlock() {
    this.doc.deleteBlock(this.model);
  }

  override renderBlock() {
    //console.log('this is model and props', this.model.meta);
    //.doc="${this.doc}"
    //this.model.propsUpdated({})

    return html`<div dir=${this.model.dir} contenteditable="false">
      <mahdaad-object-link-component
        direction=${this.model.dir}
        .model="${this.model}"
        read-only="${this.doc.readonly}"
        object-id="${this.model.object_id}"
        file-id="${this.model.file_id ?? null}"
        parent-id="${this.parentId()}"
        link-id="${this.model.link_id}"
        type="${this.model.type}"
        show-type="${this.model.show_type}"
        meta="${JSON.stringify(this.model.meta ?? {})}"
        @remove="${() => {
          this.removeBlock();
        }}"
        @setDirection="${this.setDirection}"
        @duplicate="${() => {
          this.duplicate();
        }}"
        @changeViewMode="${this.changeViewMode}"
        @convertToLink="${this._convertLink}"
        @updateProps="${this.updateProps}"
      ></mahdaad-object-link-component>
    </div>`;
  }

  setDirection(event: CustomEvent) {
    this.doc.updateBlock(this.model, { dir: event.detail });
  }

  updateProps(event: CustomEvent) {
    const props = event.detail;
    //console.log("this is props",props);
    //...this.model,
    //meta:{...props}
    //const meta=
    props.meta = merge(this.model.meta, props.meta ?? {});
    this.doc.updateBlock(this.model, props);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-object': ObjectBlockComponent;
  }
}
