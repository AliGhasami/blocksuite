import type { EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';

import { ShadowlessElement } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
//import { ShadowlessElement } from '@blocksuite/block-std';
//import { WithDisposable } from '@blocksuite/block-std';
import {  WithDisposable } from '@blocksuite/global/utils';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

//import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { AffineInlineEditor } from '@blocksuite/affine-components/rich-text';

import '../../../_common/components/button.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
//import { REFERENCE_NODE } from '../../../_common/inline/presets/nodes/consts.js';

import {
  insertContent,
  REFERENCE_NODE
} from '@blocksuite/affine-components/rich-text';

//import { insertContent } from '../slash-menu/index.js';
import { styles } from './styles.js';

@customElement('mahdaad-menu-popover')
export class MahdaadMenuPopover extends WithDisposable(ShadowlessElement) {
  static override styles = styles;

  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private model: BlockModel
  ) {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();

    const inlineEditor = this.inlineEditor;

    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    createKeydownObserver({
      target: inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key } = event;
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
          return;
        }

        next();
      },
      onInput: () => {
        this._searchText = this._query;
      },
      onDelete: () => {
        this._searchText = this._query;
        const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex == this._startIndex - 1) {
          this.abortController.abort();
        }
      },
      onMove: () => {},
      onConfirm: () => {
        this.abortController.abort();
      },
      onAbort: () => {
        this.abortController.abort();
      },
    });

    this._disposables.addFromEvent(this, 'mousedown', e => {
      e.stopPropagation();
      e.preventDefault();
    });
  }

  override render() {
    const style = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
          //maxHeight: `${Math.min(this._position.height, MAX_HEIGHT)}px`,
        })
      : styleMap({
          visibility: 'hidden',
        });

    return html`<div>
      <div
        class="${Prefix}-popover ${Prefix}-popover-element ${Prefix}-object-link-popover"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <mahdaad-user-picker
            search-text="${this._searchText}"
            .inline-editor="${this.inlineEditor}"
            @select="${(event: CustomEvent) => {
              cleanSpecifiedTail(
                this.editorHost,
                this.inlineEditor,
                this.triggerKey + this._searchText
              );
              //console.log('this is insert content');
              insertContent(this.editorHost, this.model, REFERENCE_NODE, {
                mention: {
                  user_id: event.detail.user_id,
                  id: event.detail.id,
                },
              });
              this.abortController.abort();
            }}"
            @close="${() => {
              this.abortController.abort();
            }}"
          ></mahdaad-user-picker>
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
  accessor triggerKey!: string;
}
