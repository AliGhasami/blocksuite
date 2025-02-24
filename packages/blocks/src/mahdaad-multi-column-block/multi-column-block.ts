/// <reference types="vite/client" />
import type { MahdaadMultiColumnBlockModel } from '@blocksuite/affine-model';

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { BlockModel } from '@blocksuite/store';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { pick } from 'lodash-es';

//@customElement('affine-mahdaad-object')
export class MahdaadMultiColumnBlockComponent extends CaptionedBlockComponent<MahdaadMultiColumnBlockModel> {
  // static override styles = objectBlockStyles;

  addColumn(currentIndex: number, position: 'left' | 'right') {
    const temp = this.model.children[currentIndex];
    const ids = this.doc.addSiblingBlocks(
      temp,
      [{ flavour: 'affine:note' }],
      position == 'left' ? 'before' : 'after'
    );
    this.doc.addBlock('affine:paragraph', {}, ids[0]);
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  deleteBlock() {
    this.doc.deleteBlock(this.model);
  }

  deleteColumn(currentIndex: number) {
    if (this.model.children.length == 1) {
      this.doc.deleteBlock(this.model);
    } else {
      this.doc.deleteBlock(this.model.children[currentIndex]);
    }
  }

  fullWidth(currentIndex: number) {
    this.doc.addSiblingBlocks(
      this.model,
      [{ flavour: 'affine:mahdaad-multi-column', count: 1 }],
      'after'
    );

    const previousSibling = this.doc.getNext(this.model);
    if (previousSibling) {
      this.doc.moveBlocks([this.model.children[currentIndex]], previousSibling);
    }
  }

  fullWidthAll() {
    this.model.children.slice(1).forEach(child => {
      this.doc.addSiblingBlocks(
        this.model,
        [{ flavour: 'affine:mahdaad-multi-column', count: 1 }],
        'after'
      );

      const previousSibling = this.doc.getNext(this.model);
      if (previousSibling) {
        this.doc.moveBlocks([child], previousSibling);
      }
    });


  }

  moveColumn(currentIndex: number, position: 'left' | 'right') {
    const moveIndex= position == 'left' ? currentIndex - 1 : currentIndex + 1
    const target = this.model.children[moveIndex]
    const sizes= this.model.sizes.slice(0)
    const temp= sizes[currentIndex]
    sizes[currentIndex]=sizes[moveIndex]
    sizes[moveIndex]= temp
    this.doc.moveBlocks(
      [this.model.children[currentIndex]],
      this.model,
      target,
      position == 'left'
    );
    this.doc.updateBlock(this.model, {
      sizes
    });
  }

  override renderBlock() {
    const children = this.model.children.map(item => {
      const temp = new BlockModel();
      temp.children.push(item);
      return temp;
    });
    //console.log("this is children in block suite",children.length);
    return html` <div>
      <mahdaad-multi-column-component
        column-count="${children.length}"
        sizes="${JSON.stringify(this.model.sizes)}"
        @add-column="${(event: CustomEvent) => {
          const detail = event.detail;
          this.addColumn(detail[0], detail[1]);
        }}"
        @update-props="${(event: CustomEvent) => {
          this.updateProps(event);
        }}"
        @move-column="${(event: CustomEvent) => {
          const detail = event.detail;
          this.moveColumn(detail[0], detail[1]);
        }}"
        @delete-column="${(event: CustomEvent) => {
          const detail = event.detail;
          this.deleteColumn(detail[0]);
        }}"
        @fullWidth="${(event: CustomEvent) => {
          const detail = event.detail;
          this.fullWidth(detail[0]);
        }}"
        @fullWidthAll="${this.fullWidthAll}"
        @deleteBlock="${this.deleteBlock}"
        @mount="${() => {
          this._isLoad = true;
        }}"
      >
        <div slot="slot_0">
          ${this._isLoad && children[0]
            ? this.renderChildren(children[0])
            : nothing}
        </div>
        <div slot="slot_1">
          ${this._isLoad && children[1]
            ? this.renderChildren(children[1])
            : nothing}
        </div>
        <div slot="slot_2">
          ${this._isLoad && children[2]
            ? this.renderChildren(children[2])
            : nothing}
        </div>
        <div slot="slot_3">
          ${this._isLoad && children[3]
            ? this.renderChildren(children[3])
            : nothing}
        </div>
      </mahdaad-multi-column-component>
    </div>`;
  }

  updateProps(event: CustomEvent) {
    const props = event.detail[0];
    const normal = pick(props, ['sizes']);
    this.doc.updateBlock(this.model, {
      ...normal,
    });
  }

  @property({ attribute: false })
  accessor _isLoad: boolean = false;

}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-multi-column': MahdaadMultiColumnBlockComponent;
  }
}
