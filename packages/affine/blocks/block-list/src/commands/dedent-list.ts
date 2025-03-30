import { ListBlockModel } from '@blocksuite/affine-model';
import type { IndentContext } from '@blocksuite/affine-shared/types';
<<<<<<< HEAD:packages/affine/block-list/src/commands/dedent-list.ts
import type { Command } from '@blocksuite/block-std';

import { matchFlavours } from '@blocksuite/affine-shared/utils';
=======
import { matchModels } from '@blocksuite/affine-shared/utils';
import { type Command, TextSelection } from '@blocksuite/block-std';
>>>>>>> origin/main:packages/affine/blocks/block-list/src/commands/dedent-list.ts

import { correctNumberedListsOrderToPrev } from './utils.js';

export const canDedentListCommand: Command<
  Partial<Omit<IndentContext, 'flavour' | 'type'>>,
  {
    indentContext: IndentContext;
  }
> = (ctx, next) => {
  let { blockId, inlineIndex } = ctx;
  const { std } = ctx;
  const { selection, store } = std;
  if (!blockId) {
    const text = selection.find(TextSelection);
    /**
     * Do nothing if the selection:
     * - is not a text selection
     * - or spans multiple blocks
     */
    if (!text || (text.to && text.from.blockId !== text.to.blockId)) {
      return;
    }

    blockId = text.from.blockId;
    inlineIndex = text.from.index;
  }
  if (blockId == null || inlineIndex == null) {
    return;
  }

  /**
   * initial state:
   * - aaa
   *   - bbb
   *     - ccc  <- unindent
   *       - ddd
   *     - eee
   *   - fff
   *
   * final state:
   * - aaa
   *   - bbb
   *   - ccc
   *     - ddd
   *     - eee
   *   - fff
   */

  /**
   * ccc
   */
  const model = store.getBlock(blockId)?.model;
  if (!model || !matchModels(model, [ListBlockModel])) {
    return;
  }
  /**
   * bbb
   */
  const parent = store.getParent(model);
  if (!parent) {
    return;
  }
  if (store.readonly || parent.role !== 'content') {
    // Top most list cannot be unindent
    return;
  }
  /**
   * aaa
   */
  const grandParent = store.getParent(parent);
  if (!grandParent) {
    return;
  }
  /**
   * ccc index
   */
  const modelIndex = parent.children.indexOf(model);
  if (modelIndex === -1) {
    return;
  }

  return next({
    indentContext: {
      blockId,
      inlineIndex,
      type: 'dedent',
      flavour: 'affine:list',
    },
  });
};

export const dedentListCommand: Command<{
  indentContext: IndentContext;
}> = (ctx, next) => {
  const { indentContext: dedentContext, std } = ctx;
<<<<<<< HEAD:packages/affine/block-list/src/commands/dedent-list.ts
  const { doc, selection, range, host } = std;
=======
  const { store, selection, range, host } = std;
>>>>>>> origin/main:packages/affine/blocks/block-list/src/commands/dedent-list.ts

  if (
    !dedentContext ||
    dedentContext.type !== 'dedent' ||
    dedentContext.flavour !== 'affine:list'
  ) {
    console.warn(
      'you need to use `canDedentList` command before running `dedentList` command'
    );
    return;
  }

  const { blockId } = dedentContext;

  const model = store.getBlock(blockId)?.model;
  if (!model) return;

  const parent = store.getParent(model);
  if (!parent) return;

  const grandParent = store.getParent(parent);
  if (!grandParent) return;

  store.captureSync();

  /**
   * step 1:
   * - aaa
   *   - bbb
   *     - ccc
   *       - ddd
   *       - eee <- make eee as ccc's child
   *   - fff
   */
  const nextSiblings = store.getNexts(model); // [eee]
  store.moveBlocks(nextSiblings, model);
  /**
   * eee
   */
  const nextSibling = nextSiblings.at(0);
  if (nextSibling) correctNumberedListsOrderToPrev(store, nextSibling);

  /**
   * step 2:
   * - aaa
   *   - bbb
   *   - ccc <- make ccc as aaa's child
   *     - ddd
   *     - eee
   *   - fff
   */
  store.moveBlocks([model], grandParent, parent, false);
  correctNumberedListsOrderToPrev(store, model);

<<<<<<< HEAD:packages/affine/block-list/src/commands/dedent-list.ts
  const textSelection = selection.find('text');
=======
  const textSelection = selection.find(TextSelection);
>>>>>>> origin/main:packages/affine/blocks/block-list/src/commands/dedent-list.ts
  if (textSelection) {
    host.updateComplete
      .then(() => {
        range.syncTextSelectionToRange(textSelection);
      })
      .catch(console.error);
  }

  return next();
};
