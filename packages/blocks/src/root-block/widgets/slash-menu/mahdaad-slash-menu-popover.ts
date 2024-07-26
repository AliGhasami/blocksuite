import type { BlockModel } from '@blocksuite/store';

import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import type { RootBlockComponent } from '../../../root-block/types.js';
import type {
  SlashMenuActionItem,
  SlashMenuContext,
  SlashMenuStaticConfig,
} from './config.js';

//import { literal, unsafeStatic } from 'lit/static-html.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
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

  /**
   * Does not include the slash character
   */
  private _searchString = '';

  private slasheMenuID = 'mahdaad-claytap-slash-menu';

  static override styles = styles;

  abortController = new AbortController();

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

    /*cleanSpecifiedTail(
      this.host,
      this.context.model,
      this.triggerKey + this._query
    );*/
    //console.log('1111', this.triggerKey + this._searchString);
    cleanSpecifiedTail(
      this.host,
      this.context.model,
      this.triggerKey + this._searchString
    );
    //item.action(this.context)?.catch(console.error);
    this.abortController.abort();
    /*cleanSpecifiedTail(
      this.host,
      this.model,
      this.triggerKey + this._searchString
    );
    this.abortController.abort();*/
    const { action } = this._filterItems[index];
    //{ rootElement: this.host, model: this.model }
    action(this.context)?.catch(console.error);
  }

  //@property({ attribute: false })
  //accessor options!: SlashMenuOptions;

  private _scrollToItem(item: ClayTapSlashMenu, force = true) {
    /*const shadowRoot = this.rootElement;
    if (!shadowRoot) {
      return;
    }*/
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

  private _updateItem(query: string): ClayTapSlashMenu[] {
    this._searchString = query;
    this._activatedItemIndex = 0;
    const _menu: ClayTapSlashMenu[] = [];
    clayTapGroupMenu.map(group => {
      _menu.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });
    // Activate the right panel when search string is not empty
    /*if (this._leftPanelActivated) {
      this._leftPanelActivated = false;
    }*/
    const searchStr = this._searchString.toLowerCase();
    /*let allMenus = this.options.menus
      .map(group =>
        typeof group.items === 'function'
          ? group
              .items({ rootElement: this.rootElement, model: this.model })
              .map(item => ({ ...item, groupName: group.name }))
          : group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();*/
    /*allMenus = allMenus.filter(({ showWhen = () => true }) =>
      showWhen(this.model, this.rootElement)
    );*/
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
    this._filterItems = this._updateItem('');

    const inlineEditor = getInlineEditorByModel(
      this.context.rootElement.host,
      this.context.model
    );
    assertExists(inlineEditor, 'RichText InlineEditor not found');

    /*const richText = getRichTextByModel(this.host, this.model);
    if (!richText) {
      console.warn(
        'Slash Menu may not work properly! No rich text found for model',
        this.model
      );
      return;
    }*/
    //const inlineEditor = richText.inlineEditor;
    //assertExists(inlineEditor, 'RichText InlineEditor not found');

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
      inlineEditor,
      abortController: this.abortController,
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
        /*if (e.key === 'ArrowLeft' && !isControlled && !isShift) {
          e.stopPropagation();
          e.preventDefault();
          // If the left panel is hidden, should not activate it
          if (this._searchString.length) return;
          this._leftPanelActivated = true;
          return;
        }*/
        /*if (e.key === 'ArrowRight' && !isControlled && !isShift) {
          e.stopPropagation();
          e.preventDefault();
          this._leftPanelActivated = false;
          return;
        }*/
        next();
      },
      onUpdateQuery: val => {
        const newFilteredItems = this._updateItem(val);
        this._filterItems = newFilteredItems;
        if (!newFilteredItems.length) {
          this._hide = true;
        }
      },
      onMove: step => {
        const configLen = this._filterItems.length;
        /*if (this._leftPanelActivated) {
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
        }*/
        //let ejectedCnt = configLen;
        this._activatedItemIndex =
          (this._activatedItemIndex + step + configLen) % configLen;
        /*do {
          this._activatedItemIndex =
            (this._activatedItemIndex + step + configLen) % configLen;
          // Skip disabled items
        } while (
          //this._filterItems[this._activatedItemIndex].disabled &&
          false &&
          // If all items are disabled, the loop will never end
          ejectedCnt--
        );*/

        this._scrollToItem(this._filterItems[this._activatedItemIndex], false);
      },
      onConfirm: () => {
        this._handleClickItem(this._activatedItemIndex);
      },
      onEsc: () => {
        this.abortController.abort();
      },
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

    /* const btnItems = this._filterItems.map(
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
*/
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
    return this.context.rootElement.host;
  }

  //private _leftPanelActivated = false;
  @state()
  private accessor _activatedItemIndex = 0;

  @state()
  private accessor _filterItems: ClayTapSlashMenu[] = [];

  @state()
  private accessor _hide = false;

  /*private _handleClickCategory(groupName: string) {
    const item = this._filterItems.find(item => item.groupName === groupName);
    if (!item) return;
    this._scrollToItem(item);
    this._activatedItemIndex = this._filterItems.findIndex(
      i => i.name === item.name
    );
  }
*/
  /* private _categoryTemplate() {
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
  }*/

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
