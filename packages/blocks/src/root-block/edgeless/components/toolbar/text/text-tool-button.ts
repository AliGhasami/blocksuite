import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { LastProps } from '../../../../../surface-block/managers/edit-session.js';

import { TablerTextIcon } from '../../../../../_common/icons/index.js';
import '../../buttons/toolbar-button.js';
import { GET_DEFAULT_TEXT_COLOR } from '../../panel/color-panel.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import './text-menu.js';

/**
 * @deprecated not used
 */
@customElement('edgeless-text-tool-button')
export class EdgelessTextToolButton extends EdgelessToolbarToolMixin(
  LitElement
) {
  static override styles = css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .edgeless-text-button {
      position: relative;
      //width: 54px;
      //height: 44px;
      overflow-y: hidden;
    }
  `;

  override type = 'text' as const;

  private _toggleTextMenu() {
    if (this.popper) {
      this.requestUpdate();
    } else {
      this.edgeless.tools.setEdgelessTool({
        type: this.type,
      });
    }
  }

  override render() {
    const { active } = this;

    return html`
      <edgeless-tool-icon-button
        class="edgeless-text-button"
        .tooltip=${this.popper ? '' : getTooltipWithShortcut('Text', 'T')}
        .active=${active}
        .tooltipOffset=${4}
        .iconContainerPadding=${6}
        .activeMode=${'background'}
        @click=${() => {
          this._toggleTextMenu();
        }}
      >
        <div class="edgeless-text-button">${TablerTextIcon}</div>
      </edgeless-tool-icon-button>
    `;
  }

  @state()
  accessor states: Partial<LastProps['text']> = {
    color: GET_DEFAULT_TEXT_COLOR(),
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-text-tool-button': EdgelessTextToolButton;
  }
}
