import type { MentionBlockModel } from './mention-model.js';
import type { MentionService } from './mention-service.js';

export * from './mention-block.js';
export * from './mention-model.js';
export * from './mention-service.js';

declare global {
  namespace BlockSuite {
    interface BlockServices {
      'affine:mention': MentionService;
    }
    interface BlockModels {
      'affine:mention': MentionBlockModel;
    }
  }
}
