<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
import type { ParagraphBlockModel } from '@blocksuite/affine-model';

=======
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from '@blocksuite/affine-components/icons';
<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
=======
import type { ParagraphBlockModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/lit';
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
import { cssVarV2 } from '@toeverything/theme/v2';
import { css, html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

function HeadingIcon(i: number) {
  switch (i) {
    case 1:
      return Heading1Icon;
    case 2:
      return Heading2Icon;
    case 3:
      return Heading3Icon;
    case 4:
      return Heading4Icon;
    case 5:
      return Heading5Icon;
    case 6:
      return Heading6Icon;
    default:
      return Heading1Icon;
  }
}

<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
export class ParagraphHeadingIcon extends WithDisposable(ShadowlessElement) {
=======
export class ParagraphHeadingIcon extends SignalWatcher(
  WithDisposable(ShadowlessElement)
) {
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
  static override styles = css`
    affine-paragraph-heading-icon .heading-icon {
      display: flex;
      align-items: start;
      margin-top: 0.3em;
      position: absolute;
<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
      /*left: 0;*/
      inset-inline-start: 0;
=======
      left: 0;
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
      transform: translateX(-64px);
      border-radius: 4px;
      padding: 2px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      pointer-events: none;

      background: ${unsafeCSS(cssVarV2('button/iconButtonSolid', '#FFF'))};
      color: ${unsafeCSS(cssVarV2('icon/primary', '#7A7A7A'))};
      box-shadow:
        var(--Shadow-buttonShadow-1-x, 0px) var(--Shadow-buttonShadow-1-y, 0px)
          var(--Shadow-buttonShadow-1-blur, 1px) 0px
          var(--Shadow-buttonShadow-1-color, rgba(0, 0, 0, 0.12)),
        var(--Shadow-buttonShadow-2-x, 0px) var(--Shadow-buttonShadow-2-y, 1px)
          var(--Shadow-buttonShadow-2-blur, 5px) 0px
          var(--Shadow-buttonShadow-2-color, rgba(0, 0, 0, 0.12));
    }

    .with-drag-handle .heading-icon {
      opacity: 1;
    }
  `;

  override render() {
<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
    const type = this.model.type;
=======
    const type = this.model.props.type$.value;
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
    if (!type.startsWith('h')) return nothing;

    const i = parseInt(type.slice(1));

<<<<<<< HEAD:packages/affine/block-paragraph/src/heading-icon.ts
    return html`<div class="heading-icon">${HeadingIcon(i)}</div>`;
=======
    return html`<div class="heading-icon" data-testid="heading-icon-${i}">
      ${HeadingIcon(i)}
    </div>`;
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/heading-icon.ts
  }

  @property({ attribute: false })
  accessor model!: ParagraphBlockModel;
}

export function effects() {
  customElements.define('affine-paragraph-heading-icon', ParagraphHeadingIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-paragraph-heading-icon': ParagraphHeadingIcon;
  }
}
