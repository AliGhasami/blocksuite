import type {
  BaseSelection,
  BlockComponent,
  CursorSelection,
} from '@blocksuite/block-std';

import { WidgetComponent } from '@blocksuite/block-std';
import { DisposableGroup, assertExists } from '@blocksuite/global/utils';
import {
  type ReferenceElement,
  autoUpdate,
  computePosition,
  inline,
  offset,
  shift,
} from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import type { AffineTextAttributes } from '../../../_common/inline/presets/affine-inline-specs.js';

import '../../../_common/components/button.js';
import {
  HoverController,
  type RichText,
} from '../../../_common/components/index.js';
import '../../../_common/components/toolbar/toolbar.js';
import { matchFlavours } from '../../../_common/utils/model.js';
//import { isFormatSupported } from '../../../note-block/commands/utils.js';
import { isRootComponent } from '../../../root-block/utils/guard.js';
/*import {
  type FormatBarConfigItem,
  type InlineActionConfigItem,
  type ParagraphActionConfigItem,
  toolbarDefaultConfig,
} from './config.js';*/
//import { formatBarStyle } from './styles.js';

export const MAHDAAD_FORMAT_BAR_WIDGET = 'mahdaad-format-bar-widget';

@customElement(MAHDAAD_FORMAT_BAR_WIDGET)
export class MahdaadFormatBarWidget extends WidgetComponent {
  private _abortController = new AbortController();

  private _floatDisposables: DisposableGroup | null = null;

  private _lastCursor: CursorSelection | undefined = undefined;

  //private _placement: Placement = 'top';

  //static override styles = formatBarStyle;

  private _calculatePlacement() {
    const rootComponent = this.block;

    this.handleEvent('dragStart', () => {
      this._dragging = true;
    });

    this.handleEvent('dragEnd', () => {
      this._dragging = false;
    });

    // calculate placement
    /* this.disposables.add(
      this.host.event.add('pointerUp', ctx => {
       // let targetRect: DOMRect | null = null;
        if (this.displayType === 'text' || this.displayType === 'native') {
          const range = this.nativeRange;
          if (!range) {
            this.reset();
            return;
          }
         // targetRect = range.getBoundingClientRect();
        } else if (this.displayType === 'block') {
          const block = this._selectedBlocks[0];
          if (!block) return;
         // targetRect = block.getBoundingClientRect();
        } else {
          return;
        }

        /!*const { top: editorHostTop, bottom: editorHostBottom } =
          this.host.getBoundingClientRect();
        const e = ctx.get('pointerState');*!/
        /!*if (editorHostBottom - targetRect.bottom < 50) {
          this._placement = 'top';
        } else if (targetRect.top - Math.max(editorHostTop, 0) < 50) {
          this._placement = 'bottom';
        } else if (e.raw.y < targetRect.top + targetRect.height / 2) {
          this._placement = 'top';
        } else {
          this._placement = 'bottom';
        }*!/
      })
    );*/

    // listen to selection change
    this.disposables.add(
      this._selectionManager.slots.changed.on(() => {
        const update = async () => {
          const textSelection = rootComponent.selection.find('text');
          const blockSelections = rootComponent.selection.filter('block');

          // Should not re-render format bar when only cursor selection changed in edgeless
          const cursorSelection = rootComponent.selection.find('cursor');
          if (cursorSelection) {
            if (!this._lastCursor) {
              this._lastCursor = cursorSelection;
              return;
            }

            if (!this._selectionEqual(cursorSelection, this._lastCursor)) {
              this._lastCursor = cursorSelection;
              return;
            }
          }

          await this.host.getUpdateComplete();

          if (textSelection) {
            const block = this.host.view.getBlock(textSelection.blockId);

            if (
              !textSelection.isCollapsed() &&
              block &&
              block.model.role === 'content'
            ) {
              this._displayType = 'text';
              assertExists(rootComponent.host.rangeManager);

              this.host.std.command
                .chain()
                .getTextSelection()
                .getSelectedBlocks({
                  types: ['text'],
                })
                .inline(ctx => {
                  const { selectedBlocks } = ctx;
                  assertExists(selectedBlocks);

                  this._selectedBlocks = selectedBlocks;
                })
                .run();

              return;
            }

            this.reset();
            return;
          }

          if (blockSelections.length > 0) {
            this._displayType = 'block';
            const selectedBlocks = blockSelections
              .map(selection => {
                const path = selection.blockId;
                return this.block.host.view.getBlock(path);
              })
              .filter((el): el is BlockComponent => !!el);

            this._selectedBlocks = selectedBlocks;
            return;
          }

          this.reset();
        };

        update().catch(console.error);
      })
    );
    this.disposables.addFromEvent(document, 'selectionchange', () => {
      const databaseSelection = this.host.selection.find('database');
      if (!databaseSelection) {
        return;
      }

      const reset = () => {
        this.reset();
        this.requestUpdate();
      };
      const viewSelection = databaseSelection.viewSelection;
      // check table selection
      if (viewSelection.type === 'table' && !viewSelection.isEditing)
        return reset();
      // check kanban selection
      if (
        (viewSelection.type === 'kanban' &&
          viewSelection.selectionType !== 'cell') ||
        !viewSelection.isEditing
      )
        return reset();

      const range = this.nativeRange;

      if (!range || range.collapsed) return reset();
      this._displayType = 'native';
      this.requestUpdate();
    });
  }

