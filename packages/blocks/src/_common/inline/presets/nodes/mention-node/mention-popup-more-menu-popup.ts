import type { BlockElement } from '@blocksuite/block-std';
import type { InlineRange } from '@blocksuite/inline/types';

import { WithDisposable } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { RootBlockComponent } from '../../../../../root-block/types.js';
import type { AffineInlineEditor } from '../../affine-inline-specs.js';

import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { DeleteIcon, OpenIcon } from '../../../../icons/index.js';

@customElement('mention-popup-more-menu')
export class MentionPopupMoreMenu extends WithDisposable(LitElement) {
  static override styles = css`
    .reference-popup-more-menu {
      box-sizing: border-box;
      padding-bottom: 4px;
    }

    .reference-popup-more-menu-container {
      border-radius: 8px;
      padding: 8px;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
    }

    .reference-popup-more-menu-container > .menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .reference-popup-more-menu-container > .menu-item:hover {
      background: var(--affine-hover-color);
    }

    .reference-popup-more-menu-container > .menu-item:hover.delete {
      background: var(--affine-background-error-color);
      color: var(--affine-error-color);
    }
    .reference-popup-more-menu-container > .menu-item:hover.delete > svg {
      color: var(--affine-error-color);
    }

    .reference-popup-more-menu-container > .menu-item svg {
      margin: 0 8px;
    }

    .reference-popup-more-menu-container > .divider {
      width: 148px;
      height: 1px;
      margin: 8px;
      background-color: var(--affine-border-color);
    }
  `;

  private _delete() {
    if (this.inlineEditor.isValidInlineRange(this.targetInlineRange)) {
      this.inlineEditor.deleteText(this.targetInlineRange);
    }
    this.abortController.abort();
  }

  private _openDoc() {
    const refDocId = this.referenceDocId;
    const blockElement = this.blockElement;
    if (refDocId === blockElement.doc.id) return;

    const rootElement = this.std.view.viewFromPath('block', [
      blockElement.model.doc.root?.id ?? '',
    ]) as RootBlockComponent | null;
    assertExists(rootElement);

    rootElement.slots.docLinkClicked.emit({ docId: refDocId });
  }

  override render() {
    return html`
      <div class="reference-popup-more-menu">
        <div class="reference-popup-more-menu-container">
          <icon-button
            width="126px"
            height="32px"
            class="menu-item open"
            text="Open"
            @click=${() => this._openDoc()}
          >
            ${OpenIcon}
          </icon-button>

          <div class="divider"></div>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item delete"
            text="Delete"
            @click=${() => this._delete()}
          >
            ${DeleteIcon}
          </icon-button>
        </div>
      </div>
    `;
  }

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockElement>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get referenceDocId() {
    const docId = this.inlineEditor.getFormat(this.targetInlineRange).reference
      ?.pageId;
    assertExists(docId);
    return docId;
  }

  get std() {
    const std = this.blockElement.std;
    assertExists(std);
    return std;
  }

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor inlineEditor!: AffineInlineEditor;

  @property({ attribute: false })
  accessor targetInlineRange!: InlineRange;
}

declare global {
  interface HTMLElementTagNameMap {
    'mention-popup-more-menu': MentionPopupMoreMenu;
  }
}
