import type { AffineTextAttributes, } from '@blocksuite/affine-components/rich-text';
import type { BlockComponent } from '@blocksuite/block-std';

import { BLOCK_ID_ATTR , ShadowlessElement } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

//@customElement('mahdaad-mention')
export class MahdaadMention extends ShadowlessElement {
  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockComponent>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get std() {
    const std = this.blockElement.std;
    assertExists(std);
    return std;
  }

  get userId() {
    return this.delta.attributes?.mention?.user_id ?? null;
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  override render() {
    return html`<span
      class="${Prefix}-mahdaad-mention"
      style="display: inline-block"
    >
      <mahdaad-mention-item user-id="${this.userId}"></mahdaad-mention-item>
      <v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text>
    </span>`;
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'mahdaad-mention': MahdaadMention;
  }
}
