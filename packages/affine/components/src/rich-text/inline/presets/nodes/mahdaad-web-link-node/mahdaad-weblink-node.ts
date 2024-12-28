import type { BlockComponent} from '@blocksuite/block-std';

import { ShadowlessElement } from '@blocksuite/block-std';
import { assertExists , WithDisposable } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

//import type { AffineTextAttributes } from '../../affine-inline-specs.js';
import type { AffineTextAttributes } from '@blocksuite/affine-components/rich-text';

import {
  HoverController,
} from '@blocksuite/affine-components/hover';
//import { HoverController } from '../../../../components/index.js';
//import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { BLOCK_ID_ATTR  } from '@blocksuite/block-std';

import { affineTextStyles } from '../affine-text.js';
import { toggleLinkPopup } from './link-popup/toggle-link-popup.js';

//@customElement('mahdaad-weblink-node')
export class MahdaadWebLinkNode extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    affine-link a:hover [data-v-text='true'] {
      text-decoration: underline;
    }
  `;

  private _whenHover = new HoverController(
    this,
    ({ abortController }) => {
      if (this.block.doc.readonly) {
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

      /*toggleLinkPopup(
        this.inlineEditor,
        'view',
        this.selfInlineRange,
        abortController
      );*/

      return {
        template: toggleLinkPopup(
          this.inlineEditor,
          'view',
          this.selfInlineRange,
          abortController
        ),
      };
    },
    { enterDelay: 250 }
  );

  get block() {
    const block = this.inlineEditor.rootElement.closest<BlockComponent>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(block);
    return block;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get link() {
    const link = this.delta.attributes?.link;
    if (!link) {
      return '';
    }
    return link;
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor.getInlineRangeFromElement(this);
    assertExists(selfInlineRange);
    return selfInlineRange;
  }

  // Workaround for links not working in contenteditable div
  // see also https://stackoverflow.com/questions/12059211/how-to-make-clickable-anchor-in-contenteditable-div
  //
  // Note: We cannot use JS to directly open a new page as this may be blocked by the browser.
  //
  // Please also note that when readonly mode active,
  // this workaround is not necessary and links work normally.
  get std() {
    const std = this.block.std;
    assertExists(std);
    return std;
  }

  // see https://github.com/toeverything/AFFiNE/issues/1540
  private _onMouseUp() {
    const anchorElement = this.querySelector('a');
    assertExists(anchorElement);
    if (!anchorElement.isContentEditable) return;
    anchorElement.contentEditable = 'false';
    setTimeout(() => {
      anchorElement.removeAttribute('contenteditable');
    }, 0);
  }

  override connectedCallback() {
    super.connectedCallback();

    /*this.disposables.addFromEvent(this, 'mouseenter', () => {
      toggleLinkPopup(
        this.inlineEditor,
        'view',
        this.selfInlineRange,
        new AbortController()
      );
    });*/
    /*if (this.targetInlineRange.length === 0) {
      return;
    }

    if (this.type === 'edit' || this.type === 'create') {
      // disable body scroll
      this._bodyOverflowStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.disposables.add({
        dispose: () => {
          document.body.style.overflow = this._bodyOverflowStyle;
        },
      });
    }*/
  }

  override render() {
    const linkStyles = {
      color: 'var(--affine-link-color)',
      fill: 'var(--affine-link-color)',
      'text-decoration': 'none',
      cursor: 'pointer',
    };
    if (this.delta.attributes && this.delta.attributes?.code) {
      const codeStyle = affineTextStyles(this.delta.attributes);
      return html`<code style=${codeStyle}
        ><a
      ${ref(this._whenHover.setReference)}
      href=${this.link}
      style=${styleMap(linkStyles)}
      rel="noopener noreferrer"
      target="_blank"
      @mouseup=${this._onMouseUp}
      ><v-text .str=${this.delta.insert}></v-text
    ></a></v-text></code>`;
    }

    const styles = this.delta.attributes
      ? affineTextStyles(this.delta.attributes, linkStyles)
      : styleMap({});
    //console.log("qqqqq",styles);
    return html`
      <a
        @mouseup=${this._onMouseUp}
        ${ref(this._whenHover.setReference)}
        href=${this.link}
        rel="noopener noreferrer"
        target="_blank"
        style=${styleMap(linkStyles)}
        ><v-text .str=${this.delta.insert}></v-text
      ></a>
    `;

    /*return html`<mahdaad-weblink>
      <!-- <p slot="header">Header Content</p> -->
      <template slot="header">This is the header content from HTML</template>
      <div>This is the default slot content from HTML</div>
      <!--<p slot="header">This is the header content</p>
      <template #header>11111</template>-->
    </mahdaad-weblink>`;*/

    /* return html`<span class="flex">
      <mahdaad-weblink>
    </mahdaad-weblink> <v-text .str="fffff"></v-text
    ></a></v-text>
    </span>`;*/
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'mahdaad-weblink-node': MahdaadWebLinkNode;
  }
}
