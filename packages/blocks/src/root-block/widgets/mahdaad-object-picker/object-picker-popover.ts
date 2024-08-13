import type { EditorHost } from '@blocksuite/block-std';

import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
//import type { InlineEditor } from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { Options } from './index.js';
//import type { UserMention } from './types.js';

import type { BlockModel } from '@blocksuite/store';

import type { IObjectType } from './type.js';

import '../../../_common/components/button.js';
import {
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
//import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { styles } from './styles.js';
export interface ObjectLink {
  link_id: string;
  object_id: string;
  type: IObjectType;
}

//ShadowlessElement
@customElement('affine-mahdaad-object-picker-popover')
export class MahdaadObjectPickerPopover extends WithDisposable(
  ShadowlessElement
) {
  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  static override styles = styles;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private obj_type: IObjectType,
    private model: BlockModel
  ) {
    super();
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  addObjectLink(model: BlockModel, lnk: ObjectLink) {
    /* this.editorHost.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        ...lnk,
      },
    ]);*/
    //debugger;
    model.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        ...lnk,
      },
    ]);
    model.doc.deleteBlock(this.model);
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    const inlineEditor = this.inlineEditor;

    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    /*this.addObjectLink({
      object_id: '111',
      link_id: '20222',
      type: 'document',
    });*/

    createKeydownObserver({
      target: inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (e, next) => {
        //console.log('this is search text 3', this._query);
        //e.preventDefault();
        //e.stopPropagation();
        // console.log('this is interceptor');
        //this._searchText = this._query;
        //console.log('this is search text 1', this._searchText);
        next();
      },
      onInput: () => {
        //console.log('this is 3');
        this._searchText = this._query;
        //console.log('this is search text 2', this._searchText);
        //console.log('this is query', this._query);
        //this._activatedItemIndex = 0;
        //this._linkedDocGroup = this._getLinkedDocGroup();
      },
      onDelete: () => {
        //console.log('this is 1');
        this._searchText = this._query;
        const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        //console.log('99999', curIndex, this._startIndex);
        if (curIndex == this._startIndex - 1) {
          //debugger;
          this.abortController.abort();
        }
        //this._activatedItemIndex = 0;
        //this._linkedDocGroup = this._getLinkedDocGroup();
      },
      onMove: step => {
        //console.log('this is 2');
        this.abortController.abort();
        /*const itemLen = this._flattenActionList.length;
        this._activatedItemIndex =
          (itemLen + this._activatedItemIndex + step) % itemLen;

        // Scroll to the active item
        const item = this._flattenActionList[this._activatedItemIndex];
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) {
          console.warn('Failed to find the shadow root!', this);
          return;
        }
        const ele = shadowRoot.querySelector(
          `icon-button[data-id="${item.key}"]`
        );
        if (!ele) {
          console.warn('Failed to find the active item!', item);
          return;
        }
        ele.scrollIntoView({
          block: 'nearest',
        });*/
      },
      onConfirm: () => {
        //console.log('this is 4');
        this.abortController.abort();
        //debugger;
        /*this._flattenActionList[this._activatedItemIndex]
          .action()
          ?.catch(console.error);*/
      },
      onAbort: () => {
        //console.log('this is 5');
        this.abortController.abort();
      },
    });
  }

  override render() {
    //console.log('this is render', this._query);
    //const MAX_HEIGHT = 200;
    const style = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
          //maxHeight: `${Math.min(this._position.height, MAX_HEIGHT)}px`,
        })
      : styleMap({
          visibility: 'hidden',
        });

    // XXX This is a side effect
    //const accIdx = 0;
    return html`<div>
      <div
        class="${Prefix}-popover ${Prefix}-popover-element ${Prefix}-object-link-popover"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <!-- <span>${this._searchText}</span> -->
          <mahdaad-object-picker-component
            search-text="${this._searchText}"
            type="${this.obj_type}"
            .model="${this.model}"
            .create-function="${this.addObjectLink}"
            @select="${(event: CustomEvent) => {
              this.addObjectLink(this.model, event.detail as ObjectLink);
              this.abortController.abort();
            }}"
            @close="${() => {
              this.abortController.abort();
            }}"
          >
          </mahdaad-object-picker-component>
        </div>
      </div>
    </div>`;
  }

  updatePosition(position: { height: number; x: string; y: string }) {
    this._position = position;
  }

  @state()
  private accessor _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  @state()
  private accessor _searchText = '';

  @query(`.${Prefix}-popover-element`)
  accessor PopOverElement: Element | null = null;

  @property({ attribute: false })
  accessor options!: Options;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
