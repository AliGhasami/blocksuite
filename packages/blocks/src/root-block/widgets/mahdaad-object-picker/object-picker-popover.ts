import type { EditorHost } from '@blocksuite/block-std';
import type { InlineEditor } from '@blocksuite/inline';

import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { type BlockModel, DocCollection, Job, Schema } from '@blocksuite/store';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { get } from 'lodash';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { Options } from './index.js';
import type { IObjectType } from './type.js';

import '../../../_common/components/button.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { replaceIdMiddleware } from '../../../_common/transformers/index.js';
import { getInlineEditorByModel } from '../../../_common/utils/index.js';
import { AffineSchemas } from '../../../schemas.js';
import { styles } from './styles.js';
export interface ObjectLink {
  link_id: string;
  object_id: string;
  type: IObjectType;
}

//ShadowlessElement
@customElement('affine-mahdaad-object-picker-popover')
export class MahdaadObjectPickerPopover extends WithDisposable(
  ShadowlessElement
) {
  private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;

  static override styles = styles;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private obj_type: IObjectType,
    private model: BlockModel
  ) {
    super();
  }

  private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }

  addObjectLink(model: BlockModel, lnk: ObjectLink) {
    const temp = model.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        ...lnk,
      },
    ]);

    //model.doc.addBlocks()

    model.doc.deleteBlock(this.model);
    const next = model.doc.getNext(temp[0]);
    if (next) {
      const inline: InlineEditor | null = getInlineEditorByModel(
        this.editorHost,
        next
      );
      if (inline) {
        inline.focusEnd();
      }
    }
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  clearTrigger() {
    // console.log('11111', this._searchText);
    try {
      //todo fix trigger key ali ghasami dynamic
      const trigger = '/templates/';
      const text = this._searchText ? trigger + this._searchText : trigger;
      // console.log('this is text', text);
      cleanSpecifiedTail(this.editorHost, this.inlineEditor, text);
    } catch (e) {
      console.log(e);
    }
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
      onMove: step => {
        this.abortController.abort();
      },
      onConfirm: () => {
        this.abortController.abort();
      },
      onAbort: () => {
        this.abortController.abort();
      },
    });
  }

  async insertTemplate(data: any) {
    //debugger;
    console.log('this is data', data);
    if (!data.context) return;
    const content = JSON.parse(data.context);
    ///console.log('14141444', content);
    const blocks = get(content, 'blocks.children', []);
    const note = blocks.find(item => item.flavour == 'affine:note');
    const noteChildren = get(note, 'children', []);
    const doc = this.model.doc;
    if (noteChildren.length > 0) {
      const schema = new Schema().register(AffineSchemas);
      const collection = new DocCollection({ schema });
      const job = new Job({
        collection: collection,
        middlewares: [replaceIdMiddleware],
      });
      const notes = doc.getBlocksByFlavour('affine:note');
      if (notes.length > 0) {
        const parent = doc.getParent(this.model);
        if (parent) {
          const targetIndex =
            parent.children.findIndex(({ id }) => id === this.model.id) ?? 0;
          let insertIndex = targetIndex + 1; //place === 'before' ? targetIndex :
          for (const item of noteChildren) {
            await job.snapshotToBlock(item, doc, parent.id, insertIndex++);
          }
        }
      }
    }
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  override render() {
    const style = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
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
          <mahdaad-object-picker-component
            search-text="${this._searchText}"
            .inline-editor="${this.inlineEditor}"
            type="${this.obj_type}"
            .model="${this.model}"
            .create-function="${this.addObjectLink}"
            .insert-template="${this.insertTemplate}"
            @clear-trigger="${() => {
              this.clearTrigger();
            }}"
            @select="${(event: CustomEvent) => {
              if (this.obj_type == 'template') {
                this.clearTrigger();
                this.insertTemplate(event.detail);
              } else {
                this.addObjectLink(this.model, event.detail as ObjectLink);
                this.abortController.abort();
              }
              //console.log('999999');
            }}"
            @close="${() => {
              this.abortController.abort();
            }}"
          >
          </mahdaad-object-picker-component>
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
  accessor options!: Options;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
