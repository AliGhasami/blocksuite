//ali ghasami for new merge
import type { ParagraphBlockModel } from '@blocksuite/affine-model';
import type { BlockComponent } from '@blocksuite/block-std';
import type { InlineRangeProvider } from '@blocksuite/inline';

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import {
  DefaultInlineManagerExtension,
  type RichText,
} from '@blocksuite/affine-components/rich-text';
import { TOGGLE_BUTTON_PARENT_CLASS } from '@blocksuite/affine-components/toggle-button';
import {
  BLOCK_CHILDREN_CONTAINER_PADDING_LEFT,
  NOTE_SELECTOR,
} from '@blocksuite/affine-shared/consts';
import { DocModeProvider } from '@blocksuite/affine-shared/services';
import {
  calculateCollapsedSiblings,
  getNearestHeadingBefore,
  getViewportElement,
} from '@blocksuite/affine-shared/utils';
import { getInlineRangeProvider } from '@blocksuite/block-std';
import { effect, signal } from '@preact/signals-core';
import { html, nothing, type TemplateResult } from 'lit';
import { query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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

  get collapsedSiblings() {
    return calculateCollapsedSiblings(this.model);
  }

  get embedChecker() {
    return this.inlineManager.embedChecker;
  }

  get inEdgelessText() {
    return (
      this.topContenteditableElement?.tagName.toLowerCase() ===
      'affine-edgeless-text'
    ); //'affine-edgeless-root'
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

    this.disposables.add(
      effect(() => {
        const type = this.model.type$.value;
        if (!type.startsWith('h') && this.model.collapsed) {
          this.model.collapsed = false;
        }
      })
    );

    this.disposables.add(
      effect(() => {
        const collapsed = this.model.collapsed$.value;
        this._readonlyCollapsed = collapsed;

        // reset text selection when selected block is collapsed
        if (this.model.type.startsWith('h') && collapsed) {
          const collapsedSiblings = this.collapsedSiblings;
          const textSelection = this.host.selection.find('text');
          const blockSelections = this.host.selection.filter('block');

          if (
            textSelection &&
            collapsedSiblings.some(
              sibling => sibling.id === textSelection.blockId
            )
          ) {
            this.host.selection.clear(['text']);
          }

          if (
            blockSelections.some(selection =>
              collapsedSiblings.some(
                sibling => sibling.id === selection.blockId
              )
            )
          ) {
            this.host.selection.clear(['block']);
          }
        }
      })
    );

    // > # 123
    // # 456
    //
    // we need to update collapsed state of 123 when 456 converted to text
    let beforeType = this.model.type;
    this.disposables.add(
      effect(() => {
        const type = this.model.type$.value;
        if (beforeType !== type && !type.startsWith('h')) {
          const nearestHeading = getNearestHeadingBefore(this.model);
          if (
            nearestHeading &&
            nearestHeading.type.startsWith('h') &&
            nearestHeading.collapsed &&
            !this.doc.readonly
          ) {
            nearestHeading.collapsed = false;
          }
        }
        beforeType = type;
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
    const collapsed = this.doc.readonly
      ? this._readonlyCollapsed
      : this.model.collapsed;
    const collapsedSiblings = this.collapsedSiblings;

    let style = html``;
    if (this.model.type.startsWith('h') && collapsed) {
      style = html`
        <style>
          ${collapsedSiblings.map(sibling =>
            unsafeHTML(`
              [data-block-id="${sibling.id}"] {
                display: none;
              }
            `)
          )}
        </style>
      `;
    }

    const children = html`<div
      class="affine-block-children-container"
      style=${styleMap({
        paddingLeft: `${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px`,
        display: collapsed ? 'none' : undefined,
      })}
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
      ${style}
      <div class="affine-paragraph-block-container">
        <div  class=${classMap({
          'affine-paragraph-rich-text-wrapper': true,
          [`claytap-${type$.value}`]: true,
          [TOGGLE_BUTTON_PARENT_CLASS]: true,
        })}>
          ${this.model.type.startsWith('h') && collapsedSiblings.length > 0
            ? html`
                <affine-paragraph-heading-icon
                  .model=${this.model}
                ></affine-paragraph-heading-icon>
                <blocksuite-toggle-button
                  .collapsed=${collapsed}
                  .updateCollapsed=${(value: boolean) => {
              if (this.doc.readonly) {
                this._readonlyCollapsed = value;
              } else {
                this.doc.captureSync();
                this.doc.updateBlock(this.model, {
                  collapsed: value,
                });
              }
            }}
                ></blocksuite-toggle-button>
              `
            : nothing}
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
                  class=${classMap({
                    'affine-paragraph-placeholder': true,
                    visible: this._displayPlaceholder.value,
                  })}
                >
                  ${this.service.placeholderGenerator(this.model)}
                </div>
              `}
        </div>

        ${children}
      </div>
    `;
  }

  @state()
  private accessor _readonlyCollapsed = false;

  @query('rich-text')
  private accessor _richTextElement: RichText | null = null;

  override accessor blockContainerStyles = {
    margin: 'var(--affine-paragraph-margin, 10px 0)',
  };
}
