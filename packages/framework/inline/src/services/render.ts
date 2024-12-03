/* eslint-disable perfectionist/sort-classes */
/* eslint-disable @stylistic/ts/lines-between-class-members */
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { assertExists } from '@blocksuite/global/utils';
import { html, render } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import * as Y from 'yjs';

import type { VLine } from '../components/v-line.js';
import type { InlineEditor } from '../inline-editor.js';
import type { InlineRange } from '../types.js';
import type { BaseTextAttributes } from '../utils/base-attributes.js';

import { deltaInsertsToChunks } from '../utils/delta-convert.js';

//todo ali ghasami for remove if has bug or fix after  - fix for mahdaad
export function cleanIllegalAttributes(deltas) {
  //const savedAttributes = null;
  /*deltas.forEach(item => {
    if (
      (savedAttributes &&
        item.attributes &&
        item.attributes.mention &&
        item.attributes.mention.id == savedAttributes.id) ||
      (item.attributes.mahdaadObjectLink &&
        item.attributes.mahdaadObjectLink.id == savedAttributes.id)
    ) {
      item.attributes = undefined;
    }
    if (item.attributes && item.attributes.mention) {
      savedAttributes = item.attributes.mention;
    }
    console.log(' ===>', savedAttributes);
  });*/
  //debugger;
  deltas.forEach(item => {
    if (
      item.insert != ' ' &&
      item.attributes &&
      (Object.hasOwn(item.attributes, 'mahdaadObjectLink') ||
        Object.hasOwn(item.attributes, 'mention'))
    ) {
      item.attributes = undefined;
    }
  });

  return deltas;
}


export class RenderService<TextAttributes extends BaseTextAttributes> {
  private _onYTextChange = (_: Y.YTextEvent, transaction: Y.Transaction) => {
    this.editor.slots.textChange.emit();

    const yText = this.editor.yText;

    if (yText.toString().includes('\r')) {
      throw new BlockSuiteError(
        ErrorCode.InlineEditorError,
        'yText must not contain "\\r" because it will break the range synchronization'
      );
    }

    this.render();

    const inlineRange = this.editor.inlineRange$.peek();
    if (!inlineRange || transaction.local) return;

    const lastStartRelativePosition = this.editor.lastStartRelativePosition;
    const lastEndRelativePosition = this.editor.lastEndRelativePosition;
    if (!lastStartRelativePosition || !lastEndRelativePosition) return;

    const doc = this.editor.yText.doc;
    assertExists(doc);
    const absoluteStart = Y.createAbsolutePositionFromRelativePosition(
      lastStartRelativePosition,
      doc
    );
    const absoluteEnd = Y.createAbsolutePositionFromRelativePosition(
      lastEndRelativePosition,
      doc
    );

    const startIndex = absoluteStart?.index;
    const endIndex = absoluteEnd?.index;
    if (!startIndex || !endIndex) return;

    const newInlineRange: InlineRange = {
      index: startIndex,
      length: endIndex - startIndex,
    };
    if (!this.editor.isValidInlineRange(newInlineRange)) return;

    this.editor.setInlineRange(newInlineRange);
    this.editor.syncInlineRange();
  };

  mount = () => {
    const editor = this.editor;
    const yText = editor.yText;

    yText.observe(this._onYTextChange);
    editor.disposables.add({
      dispose: () => {
        yText.unobserve(this._onYTextChange);
      },
    });
  };

  private _rendering = false;
  get rendering() {
    return this._rendering;
  }
  // render current deltas to VLines
  render = (syncInlineRange = true) => {
    if (!this.editor.mounted) return;

    this._rendering = true;

    const rootElement = this.editor.rootElement;
    const embedDeltas = this.editor.deltaService.embedDeltas;
    const chunks = deltaInsertsToChunks(cleanIllegalAttributes(embedDeltas));

    let deltaIndex = 0;
    // every chunk is a line
    const lines = chunks.map((chunk, lineIndex) => {
      if (lineIndex > 0) {
        deltaIndex += 1; // for '\n'
      }

      const lineStartOffset = deltaIndex;
      if (chunk.length > 0) {
        const elements: VLine['elements'] = chunk.map(delta => {
          const startOffset = deltaIndex;
          deltaIndex += delta.insert.length;
          const endOffset = deltaIndex;

          return [
            html`<v-element
              .inlineEditor=${this.editor}
              .delta=${{
                insert: delta.insert,
                attributes: this.editor.attributeService.normalizeAttributes(
                  delta.attributes
                ),
              }}
              .startOffset=${startOffset}
              .endOffset=${endOffset}
              .lineIndex=${lineIndex}
            ></v-element>`,
            delta,
          ];
        });

        return html`<v-line
          .elements=${elements}
          .index=${lineIndex}
          .startOffset=${lineStartOffset}
          .endOffset=${deltaIndex}
        ></v-line>`;
      } else {
        return html`<v-line
          .elements=${[]}
          .index=${lineIndex}
          .startOffset=${lineStartOffset}
          .endOffset=${deltaIndex}
        ></v-line>`;
      }
    });

    try {
      render(
        repeat(
          lines.map((line, i) => ({ line, index: i })),
          entry => entry.index,
          entry => entry.line
        ),
        rootElement
      );
    } catch (_) {
      // Lit may be crashed by IME input and we need to rerender whole editor for it
      this.editor.rerenderWholeEditor();
    }

    this.editor
      .waitForUpdate()
      .then(() => {
        this._rendering = false;
        this.editor.slots.renderComplete.emit();
        this.editor.syncInlineRange();
      })
      .catch(console.error);
  };

  // TODO return if has bug
  get getCurrentInlineRangeDelta() {
    const range = this.editor.getInlineRange();
    console.log("1111",range);
    if (range) return this.getDeltaByInlineRange(range);
    return undefined;
  }

  // TODO return if has bug
  getDeltaByInlineRange(inlineRange: InlineRange) {
    console.log("22222",this.editor.getDeltasByInlineRange(inlineRange));
    return this.editor.getDeltasByInlineRange(inlineRange)?.find(
      ([_, _inlineRange]) =>
        _inlineRange.length == inlineRange.length &&
        _inlineRange.index == inlineRange.index
    )?.[0];
  }

  rerenderWholeEditor = () => {
    const rootElement = this.editor.rootElement;

    if (!rootElement.isConnected) return;

    rootElement.replaceChildren();
    // Because we bypassed Lit and disrupted the DOM structure, this will cause an inconsistency in the original state of `ChildPart`.
    // Therefore, we need to remove the original `ChildPart`.
    // https://github.com/lit/lit/blob/a2cd76cfdea4ed717362bb1db32710d70550469d/packages/lit-html/src/lit-html.ts#L2248
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (rootElement as any)['_$litPart$'];
    this.render();
  };

  waitForUpdate = async () => {
    const vLines = Array.from(
      this.editor.rootElement.querySelectorAll('v-line')
    );
    await Promise.all(vLines.map(line => line.updateComplete));
  };

  constructor(readonly editor: InlineEditor<TextAttributes>) {}
}