  private _listenFloatingElement() {
    const formatQuickBarElement = this.formatBarElement;
    assertExists(formatQuickBarElement, 'format quick bar should exist');
    const listenFloatingElement = (
      getElement: () => ReferenceElement | void
    ) => {
      const initialElement = getElement();
      if (!initialElement) {
        return;
      }

      assertExists(this._floatDisposables);
      HoverController.globalAbortController?.abort();
      this._floatDisposables.add(
        autoUpdate(
          initialElement,
          formatQuickBarElement,
          () => {
            const element = getElement();
            if (!element) return;
            computePosition(element, formatQuickBarElement, {
              strategy: 'fixed',
              //placement: this._placement,
              middleware: [
                offset(10),
                inline(),
                shift({
                  padding: 6,
                }),
              ],
            })
              .then(({ x, y }) => {
                formatQuickBarElement.style.position = 'fixed';
                formatQuickBarElement.style.top = `${y}px`;
                formatQuickBarElement.style.left = `${x}px`;
              })
              .catch(console.error);
          },
          {
            // follow edgeless viewport update
            animationFrame: true,
          }
        )
      );
    };

    const getReferenceElementFromBlock = () => {
      const firstBlock = this._selectedBlocks[0];
      let rect = firstBlock?.getBoundingClientRect();

      if (!rect) return;

      this._selectedBlocks.forEach(el => {
        const elRect = el.getBoundingClientRect();
        if (elRect.top < rect.top) {
          rect = new DOMRect(rect.left, elRect.top, rect.width, rect.bottom);
        }
        if (elRect.bottom > rect.bottom) {
          rect = new DOMRect(rect.left, rect.top, rect.width, elRect.bottom);
        }
        if (elRect.left < rect.left) {
          rect = new DOMRect(elRect.left, rect.top, rect.right, rect.bottom);
        }
        if (elRect.right > rect.right) {
          rect = new DOMRect(rect.left, rect.top, elRect.right, rect.bottom);
        }
      });
      return {
        getBoundingClientRect: () => rect,
        getClientRects: () =>
          this._selectedBlocks.map(el => el.getBoundingClientRect()),
      };
    };

    const getReferenceElementFromText = () => {
      const range = this.nativeRange;
      if (!range) {
        return;
      }
      /*console.log(
        'range.getBoundingClientRect()',
        range.getBoundingClientRect()
      );
      console.log('range.getClientRects()', range.getClientRects());*/
      return {
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      };
    };

    switch (this.displayType) {
      case 'text':
      case 'native':
        return listenFloatingElement(getReferenceElementFromText);
      case 'block':
        return listenFloatingElement(getReferenceElementFromBlock);
      default:
        return;
    }
  }

  private _selectionEqual(
    target: BaseSelection | undefined,
    current: BaseSelection | undefined
  ) {
    if (target === current || (target && current && target.equals(current))) {
      return true;
    }
    return false;
  }

  private get _selectionManager() {
    return this.host.selection;
  }

