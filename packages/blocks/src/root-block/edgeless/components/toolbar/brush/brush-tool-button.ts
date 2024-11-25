/** @alighasami for check merge **/
import {
  ArrowUpIcon,
  PenTablerIcon,
} from '../../../../../_common/icons/edgeless.js';
import { LineWidth } from '../../../../../_common/utils/index.js';
import '../../buttons/toolbar-button.js';
import { DEFAULT_BRUSH_COLOR } from '../../panel/color-panel.js';
import { getTooltipWithShortcut } from '../../utils.js';
  EdgelessPenDarkIcon,
  EdgelessPenLightIcon,
} from '@blocksuite/affine-components/icons';
import {
  EditPropsStore,
  ThemeProvider,
} from '@blocksuite/affine-shared/services';
import { SignalWatcher } from '@blocksuite/global/utils';
import { computed } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';

export class EdgelessBrushToolButton extends EdgelessToolbarToolMixin(
  SignalWatcher(LitElement)
) {
  static override styles = css`
    :host {
      display: flex;
      //height: 100%;
      overflow-y: hidden;
    }
    .arrow-up-icon {
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 0;
    }

    //.edgeless-brush-button {
    //  height: 100%;
    //}
    //.pen-wrapper {
    //  width: 35px;
    //  //height: 64px;
    //  display: flex;
    //  align-items: flex-end;
    //  justify-content: center;
    //}
    //#edgeless-pen-icon {
    //  transition: transform 0.3s ease-in-out;
    //  transform: translateY(8px);
    //}
    //.edgeless-brush-button:hover #edgeless-pen-icon,
    //.pen-wrapper.active #edgeless-pen-icon {
    //  transform: translateY(0);
    //}
  `;

  private _color$ = computed(() => {
    const theme = this.edgeless.std.get(ThemeProvider).theme$.value;
    return this.edgeless.std
      .get(ThemeProvider)
      .generateColorProperty(
        this.edgeless.std.get(EditPropsStore).lastProps$.value.brush.color,
        undefined,
        theme
      );
  });

  override enableActiveBackground = true;

  override type = 'brush' as const;

  private _toggleBrushMenu() {
    if (this.tryDisposePopper()) return;
    !this.active && this.setEdgelessTool(this.type);
    const menu = this.createPopper('edgeless-brush-menu', this);
    Object.assign(menu.element, {
      edgeless: this.edgeless,
      onChange: (props: Record<string, unknown>) => {
        this.edgeless.std.get(EditPropsStore).recordLastProps('brush', props);
        this.setEdgelessTool('brush');
      },
    });
  }

  override render() {
    const { active, theme } = this;
    // const icon = theme === 'dark' ? EdgelessPenDarkIcon : EdgelessPenLightIcon;
    const arrowColor = active ? 'currentColor' : 'var(--affine-icon-secondary)';
    const { active } = this;
    const appTheme = this.edgeless.std.get(ThemeProvider).app$.value;
    const icon =
      appTheme === 'dark' ? EdgelessPenDarkIcon : EdgelessPenLightIcon;
    const color = this._color$.value;

    return html`
      <edgeless-tool-icon-button
        class="edgeless-brush--button"
        .tooltip=${this.popper ? '' : getTooltipWithShortcut('Pen', 'P')}
        .tooltipOffset=${4}
        .active=${active}
        .iconContainerPadding=${6}
        @click=${() => {
          this._toggleBrushMenu();
        }}
        .withHover=${true}
        @click=${() => this._toggleBrushMenu()}
      >
        ${PenTablerIcon}
        <span class="arrow-up-icon" style=${styleMap({ color: arrowColor })}>
          ${ArrowUpIcon}
        </span>
      </edgeless-tool-icon-button>
        <div style=${styleMap({ color })} class="pen-wrapper">${icon}</div>
      </edgeless-toolbar-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-brush-tool-button': EdgelessBrushToolButton;
  }
}
