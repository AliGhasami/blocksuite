import { type EditorHost, ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';
import type { MentionOptions } from './index.js';

import '../../../_common/components/button.js';
import { createKeydownObserver } from '../../../_common/components/utils.js';
import { styles } from './styles.js';

//ShadowlessElement
@customElement('affine-date-time-popover')
export class DateTimePopover extends WithDisposable(ShadowlessElement) {
  static override styles = styles;

  constructor(
    private editorHost: EditorHost,
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController(),
    private index?: null | number
  ) {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    const inlineEditor = this.inlineEditor;
    assertExists(inlineEditor, 'RichText InlineEditor not found');

    createKeydownObserver({
      target: inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        this.abortController.abort();
        next();
      },
      onInput: () => this.abortController.abort(),
      onDelete: () => {},
      onAbort: () => this.abortController.abort(),
    });

    this._disposables.addFromEvent(this, 'mousedown', e => {
      e.stopPropagation();
      e.preventDefault();
    });
  }

  override render() {
    const style = this._position
      ? styleMap({
          transform: `translate(${this._position.x}, ${this._position.y})`,
        })
      : styleMap({
          visibility: 'hidden',
        });

    return html`<div>
      <div
        class="${Prefix}-popover ${Prefix}-date-time-popover"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <mahdaad-date-picker
            @change=${event => {
              if (!this.index) return;
              const inlineRange = { index: this.index - 1, length: 1 };
              const temp = {
                date: event.detail[0],
                time: event.detail[1],
                meta: event.detail[2],
              };

              const format = this.inlineEditor.getFormat(inlineRange);
              if (format && format.date && format.date.id) {
                Object.assign(temp, { id: format.date.id });
              }
              // TODO return if has bug
              this.inlineEditor.formatText(inlineRange, {
                date: temp,
                ignoreSyncInlineRange: true,
              });
            }}
            @close="${() => {
              this.abortController.abort();
              if (this.index) return;
              this.inlineEditor.focusIndex(this.index as number);
            }}"
          ></mahdaad-date-picker>
        </div>
      </div>
    </div>`;
  }

  updatePosition(position: { height: number; x: string; y: string }) {
    this._position = position;
  }

  @state()
  private accessor _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  @query(`.${Prefix}-date-time-popover`)
  accessor DateTimePopOverElement: Element | null = null;

  @property({ attribute: false })
  accessor options!: MentionOptions;

  @property({ attribute: false })
  accessor triggerKey!: string;
}
