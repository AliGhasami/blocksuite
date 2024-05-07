/// <reference types="vite/client" />
import '../_common/components/block-selection.js';

import { BlockElement, getInlineRangeProvider } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import type { InlineRangeProvider } from '@blocksuite/inline';
import { html, nothing, type TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { type InlineRangeProvider } from '@blocksuite/inline';
import { BlockElement, getInlineRangeProvider } from '@blocksuite/lit';
import type { HTMLElement } from 'happy-dom';
///import { limitShift, offset, shift } from '@floating-ui/dom';
import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
///import { ref } from 'lit/directives/ref.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import tippy from 'tippy.js';

import { HoverController, type RichText } from '../_common/components/index.js';
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

  @query('.popover')
  private popover?: HTMLElement;

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
    console.log('11111', event);
    this.model.type = event.detail[0];
    //console.log('this is type', type, test);
  }

  /*popover() {
    return html`<p>
      <button @click="${this.handleChangeType}">Click Me!</button>
    </p>`;
  }*/

  override connectedCallback() {
    super.connectedCallback();
    //bindContainerHotkey(this);
    //console.log('tttttttttttttttttt', this.popover());
    //'#myButton'

    /*  ) => {
      const event = this.handleChangeType;
      return `<button onclick="event()">The time is?</button>
<select-hint-type onclick={this.handleChangeType} onchange={this.handleChangeType} />
`;*/

    this.bindHotKey({
      Escape: () => {
        alert('1111');
      },
      'Mod-b': () => {},
      'Shift-Enter': ctx => {
        //ctx._map.keyboardState.raw.preventDefault();
        //console.log('11111', ctx._map.keyboardState.raw);
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
    console.log('lllllllllllllll');

    //temp.show();
    //this.model.propsUpdated.on(this._updatePlaceholder);
    //this.host.selection.slots.changed.on(this._updatePlaceholder);

    this.updateComplete
      .then(() => {
        console.log('hint-updateComplete', this.model);

        const temp = tippy(this, {
          //content: `<button id="test1">Add To Cart</button>`,
          content: this.popover,
          /*content(reference) {
            console.log('zzzzzz', reference.popover);
            //const id = reference.dataset.template;
            //const template = document.getElementById(id);
            return reference.popover;
          },*/
          allowHTML: true,
          placement: 'top',
          appendTo: () => {
            return document.body;
          },
          interactive: true,
          hideOnClick: false,
          arrow: false,
          //trigger: 'hover',
        });

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

  private _increment(e: Event) {
    console.log('11111', e);
    //this.count++;
  }

  override renderBlock(): TemplateResult<1> {
    // console.log('0000000', this._whenHover);
    // ${ref(this._whenHover.setReference)}

    //const temp = ``;
    return html`
      <div class="popover">
        <!--  <p><button @click="${this._increment}">Click Me!</button></p> -->
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
declare global {
  interface HTMLElementTagNameMap {
    'affine-hint': HintBlockComponent;
  }
}
