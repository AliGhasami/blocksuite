import type { BlockCommands, Command } from '@blocksuite/block-std';

import { focusTextModel } from '@blocksuite/affine-components/rich-text';

export const insertMahdaadColumnBlockCommand: Command<
  'selectedModels',
  'insertedMahdaadMultiColumnBlockId',
  {
    count:number,
    //type:string;
    //place?: 'after' | 'before';
    //removeEmptyLine?: boolean;
  }
> = (ctx, next) => {
  const { selectedModels, count, std } = ctx;
  //next()
  if (!selectedModels?.length) return;

  const targetModel =selectedModels[0]

  const result = std.doc.addSiblingBlocks(
    targetModel,
    [{ flavour: 'affine:mahdaad-multi-column',count:2 }],'after'
  );

  if (result.length === 0) return;
  let firstParagraphId=null
  for (let i = 0 ;i<count;i++) {
    const noteId= std.doc.addBlock('affine:note', {}, result[0])
    const paragraphId= std.doc.addBlock('affine:paragraph', {},noteId)
    if(i==0) {
       firstParagraphId= paragraphId
    }
  }
  if(firstParagraphId) {
    focusTextModel(std, firstParagraphId);
  }
 // service.initDatabaseBlock(std.doc, targetModel, result[0], viewType, false);
  if (targetModel.text?.length === 0) {
    std.doc.deleteBlock(targetModel);
  }
  next({ insertedMahdaadMultiColumnBlockId: result[0] });
};


export const mahdaadCalloutCommands: BlockCommands = {
  insertMahdaadColumnBlock: insertMahdaadColumnBlockCommand,
  // block
 /* getBlockIndex: getBlockIndexCommand,
  getPrevBlock: getPrevBlockCommand,
  getNextBlock: getNextBlockCommand,
  getSelectedBlocks: getSelectedBlocksCommand,
  getBlockSelections: getBlockSelectionsCommand,
  selectBlock,
  selectBlocksBetween,
  focusBlockStart,
  focusBlockEnd,
  updateBlockType,
  indentBlock,
  dedentBlock,
  indentBlocks,
  dedentBlocks,
  dedentBlockToRoot,
  dedentBlocksToRoot,*/
};
