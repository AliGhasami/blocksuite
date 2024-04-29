/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { assertExists } from '@blocksuite/global/utils';
import {
  createInlineKeyDownHandler,
  type InlineRangeProvider,
  KEYBOARD_ALLOW_DEFAULT,
} from '@blocksuite/inline';
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
import type { HintBlockModel } from './hint-model.js';

@customElement('affine-hint')
export class HintBlockComponent extends BlockElement<HintBlockModel> {
  static override styles = css`
    affine-hint {
      display: block;
      margin: 10px 0;
      padding-right: 10px;
      //font-size: var(--affine-font-base);
    }
    .affine-hint-container {
      position: relative;
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

  //@query('.affine-paragraph-placeholder')
  //private _placeholderContainer?: HTMLElement;

  override get topContenteditableElement() {
    if (this.rootElement instanceof EdgelessRootBlockComponent) {
      const note = this.closest<NoteBlockComponent>('affine-note');
      return note;
    }
    return this.rootElement;
  }

  get inlineEditor() {
    //return null
    return this._richTextElement?.inlineEditor;
  }

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this._richTextElement?.updateComplete;
    return result;
  }

  override connectedCallback() {
    super.connectedCallback();
    //bindContainerHotkey(this);

    this.bindHotKey({
      Escape: () => {
        alert('1111');
      },
      'Mod-b': () => {},
      'Shift-Enter': ctx => {
        ctx._map.keyboardState.raw.preventDefault();
        console.log('11111', ctx._map.keyboardState.raw);
        return false;
      },
    });

    /*this.bindHotkey({
      'Mod-b': () => {},
      'Alt-Space': () => {
        //debugger;
      },
    });*/
    this._inlineRangeProvider = getInlineRangeProvider(this);
  }

  override firstUpdated() {
    console.log('hint-firstUpdated');

    //this.model.propsUpdated.on(this._updatePlaceholder);
    //this.host.selection.slots.changed.on(this._updatePlaceholder);

    this.updateComplete
      .then(() => {
        console.log('hint-updateComplete', this.model);

        const inlineEditor = this.inlineEditor;
        console.log('uuuuuuuuuuu', inlineEditor);
        if (!inlineEditor) return;

        /* const keydownHandler = createInlineKeyDownHandler(this.inlineEditor, {
          inputRule: {
            key: ' ',
            handler: context => {
              debugger;
              const { inlineEditor, prefixText, inlineRange } = context;
              /!*for (const match of markdownMatches) {
                const matchedText = prefixText.match(match.pattern);
                if (matchedText) {
                  return match.action({
                    inlineEditor,
                    prefixText,
                    inlineRange,
                    pattern: match.pattern,
                    undoManager: this.undoManager,
                  });
                }
              }*!/
              return KEYBOARD_ALLOW_DEFAULT;
            },
          },
        });
        console.log('tttttttttt', this);
        this.addEventListener('keydown', keydownHandler);*/

        /*this.disposables.add(
          inlineEditor.slots.inputting.on(this._updatePlaceholder)
        );*/
      })
      .catch(console.error);
  }

  override renderBlock(): TemplateResult<1> {
    //console.log('00000000000000000', this.topContenteditableElement);
    return html`
      <div class="affine-hint-container affine-hint-${this.model.type}">
        <div class="affine-hint">
          <span></span>
          <div class="affine-content">
            <div class="affine-hint-title">
              <rich-text
                .yText=${this.model.title.yText}
                .inlineEventSource=${this.topContenteditableElement ?? nothing}
              ></rich-text>
            </div>
            <div class="affine-hint-description">
              <rich-text
                .yText=${this.model.description.yText}
                .inlineEventSource=${this.topContenteditableElement ?? nothing}
              ></rich-text>
            </div>
          </div>
        </div>
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
    `;
  }
}
//.inlineEventSource=${this.topContenteditableElement ?? nothing}
declare global {
  interface HTMLElementTagNameMap {
    'affine-hint': HintBlockComponent;
  }
}
