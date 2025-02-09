import type { MahdaadCalloutBlockModel } from '@blocksuite/affine-model';

import type { insertCalloutBlockCommand } from './commands/index.js';

export function effects() {
  // TODO(@L-Sun): move other effects to this file
}

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-callout': MahdaadCalloutBlockModel;
    }

    interface CommandContext {
      insertedCalloutBlockId?: string;
    }

    interface Commands {
      insertCalloutBlock: typeof insertCalloutBlockCommand;
    }
  }
}
