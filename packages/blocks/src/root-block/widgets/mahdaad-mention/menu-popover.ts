/*
import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
/!*
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuItem,
  SlashMenuStaticConfig,
  SlashMenuStaticItem,
} from './config.js';
*!/

//import type { ClayTapSlashMenu } from './mahdaad_menu.js';

import {
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
//import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { styles } from './styles.js';

/!*export type InnerSlashMenuContext = SlashMenuContext & {
  tooltipTimeout: number;
  onClickItem: (item: SlashMenuActionItem) => void;
};*!/

@customElement('mahdaad-menu-popover')
export class MahdaadMenuPopover extends WithDisposable(ShadowlessElement) {
  /!* private _handleClickItem = (item: SlashMenuActionItem) => {
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
  };*!/

  /!*private _initItemPathMap = () => {
    const traverse = (item: SlashMenuStaticItem, path: number[]) => {
      this._itemPathMap.set(item, [...path]);
      if (isSubMenuItem(item)) {
        item.subMenu.forEach((subItem, index) =>
          traverse(subItem, [...path, index])
        );
      }
    };

    this.config.items.forEach((item, index) => traverse(item, [index]));
  };*!/

  /!*  private _innerSlashMenuContext!: InnerSlashMenuContext;

  private _itemPathMap = new Map<SlashMenuItem, number[]>();*!/

  //private _menuItems: ClayTapSlashMenu[] = [];

  private _queryState: 'off' | 'on' | 'no_result' = 'off';

  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  private _updateFilteredItems = () => {
    this._filteredItems = [];

    const searchStr = this._query.toLowerCase();
    if (searchStr === '' || searchStr.endsWith(' ')) {
      this._queryState = searchStr === '' ? 'off' : 'no_result';
      return;
    }

    /!* this._filteredItems = this._menuItems.filter(item => {
      //@ts-ignore
      return isFuzzyMatch(i18next.t(item.title.values[0]), searchStr);
    });*!/

    // Layer order traversal
    /!*let depth = 0;
   let queue = this.config.items.filter(notGroupDivider);
   while (queue.length !== 0) {
     // remove the sub menu item from the previous layer result
     this._filteredItems = this._filteredItems.filter(
       item => !isSubMenuItem(item)
     );

     this._filteredItems = this._filteredItems.concat(
       queue.filter(({ name, alias = [] }) =>
         [name, ...alias].some(str => isFuzzyMatch(str, searchStr))
       )
     );

     // We search first and second layer
     if (this._filteredItems.length !== 0 && depth >= 1) break;

     queue = queue
       .map<typeof queue>(item => {
         if (isSubMenuItem(item)) {
           return item.subMenu.filter(notGroupDivider);
         } else {
           return [];
         }
       })
       .flat();

     depth++;
   }

   this._filteredItems = this._filteredItems.sort((a, b) => {
     return -(
       substringMatchScore(a.name, searchStr) -
       substringMatchScore(b.name, searchStr)
     );
   });*!/

    this._queryState = this._filteredItems.length === 0 ? 'no_result' : 'on';
  };

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
    /!*clayTapGroupMenu.map(group => {
      this._menuItems.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });*!/

    /!* this._innerSlashMenuContext = {
      ...this.context,
      onClickItem: this._handleClickItem,
      tooltipTimeout: this.config.tooltipTimeout,
    };

    this._initItemPathMap();*!/

    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });

    const inlineEditor = this.inlineEditor;
    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    /!**
     * Handle arrow key
     *
     * The slash menu will be closed in the following keyboard cases:
     * - Press the space key
     * - Press the backspace key and the search string is empty
     * - Press the escape key
     * - When the search item is empty, the slash menu will be hidden temporarily,
     *   and if the following key is not the backspace key, the slash menu will be closed
     *!/
    createKeydownObserver({
      target: inlineEditor.eventSource,
      //inlineEditor,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key, isComposing, code } = event;
        if (key === this.triggerKey) {
          // Can not stopPropagation here,
          // otherwise the rich text will not be able to trigger a new the slash menu
          return;
        }

        if (key === 'Process' && !isComposing && code === 'Slash') {
          // The IME case of above
          return;
        }

        if (key !== 'Backspace' && this._queryState === 'no_result') {
          // if the following key is not the backspace key,
          // the slash menu will be closed
          this.abortController.abort();
          return;
        }

        if (key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Escape') {
          return;
        }

        next();
      },
      onInput: () => this._updateFilteredItems(),
      onDelete: () => {
        const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex < this._startIndex) {
          this.abortController.abort();
        }
        this._updateFilteredItems();
      },
      onAbort: () => this.abortController.abort(),
    });
  }

  override render() {
    debugger;
    const slashMenuStyles = this._position
      ? {
          transform: `translate(${this._position.x}, ${this._position.y})`,
          maxHeight: `${Math.min(this._position.height, this.config.maxHeight)}px`,
        }
      : {
          visibility: 'hidden',
        };
    return html`${this._queryState !== 'no_result'
        ? html` <div
            class="overlay-mask"
            @click="${() => this.abortController.abort()}"
          ></div>`
        : nothing}
      <span>11111</span> `;
  }

  /!*get host() {
    return this.context.rootComponent.host;
  }*!/

  /!*@state()
  private accessor _filteredItems: ClayTapSlashMenu[] = [];*!/

  @state()
  private accessor _position: {
    x: string;
    y: string;
    height: number;
  } | null = null;

  @property({ attribute: false })
  accessor config!: SlashMenuStaticConfig;

  /!*@property({ attribute: false })
  accessor context!: SlashMenuContext;*!/

  @query('inner-slash-menu')
  accessor slashMenuElement!: HTMLElement;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
*/

import type { EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';

import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
//import type { InlineEditor } from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';

import '../../../_common/components/button.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { REFERENCE_NODE } from '../../../_common/inline/presets/nodes/consts.js';
import { insertContent } from '../slash-menu/index.js';
import { styles } from './styles.js';

@customElement('mahdaad-menu-popover')
export class MahdaadMenuPopover extends WithDisposable(ShadowlessElement) {
  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  static override styles = styles;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private model: BlockModel
  ) {
    super();
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
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
