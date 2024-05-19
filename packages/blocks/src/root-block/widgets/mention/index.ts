import type { EditorHost, UIEventStateContext } from '@blocksuite/block-std';
import { WidgetElement } from '@blocksuite/block-std';
import {
  assertExists,
  DisposableGroup,
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
import { MentionPopover } from './mention-popover.js';
import type { UserMention } from './types.js';

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

export function showMentionPopover({
  editorHost,
  inlineEditor,
  range,
  container = document.body,
  abortController = new AbortController(),
  options,
  triggerKey,
  userList = [],
}: {
  editorHost: EditorHost;
  inlineEditor: AffineInlineEditor;
  range: Range;
  container?: HTMLElement;
  abortController?: AbortController;
  options: MentionOptions;
  triggerKey: string;
  userList: UserMention[];
}) {
  const disposables = new DisposableGroup();
  abortController.signal.addEventListener('abort', () => disposables.dispose());

  //console.log(55555, inlineEditor.getInlineRange());
  const mention = new MentionPopover(editorHost, inlineEditor, abortController);
  mention.options = options;
  //linkedDoc.options = options;
  mention.triggerKey = triggerKey;
  //console.log('this is user List', userList);
  mention.userList = userList;
  // Mount
  container.append(mention);
  disposables.add(() => mention.remove());

  // Handle position
  const updatePosition = throttle(() => {
    const mentionPopOverElement = mention.MentionPopOverElement;
    assertExists(
      mentionPopOverElement,
      'You should render the mention PopOver Element node even if no position'
    );
    const position = getPopperPosition(mentionPopOverElement, range);
    mention.updatePosition(position);
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

  //todo ali ghasami
  disposables.addFromEvent(window, 'mousedown', (e: Event) => {
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

  return mention;
}

export const AFFINE_MENTION_WIDGET = 'affine-mention-widget';

@customElement(AFFINE_MENTION_WIDGET)
export class AffineMentionWidget extends WidgetElement {
  static DEFAULT_OPTIONS: MentionOptions = {
    /**
     * The first item of the trigger keys will be the primary key
     */
    triggerKeys: [
      //comment for support mention
      '@',
    ],
    ignoreBlockTypes: ['affine:code'],
    /**
     * Convert trigger key to primary key (the first item of the trigger keys)
     */
    convertTriggerKey: true,
    //getMenus,
  };

  options = AffineMentionWidget.DEFAULT_OPTIONS;

  override connectedCallback() {
    super.connectedCallback();
    //console.log('this is block', this.blockElement.model);
    this.handleEvent('keyDown', this._onKeyDown);
  }

  public showMention = (
    inlineEditor: AffineInlineEditor,
    triggerKey: string
  ) => {
    const curRange = getCurrentNativeRange();
    //debugger;
    showMentionPopover({
      editorHost: this.host,
      inlineEditor,
      range: curRange,
      options: this.options,
      triggerKey,
      userList: this.blockElement.model.mentionUserList,
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
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_MENTION_WIDGET]: AffineMentionWidget;
  }
}
