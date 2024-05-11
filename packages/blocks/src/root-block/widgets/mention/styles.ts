import { Prefix } from '@blocksuite/global/env';
import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';
//import { popoverStyle } from '../../../_common/style/popover-style.js';

export const styles = css`
  :host {
    position: absolute;
  }
  /*.mention-popover-container .mention-menu-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }*/

  /* .mention-popover-container .mention-menu-container .mention-item {
    border-radius: 4px;
    //font-family: Inter;
    //font-size: --mt-dimension-600;
    //font-style: normal;
    //font-weight: 400;
    //line-height: var(----mt-lineheight-7, 14px); !* 116.667% *!
  }*/

  /*.mention-popover {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    //font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    //font-size: var(--affine-font-base);
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    background: var(--affine-background-overlay-panel-color);
    box-shadow: var(--affine-shadow-2);
    border-radius: 12px;
    z-index: var(--affine-z-index-popover);
  }*/

  /*.mention-popover icon-button {
    padding: 8px;
    justify-content: flex-start;
    gap: 8px;
  }*/

  /*.mention-popover .group-title {
    color: var(--affine-text-secondary-color);
    margin: 8px 12px;
  }*/

  /*.mention-popover .divider {
    margin: 6px 12px;
    height: 1px;
    background: var(--affine-border-color);
  }*/

  ${scrollbarStyle(`${Prefix}-mention-popover .group`)}
`;
