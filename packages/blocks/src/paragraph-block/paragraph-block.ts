import '../_common/components/rich-text/rich-text.js';
import '../_common/components/block-selection.js';

import { BlockElement, getInlineRangeProvider } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import { type InlineRangeProvider } from '@blocksuite/inline';
import { html, nothing, type TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { bindContainerHotkey } from '../_common/components/rich-text/keymap/index.js';
import type { RichText } from '../_common/components/rich-text/rich-text.js';
import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import type { NoteBlockComponent } from '../note-block/note-block.js';
import { EdgelessRootBlockComponent } from '../root-block/edgeless/edgeless-root-block.js';
import type { ParagraphBlockModel } from './paragraph-model.js';
import type { ParagraphService } from './paragraph-service.js';
import { paragraphBlockStyles } from './styles.js';

const getPlaceholder = (model: ParagraphBlockModel) => {
  if (model.type === 'text') {
    return html`<div class="affine-paragraph-placeholder-content">
      <div>
        <span class="place-holder">
          Press
          <span class="short-code">@</span>
          for AI &
          <span class="short-code">/</span>
          for Commands ...
        </span>
      </div>
      <!-- TODO ali ghasami  -->
      <div>&nbsp;</div>
    </div>`;
    //return "Type '/' for commands";
  }

  const placeholders = {
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    quote: '',
  };
  return placeholders[model.type];
};

@customElement('affine-paragraph')
export class ParagraphBlockComponent extends BlockElement<
  ParagraphBlockModel,
  ParagraphService
> {
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

  override renderBlock(): TemplateResult<1> {
    const { type } = this.model;
    const children = html`<div
      class="affine-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;

    return html`
      <div class="affine-paragraph-block-container">
        <style>
          ${paragraphBlockStyles}
        </style>
        <div class="affine-paragraph-rich-text-wrapper ${type}">
          <rich-text
            .yText=${this.model.text.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
            .undoManager=${this.doc.history}
            .attributesSchema=${this.attributesSchema}
            .attributeRenderer=${this.attributeRenderer}
            .markdownShortcutHandler=${this.markdownShortcutHandler}
            .embedChecker=${this.embedChecker}
            .readonly=${this.doc.readonly}
            .inlineRangeProvider=${this._inlineRangeProvider}
            .enableClipboard=${false}
            .enableUndoRedo=${false}
          ></rich-text>
          <div contenteditable="false" class="affine-paragraph-placeholder">
            ${getPlaceholder(this.model)}
          </div>
        </div>
        ${children}

        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-paragraph': ParagraphBlockComponent;
  }
}
