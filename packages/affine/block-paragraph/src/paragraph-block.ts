//ali ghasami for new merge
/** ok-alighasami for check merge **/
import type { ParagraphBlockModel } from '@blocksuite/affine-model';
import type { BlockComponent } from '@blocksuite/block-std';
import type { InlineRangeProvider } from '@blocksuite/inline';

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import {
  DefaultInlineManagerExtension,
  type RichText,
} from '@blocksuite/affine-components/rich-text';
import {
  BLOCK_CHILDREN_CONTAINER_PADDING_LEFT,
  NOTE_SELECTOR,
} from '@blocksuite/affine-shared/consts';
import { DocModeProvider } from '@blocksuite/affine-shared/services';
import { getViewportElement } from '@blocksuite/affine-shared/utils';
import { getInlineRangeProvider } from '@blocksuite/block-std';
import { effect, signal } from '@preact/signals-core';
import { html, nothing, type TemplateResult } from 'lit';
import { query } from 'lit/decorators.js';

import type { ParagraphBlockService } from './paragraph-service.js';

import {mahdaadParagraphBlockStyles } from './styles.js';

export class ParagraphBlockComponent extends CaptionedBlockComponent<
  ParagraphBlockModel,
  ParagraphBlockService
> {
  //static override styles = paragraphBlockStyles;
  static override styles =mahdaadParagraphBlockStyles ;

  private _composing = signal(false);

  private _displayPlaceholder = signal(false);

  private _inlineRangeProvider: InlineRangeProvider | null = null;

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

  get attributeRenderer() {
    return this.inlineManager.getRenderer();
  }

  get attributesSchema() {
    return this.inlineManager.getSchema();
  }

  get embedChecker() {
    return this.inlineManager.embedChecker;
  }

  get inEdgelessText() {
    return (
      this.topContenteditableElement?.tagName.toLowerCase() ===
      //'affine-edgeless-root'
      'affine-edgeless-text'
    );
  }

  get inlineEditor() {
    return this._richTextElement?.inlineEditor;
  }

  get inlineManager() {
    return this.std.get(DefaultInlineManagerExtension.identifier);
  }

  get markdownShortcutHandler() {
    return this.inlineManager.markdownShortcutHandler;
  }

  override get topContenteditableElement() {
    if (this.std.get(DocModeProvider).getEditorMode() === 'edgeless') {
      return this.closest<BlockComponent>(NOTE_SELECTOR);
    }
    return this.rootComponent;
  }

  checkIsEmptyAndNotFocus() {
    const note = this.doc.getBlocksByFlavour('affine:note'); //.getBlockByFlavour('affine:note');
    const paragraphList = note.length ? note[0].model.children : [];
    return paragraphList.length == 1
  }


  override connectedCallback() {
    super.connectedCallback();
    this.handleEvent(
      'compositionStart',
      () => {
        this._composing.value = true;
      },
      { flavour: true }
    );
    this.handleEvent(
      'compositionEnd',
      () => {
        this._composing.value = false;
      },
      { flavour: true }
    );

    this._inlineRangeProvider = getInlineRangeProvider(this);
    this.disposables.add(
      effect(() => {
        const composing = this._composing.value;

        let showPlaceHolder=true
        if (composing || this.doc.readonly) {
          showPlaceHolder=false
          //this._displayPlaceholder.value = false;
          //return;
        }
        const textSelection = this.host.selection.find('text');
        const isCollapsed = textSelection?.isCollapsed() ?? false;

        if (!this.selected || !isCollapsed) {
          showPlaceHolder=false
          //this._displayPlaceholder.value = false;
          //return;
        }

        this.updateComplete
          .then(() => {
            if (
              (this.inlineEditor?.yTextLength ?? 0) > 0 ||
              this._isInDatabase()
            ) {
              showPlaceHolder=false
              //this._displayPlaceholder.value = false;
              //return;
            }
            //if(!showPlaceHolder)
            if(!showPlaceHolder && this.checkIsEmptyAndNotFocus() && !this.doc.readonly) {
              showPlaceHolder = true
            }
            //this._displayPlaceholder.value = true;
            this._displayPlaceholder.value = showPlaceHolder;
            return;
          })
          .catch(console.error);
      })
    );
  }

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this._richTextElement?.updateComplete;
    return result;
  }

  override renderBlock(): TemplateResult<1> {
    const { type$ } = this.model;
    const children = html`<div
      class="affine-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;

    const temp = document.querySelector(
      `.editor-scroll-container:has([data-block-id='${this.doc.root?.id}'])`
    );
    /*console.log('this is temp', temp);
    console.log(
      '10000',
      this.doc.root?.id,
      `.editor-scroll-container:has([data-block-id='${this.doc.root?.id}'])`
    );*/
    const scrollContainer = temp ? temp : getViewportElement(this.host);

    return html`
      <div class="affine-paragraph-block-container">
        <div class="affine-paragraph-rich-text-wrapper claytap-${type$.value}">
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
            .verticalScrollContainerGetter=${() => scrollContainer}
           
          ></rich-text>
          ${this.inEdgelessText
            ? nothing
            : html`
                <div
                  contenteditable="false"
                  class="affine-paragraph-placeholder ${this._displayPlaceholder
                    .value
                    ? 'visible'
                    : ''}"
                >
                  ${this.service.placeholderGenerator(this.model)}
                </div>
              `}
        </div>

        ${children}
      </div>
    `;
  }

  @query('rich-text')
  private accessor _richTextElement: RichText | null = null;

  override accessor blockContainerStyles = {
    margin: 'var(--affine-paragraph-margin, 10px 0)',
  };
}
