import type { AffineInlineEditor } from '@blocksuite/affine-components/rich-text';
import type { EditorHost } from '@blocksuite/block-std';
import type { InlineEditor } from '@blocksuite/inline';

import { getInlineEditorByModel } from '@blocksuite/affine-components/rich-text';
import { ShadowlessElement } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { WithDisposable } from '@blocksuite/global/utils';
import { type BlockModel, DocCollection, Job, Schema } from '@blocksuite/store';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { get } from 'lodash';

import type { Options } from './index.js';
import type { IObjectType } from './type.js';

//import '../../../_common/components/button.js';
import {
  cleanSpecifiedTail,
  createKeydownObserver,
  getQuery,
} from '../../../_common/components/utils.js';
import { replaceIdMiddleware } from '../../../_common/transformers/index.js';
import { AffineSchemas } from '../../../schemas.js';
import { styles } from './styles.js';
export interface ObjectLink {
  link_id: string;
  //id:string,
  object_id: string;
  type: IObjectType;
}

//ShadowlessElement
@customElement('affine-mahdaad-object-picker-popover')
export class MahdaadObjectPickerPopover extends WithDisposable(
  ShadowlessElement
) {
  static override styles = styles;

  //private _startIndex = this.inlineEditor?.getInlineRange()?.index ?? 0;
  private _startRange = this.inlineEditor.getInlineRange();

  /*private get _query() {
    return getQuery(this.inlineEditor, this._startIndex) || '';
  }*/

  private get _query() {
    //return getQuery(this.inlineEditor, this._startIndex) || '';
    return getQuery(this.inlineEditor, this._startRange) || '';
  }


  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private obj_type: IObjectType,
    private model: BlockModel
  ) {
    super();
  }

  addObjectLink(model: BlockModel, lnk: ObjectLink) {
    //console.log('111', model.doc.getSchemaByFlavour('affine:mahdaad-object'));
    if (!model.doc.getSchemaByFlavour('affine:mahdaad-object')) {
      return;
    }

    //console.log('11111', lnk);
    /*insertContent(this.editorHost, this.model, REFERENCE_NODE, {
      mahdaadObjectLink: {
        object_id: lnk.object_id,
        link_id: lnk.link_id,
        type: lnk.type,
      },
    });*/
    //return;

    const temp = model.doc.addSiblingBlocks(this.model, [
      {
        flavour: 'affine:mahdaad-object',
        ...lnk,
      },
    ]);

    //model.doc.addBlocks()
    //console.log('this', model.text?.length);
    setTimeout(()=>{
      if (model.text?.length == 0) {
        model.doc.deleteBlock(this.model);
      }
    },10)
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
    //todo fix trigger key ali ghasami dynamic
    try {
      let trigger = null;
      switch (this.obj_type) {
        case 'template':
          trigger = '/template/';
          break;
        case 'document':
          trigger = '/page/';
          break;
        case 'image':
          trigger = '/image/';
          break;
        case 'weblink':
          trigger = '/weblink/';
          break;
        case 'tag':
          trigger = '/tag/';
          break;
        case 'file':
          trigger = '/file/';
          break;
      }

      //const trigger = '/template/';
     // console.log("999999",this._searchText,trigger);
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
        setTimeout(()=>{
          //console.log("22222",this._query);
          this._searchText = this._query;
        },50)
      },
      onDelete: () => {
        //old method
      /*  this._searchText = this._query;
        const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        if (curIndex == this._startIndex - 1) {
          this.abortController.abort();
        }*/
        setTimeout(()=>{
          this._searchText = this._query;
        },50)
        //const curIndex = inlineEditor.getInlineRange()?.index ?? 0;
        const curRange = this.inlineEditor.getInlineRange();
        if (!this._startRange || !curRange) {
          return;
        }
        /*if (curIndex < this._startIndex) {
          this.abortController.abort();
        }*/
        //console.log("1111",curRange.index);
        //console.log("22222",this._startRange.index);
        if (curRange.index - 1 < this._startRange.index) {
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
    // console.log('this is data', data);
    //debugger
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
              this.clearTrigger();
              if (this.obj_type == 'template') {
                this.insertTemplate(event.detail);
              } else {
                this.addObjectLink(this.model, event.detail as ObjectLink);
                this.abortController.abort();
              }
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

  @property({ attribute: false })
  accessor options!: Options;

  @query(`.${Prefix}-popover-element`)
  accessor PopOverElement: Element | null = null;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
