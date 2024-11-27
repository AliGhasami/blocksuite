import type { AffineTextAttributes, } from '@blocksuite/affine-components/rich-text';
import type { BlockComponent } from '@blocksuite/block-std';

import { BLOCK_ID_ATTR , ShadowlessElement,  } from '@blocksuite/block-std';
import { assertExists , WithDisposable } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import { html } from 'lit';
import {  property } from 'lit/decorators.js';

import { Peekable } from '../../../../../peek/index.js';
import { REFERENCE_NODE } from '../consts.js';

/*
declare module '@blocksuite/blocks' {
  interface PeekViewService {
    peek(target: MahdaadObjectLinkInline): void;
  }
}
*/

//@customElement('mahdaad-object-link-inline')
@Peekable({ action: false })
export class MahdaadObjectLinkInline extends WithDisposable(ShadowlessElement) {
  get block() {
    const block = this.inlineEditor.rootElement.closest<BlockComponent>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(block);
    return block;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor.getInlineRangeFromElement(this);
    assertExists(selfInlineRange);
    return selfInlineRange;
  }

  get std() {
    const std = this.block.std;
    assertExists(std);
    return std;
  }

  _convertLink(event: CustomEvent) {
    const data = event.detail;
    this.inlineEditor.insertText(this.selfInlineRange, data.title, {
      link: data.url,
      reference: null,
    });
    /*const { doc } = this.model;
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
    doc.deleteBlock(this.model);*/
  }

  /*override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(_changedProperties);
  }*/

  changeViewMode(event: CustomEvent) {
    const mode = event.detail;

    if (mode == 'inline') return;

    const block = this.block;
    const doc = block.host.doc;
    const parent = doc.getParent(block.model);
    assertExists(parent);

    const index = parent.children.indexOf(block.model);
    //const docId = this.referenceDocId;

    //return
    const meta = this.getMeta();
    doc.addBlock(
      'affine:mahdaad-object',
      {
        link_id: meta?.link_id,
        object_id: meta?.object_id,
        type: meta?.type,
        show_type: mode,
      },
      parent,
      index + 1
    );
    const totalTextLength = this.inlineEditor.yTextLength;
    const inlineTextLength = this.selfInlineRange.length;
    if (totalTextLength === inlineTextLength) {
      doc.deleteBlock(block.model);
    } else {
      this.inlineEditor.insertText(this.selfInlineRange, REFERENCE_NODE); // this.docTitle
    }
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  getMeta() {
    return this.delta.attributes?.mahdaadObjectLink;
  }

  override render() {
    const meta = this.getMeta();
    return html`<span
      data-selected=${this.selected}
      class="mahdaad-object-link-inline"
      ><mahdaad-object-link-component
        style="display: inline"
        read-only="false"
        object-id="${meta?.object_id}"
        link-id="${meta?.link_id}"
        type="${meta?.type}"
        show-type="inline"
        @changeViewMode="${this.changeViewMode}"
        @convertToLink="${this._convertLink}"
      ></mahdaad-object-link-component
      ><v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text
    ></span>`;
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
    attributes: {},
  };

  @property({ type: Boolean })
  accessor selected = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'mahdaad-object-link-inline': MahdaadObjectLinkInline;
  }
}
