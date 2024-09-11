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

import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
//import type { InlineEditor } from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
//import type { Options } from './index.js';
//import type { UserMention } from './types.js';

//import type { BlockModel } from '@blocksuite/store';

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
@customElement('mahdaad-menu-popover')
export class MahdaadMenuPopover extends WithDisposable(ShadowlessElement) {
  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  static override styles = styles;

  constructor(
    //private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
    //private obj_type: IObjectType,
    //private model: BlockModel
  ) {
    super();
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  /*addObjectLink(model: BlockModel, lnk: ObjectLink) {
    /!* this.editorHost.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        ...lnk,
      },
    ]);*!/
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
  }*/

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
    //debugger;
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
          111111
          <!-- <span>${this._searchText}</span> -->
          <!--<mahdaad-object-picker-component
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
          </mahdaad-object-picker-component
          >-->
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

  /* @property({ attribute: false })
  accessor options!: Options;*/

  @property({ attribute: false })
  accessor triggerKey!: string;
}
