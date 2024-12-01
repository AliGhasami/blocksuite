/** @alighasami for check merge **/
import {
  ArrowUpIcon,
  ShapeTablerIcon
} from '@blocksuite/affine-components/icons';
import { type ShapeName, ShapeType } from '@blocksuite/affine-model';
import { SignalWatcher } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { styleMap } from "lit/directives/style-map.js";

import type { DraggableShape } from './utils.js';

import { ShapeTool } from '../../../gfx-tool/shape-tool.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';

export class EdgelessShapeToolButton extends EdgelessToolbarToolMixin(
  SignalWatcher(LitElement)
) {
  static override styles = css`
    :host {
      display: block;
      //width: 100%;
      //height: 100%;
    }
    edgeless-toolbar-button,
    .shapes {
      //width: 100%;
      //height: 64px;
    }
    .arrow-up-icon {
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 0;
    }
  `;

  private _handleShapeClick = (shape: DraggableShape) => {
    this.setEdgelessTool(this.type, {
      shapeName: shape.name,
    });
    if (!this.popper) this._toggleMenu();
  };

  private _handleWrapperClick = () => {
    if (this.tryDisposePopper()) return;

    this.setEdgelessTool(this.type, {
      shapeName: ShapeType.Rect,
    });
    if (!this.popper) this._toggleMenu();
  };

  override type = 'shape' as const;

  private _toggleMenu() {
    this.createPopper('edgeless-shape-menu', this, {
      setProps: ele => {
        ele.edgeless = this.edgeless;
        ele.onChange = (shapeName: ShapeName) => {
          this.setEdgelessTool(this.type, {
            shapeName,
          });
          this._updateOverlay();
        };
      },
    });
  }

  private _updateOverlay() {
    const controller = this.edgeless.gfx.tool.currentTool$.peek();
    if (controller instanceof ShapeTool) {
      controller.createOverlay();
    }
  }

  override render() {
    const { active } = this;
    const arrowColor = active ? 'currentColor' : 'var(--affine-icon-secondary)';

    return html`
      <edgeless-tool-icon-button
        class="edgeless-shape-button"
        .tooltip=${this.popper ? '' : getTooltipWithShortcut('Shape', 'S')}
        .tooltipOffset=${5}
        .iconContainerPadding=${6}
        .active=${active}
        .onShapeClick=${this._handleShapeClick}
        @click=${this._toggleMenu}
      >
        <!-- <edgeless-toolbar-shape-draggable
          .edgeless=${this.edgeless}
          .toolbarContainer=${this.toolbarContainer}
          class="shapes"
          @click=${this._handleWrapperClick}
          .onShapeClick=${this._handleShapeClick}
        >
        </edgeless-toolbar-shape-draggable> -->
        ${ShapeTablerIcon}
        <span class="arrow-up-icon" style=${styleMap({ color: arrowColor })}>
          ${ArrowUpIcon}
        </span>
        
      </edgeless-tool-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-shape-tool-button': EdgelessShapeToolButton;
  }
}
