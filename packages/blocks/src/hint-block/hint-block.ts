/// <reference types="vite/client" />
import { BlockComponent } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';

import '../_common/components/block-selection.js';
//import { assertExists } from '@blocksuite/global/utils';
///import { limitShift, offset, shift } from '@floating-ui/dom';
//import type { HTMLElement } from 'happy-dom';
import { type TemplateResult, css, html, nothing } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import tippy from 'tippy.js';

import type { RichText } from '../_common/components/index.js';
//import { createKeydownObserver } from '../_common/components/utils.js';
//import { PAGE_HEADER_HEIGHT } from '../_common/consts.js';
import type { NoteBlockComponent } from '../note-block/index.js';
import type { HintBlockModel, HintType } from './hint-model.js';

import { EdgelessRootBlockComponent } from '../root-block/index.js';
import DefaultIcon from './icons/default.svg?raw';
import ErrorIcon from './icons/error.svg?raw';
import InfoIcon from './icons/info.svg?raw';
import SuccessIcon from './icons/success.svg?raw';
import WarningIcon from './icons/warning.svg?raw';

@customElement('affine-hint')
export class HintBlockComponent extends BlockComponent<HintBlockModel> {
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

  /*get inlineManager() {
    const inlineManager = this.service?.inlineManager;
    assertExists(inlineManager);
    return inlineManager;
  }*/
  /* get attributesSchema() {
    return this.inlineManager.getSchema();
  }*/
  /*  get attributeRenderer() {
    return this.inlineManager.getRenderer();
  }*/
  /*get markdownShortcutHandler() {
    return this.inlineManager.markdownShortcutHandler;
  }*/
  /* get embedChecker() {
    return this.inlineManager.embedChecker;
  }*/

  //private _inlineRangeProvider: InlineRangeProvider | null = null;

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
      },
    });*/
    //this._inlineRangeProvider = getInlineRangeProvider(this);
  }

  //popover?: HTMLElement | null;
  override firstUpdated() {
    this.updateComplete
      .then(() => {
        const titleInlineEditor = this._richTextTitle?.inlineEditor;
        assertExists(titleInlineEditor, 'title Inline Editor not define');
        const descriptionInlineEditor = this._richTextDescription?.inlineEditor;
        assertExists(
          descriptionInlineEditor,
          'description Inline Editor not define'
        );

        /* const keydownHandler = createInlineKeyDownHandler(titleInlineEditor, {
          inputRule: {
            key: 'q',
            handler: context => {
              console.log('this is 1000');
              return KEYBOARD_ALLOW_DEFAULT;
            },
          },
        });
        titleInlineEditor.eventSource.addEventListener(
          'keydown',
          keydownHandler
        );*/

        /* const keydownHandler2 = createInlineKeyDownHandler(
          descriptionInlineEditor,
          {
            inputRule: {
              key: 'q',
              handler: context => {
                console.log('this is 1000');
                return KEYBOARD_ALLOW_DEFAULT;
              },
            },
          }
        );
        descriptionInlineEditor.eventSource.addEventListener(
          'keydown',
          keydownHandler2
        );*/

        //return;
        titleInlineEditor?.eventSource.addEventListener(
          'keydown',
          (e: KeyboardEvent) => {
            const inlineRange = titleInlineEditor.getInlineRange();
            if (!inlineRange) return;
            if (e.key === 'Enter') {
              e.preventDefault();
              descriptionInlineEditor.focusEnd();
            }
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
            }
          }
        );

        /*descriptionInlineEditor?.eventSource.addEventListener(
          'keydown',
          (e: KeyboardEvent) => {
            /!*if (e.key === 'Enter' && e.shiftKey) {
              console.log('bbbbbbb');
              e.preventDefault();
              return false;
            }
            console.log(e);
            return true;*!/
          }
        );*/
        //@ts-ignore
        tippy(this, {
          theme: 'block-editor',
          content: this.optionPopover,
          allowHTML: true,
          placement: 'top',
          appendTo: () => {
            return document.body;
          },
          interactive: true,
          hideOnClick: false,
          arrow: false,
        });
      })
      .catch(console.error);
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

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this._richTextElement?.updateComplete;
    return result;
  }

  //@query('.affine-paragraph-placeholder')
  //private _placeholderContainer?: HTMLElement;

  handleChangeType(event: CustomEvent) {
    //console.log('11111', event);
    this.model.type = event.detail[0];
    //console.log('this is type', type, test);
  }

  override renderBlock(): TemplateResult<1> {
    return html`
      <div class="popover">
        <select-hint-type
          .type=${this.model.type}
          @change="${this.handleChangeType}"
        ></select-hint-type>
      </div>
      <div class="affine-hint-container affine-hint-${this.model.type}">
        <!-- <div class="affine-hint">
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
        </div> -->
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
    `;
  }

  get inlineEditor() {
    //return null
    return this._richTextElement?.inlineEditor;
  }

  override get topContenteditableElement() {
    if (this.rootComponent instanceof EdgelessRootBlockComponent) {
      const note = this.closest<NoteBlockComponent>('affine-note');
      return note;
    }
    return this.rootComponent;
  }

  @query('.description-text')
  private accessor _richTextDescription: RichText | null = null;

  @query('rich-text')
  accessor _richTextElement: RichText | null = null;

  @query('.title-text')
  private accessor _richTextTitle: RichText | null = null;

  //popover?: HTMLElement | null;
  @query('.popover')
  accessor optionPopover: HTMLElement | null = null;
}
declare global {
  interface HTMLElementTagNameMap {
    'affine-hint': HintBlockComponent;
  }
}
