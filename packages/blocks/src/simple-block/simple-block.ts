/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { BlockElement, getInlineRangeProvider } from '@blocksuite/block-std';
import {
  createInlineKeyDownHandler,
  type InlineRangeProvider,
  KEYBOARD_ALLOW_DEFAULT,
} from '@blocksuite/inline';
import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import type { RichText } from '../_common/components/index.js';
import { bindContainerHotkey } from '../_common/components/rich-text/keymap/index.js';
import type { SimpleBlockModel } from './simple-model.js';

@customElement('affine-simple')
export class SimpleBlockComponent extends BlockElement<SimpleBlockModel> {
  static override styles = css`
    affine-simple {
      margin: 0 10px;
      padding: 10px;
      border: 1px solid #454ce1;
      display: flex;
    }
  `;

  @query('rich-text#description')
  private _richTextElementDescription?: RichText;

  //private _inlineRangeProvider: InlineRangeProvider | null = null;

  override connectedCallback() {
    super.connectedCallback();
    /*this.addEventListener('keydown', e => {
      console.log('lllllllllllllllll');
      //e.stopPropagation();
      //e.preventDefault();
    });*/
    /*this.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
    });*/

    this.bindHotKey({
      Enter: e => {
        console.log('qqqqqq', e);
        e._map.keyboardState.raw.preventDefault();
        console.log('11111', this._richTextElementDescription?.inlineEditor);
        //debugger;
        this._richTextElementDescription?.inlineEditor?.focusEnd();
        console.log('1111');
        //console.log('|1111', this.model.description);
        //debugger;
      },
      'Shift-Enter': e => {
        e._map.keyboardState.raw.preventDefault();
        //console.log('tttttttttttt', e);
        //alert('11111');
      },
      'Mod-b': () => {},
      'Alt-Space': () => {
        //debugger;
      },
    });
    //console.log('ffffffffff', this._richTextElementDescription?.inlineEditor);
    //blockElement
    //bindContainerHotkey(this);
    ///    this._inlineRangeProvider = getInlineRangeProvider(this);
  }

  override firstUpdated() {
    console.log('simple-firstUpdated', this._richTextElementDescription);

    //this._richTextElementDescription?.inlineEventSource.
    //this._richTextElementDescription?.inlineEditor.

    console.log('111111', this._richTextElementDescription?.inlineEditor);
    //debugger;

    this.updateComplete
      .then(() => {
        console.log('hint-updateComplete', this.model);

        /*this._richTextElementDescription.addEventListener('keydown', () => {
          debugger;
        });*/

        //this._richTextElementDescription?.inlineEditor.

        //const inlineEditor = this.inlineEditor;
        //console.log('uuuuuuuuuuu', inlineEditor);
        //if (!inlineEditor) return;
        /*const keyDownHandler = createInlineKeyDownHandler(
          this._richTextElementDescription.inlineEditor,
          {
            inputRule: {
              key: [' ', 'Enter'],
              handler: context => {
                debugger;
                console.log('rich-text-keyDownHandler');
                //return markdownShortcutHandler(context, this.undoManager);
              },
            },
          }
        );*/

        /*const keydownHandler = createInlineKeyDownHandler(
          this._richTextElementDescription.inlineEditor,
          {
            inputRule: {
              key: ' ',
              handler: context => {
                debugger;
                /!*const { inlineEditor, prefixText, inlineRange } = context;
                for (const match of markdownMatches) {
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
          }
        );
        this.addEventListener('keydown', keydownHandler);*/

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
    //console.log('11111', this, this.model);

    return html`<span>
      <div style="display: flex ;flex-direction: column">
        <div style="border:1px solid red">
          <rich-text
            .yText=${this.model.title.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
          >
          </rich-text>
        </div>
        <div style="border: 1px solid chartreuse">
          <rich-text
            id="description"
            .yText=${this.model.description.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
          >
          </rich-text>
        </div>
      </div>
    </span>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'affine-simple': SimpleBlockComponent;
  }
}
