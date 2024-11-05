import type { MahdaadWeblinkBlockModel } from './weblink-model.js';

export * from './weblink-block.js';
export * from './weblink-model.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-weblink-block': MahdaadWeblinkBlockModel;
    }
  }
}
