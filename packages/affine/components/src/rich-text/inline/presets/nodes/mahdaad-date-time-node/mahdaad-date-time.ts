import type { BlockComponent } from '@blocksuite/block-std';

import { ShadowlessElement } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@blocksuite/inline';
import dayjs from 'dayjs';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { AffineTextAttributes } from '../../affine-inline-specs.js';

import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { defaultDateFormat, defaultTimeFormat } from './config.js';

@customElement('affine-date-time')
export class AffineDateTime extends ShadowlessElement {
  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  override render() {
    //console.log('this is date time', this.delta.insert);
    return html`<span>
      <mahdaad-date-time
        class="${Prefix}-date-time" 
        data-event-id="${this.id}"
create-status="${this.delta?.attributes?.date?.createStatus ?? 2}"
        @update=${this.selfUpdate}
        @close=""
        readonly="${this.blockElement.doc.readonly}"
        date="${this.delta.attributes?.date?.date}"
        time="${this.delta.attributes?.date?.time}"
        meta="${this.delta.attributes?.date?.meta}"
      >
      </mahdaad-date-time>
      <v-text .str=${this.delta.insert}>${ZERO_WIDTH_NON_JOINER}</v-text>
    </span>`;
  }

  selfUpdate(event){
    const data = event?.detail;
    if (data && data.key && data.hasOwnProperty('value')) {
      const format = this.inlineEditor.getFormat(this.selfInlineRange);
      if (format?.date?.id){
        const date = JSON.parse(JSON.stringify(format.date));
        const {value, key} = data
        if (value === undefined && date[key] !== undefined)
          delete date[key];
        else date[key] = value
        this.inlineEditor.formatText(this.selfInlineRange, {
          date,
          ignoreSyncInlineRange: true,
        });
      }
    }
  }

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockComponent>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get date() {
    return dayjs(this.delta.attributes?.date?.date).format(defaultDateFormat);
  }

  get dateTime() {
    const dateTime = this.delta.attributes?.date?.date;
    if (!dateTime) {
      return '';
    }
    let tempStr = dayjs(this.delta.attributes?.date?.date).format(
      defaultDateFormat
    );
    const time = this.delta.attributes?.date?.time;
    if (time) {
      tempStr +=
        ' ' +
        dayjs(`${this.delta.attributes?.date?.date} ${time}`).format(
          defaultTimeFormat
        );
    }
    return tempStr;
  }

  get id() {
    return this.delta.attributes?.date?.id ?? null;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<AffineTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor.getInlineRangeFromElement(this);
    assertExists(selfInlineRange);
    return selfInlineRange;
  }

  get std() {
    const std = this.blockElement.std;
    assertExists(std);
    return std;
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-date-time': AffineDateTime;
  }
}
