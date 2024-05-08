// import type { AFFINE_BLOCK_HUB_WIDGET } from '../root-block/widgets/block-hub/block-hub.js';

import type { EdgelessRootBlockComponent } from './edgeless/edgeless-root-block.js';
import type { PageRootBlockComponent } from './page/page-root-block.js';
import type { AFFINE_ADD_BLOCK_HANDLE_WIDGET } from './widgets/add-block-handle/add-block-handle.js';
import type { AFFINE_DOC_REMOTE_SELECTION_WIDGET } from './widgets/doc-remote-selection/doc-remote-selection.js';
import type { AFFINE_DRAG_HANDLE_WIDGET } from './widgets/drag-handle/drag-handle.js';
import type { AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET } from './widgets/edgeless-remote-selection/index.js';
import type { AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET } from './widgets/edgeless-zoom-toolbar/index.js';
import type { EDGELESS_ELEMENT_TOOLBAR_WIDGET } from './widgets/element-toolbar/index.js';
import type { AFFINE_FORMAT_BAR_WIDGET } from './widgets/format-bar/format-bar.js';
import type { AFFINE_INNER_MODAL_WIDGET } from './widgets/inner-modal/inner-modal.js';
import type { AFFINE_LINKED_DOC_WIDGET } from './widgets/linked-doc/index.js';
import type { AFFINE_MENTION_WIDGET } from './widgets/mention/index.js';
import type { AFFINE_MODAL_WIDGET } from './widgets/modal/modal.js';
import type { AFFINE_PAGE_DRAGGING_AREA_WIDGET } from './widgets/page-dragging-area/page-dragging-area.js';
import type { AFFINE_PIE_MENU_ID_EDGELESS_TOOLS } from './widgets/pie-menu/config.js';
import type { AFFINE_PIE_MENU_WIDGET } from './widgets/pie-menu/index.js';
import type { AFFINE_SLASH_MENU_WIDGET } from './widgets/slash-menu/index.js';

export type PageRootBlockWidgetName =
  // | typeof AFFINE_BLOCK_HUB_WIDGET
  | typeof AFFINE_MODAL_WIDGET
  | typeof AFFINE_INNER_MODAL_WIDGET
  | typeof AFFINE_SLASH_MENU_WIDGET
  | typeof AFFINE_LINKED_DOC_WIDGET
  | typeof AFFINE_PAGE_DRAGGING_AREA_WIDGET
  | typeof AFFINE_DRAG_HANDLE_WIDGET
  | typeof AFFINE_FORMAT_BAR_WIDGET
  | typeof AFFINE_DOC_REMOTE_SELECTION_WIDGET
  | typeof AFFINE_ADD_BLOCK_HANDLE_WIDGET
  | typeof AFFINE_DOC_REMOTE_SELECTION_WIDGET
  | typeof AFFINE_MENTION_WIDGET
  | typeof AFFINE_LINKED_DOC_WIDGET;

export type EdgelessRootBlockWidgetName =
  // | typeof AFFINE_BLOCK_HUB_WIDGET
  | typeof AFFINE_MODAL_WIDGET
  | typeof AFFINE_INNER_MODAL_WIDGET
  | typeof AFFINE_PIE_MENU_WIDGET
  | typeof AFFINE_SLASH_MENU_WIDGET
  | typeof AFFINE_LINKED_DOC_WIDGET
  | typeof AFFINE_DRAG_HANDLE_WIDGET
  | typeof AFFINE_FORMAT_BAR_WIDGET
  | typeof AFFINE_DOC_REMOTE_SELECTION_WIDGET
  | typeof AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET
  | typeof AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET
  | typeof EDGELESS_ELEMENT_TOOLBAR_WIDGET;

export type RootBlockComponent =
  | PageRootBlockComponent
  | EdgelessRootBlockComponent;

export type PieMenuId = typeof AFFINE_PIE_MENU_ID_EDGELESS_TOOLS;
