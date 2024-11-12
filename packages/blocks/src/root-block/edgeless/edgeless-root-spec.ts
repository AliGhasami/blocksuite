import type {
  BlockComponent,
  BlockService,
  BlockSpec,
  BlockSpecSlots,
} from '@blocksuite/block-std';

import { literal, unsafeStatic } from 'lit/static-html.js';

import type { RootBlockConfig } from '../index.js';

import { RootBlockSchema } from '../root-model.js';
import { AFFINE_DRAG_HANDLE_WIDGET } from '../widgets/drag-handle/drag-handle.js';
import { AFFINE_EDGELESS_AUTO_CONNECT_WIDGET } from '../widgets/edgeless-auto-connect/edgeless-auto-connect.js';
import { MAHDAAD_EDGELESS_REMOTE_SELECTION_WIDGET } from '../widgets/mahdaad-edgeless-remote-selection/index.js';
//import { AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET } from '../widgets/edgeless-remote-selection/index.js';
//import { AFFINE_DOC_REMOTE_SELECTION_WIDGET } from '../widgets/doc-remote-selection/doc-remote-selection.js';
import { MAHDAAD_DOC_REMOTE_SELECTION_WIDGET } from '../widgets/mahdaad-doc-remote-selection/mahdaad-doc-remote-selection.js';
//import { AFFINE_EDGELESS_UR_TOOLBAR_WIDGET } from '../widgets/edgeless-undo-redo-toolbar/index.js';

import { AFFINE_DATE_TIME_WIDGET } from '../widgets/date-time-picker/index.js';
import { AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET } from '../widgets/edgeless-zoom-toolbar/index.js';
import { AFFINE_EMBED_CARD_TOOLBAR_WIDGET } from '../widgets/embed-card-toolbar/embed-card-toolbar.js';
//import { AFFINE_FORMAT_BAR_WIDGET } from '../widgets/format-bar/format-bar.js';
import { EDGELESS_ELEMENT_TOOLBAR_WIDGET } from '../widgets/index.js';
import { AFFINE_INNER_MODAL_WIDGET } from '../widgets/inner-modal/inner-modal.js';
import { MAHDAAD_FORMAT_BAR_WIDGET } from '../widgets/mahdaad-format-bar/format-bar.js';
import { Mahdaad_Mention_MENU_WIDGET } from '../widgets/mahdaad-mention/index.js';
import { AFFINE_MAHDAAD_OBJECT_PICKER_WIDGET } from '../widgets/mahdaad-object-picker/index.js';
import { AFFINE_MODAL_WIDGET } from '../widgets/modal/modal.js';
import { AFFINE_PIE_MENU_WIDGET } from '../widgets/pie-menu/index.js';
import { AFFINE_SLASH_MENU_WIDGET } from '../widgets/slash-menu/index.js';
import { AFFINE_VIEWPORT_OVERLAY_WIDGET } from '../widgets/viewport-overlay/viewport-overlay.js';
import './edgeless-root-preview-block.js';
import { EdgelessRootService } from './edgeless-root-service.js';

export type EdgelessRootBlockWidgetName =
  // | typeof AFFINE_BLOCK_HUB_WIDGET
  | typeof AFFINE_MODAL_WIDGET
  | typeof AFFINE_INNER_MODAL_WIDGET
  | typeof AFFINE_PIE_MENU_WIDGET
  | typeof AFFINE_SLASH_MENU_WIDGET
  //| typeof AFFINE_LINKED_DOC_WIDGET
  | typeof AFFINE_DRAG_HANDLE_WIDGET
  | typeof AFFINE_EMBED_CARD_TOOLBAR_WIDGET
  //| typeof AFFINE_FORMAT_BAR_WIDGET
  //| typeof AFFINE_DOC_REMOTE_SELECTION_WIDGET
  | typeof MAHDAAD_DOC_REMOTE_SELECTION_WIDGET
  //| typeof AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET
  | typeof MAHDAAD_EDGELESS_REMOTE_SELECTION_WIDGET
  | typeof AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET
  //| typeof AFFINE_EDGELESS_UR_TOOLBAR_WIDGET
  | typeof EDGELESS_ELEMENT_TOOLBAR_WIDGET
  | typeof AFFINE_VIEWPORT_OVERLAY_WIDGET
  | typeof AFFINE_EDGELESS_AUTO_CONNECT_WIDGET
  | typeof AFFINE_DATE_TIME_WIDGET
  | typeof Mahdaad_Mention_MENU_WIDGET
  | typeof AFFINE_MAHDAAD_OBJECT_PICKER_WIDGET
  | typeof MAHDAAD_FORMAT_BAR_WIDGET;

