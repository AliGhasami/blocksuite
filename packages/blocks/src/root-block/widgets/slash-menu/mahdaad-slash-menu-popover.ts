import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import i18next from 'i18next';
import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuItem,
  SlashMenuStaticConfig,
  SlashMenuStaticItem,
} from './config.js';

import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { isFuzzyMatch } from '../../../_common/utils/string.js';
import {
  type ClayTapSlashMenu,
  type MahdaadActionMenu,
  actionsMenu,
  clayTapGroupMenu,
} from './mahdaad_menu.js';
import { styles } from './styles.js';
import { isSubMenuItem } from './utils.js';

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

    this._filteredItems = this._menuItems.filter(item => {
      //@ts-ignore
      return isFuzzyMatch(i18next.t(item.title.values[0]), searchStr);
    });

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
    //const style = styleMap(this.mainMenuStyle ?? { position: 'relative' });
    const slashMenuStyles = this._position
      ? {
          transform: `translate(${this._position.x}, ${this._position.y})`,
          //maxHeight: `${Math.min(this._position.height, this.config.maxHeight)}px`,
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

      <div
        id="${this.slashMenuID}"
        class="vue-block-board-editor-popover  ${Prefix}-slash-menu"
        style="${styleMap(slashMenuStyles)}"
      >
        <mahdaad-slash-menu
          search-text="${this._query}"
          .inline-editor="${this.inlineEditor}"
          @select="${(event: CustomEvent) => {
            //console.log('333', event);
            const key = event.detail;
            //console.log('111', key);
            const item = actionsMenu.find(i => i.key == key);
            if (item) {
              this._handleClickItem(item);
            }
            //
            /*cleanSpecifiedTail(
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
            });*/
            this.abortController.abort();
          }}"
          @close="${() => {
            this.abortController.abort();
          }}"
        ></mahdaad-slash-menu>
      </div>
      <!-- <inner-slash-menu
        .context=${this._innerSlashMenuContext}
        .menu=${this._queryState === 'off'
        ? this._menuItems
        : this._filteredItems}
        .onClickItem=${this._handleClickItem}
        .mainMenuStyle=${slashMenuStyles}
        .abortController=${this.abortController}
      >
      </inner-slash-menu> --->`;
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

  @query('#mahdaad-claytap-slash-menu')
  accessor slashMenuElement!: HTMLElement;

  @property({ attribute: false })
  accessor triggerKey!: string;
}

/*@customElement('inner-slash-menu')
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

  /!*private _renderSubMenuItem = (item: SlashSubMenu) => {
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
  };*!/

  private _subMenuAbortController: AbortController | null = null;

  private slashMenuID = 'mahdaad-claytap-slash-menu';

  static override styles = styles;

  private _clayTapMenu(menu: ClayTapSlashMenu[]) {
    //console.log('1111', menu);
    //console.log('this._activatedItemIndex', this._activatedItemIndex);
    const group: string[] = [];
    menu.forEach(item => {
      if (item.group && !group.includes(item.group)) group.push(item.group);
    });
    //const index = 0;
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
                  text="menu-item-${item.key}"
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
      `#${this.slashMenuID} div[text="menu-item-${item.key}"]`
    );
    if (!ele) {
      return;
    }
    /!*if (force) {
      // set parameter to `true` to align to top
      ele.scrollIntoView(true);
      return;
    }*!/
    ele.scrollIntoView({
      block: 'nearest',
    });
    /!*const shadowRoot = this.shadowRoot;
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
    });*!/
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
      <mahdaad-slash-menu
        search-text="${this.__queryState}"
        .inline-editor="${this.inlineEditor}"
      ></mahdaad-slash-menu>
      <!--  <div class="${Prefix}-popover-container">
        ${this._clayTapMenu(this.menu)}
      </div> -->
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
}*/
