import type { SimpleBlockModel } from './simple-model.js';

export * from './simple-block.js';
export * from './simple-model.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:simple': SimpleBlockModel;
    }
  }
}
