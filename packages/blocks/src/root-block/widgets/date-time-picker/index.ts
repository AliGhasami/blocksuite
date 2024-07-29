import type { EditorHost } from '@blocksuite/block-std';

import { WidgetComponent } from '@blocksuite/block-std';
import {
  DisposableGroup,
  assertExists,
  throttle,
} from '@blocksuite/global/utils';
//import { InlineEditor } from '@blocksuite/inline';
import { customElement } from 'lit/decorators.js';

import type { AffineInlineEditor } from '../../../_common/inline/presets/affine-inline-specs.js';

//import { isControlledKeyboardEvent } from '../../../_common/utils/event.js';
//import { matchFlavours } from '../../../_common/utils/index.js';
import {
  //getInlineEditorByModel,
  getViewportElement,
} from '../../../_common/utils/query.js';
import { getCurrentNativeRange } from '../../../_common/utils/selection.js';
import { getPopperPosition } from '../../../root-block/utils/position.js';
import { DateTimePopover } from './date-time-popover.js';

export type MentionOptions = {
  triggerKeys: string[];
  ignoreBlockTypes: BlockSuite.Flavour[];
  convertTriggerKey: boolean;
};

export function showDateTimePopover({
  editorHost,
  inlineEditor,
  range,
  container = document.body,
  abortController = new AbortController(),
  options,
  triggerKey,
}: {
  editorHost: EditorHost;
  inlineEditor: AffineInlineEditor;
  range: Range;
  container?: HTMLElement;
  abortController?: AbortController;
  options: MentionOptions;
  triggerKey: string;
}) {
  const disposables = new DisposableGroup();
  abortController.signal.addEventListener('abort', () => disposables.dispose());
  const dateTime = new DateTimePopover(
    editorHost,
    inlineEditor,
    abortController,
    inlineEditor.getInlineRange()?.index
  );
  dateTime.options = options;
  dateTime.triggerKey = triggerKey;

  // Mount
  container.append(dateTime);
  disposables.add(() => dateTime.remove());

  // Handle position
  const updatePosition = throttle(() => {
    const mentionPopOverElement = dateTime.DateTimePopOverElement;
    assertExists(
      mentionPopOverElement,
      'You should render the mention PopOver Element node even if no position'
    );
    const position = getPopperPosition(mentionPopOverElement, range);
    const x = parseInt(position.x.slice(0, position.x.length - 2));
    position.x = `${x - 90}px`;
    dateTime.updatePosition(position);
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

  disposables.addFromEvent(window, 'mousedown', () => {
    abortController.abort();
  });

  disposables.addFromEvent(window, 'keypress', () => {
    abortController.abort();
  });

  return dateTime;
}

export const AFFINE_DATE_TIME_WIDGET = 'affine-date-time-widget';

@customElement(AFFINE_DATE_TIME_WIDGET)
export class AffineDateTimeWidget extends WidgetComponent {
  static DEFAULT_OPTIONS: MentionOptions = {
    /**
     * The first item of the trigger keys will be the primary key
     */
    triggerKeys: [
      //comment for support mention
      //'@',
    ],
    ignoreBlockTypes: ['affine:code'],
    /**
     * Convert trigger key to primary key (the first item of the trigger keys)
     */
    convertTriggerKey: true,
    //getMenus,
  };

  options = AffineDateTimeWidget.DEFAULT_OPTIONS;

  showDateTime = (inlineEditor: AffineInlineEditor, triggerKey: string) => {
    const curRange = getCurrentNativeRange();
    if (!curRange) return;
    showDateTimePopover({
      editorHost: this.host,
      inlineEditor,
      range: curRange,
      options: this.options,
      triggerKey,
    });
  };

  override connectedCallback() {
    super.connectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_DATE_TIME_WIDGET]: AffineDateTimeWidget;
  }
}
