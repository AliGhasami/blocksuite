/// <reference types="vite/client" />
import type { MahdaadTableOfContentBlockModel } from '@blocksuite/affine-model';

// import { PropTypes, requiredProperties } from '@blocksuite/block-std';
import { NoteDisplayMode } from '@blocksuite/blocks';
// import { BlockModel } from '@blocksuite/store';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html, nothing } from 'lit';

import { getHeadingBlocksFromDoc } from '../_common/global.js';
// import { property } from 'lit/decorators.js';
// import { pick } from 'lodash-es';

export class MahdaadTableOfContentBlockComponent extends CaptionedBlockComponent<MahdaadTableOfContentBlockModel> {

  changeOptions(event:CustomEvent) {
    const key=event.detail
    console.log("event:",event);
    console.log("key:",key);
    switch (key) {
      case 'delete':
        console.log("Hi");
        
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
  }

  // removeBlock() {
  //   this.doc.deleteBlock(this.model);
  // }

  override renderBlock() {
    // const children = this.model.children.map(item => {
    //   const temp = new BlockModel();
    //   temp.children.push(item);
    //   return temp;
    // });
    //console.log("this is children in block suite",children.length);
    // if (this.doc.root === null)
    //   return nothing;
    // const headingBlocks = getHeadingBlocksFromDoc(
    //   this.doc,
    //   [NoteDisplayMode.DocAndEdgeless, NoteDisplayMode.DocOnly],
    //   true
    // );

    // if (headingBlocks.length === 0) return nothing;

    // const items = [
    //   ...(this.doc.meta?.title !== '' ? [this.doc.root] : []),
    //   ...headingBlocks,
    // ];
    // this.doc.collection.setDocMeta(this.doc.id, {
    //   headingList: "sssssd",
    // });
    console.log("items headingList:",this.doc?.meta?.headingList);
    
    return html` <div dir=${this.model.dir} contenteditable="false">
      <mahdaad-table-of-content-component
      list=${JSON.stringify(this.doc?.meta?.headingList)}
      direction=${this.model.dir}
      readonly="${this.doc.readonly}"
      @changeOption="${this.changeOptions}"
      >
      </mahdaad-table-of-content-component>
    </div>`;
  }


  setDirection(event: CustomEvent) {
    this.doc.updateBlock(this.model, {dir:event.detail});
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mahdaad-table-of-content': MahdaadTableOfContentBlockComponent;
  }
}
