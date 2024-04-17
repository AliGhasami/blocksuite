import type { MentionBlockModel } from './mention-model.js';

export * from './mention-block.js';
export * from './mention-model.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mention': MentionBlockModel;
    }
  }
}
