import type { BlockComponent } from '@blocksuite/block-std';

import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { AffineTextAttributes } from '../../affine-inline-specs.js';

import { Peekable } from '../../../../components/peekable.js';
import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { REFERENCE_NODE } from '../consts.js';

declare module '@blocksuite/blocks' {
  interface PeekViewService {
    peek(target: MahdaadObjectLinkInline): void;
  }
}

@customElement('mahdaad-object-link-inline')
@Peekable({ action: false })
export class MahdaadObjectLinkInline extends WithDisposable(ShadowlessElement) {
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
      ></mahdaad-object-link-component
      ><v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text
    ></span>`;
  }

  /*override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(_changedProperties);
  }*/

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
