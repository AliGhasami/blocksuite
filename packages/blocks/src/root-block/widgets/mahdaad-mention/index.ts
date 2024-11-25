import type { UIEventStateContext } from '@blocksuite/block-std';

import {
  getInlineEditorByModel
} from '@blocksuite/affine-components/rich-text';
import {
  getCurrentNativeRange,
  matchFlavours,
} from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import {
  assertExists,
  debounce,
  DisposableGroup,
  throttle,
} from '@blocksuite/global/utils';
import { customElement } from 'lit/decorators.js';

import type { SlashMenuContext } from '../slash-menu/config.js';

//import { SlashMenu } from './slash-menu-popover.js';
import type { InnerSlashMenuContext } from '../slash-menu/mahdaad-slash-menu-popover.js';

//import { isRootComponent } from '../../utils/guard.js';
import { getPopperPosition } from '../../utils/position.js';
import { AffineMahdaadObjectPickerWidget } from '../mahdaad-object-picker/index.js';
import { defaultMahdaadMentionMenuConfig } from './config.js';
import { MahdaadMenuPopover } from './menu-popover.js';


let globalAbortController = new AbortController();

export function closeMentionMenu() {
  globalAbortController.abort();
}

export const showMentionMenu = debounce(
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
    const menu = new MahdaadMenuPopover(
      context.rootComponent.host,
      inlineEditor,
      abortController,
      context.model
    );
    disposables.add(() => menu.remove());
    //slashMenu.context = context;
    //slashMenu.config = config;
    menu.triggerKey = triggerKey;

    // Handle position
    const updatePosition = throttle(() => {
      const menuElement = menu.PopOverElement;
      assertExists(
        menuElement,
        'You should render the slash menu node even if no position'
      );
      const position = getPopperPosition(menuElement, range);
      menu.updatePosition(position);
    }, 10);

    disposables.addFromEvent(window, 'resize', updatePosition);

    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    // Mount
    container.append(menu);
    // Wait for the Node to be mounted
    setTimeout(updatePosition);

    disposables.addFromEvent(window, 'mousedown', () => {
      abortController.abort();
    });

    return menu;
  },
  100
);

export const Mahdaad_Mention_MENU_WIDGET = 'mahdaad-mention-menu-widget';

@customElement(Mahdaad_Mention_MENU_WIDGET)
export class MahdaadMentionMenuWidget extends WidgetComponent {
  static DEFAULT_CONFIG = defaultMahdaadMentionMenuConfig;

  private _onBeforeInput = (ctx: UIEventStateContext) => {
    const eventState = ctx.get('defaultState');
    const event = eventState.event as InputEvent;

    const triggerKey = event.data;
    if (!triggerKey || !this.config.triggerKeys.includes(triggerKey)) return;
    const textSelection = this.host.selection.find('text');
    if (!textSelection) return;
    //console.log('22222', this.host, this.service);
    const block = this.host.doc.getBlock(textSelection.blockId);
    //console.log('30000', this.doc.getBlocksByFlavour('affine:paragraph'));
    //const service = this.std.spec.getService(this.model.flavour);
    //this.console.log('3333', service?.inlineManager);
    /*console.log(
      '55555',
      this.host.querySelector('affine-paragraph')?.inlineManager
    );*/

    assertExists(block);
    const { model } = block;

    if (matchFlavours(model, this.config.ignoreBlockTypes)) return;
    /** @alighasami for check merge **/
    const paragraphService = this.host.std.getService('affine:paragraph');
    assertExists(paragraphService);
    if (
      !paragraphService.inlineManager.specs.some(item => item.name == 'mention')
    ) {
      return;
    }
    /*console.log(
      '99999',
      this.host.std.spec.getService('affine:paragraph')?.inlineManager
    );*/

    const inlineEditor = getInlineEditorByModel(this.host, model);
    //console.log('111', inlineEditor);
    if (!inlineEditor) return;
    const text = inlineEditor.yTextString;
    if (text) {
      for (const item of AffineMahdaadObjectPickerWidget.DEFAULT_OPTIONS
        .triggerWords) {
        if (text.toLowerCase().startsWith(item.word.toLowerCase())) {
          closeMentionMenu();
          return;
        }
      }
    }
    inlineEditor.slots.inlineRangeSync.once(() => {
      const rootComponent = this.block;
      if (rootComponent.model.flavour !== 'affine:page') {
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

        closeMentionMenu();
        showMentionMenu({
          context: { model, rootComponent: rootComponent },
          range: curRange,
          triggerKey,
          //config,
        });
      });
    });
  };

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
