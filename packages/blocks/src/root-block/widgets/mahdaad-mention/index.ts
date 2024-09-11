import type { UIEventStateContext } from '@blocksuite/block-std';

import { WidgetComponent } from '@blocksuite/block-std';
import {
  DisposableGroup,
  assertExists,
  debounce,
  throttle,
} from '@blocksuite/global/utils';
import { customElement } from 'lit/decorators.js';

import type { SlashMenuContext } from '../slash-menu/config.js';

import {
  getCurrentNativeRange,
  getInlineEditorByModel,
  matchFlavours,
} from '../../../_common/utils/index.js';
import { isRootComponent } from '../../utils/guard.js';
import { getPopperPosition } from '../../utils/position.js';
import { AffineMahdaadObjectPickerWidget } from '../mahdaad-object-picker/index.js';
//import { SlashMenu } from './slash-menu-popover.js';
import {
  type InnerSlashMenuContext,
  SlashMenu,
} from '../slash-menu/mahdaad-slash-menu-popover.js';
import { defaultMahdaadMentionMenuConfig } from './config.js';

export { insertContent } from '../slash-menu/utils.js';

let globalAbortController = new AbortController();

function closeSlashMenu() {
  globalAbortController.abort();
}

const showMenu = debounce(
  ({
    context,
    range,
    container = document.body,
    abortController = new AbortController(),
    //config,
    triggerKey,
  }: {
    context: InnerSlashMenuContext | SlashMenuContext;
    range: Range;
    container?: HTMLElement;
    abortController?: AbortController;
    //config: SlashMenuStaticConfig;
    triggerKey: string;
  }) => {
    globalAbortController = abortController;
    const disposables = new DisposableGroup();
    abortController.signal.addEventListener('abort', () =>
      disposables.dispose()
    );

    const inlineEditor = getInlineEditorByModel(
      context.rootComponent.host,
      context.model
    );
    if (!inlineEditor) return;
    const slashMenu = new SlashMenu(inlineEditor, abortController);
    disposables.add(() => slashMenu.remove());
    slashMenu.context = context;
    slashMenu.config = config;
    slashMenu.triggerKey = triggerKey;

    // Handle position
    const updatePosition = throttle(() => {
      const slashMenuElement = slashMenu.slashMenuElement;
      assertExists(
        slashMenuElement,
        'You should render the slash menu node even if no position'
      );
      const position = getPopperPosition(slashMenuElement, range);
      slashMenu.updatePosition(position);
    }, 10);

    disposables.addFromEvent(window, 'resize', updatePosition);

    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    // Mount
    container.append(slashMenu);
    // Wait for the Node to be mounted
    setTimeout(updatePosition);
    return slashMenu;
  },
  100
);

export const Mahdaad_Mention_MENU_WIDGET = 'mahdaad-mention-menu-widget';

@customElement(Mahdaad_Mention_MENU_WIDGET)
export class MahdaadMentionMenuWidget extends WidgetComponent {
  private _onBeforeInput = (ctx: UIEventStateContext) => {
    //debugger;
    const eventState = ctx.get('defaultState');
    const event = eventState.event as InputEvent;

    const triggerKey = event.data;
    if (!triggerKey || !this.config.triggerKeys.includes(triggerKey)) return;
    const textSelection = this.host.selection.find('text');
    if (!textSelection) return;

    const block = this.host.doc.getBlock(textSelection.blockId);
    assertExists(block);

    const { model } = block;

    if (matchFlavours(model, this.config.ignoreBlockTypes)) return;

    const inlineEditor = getInlineEditorByModel(this.host, model);
    if (!inlineEditor) return;
    const text = inlineEditor.yTextString;
    if (text) {
      //const triggerWorkds = this.options.triggerWords.map(item => item.word);
      for (const item of AffineMahdaadObjectPickerWidget.DEFAULT_OPTIONS
        .triggerWords) {
        if (text.toLowerCase().startsWith(item.word.toLowerCase())) {
          //debugger;
          closeSlashMenu();
          return;
          //showPopover({})
          //alert('11110');
        }
      }
      /*AffineMahdaadObjectPickerWidget.DEFAULT_OPTIONS.triggerWords.forEach(
        item => {

        }
      );*/
    }
    //debugger;
    inlineEditor.slots.inlineRangeApply.once(() => {
      const rootComponent = this.block;
      if (!isRootComponent(rootComponent)) {
        console.error('MahdaadMentionMenuWidget should be used in RootBlock');
        return;
      }

      /*const config: SlashMenuStaticConfig = {
        ...this.config,
        /!*items: filterEnabledSlashMenuItems(this.config.items, {
          model,
          rootComponent: rootComponent,
        }),*!/
      };*/

      // Wait for dom update, see this case https://github.com/toeverything/blocksuite/issues/2611
      requestAnimationFrame(() => {
        const curRange = getCurrentNativeRange();
        if (!curRange) return;

        closeSlashMenu();
        showMenu({
          context: { model, rootComponent: rootComponent },
          range: curRange,
          triggerKey,
          //config,
        });
      });
    });
  };

  static DEFAULT_CONFIG = defaultMahdaadMentionMenuConfig;

  config = MahdaadMentionMenuWidget.DEFAULT_CONFIG;

  override connectedCallback() {
    super.connectedCallback();
    if (this.config.triggerKeys.some(key => key.length === 0)) {
      console.error('Trigger key of slash menu should not be empty string');
      return;
    }
    this.handleEvent('beforeInput', this._onBeforeInput);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [Mahdaad_Mention_MENU_WIDGET]: MahdaadMentionMenuWidget;
  }
}
