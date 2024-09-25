import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuStaticConfig,
} from './config.js';

import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { type MahdaadActionMenu, actionsMenu } from './mahdaad_menu.js';
import { styles } from './styles.js';

export type InnerSlashMenuContext = SlashMenuContext & {
  tooltipTimeout: number;
  onClickItem: (item: SlashMenuActionItem) => void;
};

@customElement('affine-slash-menu')
export class SlashMenu extends WithDisposable(ShadowlessElement) {
  private _handleClickItem = (item: MahdaadActionMenu) => {
    // Need to remove the search string
    // We must to do clean the slash string before we do the action
    // Otherwise, the action may change the model and cause the slash string to be changed
    cleanSpecifiedTail(
      this.host,
      this.context.model,
      this.triggerKey + this._query
    );
    item.action(this.context)?.catch(console.error);
    this.abortController.abort();
  };

  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  private slashMenuID = 'mahdaad-claytap-slash-menu';

  static override styles = styles;

  updatePosition = (position: { x: string; y: string; height: number }) => {
    this._position = position;
  };

  constructor(
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
  ) {
    super();
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  override connectedCallback() {
    super.connectedCallback();

    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });

    const inlineEditor = this.inlineEditor;
    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    /**
     * Handle arrow key
     *
     * The slash menu will be closed in the following keyboard cases:
     * - Press the space key
     * - Press the backspace key and the search string is empty
     * - Press the escape key
     * - When the search item is empty, the slash menu will be hidden temporarily,
     *   and if the following key is not the backspace key, the slash menu will be closed
     */
    createKeydownObserver({
      target: inlineEditor.eventSource,
      //inlineEditor,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key, isComposing, code } = event;
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
          return;
        }
        if (key === this.triggerKey) {
          // Can not stopPropagation here,
          // otherwise the rich text will not be able to trigger a new the slash menu
          return;
        }

        if (key === 'Process' && !isComposing && code === 'Slash') {
          // The IME case of above
          return;
        }

        if (key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Escape') {
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
        if (curIndex < this._startIndex) {
          this.abortController.abort();
        }
      },
      onAbort: () => this.abortController.abort(),
    });
  }

  override render() {
    const slashMenuStyles = this._position
      ? {
          transform: `translate(${this._position.x}, ${this._position.y})`,
          //maxHeight: `${Math.min(this._position.height, this.config.maxHeight)}px`,
        }
      : {
          visibility: 'hidden',
        };
    return html`${html` <div
        class="overlay-mask"
        @click="${() => this.abortController.abort()}"
      ></div>`}

      <div
        id="${this.slashMenuID}"
        class="vue-block-board-editor-popover  ${Prefix}-slash-menu"
        style="${styleMap(slashMenuStyles)}"
      >
        <mahdaad-slash-menu
          search-text="${this._searchText}"
          .inline-editor="${this.inlineEditor}"
          @select="${(event: CustomEvent) => {
            const key = event.detail;
            const item = actionsMenu.find(i => i.key == key);
            if (item) {
              this._handleClickItem(item);
            }
            this.abortController.abort();
          }}"
          @close="${() => {
            this.abortController.abort();
          }}"
        ></mahdaad-slash-menu>
      </div>`;
  }

  get host() {
    return this.context.rootComponent.host;
  }

  @state()
  private accessor _position: {
    x: string;
    y: string;
    height: number;
  } | null = null;

  @state()
  private accessor _searchText = '';

  @property({ attribute: false })
  accessor config!: SlashMenuStaticConfig;

  @property({ attribute: false })
  accessor context!: SlashMenuContext;

  @query('#mahdaad-claytap-slash-menu')
  accessor slashMenuElement!: HTMLElement;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
