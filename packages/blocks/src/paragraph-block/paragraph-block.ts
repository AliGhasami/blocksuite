import type { BlockComponent } from '@blocksuite/block-std';
import type { InlineRangeProvider } from '@blocksuite/inline';

import { getInlineRangeProvider } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import { type ReadonlySignal, computed } from '@lit-labs/preact-signals';
import { type TemplateResult, html, nothing } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import type { RichText } from '../_common/components/rich-text/rich-text.js';
import type { ParagraphBlockModel } from './paragraph-model.js';
import type { ParagraphBlockService } from './paragraph-service.js';

import { CaptionedBlockComponent } from '../_common/components/captioned-block-component.js';
import { bindContainerHotkey } from '../_common/components/rich-text/keymap/index.js';
import '../_common/components/rich-text/rich-text.js';
import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import { NOTE_SELECTOR } from '../_common/edgeless/note/consts.js';
import { getViewportElement } from '../_common/utils/index.js';
import { EdgelessTextBlockComponent } from '../edgeless-text/edgeless-text-block.js';
import { EdgelessRootBlockComponent } from '../root-block/edgeless/edgeless-root-block.js';
import { paragraphBlockStyles } from './styles.js';

@customElement('affine-paragraph')
export class ParagraphBlockComponent extends CaptionedBlockComponent<
  ParagraphBlockModel,
  ParagraphBlockService
> {
  private _displayPlaceholder!: ReadonlySignal<boolean>;

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

  static override styles = paragraphBlockStyles;

  override connectedCallback() {
    super.connectedCallback();
    bindContainerHotkey(this);

    this._inlineRangeProvider = getInlineRangeProvider(this);

    this._displayPlaceholder = computed(() => {
      //const textSelection = this.host.selection.find('text');
      //const isCollapsed = textSelection?.isCollapsed() ?? false;
      // console.log('this is inline', this.inlineEditor);

      /****************************/
      /* if (this.inlineEditor) {
        /!* this.inlineEditor.slots.textChange.on(a => {
          console.log('this is text change', a);
        });*!/
        /!* this.inlineEditor.slots.unmounted.on(a => {
          console.log('this is unmounted', a);
        });*!/
        this.inlineEditor.slots.inlineRangeUpdate.on(a => {
          console.log('this is inlineRangeUpdate', a);
        });
        /!* this.inlineEditor.slots.keydown.on(a => {
          console.log('this is keydown', a);
        });*!/
        this.inlineEditor.slots.inlineRangeApply.on(a => {
          console.log('this is inlineRangeApply', a);
        });
        this.inlineEditor.slots.renderComplete.on(a => {
          console.log('this is renderComplete', a);
        });
        // this.inlineEditor.slots.inputting.on(a => {
        //   console.log('this is inputting', a);
        // });
        /!*this.inlineEditor.slots.mounted.on(a => {
          console.log('this is mounted', a);
        });*!/
      }*/

      /*****************************/

      let isEmpty = false;
      const note = this.doc.getBlocksByFlavour('affine:note'); //.getBlockByFlavour('affine:note');
      const paragraphList = note.length ? note[0].model.children : [];
      if (paragraphList.length == 1) {
        isEmpty = true;
      }
      // console.log('11111');
      if (
        this.doc.readonly ||
        (this.inlineEditor?.yTextLength ?? 0) > 0 ||
        this.inlineEditor?.isComposing ||
        (!this.selected && !isEmpty) || //!this.selected //&& !isEmpty
        //!isCollapsed ||
        this._isInDatabase() ||
        this.selection.value.length > 1
      ) {
        return false;
      }
      return true;
    });
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
    //const temp = document.getElementById('editor-scroll-container');
    //editor-scroll-container
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
    return this.topContenteditableElement instanceof EdgelessTextBlockComponent;
  }

  get inlineEditor() {
    return this._richTextElement?.inlineEditor;
  }

  get inlineManager() {
    const inlineManager = this.service?.inlineManager;
    assertExists(inlineManager);
    return inlineManager;
  }

  get markdownShortcutHandler() {
    return this.inlineManager.markdownShortcutHandler;
  }

  override get topContenteditableElement() {
    if (this.rootComponent instanceof EdgelessRootBlockComponent) {
      const el = this.closest<BlockComponent>(NOTE_SELECTOR);
      return el;
    }
    return this.rootComponent;
  }

  @query('rich-text')
  private accessor _richTextElement: RichText | null = null;

  override accessor blockContainerStyles = { margin: '10px 0' };
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-paragraph': ParagraphBlockComponent;
  }
}
