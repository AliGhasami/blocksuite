import type { HintBlockModel } from './hint-model.js';

export * from './hint-block.js';
export * from './hint-model.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:hint': HintBlockModel;
    }
  }
}
