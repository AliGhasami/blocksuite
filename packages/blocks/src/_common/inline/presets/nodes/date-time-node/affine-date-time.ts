import type { BlockElement } from '@blocksuite/block-std';

import { ShadowlessElement } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
  //ZERO_WIDTH_NON_JOINER,
  //ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import dayjs from 'dayjs';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

//import { ref } from 'lit/directives/ref.js';
import type { AffineTextAttributes } from '../../affine-inline-specs.js';

//import { styleMap } from 'lit/directives/style-map.js';
import { HoverController } from '../../../../components/hover/index.js';
import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { defaultDateFormat, defaultTimeFormat } from './config.js';
//import { affineTextStyles } from '../affine-text.js';
import { toggleLinkPopup } from './link-popup/toggle-link-popup.js';

@customElement('affine-date-time')
export class AffineDateTime extends ShadowlessElement {
  /*get link() {
    const link = this.delta.attributes?.link;
    if (!link) {
      return '';
    }
    return link;
  }*/

  private _whenHover = new HoverController(
    this,
    ({ abortController }) => {
      if (this.blockElement.doc.readonly) {
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
        template: toggleLinkPopup(
          this.inlineEditor,
          'view',
          this.selfInlineRange,
          abortController
        ),
      };
    },
    { enterDelay: 500 }
  );

  /*get doc() {
    const doc = this.config.doc;
    assertExists(doc, '`reference-node` need `Doc`.');
    return doc;
  }*/

  static override styles = css`
    affine-link > a:hover [data-v-text='true'] {
      text-decoration: underline;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    console.log('this is connected');
    //console.log("this",this.delta.);

    // this.inlineEditor.slots.mounted.on(() => {
    //   console.log('this is mont');
    // });
    //
    // this.inlineEditor.slots.inlineRangeApply.on(() => {
    //   console.log('this is inlineRangeApply');
    // });
    //
    // this.inlineEditor.slots.render.on(() => {
    //   console.log('this is render');
    // });
    //
    // this.inlineEditor.slots.textChange.on(() => {
    //   console.log('this is textChange');
    // });
    // this.inlineEditor.slots.inputting.on(() => {
    //   console.log('this is inputting');
    // });
    //
    // this.inlineEditor.slots.inlineRangeUpdate.on(() => {
    //   console.log('this is inlineRangeUpdate');
    // });
    //
    // this.inlineEditor.slots.keydown.on(event => {
    //   console.log('this is keydown', event);
    // });
    //
    // this.inlineEditor.slots.renderComplete.on(() => {
    //   console.log('this is renderComplete');
    // });
    //
    // this.inlineEditor.slots.unmounted.on(() => {
    //   console.log('this is unmounted');
    // });

    // this.inlineEditor.slots.textChange.on(() => this._updateRefMeta(doc))

    /*this.std.doc.slots.rootDeleted.on(() => {
      console.log('rootDeleted');
    });*/
    //this.pare
    /*this.inlineEditor.slots. inlineRangeApply.on(data => {
      console.log('66666', data);
    });*/
    /*this.inlineEditor.unmount(() => {
      console.log('1111', this.inlineEditor);
    });*/
    //this.std
    /* this.inlineEditor.slots.inputting.on(([data]) => {
      console.log('this is inputting', data);
    });

    this.inlineEditor.slots.inlineRangeApply.on(data => {
      console.log('this is inlineRangeApply', data);
    });

    this.inlineEditor.slots.textChange.on(data => {
      console.log('this is textChange', data);
    });*/
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    console.log('this is disconnected');
  }

  override render() {
    /*const style = this.delta.attributes
      ? affineTextStyles(this.delta.attributes, {
          color: 'var(--affine-link-color)',
          fill: 'var(--affine-link-color)',
          'text-decoration': 'none',
          cursor: 'pointer',
        })
      : styleMap({});*/

    //data-selected=${this.selected}
    /* return html`
      <span class="affine-mention">
        <span>@</span>
        11111
        <v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text>
      </span>
    `;*/

    /*${ref(this._whenHover.setReference)}
    href=${this.link}
      affine-link
    rel="noopener noreferrer"
    target="_blank"
    style=${style}
      @mouseup=${this._onMouseUp}*/
    //console.log('1111', this.delta);
    return html`<span>
      <span class="${Prefix}-date-time">${this.dateTime}</span>
      <v-text .str=${this.delta.insert}></v-text>
      <!-- <v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text> -->
    </span>`;
  }

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockElement>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get dateTime() {
    const dateTime = this.delta.attributes?.date?.date;
    if (!dateTime) {
      return '';
    }
    let tempStr = dayjs(this.delta.attributes?.date?.date).format(
      defaultDateFormat
    );
    const time = this.delta.attributes?.date?.time;
    if (time) {
      tempStr +=
        ' ' +
        dayjs(`${this.delta.attributes?.date?.date} ${time}`).format(
          defaultTimeFormat
        );
    }
    return tempStr;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  // Workaround for links not working in contenteditable div
  // see also https://stackoverflow.com/questions/12059211/how-to-make-clickable-anchor-in-contenteditable-div
  //
  // Note: We cannot use JS to directly open a new page as this may be blocked by the browser.
  //
  // Please also note that when readonly mode active,
  // this workaround is not necessary and links work normally.
  // see https://github.com/toeverything/AFFiNE/issues/1540
  /*private _onMouseUp() {
    const anchorElement = this.querySelector('a');
    assertExists(anchorElement);
    if (!anchorElement.isContentEditable) return;
    anchorElement.contentEditable = 'false';
    setTimeout(() => {
      anchorElement.removeAttribute('contenteditable');
    }, 0);
  }*/

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

  /*  override disconnectedCallback() {
    super.disconnectedCallback();
    console.log('this is disconnected');
  }*/

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-date-time': AffineDateTime;
  }
}
