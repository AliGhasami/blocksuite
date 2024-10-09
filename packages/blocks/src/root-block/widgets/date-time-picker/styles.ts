import { Prefix } from '@blocksuite/global/env';
//import { baseTheme } from '@toeverything/theme';
import { css } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';
//import { popoverStyle } from '../../../_common/style/popover-style.js';

export const styles = css`
  :host {
    position: absolute;
  }

  ${scrollbarStyle(`${Prefix}-mention-popover .group`)}
`;
