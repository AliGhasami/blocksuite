import type { BlockCommands, Command } from '@blocksuite/block-std';


/*import {
  getBlockIndexCommand,
  getBlockSelectionsCommand,
  getNextBlockCommand,
  getPrevBlockCommand,
  getSelectedBlocksCommand,
} from '@blocksuite/affine-shared/commands';

import { updateBlockType } from './block-type.js';
import { dedentBlock } from './dedent-block.js';
import { dedentBlockToRoot } from './dedent-block-to-root.js';
import { dedentBlocks } from './dedent-blocks.js';
import { dedentBlocksToRoot } from './dedent-blocks-to-root.js';
import { focusBlockEnd } from './focus-block-end.js';
import { focusBlockStart } from './focus-block-start.js';
import { indentBlock } from './indent-block.js';
import { indentBlocks } from './indent-blocks.js';
import { selectBlock } from './select-block.js';
import { selectBlocksBetween } from './select-blocks-between.js';*/




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
    /*place === 'before'
      ? selectedModels[0]
      : selectedModels[selectedModels.length - 1];*/
  //const service = std.getService('affine:database');
  //if (!service) return;
  const result = std.doc.addSiblingBlocks(
    targetModel,
    [{ flavour: 'affine:mahdaad-multi-column',count:2 }],'after'
  );
  //console.log("this is result",result);
  //std.doc. updateBlock()
  if (result.length === 0) return;

  for (let i = 0 ;i<count;i++) {
    const noteId= std.doc.addBlock('affine:note', {}, result[0])
    std.doc.addBlock('affine:paragraph', {},noteId)
  }
  /*const note_1= std.doc.addBlock('affine:note', {}, result[0])
  std.doc.addBlock('affine:paragraph', {},note_1)
  const note_2= std.doc.addBlock('affine:note', {}, result[0])
  std.doc.addBlock('affine:paragraph', {},note_2)
  const note_3= std.doc.addBlock('affine:note', {}, result[0])
  std.doc.addBlock('affine:paragraph', {},note_3)*/
  //const blockId= std.doc.addBlock('affine:note', {}, result[0])
  //focusTextModel(std, blockId);

 // service.initDatabaseBlock(std.doc, targetModel, result[0], viewType, false);
  if (targetModel.text?.length === 0) {
    std.doc.deleteBlock(targetModel);
  }
  //next({ insertedDatabaseBlockId: result[0] });
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
