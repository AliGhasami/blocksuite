/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { BlockElement, getInlineRangeProvider } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import {
  createInlineKeyDownHandler,
  type InlineRangeProvider,
  KEYBOARD_ALLOW_DEFAULT,
} from '@blocksuite/inline';
import type { HTMLElement } from 'happy-dom';
///import { limitShift, offset, shift } from '@floating-ui/dom';
import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
//import {} from 'lit/decorators.js';
///import { ref } from 'lit/directives/ref.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import tippy from 'tippy.js';

import { type RichText } from '../_common/components/index.js';
import { createKeydownObserver } from '../_common/components/utils.js';
//import { PAGE_HEADER_HEIGHT } from '../_common/consts.js';
import type { NoteBlockComponent } from '../note-block/index.js';
import { EdgelessRootBlockComponent } from '../root-block/index.js';
//import { HintOptionTemplate } from './component/hint-option.js';
import type { HintBlockModel } from './hint-model.js';
import DefaultIcon from './icons/default.svg?raw';
import ErrorIcon from './icons/error.svg?raw';
import InfoIcon from './icons/info.svg?raw';
import SuccessIcon from './icons/success.svg?raw';
import WarningIcon from './icons/warning.svg?raw';

export type HintType = 'default' | 'warning' | 'info' | 'success' | 'error';

