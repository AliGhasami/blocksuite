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

    this.list= this.doc?.meta?.headingList ?? []
    this._disposables.add(
      this.doc.collection.slots.docUpdated.on(() => {
        this.list= this.doc?.meta?.headingList ?? []
        console.log('aaaaaaaaaaaaa');
      })
    );
    /*this._disposables.add(
      this.doc.collection.meta.docMetaUpdated.on(() => {
        this.list= this.doc?.meta?.headingList ?? []
        console.log('bbbbbbbbbbbbb');
      })
    );*/

    /*this.disposables.add(()=>{
      this.std.collection.slots.docUpdated.on(()=>{


      })
    })*/
  }

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
    console.log("items headingList:",this.doc?.meta?.headingList,this.list);
    
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

  // removeBlock() {
  //   this.doc.deleteBlock(this.model);
  // }

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
