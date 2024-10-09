import { WithDisposable } from '@blocksuite/block-std';
import { offset } from '@floating-ui/dom';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';

import { createLitPortal } from '../../../_common/components/portal.js';
import { MoreIcon } from '../../../_common/icons/edgeless.js';
import { stopPropagation } from '../../../_common/utils/event.js';

@customElement('ur-bar-toggle-button')
export class URBarToggleButton extends WithDisposable(LitElement) {
  private _abortController: AbortController | null = null;

  static override styles = css`
    :host {
      display: flex;
    }
    .toggle-button {
      display: flex;
      position: relative;
    }
    edgeless-zoom-toolbar {
      position: absolute;
      bottom: initial;
    }
  `;

  private _closeZoomMenu() {
    if (this._abortController && !this._abortController.signal.aborted) {
      this._abortController.abort();
      this._abortController = null;
      this._showPopper = false;
    }
  }

  private _toggleZoomMenu() {
    if (this._abortController && !this._abortController.signal.aborted) {
      this._closeZoomMenu();
      return;
    }

    this._abortController = new AbortController();
    this._abortController.signal.addEventListener('abort', () => {
      this._showPopper = false;
    });
    createLitPortal({
      template: html`<edgeless-ur-toolbar
        .edgeless=${this.edgeless}
        .layout=${'vertical'}
      ></edgeless-ur-toolbar>`,
      container: this._toggleButton,
      computePosition: {
        referenceElement: this._toggleButton,
        placement: 'top',
        middleware: [offset(4)],
        autoUpdate: true,
      },
      abortController: this._abortController,
      closeOnClickAway: true,
    });
    this._showPopper = true;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._closeZoomMenu();
  }

  override firstUpdated() {
    const { disposables } = this;
    disposables.add(
      this.edgeless.slots.readonlyUpdated.on(() => {
        this.requestUpdate();
      })
    );
  }

  override render() {
    if (this.edgeless.doc.readonly) {
      return nothing;
    }

    return html`
      <div class="toggle-button" @pointerdown=${stopPropagation}>
        <edgeless-tool-icon-button
          .tooltip=${'Toggle Undo Redo Tool Bar'}
          .tipPosition=${'top'}
          .active=${this._showPopper}
          .arrow=${false}
          .activeMode=${'background'}
          .iconContainerPadding=${6}
          @click=${() => this._toggleZoomMenu()}
        >
          ${MoreIcon}
        </edgeless-tool-icon-button>
      </div>
    `;
  }

  @state()
  private accessor _showPopper = false;

  @query('.toggle-button')
  private accessor _toggleButton!: HTMLElement;

  @property({ attribute: false })
  accessor edgeless!: EdgelessRootBlockComponent;
}

declare global {
  interface HTMLElementTagNameMap {
    'zoom-bar-toggle-button': ZoomBarToggleButton;
  }
}