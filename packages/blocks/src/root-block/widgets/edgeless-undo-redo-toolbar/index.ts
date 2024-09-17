import { WidgetComponent } from '@blocksuite/block-std';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { RootBlockModel } from '../../root-model.js';

import './ur-bar-toggle-button.js';
import './ur-toolbar.js';

export const AFFINE_EDGELESS_UR_TOOLBAR_WIDGET =
  'affine-edgeless-ur-toolbar-widget';

@customElement(AFFINE_EDGELESS_UR_TOOLBAR_WIDGET)
export class AffineEdgelessURToolbarWidget extends WidgetComponent<
  RootBlockModel,
  EdgelessRootBlockComponent
> {
  static override styles = css`
    :host {
      position: absolute;
      bottom: 70px;
      left: 12px;
      z-index: var(--affine-z-index-popover);
      display: flex;
      justify-content: center;
      -webkit-user-select: none;
      user-select: none;
    }

    @container viewport (width <= 1200px) {
      edgeless-zoom-toolbar {
        display: none;
      }
    }

    @container viewport (width > 1200px) {
      zoom-bar-toggle-button {
        display: none;
      }
    }
  `;

  override firstUpdated() {
    //todo check ali ghasami
    /*const {
      disposables,
      edgeless: { slots },
    } = this;
    disposables.add(
      slots.edgelessToolUpdated.on(tool => {
        if (tool.type !== 'frameNavigator') {
          this._hide = false;
        }
        this.requestUpdate();
      })
    );
    disposables.add(
      slots.navigatorSettingUpdated.on(({ hideToolbar }) => {
        if (hideToolbar !== undefined) {
          this._hide = hideToolbar;
        }
      })
    );*/
  }

  override render() {
    if (this._hide || !this.edgeless) {
      return nothing;
    }

    return html`
      <edgeless-ur-toolbar .edgeless=${this.edgeless}></edgeless-ur-toolbar>
    `;
  }

  get edgeless() {
    return this.block;
  }

  @state()
  private accessor _hide = false;
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_EDGELESS_UR_TOOLBAR_WIDGET]: AffineEdgelessURToolbarWidget;
  }
}