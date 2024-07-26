import type { EditorHost, UIEventStateContext } from '@blocksuite/block-std';

import { WidgetComponent } from '@blocksuite/block-std';
import {
  DisposableGroup,
  assertExists,
  throttle,
} from '@blocksuite/global/utils';
import { InlineEditor } from '@blocksuite/inline';
import { customElement } from 'lit/decorators.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';

import { isControlledKeyboardEvent } from '../../../_common/utils/event.js';
import { matchFlavours } from '../../../_common/utils/index.js';
import {
  getInlineEditorByModel,
  getViewportElement,
} from '../../../_common/utils/query.js';
import { getCurrentNativeRange } from '../../../_common/utils/selection.js';
import { getPopperPosition } from '../../../root-block/utils/position.js';
import { DatePopover } from './date-popover.js';
//import type { UserMention } from './types.js';

export type MentionOptions = {
  triggerKeys: string[];
  ignoreBlockTypes: BlockSuite.Flavour[];
  convertTriggerKey: boolean;
  /*getMenus: (ctx: {
    editorHost: EditorHost;
    query: string;
    inlineEditor: AffineInlineEditor;
    docMetas: DocMeta[];
  }) => LinkedDocGroup[];*/
};

export function showDatePickerPopover({
  editorHost,
  inlineEditor,
  range,
  container = document.body,
  abortController = new AbortController(),
  options,
  triggerKey,
  //userList = [],
}: {
  editorHost: EditorHost;
  inlineEditor: AffineInlineEditor;
  range: Range;
  container?: HTMLElement;
  abortController?: AbortController;
  options: MentionOptions;
  triggerKey: string;
  // userList: UserMention[];
}) {
  const disposables = new DisposableGroup();
  abortController.signal.addEventListener('abort', () => disposables.dispose());

  //console.log(55555, inlineEditor.getInlineRange());
  const datePicker = new DatePopover(editorHost, inlineEditor, abortController);
  datePicker.options = options;
  //linkedDoc.options = options;
  datePicker.triggerKey = triggerKey;
  //console.log('this is user List', userList);
  //mention.userList = userList;
  // Mount
  container.append(datePicker);
  disposables.add(() => datePicker.remove());

  // Handle position
  const updatePosition = throttle(() => {
    const datePickerPopOverElement = datePicker.DatePickerPopOverElement;
    assertExists(
      datePickerPopOverElement,
      'You should render the mention PopOver Element node even if no position'
    );
    const position = getPopperPosition(datePickerPopOverElement, range);
    datePicker.updatePosition(position);
  }, 10);
  disposables.addFromEvent(window, 'resize', updatePosition);
  const scrollContainer = getViewportElement(editorHost);
  if (scrollContainer) {
    // Note: in edgeless mode, the scroll container is not exist!
    disposables.addFromEvent(scrollContainer, 'scroll', updatePosition, {
      passive: true,
    });
  }

  // Wait for node to be mounted
  setTimeout(updatePosition);

  //todo ali ghasami for implement
  disposables.addFromEvent(window, 'mousedown', (e: Event) => {
    return;
    const elm: HTMLElement = e.target as HTMLElement;
    if (elm && elm.className.includes('mention-item')) return;
    //console.log('e.target', e.target, mention, container, elm.className);
    //if()
    //return;
    //console.log('77777', inlineEditor.getInlineRange());
    //if(e.target)
    //return;
    //if (e.target === mention) return;
    abortController.abort();
  });

  return datePicker;
}

export const AFFINE_DATE_WIDGET = 'affine-date-widget';

@customElement(AFFINE_DATE_WIDGET)
export class AffineDateWidget extends WidgetComponent {
  private _onKeyDown = (ctx: UIEventStateContext) => {
    const eventState = ctx.get('keyboardState');
    const event = eventState.raw;
    if (isControlledKeyboardEvent(event) || event.key.length !== 1) return;
    const inlineEditor = this.getInlineEditor(event);
    if (!inlineEditor) return;
    const inlineRange = inlineEditor.getInlineRange();
    if (!inlineRange) return;
    if (inlineRange.length > 0) {
      // When select text and press `[[` should not trigger transform,
      // since it will break the bracket complete.
      // Expected `[[selected text]]` instead of `@selected text]]`
      return;
    }

    const [leafStart, offsetStart] = inlineEditor.getTextPoint(
      inlineRange.index
    );
    const prefixText = leafStart.textContent
      ? leafStart.textContent.slice(0, offsetStart)
      : '';

    const matchedKey = this.options.triggerKeys.find(triggerKey =>
      (prefixText + event.key).endsWith(triggerKey)
    );
    if (!matchedKey) return;

    const primaryTriggerKey = this.options.triggerKeys[0];
    inlineEditor.slots.inlineRangeApply.once(() => {
      if (this.options.convertTriggerKey && primaryTriggerKey !== matchedKey) {
        //debugger;
        // Convert to the primary trigger key
        // e.g. [[ -> @
        const startIdxBeforeMatchKey =
          inlineRange.index - (matchedKey.length - 1);
        inlineEditor.deleteText({
          index: startIdxBeforeMatchKey,
          length: matchedKey.length,
        });
        inlineEditor.insertText(
          { index: startIdxBeforeMatchKey, length: 0 },
          primaryTriggerKey
        );
        inlineEditor.setInlineRange({
          index: startIdxBeforeMatchKey + primaryTriggerKey.length,
          length: 0,
        });
        inlineEditor.slots.inlineRangeApply.once(() => {
          this.showMention(inlineEditor, primaryTriggerKey);
        });
        return;
      }
      this.showMention(inlineEditor, matchedKey);
    });
  };

  private getInlineEditor = (evt: KeyboardEvent) => {
    if (evt.target instanceof HTMLElement) {
      const editor = (
        evt.target.closest('.inline-editor') as {
          inlineEditor?: AffineInlineEditor;
        }
      )?.inlineEditor;
      if (editor instanceof InlineEditor) {
        return editor;
      }
    }
    const text = this.host.selection.value.find(selection =>
      selection.is('text')
    );
    if (!text) {
      return;
    }
    const model = this.host.doc.getBlockById(text.blockId);
    if (!model) {
      return;
    }
    if (matchFlavours(model, this.options.ignoreBlockTypes)) return;
    return getInlineEditorByModel(this.host, model);
  };

  static DEFAULT_OPTIONS: MentionOptions = {
    /**
     * The first item of the trigger keys will be the primary key
     */
    triggerKeys: [
      //comment for support mention
      //'@',
    ],
    //TODO ali ghasami for complete ignore list
    ignoreBlockTypes: ['affine:code'],
    /**
     * Convert trigger key to primary key (the first item of the trigger keys)
     */
    convertTriggerKey: true,
    //getMenus,
  };

  options = AffineDateWidget.DEFAULT_OPTIONS;

  showMention = (inlineEditor: AffineInlineEditor, triggerKey: string) => {
    const curRange = getCurrentNativeRange();
    if (!curRange) return;
    showDatePickerPopover({
      editorHost: this.host,
      inlineEditor,
      range: curRange,
      options: this.options,
      triggerKey,
      //TODO ali ghasami - important
      //@ts-ignore
      //userList: this.blockElement.model.mentionUserList,
    });
  };

  override connectedCallback() {
    super.connectedCallback();
    //console.log('this is block', this.blockElement.model);
    this.handleEvent('keyDown', this._onKeyDown);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_DATE_WIDGET]: AffineDateWidget;
  }
}
