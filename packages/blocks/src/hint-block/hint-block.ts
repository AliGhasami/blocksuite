/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { assertExists } from '@blocksuite/global/utils';
import type { InlineRangeProvider } from '@blocksuite/inline';
import { BlockElement, getInlineRangeProvider } from '@blocksuite/lit';
import { DocCollection, type Y } from '@blocksuite/store';
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
import type { HintBlockModel } from './hint-model.js';

@customElement('affine-hint')
export class HintBlockComponent extends BlockElement<HintBlockModel> {
  static override styles = css`
    affine-hint {
      display: block;
      margin: 10px 0;
      //font-size: var(--affine-font-base);
    }
    code {
      font-size: calc(var(--affine-font-base) - 3px);
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

  @query('.affine-paragraph-placeholder')
  private _placeholderContainer?: HTMLElement;

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
    this.model.propsUpdated.on(this._updatePlaceholder);
    this.host.selection.slots.changed.on(this._updatePlaceholder);

    this.updateComplete
      .then(() => {
        this._updatePlaceholder();

        const inlineEditor = this.inlineEditor;
        if (!inlineEditor) return;
        this.disposables.add(
          inlineEditor.slots.inputting.on(this._updatePlaceholder)
        );
      })
      .catch(console.error);
  }

  //TODO(@Flrande) wrap placeholder in `rich-text` or inline-editor to make it more developer-friendly
  private _updatePlaceholder = () => {
    if (
      !this._placeholderContainer ||
      !this._richTextElement ||
      !this.inlineEditor
    )
      return;

    //TODO(@alighasami) check is last Paragraph
    /*let isLastParagraph = false;
    const note = this.doc.getBlockByFlavour('affine:note');
    const paragraphList = note.length ? note[0].children : [];
    const currentBlockId = this.dataset.blockId;
    if (
      paragraphList.length &&
      paragraphList[paragraphList.length - 1].id == currentBlockId
    ) {
      isLastParagraph = true;
    }*/
    let isEmpty = false;
    const note = this.doc.getBlockByFlavour('affine:note');
    const paragraphList = note.length ? note[0].children : [];
    if (paragraphList.length == 1) {
      isEmpty = true;
    }
    //console.log('this.selected', this.selected);
    //console.log('this.inlineEditor.isComposing', this.inlineEditor.isComposing);
    //console.log('this.inlineEditor.yTextLength', this.inlineEditor.yTextLength);
    if (
      this.inlineEditor.yTextLength > 0 ||
      this.inlineEditor.isComposing ||
      (!this.selected && !isEmpty) ||
      this._isInDatabase()
    ) {
      this._placeholderContainer.classList.remove('visible');
    } else {
      this._placeholderContainer.classList.add('visible');
    }
    if (this.selected) {
      this._placeholderContainer.classList.add('hover');
    }
    //console.log('is selected', this.selected);
    //if()
  };

  private _isInDatabase = () => {
    let parent = this.parentElement;
    while (parent && parent !== document.body) {
      if (parent.tagName.toLowerCase() === 'affine-database') {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  };

  getYText(text?: string | Y.Text) {
    // debugger;
    if (text instanceof DocCollection.Y.Text || text == null) {
      let yText = text;
      if (!yText) {
        yText = new DocCollection.Y.Text();
        //this.titleColumn?.setValue(this.rowId, yText);
      }
      return yText;
    }
    const yText = new DocCollection.Y.Doc().getText('title');
    if (text instanceof DocCollection.Y.Text) {
      return text;
    }
    yText.insert(0, text ?? '');
    return yText;
  }

  override renderBlock(): TemplateResult<1> {
    //console.log('111111', this.model);
    //const children = html`<div>${this.renderChildren(this.model)}</div>`;
    //console.log('11111', children);
    //const { type } = this.model;
    /* const children = html`<div
      class="affine-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;*/
    //console.log('yText', this.model.text.yText);
    //console.log('inlineEventSource', this.topContenteditableElement ?? nothing);
    /*  console.log('undoManager', this.doc.history);
    console.log('attributesSchema', this.attributesSchema);
    console.log('attributeRenderer', this.attributeRenderer);
    console.log('markdownShortcutHandler', this.markdownShortcutHandler);
    console.log('embedChecker', this.embedChecker);
    console.log('readonly', this.doc.readonly);
    console.log('inlineRangeProvider', this._inlineRangeProvider);*/
    /*.undoManager=${this.doc.history}
  .attributesSchema=${this.attributesSchema}
  .attributeRenderer=${this.attributeRenderer}
  .markdownShortcutHandler=${this.markdownShortcutHandler}
  .embedChecker=${this.embedChecker}
  .readonly=${this.doc.readonly}
  .inlineRangeProvider=${this._inlineRangeProvider}*/
    /*    console.log('');
    console.log('');
    console.log('');*/
    //            .wrapText=${false}
    console.log('this is model', this.model);
    console.log('topContenteditableElement', this.topContenteditableElement);
    const yText = this.getYText('this is description');

    return html`
      <div style="position: relative">
        <div
          style="display: flex;gap:4px;border: 1px solid green;padding: 0 10px;display: flex;flex-direction: column"
        >
          <div>
            <rich-text
              .yText=${this.model.title.yText}
              .inlineEventSource=${this.topContenteditableElement ?? nothing}
              .enableClipboard=${false}
              .enableUndoRedo=${false}
              .inlineRangeProvider=${this._inlineRangeProvider}
            ></rich-text> 
          </div>
             <rich-text
              .yText=${this.model.description.yText}
              .inlineEventSource=${this.topContenteditableElement ?? nothing}
            ></rich-text> 
          <affine-block-selection .block=${this}></affine-block-selection>
        </div>
      </div>
    `;
  }
}
//.yText=${yText}
//  .markdownShortcutHandler=${this.markdownShortcutHandler}
// .embedChecker=${this.embedChecker}
// .attributeRenderer=${this.attributeRenderer}

declare global {
  interface HTMLElementTagNameMap {
    'affine-hint': HintBlockComponent;
  }
}
