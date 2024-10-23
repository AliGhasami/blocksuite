import { type DeltaInsert, type InlineRange, ZERO_WIDTH_SPACE } from '@blocksuite/inline';

import { type EditorHost, ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/block-std';
import { Prefix } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { computePosition, inline, offset, shift } from '@floating-ui/dom';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { AffineInlineEditor, AffineTextAttributes } from '../../../_common/inline/presets/affine-inline-specs.js';
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
    const style = !this.type
      ? this._position
        ? styleMap({
            transform: `translate(${this._position.x}, ${this._position.y})`,
          })
        : styleMap({
            visibility: 'hidden',
          })
      : undefined;
    // TODO check open on create mode
    return html`<div>
      <div
        class="${Prefix}-popover ${Prefix}-date-time-popover"
        style="${style}"
      >
        <div class="${Prefix}-popover-container">
          <mahdaad-date-picker
            date="${this.delta?.attributes?.date?.date}"
            time="${this.delta?.attributes?.date?.time}"
            meta="${this.delta?.attributes?.date?.meta}"
            @change=${(event: any) => {
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

  override updated() {
    if (this.type) {
      assertExists(this.DateTimePopOverElement);
      const range = this.inlineEditor.toDomRange(this.targetInlineRange);
      assertExists(range);

      // if (this.type) {
      //   const domRects = range.getClientRects();
      //
      //   Object.values(domRects).forEach(domRect => {
      //     const mockSelection = document.createElement('div');
      //     mockSelection.classList.add('mock-selection');
      //     mockSelection.style.left = `${domRect.left}px`;
      //     mockSelection.style.top = `${domRect.top}px`;
      //     mockSelection.style.width = `${domRect.width}px`;
      //     mockSelection.style.height = `${domRect.height}px`;
      //
      //     assertExists(this.mockSelectionContainer);
      //     this.mockSelectionContainer.append(mockSelection);
      //   });
      // }

      const visualElement = {
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      };
      computePosition(visualElement, this.DateTimePopOverElement, {
        middleware: [
          offset(10),
          inline(),
          shift({
            padding: 6,
          }),
        ],
      })
        .then(({ x, y }) => {
          const popupContainer = this.DateTimePopOverElement;
          if (!popupContainer) return;
          popupContainer.style.position = 'absolute';
          popupContainer.style.zIndex = '9999999999999999999';
          popupContainer.style.left = `${x}px`;
          popupContainer.style.top = `${y}px`;
        })
        .catch(console.error);
    }
  }

  @state()
  private accessor _position: {
    height: number;
    x: string;
    y: string;
  } | null = null;

  @query(`.${Prefix}-date-time-popover`)
  accessor DateTimePopOverElement!: HTMLDivElement;

  @property({ type: Object })
  accessor delta: DeltaInsert<AffineTextAttributes> | undefined = undefined;

  @property({ attribute: false })
  accessor options!: MentionOptions;

  @property({ attribute: false })
  accessor targetInlineRange!: InlineRange;

  // @property({ attribute: false })
  // accessor triggerKey!: string;

  @property()
  accessor type: 'edit' | undefined;
}
