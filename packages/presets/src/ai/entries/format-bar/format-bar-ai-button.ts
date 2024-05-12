import { type EditorHost, WithDisposable } from '@blocksuite/block-std';
import {
  type AIItemGroupConfig,
  AIStarIcon,
  createButtonPopper,
  EdgelessRootService,
} from '@blocksuite/blocks';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { getRootService } from '../../utils/selection-utils.js';

@customElement('format-bar-ai-button')
export class FormatBarAIButton extends WithDisposable(LitElement) {
  static override styles = css`
    .ask-ai-icon-button {
      color: var(--affine-brand-color);
      font-weight: 500;
      font-size: var(--affine-font-sm);
      position: relative;
    }

    .ask-ai-icon-button span {
      line-height: 22px;
      padding-left: 4px;
    }

    .ask-ai-panel {
      display: none;
      box-sizing: border-box;
      position: absolute;
      padding: 8px;
      min-width: 330px;
      max-height: 374px;
      overflow-y: auto;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
      border-radius: 8px;
      z-index: var(--affine-z-index-popover);
    }

    .ask-ai-panel[data-show] {
      display: block;
    }

    .ask-ai-icon-button svg {
      color: var(--affine-brand-color);
    }
    .ask-ai-panel::-webkit-scrollbar {
      width: 5px;
      max-height: 100px;
    }
    .ask-ai-panel::-webkit-scrollbar-thumb {
      border-radius: 20px;
    }
    .ask-ai-panel:hover::-webkit-scrollbar-thumb {
      background-color: var(--affine-black-30);
    }
    .ask-ai-panel::-webkit-scrollbar-corner {
      display: none;
    }
  `;

  @property({ attribute: false })
  host!: EditorHost;

  @property({ attribute: false })
  actionGroups!: AIItemGroupConfig[];

  @query('.ask-ai-button')
  private _askAIButton!: HTMLDivElement;
  @query('.ask-ai-panel')
  private _askAIPanel!: HTMLDivElement;
  private _askAIPopper: ReturnType<typeof createButtonPopper> | null = null;

  override firstUpdated() {
    this._askAIPopper = createButtonPopper(
      this._askAIButton,
      this._askAIPanel,
      ({ display }) => {
        this._edgeless?.tool.setEdgelessTool({
          type: display === 'show' ? 'copilot' : 'default',
        });
      },
      10,
      120,
      () => {
        if (this._edgeless) {
          const { left: x, top: y, width, height } = this._edgeless.viewport;
          return { x, y, width, height: height - 100 };
        }
        return;
      }
    );
    this.disposables.add(this._askAIPopper);
    this.disposables.add(() => {
      this._edgeless?.tool.setEdgelessTool({ type: 'default' });
    });
  }

  get _edgeless() {
    const rootService = getRootService(this.host);
    if (rootService instanceof EdgelessRootService) {
      return rootService;
    }
    return null;
  }

  get _actionGroups() {
    const filteredConfig = this.actionGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.showWhen
            ? item.showWhen(
                this.host.command.chain(),
                this._edgeless ? 'edgeless' : 'page',
                this.host
              )
            : true
        ),
      }))
      .filter(group => group.items.length > 0);
    return filteredConfig;
  }

  override render() {
    return html`<div class="ask-ai-button">
      <icon-button
        class="ask-ai-icon-button"
        width="75px"
        height="32px"
        @click=${() => this._askAIPopper?.toggle()}
      >
        ${AIStarIcon} <span>Ask AI</span></icon-button
      >
      <div class="ask-ai-panel">
        <ai-item-list
          .host=${this.host}
          .groups=${this._actionGroups}
        ></ai-item-list>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'format-bar-ai-button': FormatBarAIButton;
  }
}
