import type { Command } from '@blocksuite/block-std';

export const selectBlock: Command<'focusBlock'> = (ctx, next) => {
 // console.log('selectBlock');
  const { focusBlock, std } = ctx;
  if (!focusBlock) {
    return;
  }

  const { selection } = std;

  selection.setGroup('note', [
    selection.create('block', { blockId: focusBlock.blockId }),
  ]);

  return next();
};

declare global {
  namespace BlockSuite {
    interface Commands {
      selectBlock: typeof selectBlock;
    }
  }
}
