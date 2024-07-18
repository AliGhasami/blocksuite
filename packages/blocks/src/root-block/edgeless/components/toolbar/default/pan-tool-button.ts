import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { HandIcon } from '../../../../../_common/icons/index.js';
import type { EdgelessTool } from '../../../types.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { QuickToolMixin } from '../mixins/quick-tool.mixin.js';

@customElement('edgeless-pan-tool-button')
export class EdgelessPanToolButton extends QuickToolMixin(LitElement) {
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

  override type: EdgelessTool['type'][] = ['pan'];

  @query('.current-icon')
  accessor currentIcon!: HTMLInputElement;

  private _changeTool() {
    this.setEdgelessTool({ type: 'pan', panning: false });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!localStorage.defaultTool) {
      localStorage.defaultTool = 'default';
    }
    this.disposables.add(
      this.edgeless.slots.edgelessToolUpdated.on(({ type }) => {
        if (type === 'pan') {
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
        .tooltip=${getTooltipWithShortcut('Hand', 'H')}
        .tooltipOffset=${17}
        .active=${active}
        .iconContainerPadding=${6}
        @click=${this._changeTool}
      >
        <span class="current-icon"> ${HandIcon} </span>
      </edgeless-tool-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-pan-tool-button': EdgelessPanToolButton;
  }
}
