import '../../../_common/components/button.js';

import type { EditorHost } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
//import { Text } from '@blocksuite/store';
import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  cleanSpecifiedTail,
  createKeydownObserver,
} from '../../../_common/components/utils.js';
import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import { REFERENCE_NODE } from '../../../_common/inline/presets/nodes/consts.js';
import { isFuzzyMatch } from '../../../_common/utils/string.js';
import type { ClayTapSlashMenu } from '../slash-menu/mahdaad_menu.js';
//import type { LinkedDocOptions } from './config.js';
//import { type LinkedDocGroup } from './config.js';
import { styles } from './styles.js';

//TODO ali ghasami for props
const userList: string[] = [
  'Ali Ghasami',
  'Mehdi Ahmadi',
  'Kamran Abbasi',
  'Habib Fakari',
];

@customElement('affine-mention-popover')
export class MentionPopover extends WithDisposable(LitElement) {
  static override styles = styles;

  @property({ attribute: false })
  options!: any;

  @property({ attribute: false })
  triggerKey!: string;

  //@state()
  //private _hide = false;

  @state()
  private _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  @state()
  private _query = '';

  /**
   * Does not include the slash character
   */
  private _searchString = '';

  @state()
  private _filterItems: string[] = [];

  @state()
  private _activatedItemIndex = 0;

  //private _actionGroup: LinkedDocGroup[] = [];

  /*private get _flattenActionList() {
    return this._actionGroup
      .map(group =>
        group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();
  }*/

  private _updateItem(query: string): string[] {
    this._searchString = query;
    this._activatedItemIndex = 0;
    //const _menu: ClayTapSlashMenu[] = [];
    /*clayTapGroupMenu.map(group => {
      _menu.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });*/
    // Activate the right panel when search string is not empty
    /*if (this._leftPanelActivated) {
      this._leftPanelActivated = false;
    }*/
    const searchStr = this._searchString.toLowerCase();
    //console.log('this is options', this.options);
    /*let allMenus = this.options.menus
      .map(group =>
        typeof group.items === 'function'
          ? group
              .items({ rootElement: this.rootElement, model: this.model })
              .map(item => ({ ...item, groupName: group.name }))
          : group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();*/
    //console.log('this is all menu', allMenus);
    /*allMenus = allMenus.filter(({ showWhen = () => true }) =>
      showWhen(this.model, this.rootElement)
    );*/
    if (!searchStr) {
      return userList;
    }

    return userList.filter(item => isFuzzyMatch(item, searchStr));
  }

  /* private _updateActionList() {
    this._actionGroup = this.options.getMenus({
      editorHost: this.editorHost,
      query: this._query,
      inlineEditor: this.inlineEditor,
      docMetas: this._doc.collection.meta.docMetas,
    });
  }*/

  @query('.mention-popover')
  linkedDocElement?: Element;

  /* private get _doc() {
    return this.editorHost.doc;
  }*/

