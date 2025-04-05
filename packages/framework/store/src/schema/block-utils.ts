import type { ParagraphBlockModel } from '@blocksuite/affine-model';

export function setDirectionBasedOnText(model: ParagraphBlockModel, doc: any, key: string): void {

  const text = key || '';
  const firstCharType = model.detectFirstCharacterType(text);
  const newDir = firstCharType === 'RTL' ? 'rtl' : 'ltr';
  if (model.dir != newDir) {
    doc.updateBlock(model, { dir: newDir });
  }
}

export function setDirectionOnBlock(model: ParagraphBlockModel, doc: any, text: string): void {
  if(!text) return
  text = text.replace(/^[^a-zA-Z0-9آ-ی۰-۹]+/, '');
  const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  const newDir = rtlChars.test(text[0]) ? 'rtl' : 'ltr';
  const parent = doc.getParent(model);
  
  if (text.length != 0) {
    if (model.dir != newDir) {
      doc.updateBlock(model, { dir: newDir });
      if (parent.flavour === "affine:mahdaad-callout") {
        doc.updateBlock(model.parent, { dir: parent.children[0].dir })
      }
    }
  }
  else {
    delete model.dir
    doc.updateBlock(model, {})
  }
}
