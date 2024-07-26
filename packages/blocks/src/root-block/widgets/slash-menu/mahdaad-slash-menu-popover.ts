/*
import type { BlockModel } from '@blocksuite/store';

import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { RootBlockComponent } from '../../../root-block/types.js';
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuStaticConfig,
} from './config.js';

//import { literal, unsafeStatic } from 'lit/static-html.js';
import {
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { getInlineEditorByModel } from '../../../_common/utils/index.js';
import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { type ClayTapSlashMenu, clayTapGroupMenu } from './mahdaad_menu.js';
import { styles } from './styles.js';
//import type { SlashMenuOptions } from './utils.js';

export type InnerSlashMenuContext = SlashMenuContext & {
  tooltipTimeout: number;
  onClickItem: (item: SlashMenuActionItem) => void;
};

@customElement('affine-slash-menu')
export class SlashMenu extends WithDisposable(ShadowlessElement) {
  // Handle click outside
  private _onClickAway = () => {
    // if (e.target === this) return;
    if (!this._hide) return;
    // If the slash menu is hidden, click anywhere will close the slash menu
    this.abortController.abort();
  };

  /!**
   * Does not include the slash character
   *!/
  private _searchString = '';

  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  private slasheMenuID = 'mahdaad-claytap-slash-menu';

  static override styles = styles;

  //abortController = new AbortController();

  constructor(
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
  ) {
    super();
  }

  private _clayTapMenu() {
    //console.log('this._activatedItemIndex', this._activatedItemIndex);
    const group: string[] = [];
    this._filterItems.forEach(item => {
      if (item.group && !group.includes(item.group)) group.push(item.group);
    });
    let index = 0;
    return html`<div>
      ${group.map(itemGroup => {
        return html`<span class="group-title"> ${itemGroup} </span>
          <div class="claytap-slash-menu">
            ${this._filterItems
              .filter(item => item.group == itemGroup)
              .map(item => {
                const currentIndex = index;
                return html`<div
                  class="claytap-slash-menu-item ${this._activatedItemIndex ==
                  index++
                    ? 'hover'
                    : ''}"
                  text="menu-item-${item.title}"
                  @click=${() => {
                    return this._handleClickItem(currentIndex);
                  }}
                >
                  <div class="icon">${html`${unsafeSVG(item.icon)}`}</div>
                  <div class="item-title">
                    <span class="title">${item.title}</span>
                    <span class="description">${item.description}</span>
                  </div>
                </div>`;
              })}
          </div>`;
      })}
    </div>`;
  }

  //@property({ attribute: false })
  //accessor options!: SlashMenuOptions;

  private _handleClickItem(index: number) {
    if (
      //this._leftPanelActivated ||
      index < 0 ||
      index >= this._filterItems.length
    ) {
      return;
    }
    // Need to remove the search string
    // We must to do clean the slash string before we do the action
    // Otherwise, the action may change the model and cause the slash string to be changed

    /!*cleanSpecifiedTail(
      this.host,
      this.context.model,
      this.triggerKey + this._query
    );*!/
    //console.log('1111', this.triggerKey + this._searchString);
    console.log('11111', this.triggerKey, this._searchString);
    // Need to remove the search string
    // We must to do clean the slash string before we do the action
    // Otherwise, the action may change the model and cause the slash string to be changed
    /!* cleanSpecifiedTail(
      this.host,
      this.context.model,
      this.triggerKey + this._query
    );*!/
    //item.action(this.context)?.catch(console.error);
    // this.abortController.abort();
    /!*cleanSpecifiedTail(
      this.host,
      this.model,
      this.triggerKey + this._searchString
    );
    this.abortController.abort();*!/
    const { action } = this._filterItems[index];
    //{ rootElement: this.host, model: this.model }
    action(this.context)?.catch(console.error);
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  private _scrollToItem(item: ClayTapSlashMenu, force = true) {
    /!*const shadowRoot = this.rootElement;
    if (!shadowRoot) {
      return;
    }*!/
    const ele = this.renderRoot.querySelector(
      `#${this.slasheMenuID} div[text="menu-item-${item.title}"]`
    );
    if (!ele) {
      return;
    }
    if (force) {
      // set parameter to `true` to align to top
      ele.scrollIntoView(true);
      return;
    }
    ele.scrollIntoView({
      block: 'nearest',
    });
  }

  //query: string
  private _updateItem(): ClayTapSlashMenu[] {
    this._searchString = this._query;
    this._activatedItemIndex = 0;
    const _menu: ClayTapSlashMenu[] = [];
    clayTapGroupMenu.map(group => {
      _menu.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });
    // Activate the right panel when search string is not empty
    /!*if (this._leftPanelActivated) {
      this._leftPanelActivated = false;
    }*!/
    const searchStr = this._searchString.toLowerCase();
    /!*let allMenus = this.options.menus
      .map(group =>
        typeof group.items === 'function'
          ? group
              .items({ rootElement: this.rootElement, model: this.model })
              .map(item => ({ ...item, groupName: group.name }))
          : group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();*!/
    /!*allMenus = allMenus.filter(({ showWhen = () => true }) =>
      showWhen(this.model, this.rootElement)
    );*!/
    if (!searchStr) {
      return _menu;
    }

    return _menu.filter(item => isFuzzyMatch(item.title, searchStr));
  }

  override connectedCallback() {
    super.connectedCallback();
    this._disposables.addFromEvent(window, 'mousedown', this._onClickAway);
    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });
    this._filterItems = this._updateItem();

    const inlineEditor = getInlineEditorByModel(
      this.context.rootComponent.host,
      this.context.model
    );
    assertExists(inlineEditor, 'RichText InlineEditor not found');

    /!*const richText = getRichTextByModel(this.host, this.model);
    if (!richText) {
      console.warn(
        'Slash Menu may not work properly! No rich text found for model',
        this.model
      );
      return;
    }*!/
    //const inlineEditor = richText.inlineEditor;
    //assertExists(inlineEditor, 'RichText InlineEditor not found');

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
      abortController: this.abortController.signal,
      interceptor: (event, next) => {
        const { key } = event;
        if (key === '/') {
          // Can not stopPropagation here,
          // otherwise the rich text will not be able to trigger a new the slash menu
          return;
        }
        if (this._hide && key !== 'Backspace') {
          // if the following key is not the backspace key,
          // the slash menu will be closed
          this.abortController.abort();
          return;
        }
        if (key === ' ') {
          this._hide = true;
          next();
          return;
        }
        if (this._hide) {
          this._hide = false;
        }

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
      onInput: () => {
        //console.log('thisi s', val);
        //debugger;
        const newFilteredItems = this._updateItem();
        this._filterItems = newFilteredItems;
        if (!newFilteredItems.length) {
          this._hide = true;
        }
      },
      onDelete: () => {
        const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex < this._startIndex) {
          this.abortController.abort();
        }
        this._updateItem();
      },
      /!*onUpdateQuery: val => {
        debugger;
      },*!/
      onMove: step => {
        //debugger;
        const configLen = this._filterItems.length;
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
        this._activatedItemIndex =
          (this._activatedItemIndex + step + configLen) % configLen;
        /!*do {
          this._activatedItemIndex =
            (this._activatedItemIndex + step + configLen) % configLen;
          // Skip disabled items
        } while (
          //this._filterItems[this._activatedItemIndex].disabled &&
          false &&
          // If all items are disabled, the loop will never end
          ejectedCnt--
        );*!/

        this._scrollToItem(this._filterItems[this._activatedItemIndex], false);
      },
      onConfirm: () => {
        this._handleClickItem(this._activatedItemIndex);
      },
      onEsc: () => {
        this.abortController.abort();
      },
      onAbort: () => this.abortController.abort(),
    });
  }

  override render() {
    if (this._hide) {
      return nothing;
    }

    const MAX_HEIGHT_WITH_CATEGORY = 408;
    const MAX_HEIGHT = 344;
    const showCategory = !this._searchString.length;

    const slashMenuStyles = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
          maxHeight: `${Math.min(
            this._position.height,
            showCategory ? MAX_HEIGHT_WITH_CATEGORY : MAX_HEIGHT
          )}px`,
        })
      : styleMap({
          visibility: 'hidden',
        });

    /!* const btnItems = this._filterItems.map(
      ({ name, icon, suffix, disabled = false, groupName }, index) => {
        const showDivider =
          index !== 0 && this._filterItems[index - 1].groupName !== groupName;
        return html`<div
            class="slash-item-divider"
            ?hidden=${!showDivider || !!this._searchString.length}
          ></div>
          <icon-button
            class="slash-item ${name}"
            ?disabled=${disabled}
            width="100%"
            height="32px"
            style="padding-left: 12px; justify-content: flex-start; gap: 8px;"
            hover=${!disabled &&
            !this._leftPanelActivated &&
            this._activatedItemIndex === index
              ? 'true'
              : 'false'}
            text="${name}"
            data-testid="${name}"
            @mousemove=${() => {
              // Use `mousemove` instead of `mouseover` to avoid navigate conflict in left panel
              this._leftPanelActivated = false;
              this._activatedItemIndex = index;
            }}
            @click=${() => {
              this._handleClickItem(index);
            }}
          >
            ${icon}
            <div slot="suffix">${suffix}</div>
          </icon-button>`;
      }
    );
*!/
    //class="slash-menu-container blocksuite-overlay"
    //slash-item-container
    return html`<div id="${this.slasheMenuID}">
      <div
        class="${Prefix}-overlay-mask"
        @click="${() => this.abortController.abort()}"
      ></div>
      <div
        class="${Prefix}-popover ${Prefix}-slash-menu"
        style="${slashMenuStyles}"
      >
        <div class="${Prefix}-popover-container">${this._clayTapMenu()}</div>
      </div>
    </div>`;
  }

  updatePosition(position: { x: string; y: string; height: number }) {
    this._position = position;
  }

  get host() {
    return this.context.rootComponent.host;
  }

  //private _leftPanelActivated = false;
  @state()
  private accessor _activatedItemIndex = 0;

  @state()
  private accessor _filterItems: ClayTapSlashMenu[] = [];

  @state()
  private accessor _hide = false;

  /!*private _handleClickCategory(groupName: string) {
    const item = this._filterItems.find(item => item.groupName === groupName);
    if (!item) return;
    this._scrollToItem(item);
    this._activatedItemIndex = this._filterItems.findIndex(
      i => i.name === item.name
    );
  }
*!/
  /!* private _categoryTemplate() {
    const showCategory = !this._searchString.length;
    const activatedGroupName =
      this._filterItems[this._activatedItemIndex]?.groupName;
    const groups = collectGroupNames(this._filterItems);

    return html`<div
      class="slash-category ${!showCategory ? 'slash-category-hide' : ''}"
    >
      ${groups.map(
        groupName =>
          html`<div
            class="slash-category-name ${activatedGroupName === groupName
              ? 'slash-active-category'
              : ''}"
            @click=${() => this._handleClickCategory(groupName)}
          >
            ${groupName}
          </div>`
      )}
    </div>`;
  }*!/

  @state()
  private accessor _position: {
    x: string;
    y: string;
    height: number;
  } | null = null;

  @property({ attribute: false })
  accessor config!: SlashMenuStaticConfig;

  @property({ attribute: false })
  accessor context!: SlashMenuContext;

  @property({ attribute: false })
  accessor model!: BlockModel;

  @property({ attribute: false })
  accessor rootElement!: RootBlockComponent;

  @query(`.${Prefix}-slash-menu`)
  accessor slashMenuElement: HTMLElement | null = null;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
*/

