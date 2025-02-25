import type {  MahdaadMultiColumnBlockModel } from '@blocksuite/affine-model';

import type { insertMahdaadColumnBlockCommand } from './commands/index.js';

export function effects() {
  // TODO(@L-Sun): move other effects to this file
}

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-multi-column': MahdaadMultiColumnBlockModel;
    }

    interface CommandContext {
      insertedMahdaadMultiColumnBlockId?: string;
    }

    interface Commands {
      insertMahdaadColumnBlock: typeof insertMahdaadColumnBlockCommand;
    }
  }
}