  private _shouldDisplay() {
    const readonly = this.doc.awarenessStore.isReadonly(
      this.doc.blockCollection
    );
    if (readonly) return false;

    if (
      this.displayType === 'block' &&
      this._selectedBlocks?.[0]?.flavour === 'affine:surface-ref'
    ) {
      return false;
    }

    if (this.displayType === 'block' && this._selectedBlocks.length === 1) {
      const selectedBlock = this._selectedBlocks[0];
      if (
        !matchFlavours(selectedBlock.model, [
          'affine:paragraph',
          'affine:list',
          'affine:code',
          'affine:image',
        ])
      ) {
        return false;
      }
    }

    if (this.displayType === 'none' || this._dragging) {
      return false;
    }

    // if the selection is on an embed (ex. linked page), we should not display the format bar
    if (this.displayType === 'text' && this._selectedBlocks.length === 1) {
      const isEmbed = () => {
        const [element] = this._selectedBlocks;
        const richText = element.querySelector<RichText>('rich-text');
        const inline = richText?.inlineEditor;
        if (!richText || !inline) {
          return false;
        }
        const range = inline.getInlineRange();
        if (!range || range.length > 1) {
          return false;
        }
        const deltas = inline.getDeltasByInlineRange(range);
        if (deltas.length > 2) {
          return false;
        }
        const delta = deltas?.[1]?.[0];
        if (!delta) {
          return false;
        }

        return inline.isEmbed(delta);
      };

      if (isEmbed()) {
        return false;
      }
    }

    // todo: refactor later that ai panel & format bar should not depend on each other
    // do not display if AI panel is open
    const rootBlockId = this.host.doc.root?.id;
    const aiPanel = rootBlockId
      ? this.host.view.getWidget('affine-ai-panel-widget', rootBlockId)
      : null;

    // @ts-ignore
    if (aiPanel && aiPanel?.state !== 'hidden') {
      return false;
    }

    return true;
  }

  activeInlineTools() {
    const keys: Exclude<
      keyof AffineTextAttributes,
      'color' | 'background' | 'reference'
    >[] = ['bold', 'italic', 'underline', 'strike', 'link'];
    const temp: string[] = [];
    keys.forEach(key => {
      const [result] = this.std.command
        .chain()
        .isTextStyleActive({ key })
        .run();
      if (result) {
        temp.push(key);
      }
    });
    return temp;
  }

  activeParagraphTool() {
    if (this.selectedBlocks.length == 1) {
      //@ts-ignore
      return this.selectedBlocks[0].model.type ?? 'text';
    }
    return 'text';
  }

  /*addBlockTypeSwitch(config: {
    flavour: BlockSuite.Flavour;
    icon: ParagraphActionConfigItem['icon'];
    type?: string;
    name?: string;
  }) {
    const { flavour, type, icon } = config;
    return this.addParagraphAction({
      id: `${flavour}/${type ?? ''}`,
      icon,
      flavour,
      name: config.name ?? camelCaseToWords(type ?? flavour),
      action: chain => {
        chain
          .updateBlockType({
            flavour,
            props: type != null ? { type } : undefined,
          })
          .run();
      },
    });
  }*/

  /*addDivider() {
    this.configItems.push({ type: 'divider' });
    return this;
  }*/

  /* addHighlighterDropdown() {
    this.configItems.push({ type: 'highlighter-dropdown' });
    return this;
  }*/

  /*addInlineAction(config: Omit<InlineActionConfigItem, 'type'>) {
    this.configItems.push({ ...config, type: 'inline-action' });
    return this;
  }*/

  /*addParagraphAction(config: Omit<ParagraphActionConfigItem, 'type'>) {
    this.configItems.push({ ...config, type: 'paragraph-action' });
    return this;
  }*/

  /*addParagraphDropdown() {
    this.configItems.push({ type: 'paragraph-dropdown' });
    return this;
  }*/

  /*addRawConfigItems(configItems: FormatBarConfigItem[], index?: number) {
    if (index === undefined) {
      this.configItems.push(...configItems);
    } else {
      this.configItems.splice(index, 0, ...configItems);
    }
    return this;
  }*/

  /*  addTextStyleToggle(config: {
    icon: InlineActionConfigItem['icon'];
    key: Exclude<
      keyof AffineTextAttributes,
      'color' | 'background' | 'reference'
    >;
    action: InlineActionConfigItem['action'];
  }) {
    const { key } = config;
    return this.addInlineAction({
      id: key,
      name: camelCaseToWords(key),
      icon: config.icon,
      isActive: chain => {
        const [result] = chain.isTextStyleActive({ key }).run();
        return result;
      },
      action: config.action,
      showWhen: chain => {
        const [result] = isFormatSupported(chain).run();
        return result;
      },
    });
  }*/

