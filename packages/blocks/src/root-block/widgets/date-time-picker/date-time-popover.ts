import { type EditorHost, ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
//import type { InlineEditor } from '@blocksuite/inline';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { MentionOptions } from './index.js';
import type { UserMention } from './types.js';

import '../../../_common/components/button.js';
import { createKeydownObserver } from '../../../_common/components/utils.js';
//import { isFuzzyMatch } from '../../../_common/utils/string.js';
import { styles } from './styles.js';

//ShadowlessElement
@customElement('affine-date-time-popover')
export class DateTimePopover extends WithDisposable(ShadowlessElement) {
  //private _searchString = '';

  //private temp = null;

  static override styles = styles;

  //@state()
  //private _hide = false;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private index?: null | number
  ) {
    //debugger;
    //console.log('ppppp', inlineEditor.getInlineRange());
    super();
    //this.temp = inlineEditor;
    //console.log('ppppp 22222', this.inlineEditor.getInlineRange());
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

  override connectedCallback() {
    //console.log('111111');
    super.connectedCallback();
    /*this._disposables.addFromEvent(window, 'mousedown', () => {
      this.abortController.abort();
    });
    this._disposables.addFromEvent(this, 'mousedown', e => {
      // Prevent input from losing focus
      e.preventDefault();
    });*/
    const inlineEditor = this.inlineEditor;
    assertExists(inlineEditor, 'RichText InlineEditor not found');

    createKeydownObserver({
      target: inlineEditor.eventSource,
      //inlineEditor,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key, isComposing, code } = event;
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
        this.abortController.abort();
        //   return;
        // }

        /* if (key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Escape') {
          return;
        }*/

        next();
      },
      onInput: () => this.abortController.abort(),
      onDelete: () => {
        /*const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex < this._startIndex) {
          this.abortController.abort();
        }
        this._updateFilteredItems();*/
      },
      onAbort: () => this.abortController.abort(),
    });

    //this.temp = inlineEditor.getInlineRange();
    //this._filterItems = this._updateItem('');
    // init
    //this._updateActionList();
    /*this._disposables.add(
      this._doc.collection.slots.docUpdated.on(() => {
        this._updateActionList();
      })
    );*/
    this._disposables.addFromEvent(this, 'mousedown', e => {
      e.stopPropagation();
      //debugger;
      // Prevent input from losing focus
      e.preventDefault();
    });
  }

  //private _actionGroup: LinkedDocGroup[] = [];

  /*private get _flattenActionList() {
    return this._actionGroup
      .map(group =>
        group.items.map(item => ({ ...item, groupName: group.name }))
      )
      .flat();
  }*/

  override render() {
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
      <!--<div
        class="${Prefix}-overlay-mask"
        @click="${() => this.abortController.abort()}"
      ></div> -->
      <div
        class="${Prefix}-popover  ${Prefix}-date-time-popover"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <mahdaad-date-picker
            @change=${event => {
              /* this.inlineEditor.setInlineRange({
                index: this.index + 1,
                length: 0,
              });*/
              //console.log('99999', this.triggerKey, event.detail);
              //const inlineRange = this.inlineEditor.getInlineRange();
              //console.log('8888', inlineRange);
              //assertExists(inlineRange);
              if (!this.index) return;
              const inlineRange = { index: this.index - 1, length: 1 };
              const temp = {
                date: event.detail[0],
                time: event.detail[1], //'11:00:00'
                //id: uuidv4(),
              };

              const format = this.inlineEditor.getFormat(inlineRange);
              if (format && format.date && format.date.id) {
                Object.assign(temp, { id: format.date.id });
              }
              //console.log('this is tt', format);
              //this.inlineEditor.attributeService.setAttributeSchema()
              //this.inlineEditor.
              /*console.log(
                '100000',
                this.inlineEditor.getDeltasByInlineRange({
                  index: this.index - 1,
                  length: 1,
                })
              );*/
              this.inlineEditor.formatText(inlineRange, { date: temp });
              /*this.editorHost.doc.slots.dateTimeEvent.emit({
                type: 'update',
                meta: temp,
              });*/

              /*this.inlineEditor.deleteText({
                index: this.index - 1,
                //index: inlineRange.index - 1,
                length: 1,
              });*/

              /* this.inlineEditor.insertText(
                {
                  index: this.index - 1,
                  //index: inlineRange.index - 1,
                  length: 0,
                },
                REFERENCE_NODE,
                {
                  date: temp,

                }
              );*/

              /* this.inlineEditor.setInlineRange({
                index: this.index + 1,
                length: 0,
              });*/
              //console.log('inlineEditor', this.inlineEditor);
              //console.log('this is test', event.detail);
              //const inlineRange = this.inlineEditor.getInlineRange();
              //assertExists(inlineRange);
              /* this.inlineEditor.insertText(inlineRange, REFERENCE_NODE, {
                date: {
                  date: '2025-01-01',
                  time: '11:00:00',
                  id: uuidv4(),
                },
              });*/
              //assertExists(this.range);
              /* this.inlineEditor.formatText(this.range, {
                date: {
                  date: '1403-05-06',
                  time: '12:00:00',
                  id: uuidv4(),
                },
              });*/

              /* this.inlineEditor.setInlineRange({
                index: inlineRange.index + 1,
                length: 0,
              });*/
              /*const inlineRange = this.inlineEditor.getInlineRange();
              assertExists(inlineRange);
              this.inlineEditor.insertText(inlineRange, REFERENCE_NODE, {
                date: {
                  date: '2025-01-01',
                  time: '11:00:00',
                  id: uuidv4(),
                },
              });
              this.inlineEditor.setInlineRange({
                index: inlineRange.index + 1,
                length: 0,
              });*/

              /*cleanSpecifiedTail(
                this.editorHost,
                this.inlineEditor,
                this.triggerKey + this._query
              );
              action()?.catch(console.error);*/
            }}
            @close="${() => {
              this.abortController.abort();
              //console.log('this is editor,', this.inlineEditor);
              if (this.index) return;
              this.inlineEditor.focusIndex(this.index as number);
              /*this.inlineEditor.setInlineRange({
                index: 0,
                length: 0,
              });*/
              //console.log('this is close');
            }}"
          ></mahdaad-date-picker>
        </div>
      </div>
    </div>`;
  }

  /* private _updateActionList() {
    this._actionGroup = this.options.getMenus({
      editorHost: this.editorHost,
      query: this._query,
      inlineEditor: this.inlineEditor,
      docMetas: this._doc.collection.meta.docMetas,
    });
  }*/

  updatePosition(position: { height: number; x: string; y: string }) {
    //console.log('11111', this.inlineEditor.getInlineRange());
    this._position = position;
  }

  /* private get _doc() {
    return this.editorHost.doc;
  }*/

  @state()
  private accessor _activatedItemIndex = 0;

  //@state()
  //private accessor _filterItems: UserMention[] = [];

  @state()
  private accessor _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  //@state()
  //private accessor _query = '';

  @query(`.${Prefix}-date-time-popover`)
  accessor DateTimePopOverElement: Element | null = null;

  @property({ attribute: false })
  accessor options!: MentionOptions;

  @property({ attribute: false })
  accessor triggerKey!: string;

  /*@property({ attribute: false })
  accessor host!: EditorHost;*/

  @state()
  public accessor userList: UserMention[] = [];
}
