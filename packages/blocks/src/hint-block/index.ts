import type { HintBlockModel } from './hint-model.js';
import type { HintService } from './hint-service.js';

export * from './hint-block.js';
export * from './hint-model.js';
export * from './hint-service.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:hint': HintBlockModel;
    }
    interface BlockServices {
      'affine:hint': HintService;
    }
  }
}
