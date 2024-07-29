import { Prefix } from '@blocksuite/global/env';
//import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';
//import { popoverStyle } from '../../../_common/style/popover-style.js';

export const styles = css`
  :host {
    position: absolute;
  }

  ${unsafeCSS(`.${Prefix}-date-time-popover`)} ${unsafeCSS(
    `.${Prefix}-popover-container`
  )} {
    width: 450px;
  }

  ${scrollbarStyle(`${Prefix}-mention-popover .group`)}
`;
