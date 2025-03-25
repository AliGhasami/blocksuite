/// <reference types="vite/client" />
import type { MahdaadTableOfContentBlockModel } from '@blocksuite/affine-model';

// import { PropTypes, requiredProperties } from '@blocksuite/block-std';
// import { BlockModel } from '@blocksuite/store';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html } from 'lit';
import { state } from 'lit/decorators.js';
// import { property } from 'lit/decorators.js';
// import { pick } from 'lodash-es';

export class MahdaadTableOfContentBlockComponent extends CaptionedBlockComponent<MahdaadTableOfContentBlockModel> {

  changeOptions(event:CustomEvent) {
    const key=event.detail
    console.log("event:",event);
    console.log("key:",key);
    switch (key) {
      case 'delete':
        this.std.doc.deleteBlock(this.model)
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

  override connectedCallback() {
    super.connectedCallback();

    this.list= this.doc?.meta?.headingList ?? []
    this._disposables.add(
      this.doc.collection.slots.docUpdated.on(() => {
        this.list= this.doc?.meta?.headingList ?? []
      })
    );
    /*this._disposables.add(
      this.doc.collection.meta.docMetaUpdated.on(() => {
        this.list= this.doc?.meta?.headingList ?? []
        console.log('bbbbbbbbbbbbb');
      })
    );*/
  }

  override previewName(): string {
    return 'Table of content'
  }

  override renderBlock() {
    
    return html`<div dir=${this.model.dir} contenteditable="false">
      <mahdaad-table-of-content-component
      list=${JSON.stringify(this.list)}
      direction=${this.model.dir}
      readonly="${this.doc.readonly}"
      @changeOption="${this.changeOptions}"
      @scrollBlock="${this.scrollToBlock}"
      >
      </mahdaad-table-of-content-component>
    </div>`;
  }

  scrollToBlock(event: CustomEvent) {
    const blockId = event.detail;
    const block = this.host.view.getBlock(blockId);
    if (block) {
      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
      block.classList.add('event-animate-blink');
      setTimeout(() => {
        block.classList.remove('event-animate-blink');
      }, 3000);
    }
  }


  setDirection(event: CustomEvent) {
    this.doc.updateBlock(this.model, {dir:event.detail});
  }

  @state()
  accessor list: any[] = [];


}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-table-of-content': MahdaadTableOfContentBlockComponent;
  }
}
