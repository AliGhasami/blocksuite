import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { SelectIcon } from '../../../../../_common/icons/index.js';
import type { EdgelessTool } from '../../../types.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { QuickToolMixin } from '../mixins/quick-tool.mixin.js';

@customElement('edgeless-default-tool-button')
export class EdgelessDefaultToolButton extends QuickToolMixin(LitElement) {
  static override styles = css`
    .current-icon {
      transition: 100ms;
      width: 24px;
      height: 24px;
    }
    .current-icon > svg {
      display: block;
    }
    .arrow-up-icon {
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 0;
      color: var(--affine-icon-secondary);
    }
    .active .arrow-up-icon {
      color: inherit;
    }
  `;

  override type: EdgelessTool['type'][] = ['default'];

  @query('.current-icon')
  accessor currentIcon!: HTMLInputElement;

  private _changeTool() {
    this.setEdgelessTool({ type: 'default' });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!localStorage.defaultTool) {
      localStorage.defaultTool = 'default';
    }
    this.disposables.add(
      this.edgeless.slots.edgelessToolUpdated.on(({ type }) => {
        if (type === 'default') {
          localStorage.defaultTool = type;
        }
      })
    );
  }

  override render() {
    const type = this.edgelessTool?.type;
    const { active } = this;
    return html`
      <edgeless-tool-icon-button
        class="edgeless-default-button ${type} ${active ? 'active' : ''}"
        .tooltip=${getTooltipWithShortcut('Select', 'V')}
        .tooltipOffset=${17}
        .active=${active}
        .iconContainerPadding=${6}
        @click=${this._changeTool}
      >
        <span class="current-icon"> ${SelectIcon} </span>
      </edgeless-tool-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-default-tool-button': EdgelessDefaultToolButton;
  }
}
