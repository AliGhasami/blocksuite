/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { assertExists } from '@blocksuite/global/utils';
import { BlockElement } from '@blocksuite/lit';
import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { z } from 'zod';

//import { getStandardLanguage } from '../code-block/utils/code-languages.js';
//import { getCodeLineRenderer } from '../code-block/utils/code-line-renderer.js';
//import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import type { MentionBlockModel } from './mention-model.js';

@customElement('affine-mention')
export class MentionBlockComponent extends BlockElement<MentionBlockModel> {
  static override styles = css`
    .affine-divider-block-container {
      position: relative;
      width: 100%;
      height: 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 18px 8px;
      margin-top: var(--affine-paragraph-space);
    }
    hr {
      border: none;
      border-top: 1px solid var(--affine-divider-color);
      width: 100%;
    }
  `;

  readonly attributesSchema = z.object({});

  /* get inlineManager() {
    const inlineManager = this.service?.inlineManager;
    assertExists(inlineManager);
    return inlineManager;
  }*/

  /*get attributeRenderer() {
    return this.inlineManager.getRenderer();
  }*/

  override connectedCallback() {
    super.connectedCallback();

    this.contentEditable = 'false';

    this.handleEvent('click', () => {
      this.host.selection.set([
        this.host.selection.create('block', {
          path: this.path,
        }),
      ]);
    });
  }

  override renderBlock() {
    //const { type } = this.model;
    /*const children = html`<div
      class="affine-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;*/

    return html`
      <div class="affine-paragraph-block-container">
        <div class="affine-paragraph-rich-text-wrapper">
          <div contenteditable="false" class="affine-paragraph-placeholder">
            this is place holder
          </div>
          <!-- <rich-text
            .yText=${this.model.text.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
            .undoManager=${this.doc.history}
            .attributesSchema=${this.attributesSchema}
            .inlineRangeProvider=${this._inlineRangeProvider}
            .readonly=${this.doc.readonly}
            .enableClipboard=${false}
            .enableUndoRedo=${false}
          ></rich-text> -->
        </div>
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
    `;
  }
}
//  .markdownShortcutHandler=${this.markdownShortcutHandler}
// .embedChecker=${this.embedChecker}
//
// .attributeRenderer=${this.attributeRenderer}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mention': MentionBlockComponent;
  }
}
