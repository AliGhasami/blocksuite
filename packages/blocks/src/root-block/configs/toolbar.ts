import type { MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import type { BlockStdScope, EditorHost } from '@blocksuite/block-std';
import type { GfxModel } from '@blocksuite/block-std/gfx';
import type { BlockModel, Doc } from '@blocksuite/store';

export abstract class MenuContext {
  // Sometimes we need to close the menu.
  close() {}

  isElement() {
    return false;
  }

  get firstElement(): GfxModel | null {
    return null;
  }

  abstract get doc(): Doc;

  abstract get host(): EditorHost;

  abstract isEmpty(): boolean;

  abstract isMultiple(): boolean;

  abstract isSingle(): boolean;

  abstract get selectedBlockModels(): BlockModel[];

  abstract get std(): BlockStdScope;
}

export interface ToolbarMoreMenuConfig {
  configure: <T extends MenuContext>(
    groups: MenuItemGroup<T>[]
  ) => MenuItemGroup<T>[];
}

export function getMoreMenuConfig(std: BlockStdScope): ToolbarMoreMenuConfig {
  return {
    configure: <T extends MenuContext>(groups: MenuItemGroup<T>[]) => groups,
    ...std.spec.getConfig('affine:page')?.toolbarMoreMenu,
  };
}