  clearConfig() {
    //this.configItems = [];
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    this._abortController = new AbortController();
    const rootComponent = this.block;
    assertExists(rootComponent);
    const widgets = rootComponent.widgets;

    // check if the host use the format bar widget
    if (!Object.hasOwn(widgets, MAHDAAD_FORMAT_BAR_WIDGET)) {
      return;
    }

    // check if format bar widget support the host
    if (!isRootComponent(rootComponent)) {
      console.error(
        `format bar not support rootComponent: ${rootComponent.constructor.name} but its widgets has format bar`
      );
      return;
    }

    this._calculatePlacement();

    /* if (this.configItems.length === 0) {
      toolbarDefaultConfig(this);
    }*/
    this._disposables.addFromEvent(this, 'pointerdown', e => {
      e.stopPropagation();
      e.preventDefault();
    });

    this._disposables.addFromEvent(this, 'mousedown', e => {
      e.stopPropagation();
      e.preventDefault();
    });
  }

  override createRenderRoot() {
    return this;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController.abort();
    this.reset();
    this._lastCursor = undefined;
  }

  override render() {
    if (!this._shouldDisplay()) {
      return nothing;
    }

    return html`<div class="${MAHDAAD_FORMAT_BAR_WIDGET}" style="z-index:10;">
      <mahdaad-format-bar
        @changeParagraph="${(event: CustomEvent) => {
          //this._displayType = 'none';
          const val = event.detail;
          let flavour: BlockSuite.Flavour = 'affine:paragraph';
          if (['bulleted', 'numbered', 'todo'].includes(val)) {
            flavour = 'affine:list';
          }
          this.std.command
            .chain()
            .updateBlockType({
              flavour,
              props: val != null ? { type: val } : undefined,
            })
            .run();
        }}"
        @changeInline="${(event: CustomEvent) => {
          const key = event.detail;
          const chain = this.std.command.chain();
          switch (key) {
            case 'bold':
              chain.toggleBold().run();
              this.requestUpdate();
              break;
            case 'italic':
              chain.toggleItalic().run();
              break;
            case 'underline':
              chain.toggleUnderline().run();
              break;
            case 'strike':
              chain.toggleStrike().run();
              break;
            case 'link':
              chain.toggleLink().run();
              break;
          }
        }}"
        @changeColor="${(event: CustomEvent) => {
          const styles = event.detail;
          //console.log('1111', styles);
          //alert('1111');
          const payload: {
            styles: AffineTextAttributes;
          } = {
            styles,
          };
          //console.log('payload', payload);
          this.std.command
            .chain()
            .try(chain => [
              chain.getTextSelection().formatText(payload),
              chain.getBlockSelections().formatBlock(payload),
              chain.formatNative(payload),
            ])
            .run();
        }}"
        active-paragraph-tool="${this.activeParagraphTool()}"
        active-inline-tools="${this.activeInlineTools()}"
      ></mahdaad-format-bar>
    </div>`;
  }

  reset() {
    this._displayType = 'none';
    this._selectedBlocks = [];
  }

  override updated() {
    if (!this._shouldDisplay()) {
      if (this._floatDisposables) {
        this._floatDisposables.dispose();
      }
      return;
    }

    this._floatDisposables = new DisposableGroup();
    this._listenFloatingElement();
  }

  get displayType() {
    return this._displayType;
  }

  get nativeRange() {
    const sl = document.getSelection();
    if (!sl || sl.rangeCount === 0) return null;
    return sl.getRangeAt(0);
  }

  get selectedBlocks() {
    return this._selectedBlocks;
  }

  @state()
  private accessor _displayType: 'text' | 'block' | 'native' | 'none' = 'none';

  @state()
  private accessor _dragging = false;

  @state()
  private accessor _selectedBlocks: BlockComponent[] = [];

  //@state()
  //accessor configItems: FormatBarConfigItem[] = [];

  @query(`.${MAHDAAD_FORMAT_BAR_WIDGET}`)
  accessor formatBarElement: HTMLElement | null = null;
}

/*function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}*/

declare global {
  interface HTMLElementTagNameMap {
    [MAHDAAD_FORMAT_BAR_WIDGET]: MahdaadFormatBarWidget;
  }
}
