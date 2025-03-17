export function isRTL() {
  return window.$blockEditor.locale == 'fa';
}

import type { BlockModel, Doc } from '@blocksuite/store';

import {
  BlocksUtils,
  type NoteBlockModel,
  type NoteDisplayMode,
  type ParagraphBlockModel,
  type RootBlockModel,
} from '@blocksuite/blocks';

import { headingKeys } from './config.js';

type OutlineNoteItem = {
  note: NoteBlockModel;
  /**
   * the index of the note inside its parent's children property
   */
  index: number;
  /**
   * the number displayed on the outline panel
   */
  number: number;
};

export function getNotesFromDoc(
  doc: Doc,
  modes: NoteDisplayMode[]
): OutlineNoteItem[] {
  const rootModel = doc.root;
  if (!rootModel) return [];

  const notes: OutlineNoteItem[] = [];

  rootModel.children.forEach((block, index) => {
    if (!['affine:note'].includes(block.flavour)) return;

    const blockModel = block as NoteBlockModel;
    const OutlineNoteItem = {
      note: block as NoteBlockModel,
      index,
      number: index + 1,
    };

    if (modes.includes(blockModel.displayMode)) {
      notes.push(OutlineNoteItem);
    }
  });

  return notes;
}

export function isRootBlock(block: BlockModel): block is RootBlockModel {
  return BlocksUtils.matchFlavours(block, ['affine:page']);
}

export function isHeadingBlock(
  block: BlockModel
): block is ParagraphBlockModel {
  return (
    BlocksUtils.matchFlavours(block, ['affine:paragraph']) &&
    headingKeys.has(block.type$.value)
  );
}

// export function getHeadingBlocksFromNote(
//   note: NoteBlockModel,
//   ignoreEmpty = false
// ) {
//   const models = note.children.filter(block => {
//     const empty = block.text && block.text.length > 0;
//     return isHeadingBlock(block) && (!ignoreEmpty || empty);
//   });

//   return models;
// }

// export function getHeadingBlocksFromNote(
//   note: NoteBlockModel,
//   ignoreEmpty = false
// ) {
//   const getHeadings = (block: BlockModel): ParagraphBlockModel[] => {
//     const headings: ParagraphBlockModel[] = [];
//     if (isHeadingBlock(block) && (!ignoreEmpty || (block.text && block.text.length > 0))) {
//       headings.push(block);
//     }
//     block.children.forEach(child => {
//       headings.push(...getHeadings(child));
//     });
//     return headings;
//   };

//   return getHeadings(note);
// }
// export function getHeadingBlocksFromNote(
//   note: NoteBlockModel,
//   ignoreEmpty = false
// ) {
//   const getHeadings = (block: BlockModel): ParagraphBlockModel[] => {
//     const headings: ParagraphBlockModel[] = [];
//     if (isHeadingBlock(block) && (!ignoreEmpty || (block.text && block.text.length > 0))) {
//       headings.push(block);
//     }
//     block.children.forEach(child => {
//       const childHeadings = getHeadings(child);
//       if (childHeadings.length > 0) {
//         headings.push(...childHeadings);
//       }
//     });
//     return headings;
//   };

//   return getHeadings(note);
// }

// export function getHeadingBlocksFromNote(
//   note: NoteBlockModel,
//   ignoreEmpty = false
// ) {
//   const getHeadings = (block: BlockModel): ParagraphBlockModel[] => {
//     const headings: ParagraphBlockModel[] = [];
//     if (isHeadingBlock(block) && (!ignoreEmpty || (block.text && block.text.length > 0))) {
//       const childrenHeadings = block.children.map(child => getHeadings(child)).flat();
//       headings.push({
//         ...block,
//         children: childrenHeadings
//       });
//     } else {
//       block.children.forEach(child => {
//         headings.push(...getHeadings(child));
//       });
//     }
//     return headings;
//   };

//   return getHeadings(note);
// }

export function getHeadingBlocksFromNote(
  note: NoteBlockModel,
  ignoreEmpty = false
) {
  const getHeadings = (block: BlockModel, parentId: string | null = null): any[] => {
    const headings: any[] = [];
    // if (!['affine:'].includes(block.flavour)) return;
    
    // if (['affine:callout'].includes(block?.parent?.flavour)) return;
    if (isHeadingBlock(block) && (!ignoreEmpty || (block.text && block.text.length > 0))) {
      const childrenHeadings = block.children.map(child => getHeadings(child, block.id));
      console.log("block:",block);
      if (block?.parent?.flavour && !['affine:mahdaad-callout'].includes(block?.parent?.flavour)) {
          headings.push({
          id: block.id,
          text: block.text.deltas$?.v[0].insert,
          parentId: block?.parent?.id,
          children: childrenHeadings,
          flavour: block.parent?.flavour,
        });
      }
      
    } else {
      block.children.forEach(child => {
        headings.push(...getHeadings(child, parentId));
      });
    }
    return headings;
  };

  return getHeadings(note);
}

export function getHeadingBlocksFromDoc(
  doc: Doc,
  modes: NoteDisplayMode[],
  ignoreEmpty = false
) {
  const notes = getNotesFromDoc(doc, modes);
  return notes
    .map(({ note }) => getHeadingBlocksFromNote(note, ignoreEmpty))
    .flat();
}