import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { autoPlacement, offset } from '@floating-ui/dom';
import { type PropertyValues, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuGroupDivider,
  SlashMenuItem,
  SlashMenuStaticConfig,
  SlashMenuStaticItem,
  SlashSubMenu,
} from './config.js';

import { createLitPortal } from '../../../_common/components/portal.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import {
  getInlineEditorByModel,
  isControlledKeyboardEvent,
} from '../../../_common/utils/index.js';
import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { type ClayTapSlashMenu, clayTapGroupMenu } from './mahdaad_menu.js';
import { slashItemToolTipStyle, styles } from './styles.js';
import {
  getFirstNotDividerItem,
  isActionItem,
  isGroupDivider,
  isSubMenuItem,
  slashItemClassName,
} from './utils.js';

type InnerSlashMenuContext = SlashMenuContext & {
  tooltipTimeout: number;
  onClickItem: (item: SlashMenuActionItem) => void;
};

@customElement('affine-slash-menu')
export class SlashMenu extends WithDisposable(ShadowlessElement) {
  private _handleClickItem = (item: SlashMenuActionItem) => {
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

  private _initItemPathMap = () => {
    const traverse = (item: SlashMenuStaticItem, path: number[]) => {
      this._itemPathMap.set(item, [...path]);
      if (isSubMenuItem(item)) {
        item.subMenu.forEach((subItem, index) =>
          traverse(subItem, [...path, index])
        );
      }
    };

    this.config.items.forEach((item, index) => traverse(item, [index]));
  };

  private _innerSlashMenuContext!: InnerSlashMenuContext;

  private _itemPathMap = new Map<SlashMenuItem, number[]>();

  private _menuItems: ClayTapSlashMenu[] = [];

  private _queryState: 'off' | 'on' | 'no_result' = 'off';

  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  private _updateFilteredItems = () => {
    this._filteredItems = [];

    const searchStr = this._query.toLowerCase();
    if (searchStr === '' || searchStr.endsWith(' ')) {
      this._queryState = searchStr === '' ? 'off' : 'no_result';
      return;
    }

    this._filteredItems = this._menuItems.filter(item =>
      isFuzzyMatch(item.title, searchStr)
    );

    // Layer order traversal
    /*let depth = 0;
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
   });*/

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

    clayTapGroupMenu.map(group => {
      this._menuItems.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });

    this._innerSlashMenuContext = {
      ...this.context,
      onClickItem: this._handleClickItem,
      tooltipTimeout: this.config.tooltipTimeout,
    };

    this._initItemPathMap();

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
      <inner-slash-menu
        .context=${this._innerSlashMenuContext}
        .menu=${this._queryState === 'off'
          ? this._menuItems
          : this._filteredItems}
        .onClickItem=${this._handleClickItem}
        .mainMenuStyle=${slashMenuStyles}
        .abortController=${this.abortController}
      >
      </inner-slash-menu>`;
  }

  get host() {
    return this.context.rootComponent.host;
  }

  @state()
  private accessor _filteredItems: ClayTapSlashMenu[] = [];

  @state()
  private accessor _position: {
    x: string;
    y: string;
    height: number;
  } | null = null;

  @property({ attribute: false })
  accessor config!: SlashMenuStaticConfig;

  @property({ attribute: false })
  accessor context!: SlashMenuContext;

  @query('inner-slash-menu')
  accessor slashMenuElement!: HTMLElement;

  @property({ attribute: false })
  accessor triggerKey!: string;
}

@customElement('inner-slash-menu')
export class InnerSlashMenu extends WithDisposable(ShadowlessElement) {
  _activatedItemIndex = 0;

  private _closeSubMenu = () => {
    this._subMenuAbortController?.abort();
    this._subMenuAbortController = null;
    this._currentSubMenu = null;
  };

  private _currentSubMenu: SlashSubMenu | null = null;

  private _openSubMenu = (item: SlashSubMenu) => {
    if (item === this._currentSubMenu) return;

    const itemElement = this.shadowRoot?.querySelector(
      `.${slashItemClassName(item)}`
    );
    if (!itemElement) return;

    this._closeSubMenu();
    this._currentSubMenu = item;
    this._subMenuAbortController = new AbortController();
    this._subMenuAbortController.signal.addEventListener('abort', () => {
      this._closeSubMenu();
    });

    const subMenuElement = createLitPortal({
      shadowDom: false,
      template: html`<inner-slash-menu
        .context=${this.context}
        .menu=${item.subMenu}
        .depth=${this.depth + 1}
        .abortController=${this._subMenuAbortController}
      >
        ${item.subMenu.map(this._renderItem)}
      </inner-slash-menu>`,
      computePosition: {
        referenceElement: itemElement,
        autoUpdate: true,
        middleware: [
          offset(12),
          autoPlacement({
            allowedPlacements: ['right-start', 'right-end'],
          }),
        ],
      },
      abortController: this._subMenuAbortController,
    });

    subMenuElement.style.zIndex = `calc(var(--affine-z-index-popover) + ${this.depth})`;
    subMenuElement.focus();
  };

  private _renderActionItem = (item: SlashMenuActionItem) => {
    const { name, icon, description, tooltip, customTemplate } = item;

    const hover = item === this._activeItem;

    return html`<icon-button
      class="slash-menu-item ${slashItemClassName(item)}"
      width="100%"
      height="44px"
      text=${customTemplate ?? name}
      subText=${ifDefined(description)}
      data-testid="${name}"
      hover=${hover}
      @mousemove=${() => {
        this._activeItem = item;
        this._closeSubMenu();
      }}
      @click=${() => this.context.onClickItem(item)}
    >
      ${icon && html`<div class="slash-menu-item-icon">${icon}</div>`}
      ${tooltip &&
      html`<affine-tooltip
        tip-position="right"
        .offset=${22}
        .tooltipStyle=${slashItemToolTipStyle}
        .hoverOptions=${{
          enterDelay: this.context.tooltipTimeout,
          allowMultiple: false,
        }}
      >
        <div class="tooltip-figure">${tooltip.figure}</div>
        <div class="tooltip-caption">${tooltip.caption}</div>
      </affine-tooltip>`}
    </icon-button>`;
  };

  private _renderGroupItem = (item: SlashMenuGroupDivider) => {
    return html`<div class="slash-menu-group-name">${item.groupName}</div>`;
  };

  private _renderItem = (item: SlashMenuStaticItem) => {
    if (isGroupDivider(item)) return this._renderGroupItem(item);
    else if (isActionItem(item)) return this._renderActionItem(item);
    //else if (isSubMenuItem(item)) return this._renderSubMenuItem(item);
    else {
      console.error('Unknown item type for slash menu');
      console.error(item);
      return nothing;
    }
  };

  /*private _renderSubMenuItem = (item: SlashSubMenu) => {
    const { name, icon, description } = item;

    const hover = item === this._activeItem;

    return html`<icon-button
      class="slash-menu-item ${slashItemClassName(item)}"
      width="100%"
      height="44px"
      text=${name}
      subText=${ifDefined(description)}
      data-testid="${name}"
      hover=${hover}
      @mousemove=${() => {
        this._activeItem = item;
        this._openSubMenu(item);
      }}
      @touchstart=${() => {
        isSubMenuItem(item) &&
          (this._currentSubMenu === item
            ? this._closeSubMenu()
            : this._openSubMenu(item));
      }}
    >
      ${icon && html`<div class="slash-menu-item-icon">${icon}</div>`}
      <div slot="suffix" style="transform: rotate(-90deg);">
        ${ArrowDownIcon}
      </div>
    </icon-button>`;
  };*/

  private _subMenuAbortController: AbortController | null = null;

  private slashMenuID = 'mahdaad-claytap-slash-menu';

  static override styles = styles;

  private _clayTapMenu(menu: ClayTapSlashMenu[]) {
    //console.log('this._activatedItemIndex', this._activatedItemIndex);
    const group: string[] = [];
    menu.forEach(item => {
      if (item.group && !group.includes(item.group)) group.push(item.group);
    });
    const index = 0;
    return html`<div>
      ${group.map(itemGroup => {
        return html`<span class="group-title"> ${itemGroup} </span>
          <div class="claytap-slash-menu">
            ${menu
              .filter(item => item.group == itemGroup)
              .map(item => {
                //const currentIndex = index;
                return html`<div
                  class="claytap-slash-menu-item ${this._activeItem == item
                    ? 'hover'
                    : ''}"
                  text="menu-item-${item.title}"
                  @click=${() => {
                    console.log('1111', this._activeItem);
                    //this._filterItems[index]
                    this.context.onClickItem(item);
                    //return this._handleClickItem(currentIndex);
                  }}
                >
                  <div class="icon">${html`${unsafeSVG(item.icon)}`}</div>
                  <div class="item-title">
                    <span class="title">${item.title}</span>
                    <span class="description">${item.description}</span>
                  </div>
                </div>`;
              })}
          </div>`;
      })}
    </div>`;
  }

  private _scrollToItem(item: ClayTapSlashMenu) {
    const ele = this.renderRoot.querySelector(
      `#${this.slashMenuID} div[text="menu-item-${item.title}"]`
    );
    if (!ele) {
      return;
    }
    /*if (force) {
      // set parameter to `true` to align to top
      ele.scrollIntoView(true);
      return;
    }*/
    ele.scrollIntoView({
      block: 'nearest',
    });
    /*const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      return;
    }

    const text = isGroupDivider(item) ? item.groupName : item.name;

    const ele = shadowRoot.querySelector(`icon-button[text="${text}"]`);
    if (!ele) {
      return;
    }
    ele.scrollIntoView({
      block: 'nearest',
    });*/
  }

  override connectedCallback() {
    super.connectedCallback();

    // close all sub menus
    this.abortController?.signal?.addEventListener('abort', () => {
      this._subMenuAbortController?.abort();
    });
    this.addEventListener('wheel', event => {
      if (this._currentSubMenu) {
        event.preventDefault();
      }
    });

    const inlineEditor = getInlineEditorByModel(
      this.context.rootComponent.host,
      this.context.model
    );

    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    inlineEditor.eventSource.addEventListener(
      'keydown',
      event => {
        if (this._currentSubMenu) return;
        if (event.isComposing) return;

        const { key, ctrlKey, metaKey, altKey, shiftKey } = event;

        const onlyCmd = (ctrlKey || metaKey) && !altKey && !shiftKey;
        const onlyShift = shiftKey && !isControlledKeyboardEvent(event);
        const notControlShift = !(ctrlKey || metaKey || altKey || shiftKey);

        let moveStep = 0;
        if (
          (key === 'ArrowUp' && notControlShift) ||
          (key === 'Tab' && onlyShift) ||
          (key === 'P' && onlyCmd) ||
          (key === 'p' && onlyCmd)
        ) {
          moveStep = -1;
        }

        if (
          (key === 'ArrowDown' && notControlShift) ||
          (key === 'Tab' && notControlShift) ||
          (key === 'n' && onlyCmd) ||
          (key === 'N' && onlyCmd)
        ) {
          moveStep = 1;
        }

        if (moveStep !== 0) {
          let itemIndex = this.menu.indexOf(this._activeItem);
          do {
            itemIndex =
              (itemIndex + moveStep + this.menu.length) % this.menu.length;
          } while (isGroupDivider(this.menu[itemIndex]));

          this._activeItem = this.menu[itemIndex] as typeof this._activeItem;
          this._scrollToItem(this._activeItem);

          event.preventDefault();
          event.stopPropagation();
        }

        if (key === 'ArrowRight' && notControlShift) {
          if (isSubMenuItem(this._activeItem)) {
            this._openSubMenu(this._activeItem);
          }

          event.preventDefault();
          event.stopPropagation();
        }

        if ((key === 'ArrowLeft' || key === 'Escape') && notControlShift) {
          this.abortController.abort();

          event.preventDefault();
          event.stopPropagation();
        }

        if (key === 'Enter' && notControlShift) {
          if (isSubMenuItem(this._activeItem)) {
            this._openSubMenu(this._activeItem);
          } else if (isActionItem(this._activeItem)) {
            this.context.onClickItem(this._activeItem);
          }

          event.preventDefault();
          event.stopPropagation();
        }
      },
      {
        capture: true,
        signal: this.abortController.signal,
      }
    );
  }

  override disconnectedCallback() {
    this.abortController.abort();
  }

  override render() {
    if (this.menu.length === 0) return nothing;

    const style = styleMap(this.mainMenuStyle ?? { position: 'relative' });
    //console.log('11111', this.menu);
    // ${this.menu.map(this._renderItem)}
    //slash-menu
    return html`<div
      id="${this.slashMenuID}"
      class="vue-block-board-editor-popover  ${Prefix}-slash-menu"
      style=${style}
      data-testid=${`sub-menu-${this.depth}`}
    >
      <div class="${Prefix}-popover-container">
        ${this._clayTapMenu(this.menu)}
      </div>
    </div>`;
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('menu') && this.menu.length !== 0) {
      const firstItem = getFirstNotDividerItem(this.menu);
      assertExists(firstItem);
      this._activeItem = firstItem as ClayTapSlashMenu;

      // this case happen on query updated
      this._subMenuAbortController?.abort();
    }
  }

  @state()
  private accessor _activeItem!: ClayTapSlashMenu;

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor context!: InnerSlashMenuContext;

  @property({ attribute: false })
  accessor depth: number = 0;

  @property({ attribute: false })
  accessor mainMenuStyle: Parameters<typeof styleMap>[0] | null = null;

  @property({ attribute: false })
  accessor menu!: ClayTapSlashMenu[];
}