export type EdgelessRootBlockSpecType = BlockSpec<
  EdgelessRootBlockWidgetName,
  BlockService,
  RootBlockConfig
>;

export const EdgelessRootBlockSpec: EdgelessRootBlockSpecType = {
  schema: RootBlockSchema,
  service: EdgelessRootService,
  view: {
    component: literal`affine-edgeless-root`,
    widgets: {
      // [AFFINE_BLOCK_HUB_WIDGET]: literal`${unsafeStatic(
      //   AFFINE_BLOCK_HUB_WIDGET
      // )}`,
      [AFFINE_MODAL_WIDGET]: literal`${unsafeStatic(AFFINE_MODAL_WIDGET)}`,
      [AFFINE_INNER_MODAL_WIDGET]: literal`${unsafeStatic(AFFINE_INNER_MODAL_WIDGET)}`,
      [AFFINE_PIE_MENU_WIDGET]: literal`${unsafeStatic(AFFINE_PIE_MENU_WIDGET)}`,
      [AFFINE_SLASH_MENU_WIDGET]: literal`${unsafeStatic(
        AFFINE_SLASH_MENU_WIDGET
      )}`,
      /*[AFFINE_LINKED_DOC_WIDGET]: literal`${unsafeStatic(
        AFFINE_LINKED_DOC_WIDGET
      )}`,*/
      [AFFINE_DRAG_HANDLE_WIDGET]: literal`${unsafeStatic(
        AFFINE_DRAG_HANDLE_WIDGET
      )}`,
      [AFFINE_EMBED_CARD_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_EMBED_CARD_TOOLBAR_WIDGET
      )}`,
      /* [AFFINE_FORMAT_BAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_FORMAT_BAR_WIDGET
      )}`,*/
      /*[AFFINE_DOC_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        AFFINE_DOC_REMOTE_SELECTION_WIDGET
      )}`,*/
      [MAHDAAD_DOC_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        MAHDAAD_DOC_REMOTE_SELECTION_WIDGET
      )}`,
      /*[AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET
      )}`,*/
      [MAHDAAD_EDGELESS_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        MAHDAAD_EDGELESS_REMOTE_SELECTION_WIDGET
      )}`,
      [AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET
      )}`,
      /*[AFFINE_EDGELESS_UR_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_UR_TOOLBAR_WIDGET
      )}`,*/
      [EDGELESS_ELEMENT_TOOLBAR_WIDGET]: literal`${unsafeStatic(EDGELESS_ELEMENT_TOOLBAR_WIDGET)}`,
      [AFFINE_VIEWPORT_OVERLAY_WIDGET]: literal`${unsafeStatic(
        AFFINE_VIEWPORT_OVERLAY_WIDGET
      )}`,
      [AFFINE_EDGELESS_AUTO_CONNECT_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_AUTO_CONNECT_WIDGET
      )}`,
      [AFFINE_DATE_TIME_WIDGET]: literal`${unsafeStatic(AFFINE_DATE_TIME_WIDGET)}`,
      [AFFINE_MAHDAAD_OBJECT_PICKER_WIDGET]: literal`${unsafeStatic(AFFINE_MAHDAAD_OBJECT_PICKER_WIDGET)}`,
      [Mahdaad_Mention_MENU_WIDGET]: literal`${unsafeStatic(Mahdaad_Mention_MENU_WIDGET)}`,
      [MAHDAAD_FORMAT_BAR_WIDGET]: literal`${unsafeStatic(MAHDAAD_FORMAT_BAR_WIDGET)}`,
    },
  },
};

export const PreviewEdgelessRootBlockSpec: EdgelessRootBlockSpecType = {
  schema: RootBlockSchema,
  service: EdgelessRootService,
  view: {
    component: literal`affine-edgeless-root-preview`,
  },
  setup(slots: BlockSpecSlots) {
    slots.viewConnected.on(
      ({ service }: { component: BlockComponent; service: BlockService }) => {
        // Does not allow the user to move and zoom.
        (service as EdgelessRootService).locked = true;
      }
    );
  },
};
