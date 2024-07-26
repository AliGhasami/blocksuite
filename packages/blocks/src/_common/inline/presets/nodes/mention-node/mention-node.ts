import type { BlockElement } from '@blocksuite/block-std';
import type { Slot } from '@blocksuite/global/utils';

import { ShadowlessElement, WithDisposable } from '@blocksuite/block-std';
import { assertExists } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

//import { FontDocIcon, FontLinkedDocIcon } from '../../../../icons/text.js';
import type { AffineTextAttributes } from '../../affine-inline-specs.js';
import type { ReferenceNodeConfig } from './mention-config.js';

//import { ref } from 'lit/directives/ref.js';
import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { REFERENCE_NODE } from '../consts.js';

export type RefNodeSlots = {
  docLinkClicked: Slot<{ docId: string; blockId?: string }>;
  tagClicked: Slot<{ tagId: string }>;
};
@customElement('affine-mention')
export class AffineMention extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .affine-reference {
      white-space: nowrap;
      word-break: break-word;
      color: var(--affine-text-primary-color);
      fill: var(--affine-icon-color);
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      padding: 1px 2px 1px 0;
    }
    .affine-reference:hover {
      background: var(--affine-hover-color);
    }

    .affine-reference[data-selected='true'] {
      background: var(--affine-hover-color);
    }

    .affine-reference-title {
      margin-left: 4px;
      border-bottom: 0.5px solid var(--affine-divider-color);
      transition: border 0.2s ease-out;
      white-space: break-spaces;
    }
    .affine-reference-title:hover {
      border-bottom: 0.5px solid var(--affine-icon-color);
    }
  `;

  override connectedCallback() {
    //debugger;
    super.connectedCallback();

    assertExists(this.config, '`reference-node` need `ReferenceNodeConfig`.');

    if (this.delta.insert !== REFERENCE_NODE) {
      console.error(
        `Reference node must be initialized with '${REFERENCE_NODE}', but got '${this.delta.insert}'`
      );
    }

    /*const doc = this.doc;
    this._disposables.add(
      doc.collection.slots.docUpdated.on(() => this._updateRefMeta(doc))
    );

    this.updateComplete
      .then(() => {
        // observe yText update
        this.disposables.add(
          this.inlineEditor.slots.textChange.on(() => this._updateRefMeta(doc))
        );
      })
      .catch(console.error);*/
  }

  override render() {
    //const refMeta = this._refMeta;
    //const isDeleted = !refMeta;

    const attributes = this.delta.attributes;
    assertExists(attributes, 'Failed to get attributes!');
    const name = attributes.mention?.name;
    assertExists(name, 'Unable to get mention name!');
    //const type = attributes.mention?.type;

    /* const title = this.customTitle
      ? this.customTitle(this)
      : isDeleted
        ? 'Deleted doc'
        : refMeta.title.length > 0
          ? refMeta.title
          : DEFAULT_DOC_NAME;*/
    /*const icon = this.customIcon
      ? this.customIcon(this)
      : type === 'LinkedPage'
        ? FontLinkedDocIcon
        : FontDocIcon;*/

    /*const style = affineTextStyles(
      attributes,
      isDeleted
        ? {
            color: 'var(--affine-text-disable-color)',
            textDecoration: 'line-through',
            fill: 'var(--affine-text-disable-color)',
          }
        : {}
    );*/

    /* const content = this.customContent
      ? this.customContent(this)
      : html`<span data-title=${title} class="affine-reference-title"
          >${title}</span
        >`;*/

    // we need to add `<v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text>` in an
    // embed element to make sure inline range calculation is correct
    return html`
      <span class="affine-mention" data-selected=${this.selected}>
        <span>@</span>
        ${name}
        <v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text>
      </span>
    `;
    /*return html`<span
      ${this.config.interactable ? ref(this._whenHover.setReference) : ''}
      data-selected=${this.selected}
      class="affine-mention"
      style=${style}
      @click=${this._onClick}
      >${content}<v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text
    ></span>`;*/
  }

  override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(_changedProperties);

    //const doc = this.doc;
    //this._updateRefMeta(doc);
  }

  // Since the linked doc may be deleted, the `_refMeta` could be undefined.
  //@state()
  //private _refMeta?: DocMeta;

  /*private _refAttribute: NonNullable<AffineTextAttributes['mention']> = {
    name: '',
    id: '0',
    //type: 'LinkedPage',
    //pageId: '0',
  };*/

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockElement>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get doc() {
    const doc = this.config.doc;
    assertExists(doc, '`reference-node` need `Doc`.');
    return doc;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor.getInlineRangeFromElement(this);
    assertExists(selfInlineRange);
    return selfInlineRange;
  }

  get std() {
    const std = this.blockElement.std;
    assertExists(std);
    return std;
  }

  /*get customIcon() {
    return this.config.customIcon;
  }*/

  /*get customTitle() {
    return this.config.customTitle;
  }*/

  /*get customContent() {
    return this.config.customContent;
  }*/

  @property({ attribute: false })
  accessor config!: ReferenceNodeConfig;

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
    attributes: {},
  };

  /*private _updateRefMeta = (doc: Doc) => {
    const refAttribute = this.delta.attributes?.mention;
    assertExists(refAttribute, 'Failed to get reference attribute!');
    this._refAttribute = refAttribute;
    const refMeta = doc.collection.meta.docMetas.find(
      doc => doc.id === refAttribute.pageId
    );
    this._refMeta = refMeta
      ? {
          ...refMeta,
        }
      : undefined;
  };*/

  /* private _onClick() {
    if (!this.config.interactable) return;

    const refMeta = this._refMeta;
    const model = getModelByElement(this);
    if (!refMeta) {
      // The doc is deleted
      console.warn('The doc is deleted', this._refAttribute.pageId);
      return;
    }
    if (refMeta.id === model.doc.id) {
      // the doc is the current doc.
      return;
    }
    const targetDocId = refMeta.id;
    const rootModel = model.doc.root;
    assertExists(rootModel);
    const rootElement = getRootByElement(this) as RootBlockComponent;
    assertExists(rootElement);
    rootElement.slots.docLinkClicked.emit({ docId: targetDocId });
  }*/

  /*private _whenHover = new HoverController(this, ({ abortController }) => {
    if (this.doc.readonly) {
      return null;
    }

    const selection = this.std.selection;
    const textSelection = selection.find('text');
    if (
      !!textSelection &&
      (!!textSelection.to || !!textSelection.from.length)
    ) {
      return null;
    }

    const blockSelections = selection.filter('block');
    if (blockSelections.length) {
      return null;
    }

    return {
      template: toggleReferencePopup(
        this.inlineEditor,
        this.selfInlineRange,
        this._refMeta?.title ?? DEFAULT_DOC_NAME,
        abortController
      ),
    };
  });*/

  @property({ type: Boolean })
  accessor selected = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mention': AffineMention;
  }
}
