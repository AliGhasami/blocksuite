import type { EditorHost } from '@blocksuite/block-std';

import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
//import type { InlineEditor } from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { MentionOptions } from './index.js';
//import type { UserMention } from './types.js';

import type { IObjectType } from './type.js';

import '../../../_common/components/button.js';
import {
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
//import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { styles } from './styles.js';

//ShadowlessElement
@customElement('affine-mahdaad-object-picker-popover')
export class MahdaadObjectPickerPopover extends WithDisposable(
  ShadowlessElement
) {
  //private _searchString = '';

  /*private _updateItem(query: string): UserMention[] {
    this._searchString = query;
    this._activatedItemIndex = 0;
    //const _menu: ClayTapSlashMenu[] = [];
    /!*clayTapGroupMenu.map(group => {
      _menu.push(
        ...group.children.map(item => ({ ...item, group: group.groupName }))
      );
    });*!/
    // Activate the right panel when search string is not empty
    /!*if (this._leftPanelActivated) {
      this._leftPanelActivated = false;
    }*!/
    const searchStr = this._searchString.toLowerCase();
    //console.log('this is options', this.options);
    /!*let allMenus = this.options.menus
      .map(group =>
        typeof group.items === 'function'
          ? group
              .items({ rootElement: this.rootElement, model: this.model })
              .map(item => ({ ...item, groupName: group.name }))
          : group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();*!/
    //console.log('this is all menu', allMenus);
    /!*allMenus = allMenus.filter(({ showWhen = () => true }) =>
      showWhen(this.model, this.rootElement)
    );*!/
    if (!searchStr) {
      return this.userList;
    }

    return this.userList.filter(item => isFuzzyMatch(item.name, searchStr));
  }*/
  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  static override styles = styles;

  //@state()
  //private _hide = false;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private obj_type: IObjectType
  ) {
    super();
    //this.addObjectLink();
    //console.log('1111', editorHost);
  }

  /* private _handleClickItem(user: UserMention) {
    // assertExists(inlineEditor, 'Editor not found');
    cleanSpecifiedTail(
      this.editorHost,
      this.inlineEditor,
      this.triggerKey + this._query
    );

    const inlineRange = this.inlineEditor.getInlineRange();
    assertExists(inlineRange);
    this.inlineEditor.insertText(inlineRange, REFERENCE_NODE, {
      mention: { ...user, user_id: user.id, id: uuidv4() },
      //mention: { name: user., id: '1' },
      //mention: { type: 'LinkedPage', pageId: '11' },
    });
    this.inlineEditor.setInlineRange({
      index: inlineRange.index + 1,
      length: 0,
    });

    /!*if (
      //this._leftPanelActivated ||
      index < 0 ||
      index >= this._filterItems.length
    ) {
      return;
    }*!/
    // Need to remove the search string
    // We must to do clean the slash string before we do the action
    // Otherwise, the action may change the model and cause the slash string to be changed
    /!*    cleanSpecifiedTail(
      this.host,
      this.model,
      this.triggerKey + this._searchString
    );*!/
    this.abortController.abort();
    //console.log('this is item', item);
    //const { action } = this._filterItems[index];
    /!*action({ rootElement: this.rootElement, model: this.model })?.catch(
      console.error
    );*!/

    /!*this.rootElement.host.std.command
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
      .run();*!/
  }*/

  /*private _menu() {
    let index = 0;
    if (this._filterItems.length < 1) {
      return html`<div style="color: var(--bu-neutral-3);text-align: center">
        No user found
      </div>`;
    }
    return html`<div class="${Prefix}-mention-menu-container">
      ${this._filterItems.map(item => {
        return html`<div
          class="mention-item ${index == this._activatedItemIndex
            ? 'hover'
            : ''}"
          data-index="${index++}"
          @click=${() => {
            return this._handleClickItem(item);
          }}
        >
          ${item.name}
        </div>`;
      })}
    </div>`;
  }*/

  /*private _scrollToItem(index: number, force = true) {
    //console.log('index,this', index, this);
    /!* const shadowRoot = this.rootElement;
    if (!shadowRoot) {
      return;
    }*!/
    const ele = this.querySelector(`[data-index='${index}']`);
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
  }*/

  private get _query() {
    //console.log('11111', getQuery(this.inlineEditor, this._startIndex) || '');
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  addObjectLink() {
    this.editorHost.std.command
      .chain()
      .updateBlockType({
        flavour: 'affine:mahdaad-object',
        props: {},
        //props: { type },
      })
      .inline((ctx, next) => {
        const newModels = ctx.updatedBlocks;
        if (!newModels) {
          return false;
        }
        // Reset selection if the target is code block
        /*if (['affine:code'].includes('affine:code')) {
          if (newModels.length !== 1) {
            console.error(
              "Failed to reset selection! New model length isn't 1"
            );
            return false;
          }
          /!*const codeModel = newModels[0];
          onModelTextUpdated(rootComponent.host, codeModel, richText => {
            const inlineEditor = richText.inlineEditor;
            assertExists(inlineEditor);
            inlineEditor.focusEnd();
          }).catch(console.error);*!/
        }*/
        //console.log('next - change inline menu');
        return next();
      })
      .run();
  }

  override connectedCallback() {
    //console.log('111111');
    super.connectedCallback();

    const inlineEditor = this.inlineEditor;

    if (!inlineEditor || !inlineEditor.eventSource) {
      console.error('inlineEditor or eventSource is not found');
      return;
    }

    createKeydownObserver({
      target: inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (e, next) => {
        this._searchText = this._query;
        //console.log('1111');
        next();
      },
      onInput: () => {
        this._searchText = this._query;
        console.log('this is query', this._query);
        //this._activatedItemIndex = 0;
        //this._linkedDocGroup = this._getLinkedDocGroup();
      },
      onDelete: () => {
        //const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        /*if (curIndex < this._startIndex) {
          this.abortController.abort();
        }*/
        //this._activatedItemIndex = 0;
        //this._linkedDocGroup = this._getLinkedDocGroup();
      },
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
        /*this._flattenActionList[this._activatedItemIndex]
          .action()
          ?.catch(console.error);*/
      },
      onAbort: () => {
        //this.abortController.abort();
      },
    });

    /*this._disposables.addFromEvent(window, 'mousedown', () => {
      this.abortController.abort();
    });
    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });*/
    // const inlineEditor = this.inlineEditor;
    //assertExists(inlineEditor, 'RichText InlineEditor not found');
    //if (!inlineEditor) return;
    /*createKeydownObserver({
      target: inlineEditor.eventSource,
      //inlineEditor,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        //const { key, isComposing, code } = event;
        // if (key === this.triggerKey) {
        //   // Can not stopPropagation here,
        //   // otherwise the rich text will not be able to trigger a new the slash menu
        //   return;
        // }

        // if (key === 'Process' && !isComposing && code === 'Slash') {
        //   // The IME case of above
        //   return;
        // }

        // if (key !== 'Backspace') {
        //   // if the following key is not the backspace key,
        //   // the slash menu will be closed
        //this.abortController.abort();
        //   return;
        // }

        /!* if (key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Escape') {
          return;
        }*!/

        next();
      },
      onInput: () => {
        //this.abortController.abort()
      },
      onDelete: () => {
        /!*const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex < this._startIndex) {
          this.abortController.abort();
        }
        this._updateFilteredItems();*!/
      },
      onAbort: () => this.abortController.abort(),
    });*/

    //this.temp = inlineEditor.getInlineRange();
    //this._filterItems = this._updateItem('');
    // init
    //this._updateActionList();
    /*this._disposables.add(
      this._doc.collection.slots.docUpdated.on(() => {
        this._updateActionList();
      })
    );*/
    /*this._disposables.addFromEvent(this, 'mousedown', e => {
      e.stopPropagation();
      //debugger;
      // Prevent input from losing focus
      e.preventDefault();
    });*/
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
    //mention-popover popover-menu-container blocksuite-overlay
    //${Prefix}-popover
    //console.log('555', this.);
    //console.log('5555', this.editorHost, this.doc, this.slots, ...this);
    return html`<div>
      <div
        class="${Prefix}-popover  ${Prefix}-popover-element"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <span>${this._searchText}</span>
          <mahdaad-object-picker-component
            search-text="${this._searchText}"
            type="${this.obj_type}"
            @select="${(data: object) => {
              //debugger;
              this.addObjectLink();
              this.abortController.abort();
              //<template>
              //     <Card ></Card>
              // </template>
              //console.log(data);
            }}"
          >
          </mahdaad-object-picker-component>
        </div>
      </div>
    </div>`;
  }

  //private _actionGroup: LinkedDocGroup[] = [];

  /*private get _flattenActionList() {
    return this._actionGroup
      .map(group =>
        group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();
  }*/

  updatePosition(position: { height: number; x: string; y: string }) {
    //console.log('11111', this.inlineEditor.getInlineRange());
    this._position = position;
  }

  /* private _updateActionList() {
    this._actionGroup = this.options.getMenus({
      editorHost: this.editorHost,
      query: this._query,
      inlineEditor: this.inlineEditor,
      docMetas: this._doc.collection.meta.docMetas,
    });
  }*/

  @state()
  private accessor _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  /* private get _doc() {
    return this.editorHost.doc;
  }*/

  //@state()
  //private accessor _activatedItemIndex = 0;

  //@state()
  //private accessor _filterItems: UserMention[] = [];

  //private temp = null;
  @state()
  private accessor _searchText = '';

  //@state()
  //private accessor _query = '';

  @query(`.${Prefix}-popover-element`)
  accessor PopOverElement: Element | null = null;

  @property({ attribute: false })
  accessor options!: MentionOptions;

  @property({ attribute: false })
  accessor triggerKey!: string;

  /*@property({ attribute: false })

  accessor host!: EditorHost;*/

  //@state()
  //public accessor userList: UserMention[] = [];
}
