import { WithDisposable } from '@blocksuite/block-std';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  BackTablerIcon,
  RedoTablerIcon,
} from '../../../_common/icons/edgeless.js';
import { stopPropagation } from '../../../_common/utils/event.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { EdgelessTool } from '../../edgeless/types.js';

@customElement('edgeless-ur-toolbar')
export class EdgelessURToolbar extends WithDisposable(LitElement) {
  get edgelessTool() {
    return this.edgeless.edgelessTool;
  }

  get edgelessService() {
    return this.edgeless.service;
  }

  @state()
  private accessor _canUndo = false;

  @state()
  private accessor _canRedo = false;

  get zoom() {
    return this.viewport.zoom;
  }

  get viewport() {
    return this.edgelessService.viewport;
  }

  get locked() {
    return this.edgelessService.locked;
  }

  static override styles = css`
    :host {
      display: flex;
      background-color: var(--affine-background-overlay-panel-color);
      border-radius: 8px;
      border: 1px solid var(--affine-border-color);
    }

    .edgeless-zoom-toolbar-container {
      display: flex;
      align-items: center;
      background: transparent;
      border-radius: 8px;
      fill: currentcolor;
      padding: 4px;
    }

    .edgeless-zoom-toolbar-container.horizantal {
      flex-direction: row;
    }

    .edgeless-zoom-toolbar-container.vertical {
      flex-direction: column;
      width: 40px;
      background-color: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
      border: 1px solid var(--affine-border-color);
      border-radius: 8px;
    }

    .edgeless-zoom-toolbar-container[level='second'] {
      position: absolute;
      bottom: 8px;
      transform: translateY(-100%);
    }

    .edgeless-zoom-toolbar-container[hidden] {
      display: none;
    }

    .zoom-percent {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 32px;
      border: none;
      box-sizing: border-box;
      padding: 4px;
      color: var(--affine-icon-color);
      background-color: transparent;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    }

    .zoom-percent:hover {
      color: var(--affine-primary-color);
      background-color: var(--affine-hover-color);
    }

    .zoom-percent[disabled] {
      pointer-events: none;
      cursor: not-allowed;
      color: var(--affine-text-disable-color);
    }
  `;

  @property({ attribute: false })
  accessor layout: 'horizontal' | 'vertical' = 'horizontal';

  @property({ attribute: false })
  accessor edgeless: EdgelessRootBlockComponent;

  constructor(edgeless: EdgelessRootBlockComponent) {
    super();
    this.edgeless = edgeless;
  }

  private _isVerticalBar() {
    return this.layout === 'vertical';
  }

  setEdgelessTool = (edgelessTool: EdgelessTool) => {
    this.edgeless.tools.setEdgelessTool(edgelessTool);
  };

  override firstUpdated() {
    const { disposables } = this;
    disposables.add(
      this.edgeless.service.viewport.viewportUpdated.on(() =>
        this.requestUpdate()
      )
    );
    disposables.add(
      this.edgeless.slots.edgelessToolUpdated.on(() => this.requestUpdate())
    );
    disposables.add(
      this.edgeless.slots.readonlyUpdated.on(() => {
        this.requestUpdate();
      })
    );

    this.edgeless.doc.slots.historyUpdated.on(() => {
      this._canUndo = this.edgeless.doc.canUndo;
      this._canRedo = this.edgeless.doc.canRedo;
    });
  }

  override render() {
    if (this.edgeless.doc.readonly) {
      return nothing;
    }

    const formattedZoom = `${Math.round(this.zoom * 100)}%`;
    const classes = `edgeless-zoom-toolbar-container ${this.layout}`;
    const locked = this.locked;
    return html`
      <div
        class=${classes}
        @dblclick=${stopPropagation}
        @mousedown=${stopPropagation}
        @mouseup=${stopPropagation}
        @pointerdown=${stopPropagation}
      >
        <edgeless-tool-icon-button
          .tooltip=${'Undo'}
          .tipPosition="top"
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.edgelessService.doc.undo()}
          .iconContainerPadding=${4}
          .disabled=${!this._canUndo}
        >
          ${BackTablerIcon}
        </edgeless-tool-icon-button>
        <edgeless-tool-icon-button
          .tooltip=${'Redo'}
          .tipPosition="top"
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.edgelessService.doc.redo()}
          .iconContainerPadding=${4}
          .disabled=${!this._canRedo}
        >
          ${RedoTablerIcon}
        </edgeless-tool-icon-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-ur-toolbar': EdgelessURToolbar;
  }
}
