/** @alighasami for check merge **/
import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';

import {
  EdgelessEraserDarkIcon,
  EdgelessEraserLightIcon,
  EraserTablerIcon
} from '@blocksuite/affine-components/icons';
import { ThemeProvider } from "@blocksuite/affine-shared/services";
import { css, html, LitElement } from 'lit';

import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';

export class EdgelessEraserToolButton extends EdgelessToolbarToolMixin(
  LitElement
) {
  static override styles = css`
    :host {
      //height: 100%;
      display: flex;
      overflow-y: hidden;
    }
    .eraser-button {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: relative;
      width: 49px;
      height: 64px;
    }
    #edgeless-eraser-icon {
      transition: transform 0.3s ease-in-out;
      transform: translateY(8px);
    }
    .eraser-button:hover #edgeless-eraser-icon,
    .eraser-button.active #edgeless-eraser-icon {
      transform: translateY(0);
    }
  `;

  override enableActiveBackground = true;

  override type: GfxToolsFullOptionValue['type'] = 'eraser';

  private handleEraser() {
    //if (this.tryDisposePopper()) return;
    //if (this.tryDisposePopper()) return;
   // this.setEdgelessTool({ type: 'default' });

    if (this.toolbar.activePopper) {
      // click manually always closes the popper
      this.toolbar.activePopper.dispose();
    }

    this.setEdgelessTool({ type: 'eraser' })

    //if (this.tryDisposePopper()) return;
    //this.setEdgelessTool({ type: 'default' });
    //this.createPopper('edgeless-mindmap-menu', this);
    /*const menu = this.createPopper('edgeless-mindmap-menu', this);
    Object.assign(menu.element, {
      edgeless: this.edgeless,
      onActiveStyleChange: (style: MindmapStyle) => {
        this.edgeless.std.get(EditPropsStore).recordLastProps('mindmap', {
          style,
        });
      },
      onImportMindMap: (bound: Bound) => {
        return importMindmap(bound).then(mindmap => {
          const id = this.edgeless.service.addElement('mindmap', {
            children: mindmap,
            layoutType: mindmap?.layoutType === 'left' ? 1 : 0,
          });
          const element = this.edgeless.service.getElementById(
            id
          ) as MindmapElementModel;

          this.tryDisposePopper();
          this.setEdgelessTool({ type: 'default' });
          this.edgeless.gfx.selection.set({
            elements: [element.tree.id],
            editing: false,
          });
        });
      },
    });*/


  }

  override firstUpdated() {
    this.disposables.add(
      this.edgeless.bindHotKey(
        {
          Escape: () => {
            if (this.edgelessTool.type === 'eraser') {
              this.setEdgelessTool({ type: 'default' });
            }
          },
        },
        { global: true }
      )
    );
  }


  override render() {
    const type = this.edgelessTool?.type;
    const appTheme = this.edgeless.std.get(ThemeProvider).app$.value;
    const icon =
      appTheme === 'dark' ? EdgelessEraserDarkIcon : EdgelessEraserLightIcon;

    return html`
      <edgeless-tool-icon-button
        class="edgeless-eraser-button"
        .tooltip=${getTooltipWithShortcut('Eraser', 'E')}
        .tooltipOffset=${4}
        .iconContainerPadding=${6}
        .active=${type === 'eraser'}
        @click=${() => this.handleEraser()}
      >
        ${EraserTablerIcon}
        <!-- <div class="eraser-button">${icon}</div> -->
      </edgeless-toolbar-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-eraser-tool-button': EdgelessEraserToolButton;
  }
}
