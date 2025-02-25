import type { ParagraphBlockModel } from '@blocksuite/affine-model';

export function setDirectionBasedOnText(model: ParagraphBlockModel, doc: any, key:string): void {
 
  const text = key || '';
  const firstCharType = model.detectFirstCharacterType(text);
  const newDir = firstCharType === 'RTL' ? 'rtl' : 'ltr';
  if (model.dir != newDir) {
    doc.updateBlock(model, { dir: newDir }); // Update the block with the new direction
  }
  // return model.dir !== newDir ? newDir : model.dir;
}