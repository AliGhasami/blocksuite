import type {  MahdaadTableOfContentBlockModel } from '@blocksuite/affine-model';

// import type { insertMahdaadColumnBlockCommand } from './commands/index.js';

export function effects() {
  // TODO(@L-Sun): move other effects to this file
}

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-table-of-content': MahdaadTableOfContentBlockModel;
    }

    // interface CommandContext {
    //   insertedMahdaadMultiColumnBlockId?: string;
    // }

    // interface Commands {
    //   insertMahdaadColumnBlock: typeof insertMahdaadColumnBlockCommand;
    // }
  }
}