  private _scrollToItem(item: ClayTapSlashMenu, force = true) {
    /*const shadowRoot = this.rootElement;
    if (!shadowRoot) {
      return;
    }*/
    /* const ele = this.renderRoot.querySelector(
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
    });*/
  }

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
  ) {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    const inlineEditor = this.inlineEditor;
    assertExists(inlineEditor, 'RichText InlineEditor not found');
    this._filterItems = this._updateItem('');
    // init
    //this._updateActionList();
    /*this._disposables.add(
      this._doc.collection.slots.docUpdated.on(() => {
        this._updateActionList();
      })
    );*/
    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });

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
    /*createKeydownObserver({
      target: inlineEditor.eventSource,
      inlineEditor,
      abortController: this.abortController,
      interceptor: (e, next) => {
        if (e.key === '/') {
          // Can not stopPropagation here,
          // otherwise the rich text will not be able to trigger a new the slash menu
          return;
        }
        if (this._hide && e.key !== 'Backspace') {
          // if the following key is not the backspace key,
          // the slash menu will be closed
          this.abortController.abort();
          return;
        }
        if (e.key === ' ') {
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
      onUpdateQuery: val => {
        const newFilteredItems = this._updateItem(val);
        this._filterItems = newFilteredItems;
        if (!newFilteredItems.length) {
          this._hide = true;
        }
      },
      onMove: step => {
        //console.log('this is move');
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
    });*/

    createKeydownObserver({
      target: inlineEditor.eventSource,
      inlineEditor,
      onUpdateQuery: str => {
        this._query = str;
        this._activatedItemIndex = 0;
        //this._updateActionList();
      },
      abortController: this.abortController,
      onMove: step => {
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
        //debugger;
        this.abortController.abort();
        cleanSpecifiedTail(
          this.editorHost,
          this.inlineEditor,
          this.triggerKey + this._query
        );
        /*this._flattenActionList[this._activatedItemIndex]
          .action()
          ?.catch(console.error);*/
      },
      onEsc: () => {
        this.abortController.abort();
      },
    });
  }

  updatePosition(position: { height: number; x: string; y: string }) {
    this._position = position;
  }

  private _handleClickItem(item: string) {
    //debugger;
    // assertExists(inlineEditor, 'Editor not found');

    cleanSpecifiedTail(
      this.editorHost,
      this.inlineEditor,
      this.triggerKey + this._query
    );

    const inlineRange = this.inlineEditor.getInlineRange();
    assertExists(inlineRange);
    this.inlineEditor.insertText(inlineRange, REFERENCE_NODE, {
      mention: { name: item, id: '1' },
      //mention: { type: 'LinkedPage', pageId: '11' },
    });
    this.inlineEditor.setInlineRange({
      index: inlineRange.index + 1,
      length: 0,
    });

    /*if (
      //this._leftPanelActivated ||
      index < 0 ||
      index >= this._filterItems.length
    ) {
      return;
    }*/
    // Need to remove the search string
    // We must to do clean the slash string before we do the action
    // Otherwise, the action may change the model and cause the slash string to be changed
    /*    cleanSpecifiedTail(
      this.host,
      this.model,
      this.triggerKey + this._searchString
    );*/
    this.abortController.abort();
    console.log('this is item', item);
    //const { action } = this._filterItems[index];
    /*action({ rootElement: this.rootElement, model: this.model })?.catch(
      console.error
    );*/

    /*this.rootElement.host.std.command
      .chain()
      .updateBlockType({
        flavour: 'affine:mention',
        props: {
          text: new Text(item),
        }, //type
      })
      .inline((ctx, next) => {
        //console.log('this is inline in menu ', ctx);
        const newModels = ctx.updatedBlocks;
        if (!newModels || newModels.length == 0) {
          return false;
        }
        return next();
      })
      .run();*/
  }

  private _menu() {
    //console.log('this._activatedItemIndex', this._activatedItemIndex);
    //const group: string[] = [];
    /*this._filterItems.forEach(item => {
      if (item.group && !group.includes(item.group)) group.push(item.group);
    });*/
    //let index = 0;
    return html`<div class="mention-menu-container">
      ${this._filterItems.map(item => {
        return html`<div
          class="mention-item"
          @click=${() => {
            return this._handleClickItem(item);
          }}
        >
          ${item}
        </div>`;
      })}
    </div>`;
  }

  override render() {
    const MAX_HEIGHT = 396;
    const style = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
          maxHeight: `${Math.min(this._position.height, MAX_HEIGHT)}px`,
        })
      : styleMap({
          visibility: 'hidden',
        });
    // XXX This is a side effect
    //const accIdx = 0;
    return html`<div
      class="popover-menu-container mention-popover blocksuite-overlay"
      style="${style}"
    >
      <div class="slash-item-container">${this._menu()}</div>
    </div>`;
  }
}