@customElement('affine-hint')
export class HintBlockComponent extends BlockElement<HintBlockModel> {
  static override styles = css`
    affine-hint {
      display: block;
      margin: 10px 0;
      padding-inline-end: 10px;
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

  @query('.popover')
  private popover?: HTMLElement;

  @query('.title-text')
  private _richTextTitle?: RichText;

  @query('.description-text')
  private _richTextDescription?: RichText;

  //@query('.affine-paragraph-placeholder')
  //private _placeholderContainer?: HTMLElement;

  override get topContenteditableElement() {
    if (this.rootElement instanceof EdgelessRootBlockComponent) {
      const note = this.closest<NoteBlockComponent>('affine-note');
      return note;
    }
    return this.rootElement;
  }

  getIcon(type: HintType) {
    switch (type) {
      case 'success':
        return SuccessIcon;
      case 'warning':
        return WarningIcon;
      case 'info':
        return InfoIcon;
      case 'error':
        return ErrorIcon;
      default:
        return DefaultIcon;
    }
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

  handleChangeType(event: CustomEvent) {
    //console.log('11111', event);
    this.model.type = event.detail[0];
    //console.log('this is type', type, test);
  }

  override connectedCallback() {
    super.connectedCallback();
    //bindContainerHotkey(this);

    //console.log('2222', this._richTextTitle);

    //console.log('tttttttttttttttttt', this.popover());
    //'#myButton'

    /*  ) => {
      const event = this.handleChangeType;
      return `<button onclick="event()">The time is?</button>
<select-hint-type onclick={this.handleChangeType} onchange={this.handleChangeType} />
`;*/

    /*this.bindHotKey({
      Escape: () => {},
      'Mod-b': () => {},
      'Shift-Enter': ctx => {
        console.log('Shift-Enter');
        //ctx._map.keyboardState.raw.preventDefault();
        //console.log('11111', ctx._map.keyboardState.raw);
        return false;
      },
    });*/

    /*this.bindHotkey({
      'Mod-b': () => {},
      'Alt-Space': () => {
        //debugger;
      },
    });*/
    this._inlineRangeProvider = getInlineRangeProvider(this);
  }

  override firstUpdated() {
    //console.log('hint-firstUpdated');
    //console.log('lllllllllllllll');

    //temp.show();
    //this.model.propsUpdated.on(this._updatePlaceholder);
    //this.host.selection.slots.changed.on(this._updatePlaceholder);

    /*const keydownHandler = createInlineKeyDownHandler(
      this._richTextTitle?.inlineEditor,
      {
        inputRule: {
          key: ' ',
          handler: context => {
            debugger;
            return KEYBOARD_ALLOW_DEFAULT;
          },
        },
      }
    );
    this.addEventListener('keydown', keydownHandler);*/

    this.updateComplete
      .then(() => {
        const inlineEditor = this._richTextTitle?.inlineEditor;
        const descriptionInlineEditor = this._richTextDescription?.inlineEditor;
        /*const keydownHandler = createInlineKeyDownHandler(inlineEditor, {
          inputRule: {
            key: [' ', 'Enter'],
            handler: context => {
              //return false;
              console.log('this is context for inline editor', context);
              // debugger;
              //const { inlineEditor, prefixText, inlineRange } = context;
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
        });*/
        //console.log('tttttttttt', this);
        //this.addEventListener('keydown', keydownHandler);
        inlineEditor?.eventSource.addEventListener(
          'keydown',
          (e: KeyboardEvent) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
            }
          }
        );

        /*const keydownHandler2 = createInlineKeyDownHandler(
          descriptionInlineEditor,
          {
            inputRule: {
              key: ['ctrl + b'],
              handler: context => {
                //return false;
                console.log(
                  'this is context for inline editor description',
                  context
                );
                // debugger;
                //const { inlineEditor, prefixText, inlineRange } = context;
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
          }
        );*/
        //console.log('tttttttttt', this);
        //this.addEventListener('keydown', keydownHandler);
        //keydownHandler2
        descriptionInlineEditor?.eventSource.addEventListener(
          'keydown',
          (e: KeyboardEvent) => {
            if (e.key === 'Enter' && e.shiftKey) {
              console.log('bbbbbbb');
              e.preventDefault();
              return false;
            }
            console.log(e);
            return true;
          }
        );

        /*e => {
          console.log('qqqqqqqq', e);
        }*/

        //console.log('3333', ?.focusEnd());
        /*createKeydownObserver({
          target: inlineEditor.eventSource,
          inlineEditor,
          abortController: () => {
            alert('this is abortController');
          },
          interceptor: (e, next) => {
            //console.log('interceptor');
            if (e.key === '/') {
              // Can not stopPropagation here,
              // otherwise the rich text will not be able to trigger a new the slash menu
              return;
            }
            /!*if (this._hide && e.key !== 'Backspace') {
              // if the following key is not the backspace key,
              // the slash menu will be closed
              this.abortController.abort();
              return;
            }*!/
            /!* if (e.key === ' ') {
              this._hide = true;
              next();
              return;
            }
            if (this._hide) {
              this._hide = false;
            }*!/

            //const isControlled = isControlledKeyboardEvent(e);
            //const isShift = e.shiftKey;
            /!*if (e.key === 'ArrowLeft' && !isControlled && !isShift) {
              e.stopPropagation();
              e.preventDefault();
              // If the left panel is hidden, should not activate it
              if (this._searchString.length) return;
              this._leftPanelActivated = true;
              return;
            }*!/
            /!*if (e.key === 'ArrowRight' && !isControlled && !isShift) {
              e.stopPropagation();
              e.preventDefault();
              this._leftPanelActivated = false;
              return;
            }*!/
            next();
          },
          onUpdateQuery: val => {
            console.log('this is update query');
            //const newFilteredItems = this._updateItem(val);
            //this._filterItems = newFilteredItems;
            /!*if (!newFilteredItems.length) {
              this._hide = true;
            }*!/
          },
          onMove: step => {
            console.log('this is move');
            //console.log('this is move');
            //const configLen = this._filterItems.length;
            /!*if (this._leftPanelActivated) {
              const groupNames = collectGroupNames(this._filterItems);
              const nowGroupIdx = groupNames.findIndex(
                groupName =>
                  groupName ===
                  this._filterItems[this._activatedItemIndex].groupName
              );
              const targetGroup =
                groupNames[
                  (nowGroupIdx + step + groupNames.length) % groupNames.length
                ];
              this._handleClickCategory(targetGroup);
              return;
            }*!/
            //let ejectedCnt = configLen;
            /!* do {
              this._activatedItemIndex =
                (this._activatedItemIndex + step + configLen) % configLen;
              // Skip disabled items
            } while (
              //this._filterItems[this._activatedItemIndex].disabled &&
              false &&
              // If all items are disabled, the loop will never end
              ejectedCnt--
            );*!/
          },
          onConfirm: () => {
            console.log('this is confirem');
            //console.log('11111', this._activatedItemIndex);
            //this._handleClickItem(this._filterItems[this._activatedItemIndex]);
          },
          onEsc: () => {
            console.log('this is esc');
            //this.abortController.abort();
          },
        });*/

        //this._richTextTitle?.inlineEditor.
        //console.log('hint-updateComplete', this.model);

        tippy(this, {
          content: this.popover,
          allowHTML: true,
          placement: 'top',
          appendTo: () => {
            return document.body;
          },
          interactive: true,
          hideOnClick: false,
          arrow: false,
        });

        const titleInlineEditor = this._richTextTitle?.inlineEditor;
        if (!titleInlineEditor) return;
        //debugger;
        /* const keydownHandler = createInlineKeyDownHandler(titleInlineEditor, {
          inputRule: {
            key: [' ', 'Enter'],
            handler: context => {
              debugger;
              //const { inlineEditor, prefixText, inlineRange } = context;
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
        });*/
        //console.log('tttttttttt', this);
        /*this.addEventListener('keydown', keydownHandler);*/
        /*this.disposables.add(
          inlineEditor.slots.inputting.on(this._updatePlaceholder)
        );*/
      })
      .catch(console.error);
  }

  override renderBlock(): TemplateResult<1> {
    //console.log('11111', this.topContenteditableElement);
    return html`
      <div class="popover">
        <select-hint-type
          .type=${this.model.type}
          @change="${this.handleChangeType}"
        ></select-hint-type>
      </div>
      <div class="affine-hint-container affine-hint-${this.model.type}">
        <div class="affine-hint">
          <span>${html`${unsafeSVG(this.getIcon(this.model.type))}`}</span>
          <div class="affine-content">
            <div class="affine-hint-title">
              <rich-text
                class="title-text"
                .yText=${this.model.title.yText}
                .inlineEventSource=${this.topContenteditableElement ?? nothing}
              ></rich-text>
            </div>
            <div class="affine-hint-description">
              <rich-text
                class="description-text"
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
declare global {
  interface HTMLElementTagNameMap {
    'affine-hint': HintBlockComponent;
  }
}
