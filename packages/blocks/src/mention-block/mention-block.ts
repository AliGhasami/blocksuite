/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { assertExists } from '@blocksuite/global/utils';
import type { InlineRangeProvider } from '@blocksuite/inline';
import { BlockElement, getInlineRangeProvider } from '@blocksuite/lit';
import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import type { RichText } from '../_common/components/index.js';
import { bindContainerHotkey } from '../_common/components/rich-text/keymap/index.js';
//import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import type { NoteBlockComponent } from '../note-block/index.js';
import { EdgelessRootBlockComponent } from '../root-block/index.js';
//import { getStandardLanguage } from '../code-block/utils/code-languages.js';
//import { getCodeLineRenderer } from '../code-block/utils/code-line-renderer.js';
//import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import type { MentionBlockModel } from './mention-model.js';

@customElement('affine-mention')
export class MentionBlockComponent extends BlockElement<MentionBlockModel> {
  static override styles = css`
    affine-mention {
      display: block;
      margin: 10px 0;
    }

    .affine-mention-container {
      position: relative;
    }

    .affine-mention-container .affine-mention {
    }
  `;

  get inlineManager() {
    const inlineManager = this.service?.inlineManager;
    assertExists(inlineManager);
    return inlineManager;
  }
  get attributesSchema() {
    return this.inlineManager.getSchema();
  }
  get attributeRenderer() {
    return this.inlineManager.getRenderer();
  }
  get markdownShortcutHandler() {
    return this.inlineManager.markdownShortcutHandler;
  }
  get embedChecker() {
    return this.inlineManager.embedChecker;
  }

  private _inlineRangeProvider: InlineRangeProvider | null = null;

  @query('rich-text')
  private _richTextElement?: RichText;

  override get topContenteditableElement() {
    if (this.rootElement instanceof EdgelessRootBlockComponent) {
      const note = this.closest<NoteBlockComponent>('affine-note');
      return note;
    }
    return this.rootElement;
  }

  get inlineEditor() {
    return this._richTextElement?.inlineEditor;
  }

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this._richTextElement?.updateComplete;
    return result;
  }

  override connectedCallback() {
    super.connectedCallback();
    bindContainerHotkey(this);

    this._inlineRangeProvider = getInlineRangeProvider(this);
  }

  override firstUpdated() {
    //this.model.propsUpdated.on(this._updatePlaceholder);
    //this.host.selection.slots.changed.on(this._updatePlaceholder);

    this.updateComplete
      .then(() => {
        //this._updatePlaceholder();

        const inlineEditor = this.inlineEditor;
        if (!inlineEditor) return;
        /*this.disposables.add(
          inlineEditor.slots.inputting.on(this._updatePlaceholder)
        );*/
      })
      .catch(console.error);
  }

  override renderBlock(): TemplateResult<1> {
    return html`
      <div class="affine-mention-container" style="position: relative">
        <div class="affine-mention">
          <span contenteditable="false">@</span>
          <!--<span>111111</span>-->
          <rich-text
            .yText=${this.model.text.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
            .enableClipboard=${false}
            .enableUndoRedo=${false}
            .inlineRangeProvider=${this._inlineRangeProvider}
          ></rich-text>
          <affine-block-selection .block=${this}></affine-block-selection>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mention': MentionBlockComponent;
  }
}
