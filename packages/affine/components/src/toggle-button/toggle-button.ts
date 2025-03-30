//ali ghasami-check version 3
//ali ghasami-check version 3
//ali ghasami-check version 3
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/lit';
import { ToggleDownIcon, ToggleRightIcon } from '@blocksuite/icons/lit';
import { css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit-html';

import { toggleDown, toggleRight } from '../icons/list.js';

export const TOGGLE_BUTTON_PARENT_CLASS = 'blocksuite-toggle-button-parent';

export class ToggleButton extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .toggle-icon {
      display: flex;
      align-items: start;
      margin-top: 0.45em;
      align-items: start;
      justify-content: start;
      position: absolute;
      /*left: 0;*/
      inset-inline-start: 0;
      width: 16px;
      height: 16px;
      top: calc((1em - 16px) / 2 + 5px);
      left: 0;
      transform: translateX(-100%);
      border-radius: 4px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    
    .icon-right{
      transform: translateX(100%) rotate(-180deg);
    }
    
    .icon-down{
      transform: translateX(100%);
    }
    
    
    .toggle-icon:hover {
      background: var(--affine-hover-color);
    }

    .toggle-icon[data-collapsed='true'] {
      opacity: 1;
    }

    .${unsafeCSS(TOGGLE_BUTTON_PARENT_CLASS)}{
      //align-items: center;
    }

    .${unsafeCSS(TOGGLE_BUTTON_PARENT_CLASS)}:hover .toggle-icon {
      opacity: 1;
    }

    .with-drag-handle .toggle-icon {
      opacity: 1;
    }
    .with-drag-handle .affine-block-children-container .toggle-icon {
      opacity: 0;
    }
  `;

  override render() {
    const toggleDownTemplate = html`
      <div
        contenteditable="false"
        class="toggle-icon ${this.direction=='rtl'? 'icon-down' : ''}"
        @click=${() => this.updateCollapsed(!this.collapsed)}
      >
        ${ToggleDownIcon({
          width: '16px',
          height: '16px',
          style: 'color: #77757D',
        })}
      </div>
    `;

    const toggleRightTemplate = html`
      <div
        contenteditable="false"
        class="toggle-icon ${this.direction=='rtl'? 'icon-right' : ''}"
        data-collapsed=${this.collapsed}
        @click=${() => this.updateCollapsed(!this.collapsed)}
      >
        ${ToggleRightIcon({
          width: '16px',
          height: '16px',
          style: 'color: #77757D',
        })}
      </div>
    `;

    return this.collapsed ? toggleRightTemplate : toggleDownTemplate;
  }

  @property({ attribute: false })
  accessor collapsed!: boolean;

  @property({ attribute: false })
  accessor direction!: string | null;

  @property({ attribute: false })
  accessor updateCollapsed!: (collapsed: boolean) => void;

}

declare global {
  interface HTMLElementTagNameMap {
    'blocksuite-toggle-button': ToggleButton;
  }
}
