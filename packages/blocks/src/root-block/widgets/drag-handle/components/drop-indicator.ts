import type { Rect } from '@blocksuite/global/utils';

import { ShadowlessElement } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
/** convert  from  LitElement to ShadowlessElement for mahdaad */
//LitElement
export class DropIndicator extends ShadowlessElement {
  static override styles = css`
    .affine-drop-indicator{
      position: absolute;
      top: 0;
      left: 0;
      //background: var(--affine-primary-color);
      transition-property: height, transform;
      transition-duration: 100ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 0s;
      transform-origin: 0 0;
      pointer-events: none;
      z-index: 2;
    }
  `;

  override render() {
    if (!this.rect && !this.rectVertical) {
      return null;
    }
    console.log("this is rect",this.rect,this.rectVertical);

    let style =styleMap({display:'none'})
    let styleVertical =styleMap({display:'none'})
    //const styleVertical=styleMap({})
    if(this.rect) {
      const { left, top, width, height } = this.rect;
      style = styleMap({
        width: `${width}px`,
       // height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
        //'background-color':'green'
      });
    }
    if(this.rectVertical) {
      //console.log("this.rectVertical",this.rectVertical);
      const { left, top, width, height } = this.rectVertical;
      styleVertical = styleMap({
        width: `${height}px`,
        height: `30px`,
        top: `${top}px`,
        left: `${width+30}px`,
        //'background-color':'yellow'
      });
    }
    return html`<div class="affine-drop-indicator" style=${style}>
      <span class="circle-indicator"></span>
    </div>
        <div class="affine-drop-indicator vertical" style=${styleVertical}>
          <span class="circle-indicator vertical"></span>
        </div>
    `;
  }

  @property({ attribute: false })
  accessor rect: Rect | null = null;

  @property({ attribute: false })
  accessor rectVertical: Rect | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-drop-indicator': DropIndicator;
  }
}
