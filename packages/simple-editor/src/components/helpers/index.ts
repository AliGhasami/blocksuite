import { AffineSchemas } from '@blocksuite/blocks/schemas';
import { DocCollection, Schema } from '@blocksuite/store';

export function createEmptyDoc() {
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  const schema = new Schema().register(AffineSchemas);
  //console.log("this is schema",schema)
  const collection = new DocCollection({ schema });
  const doc = collection.createDoc();

  return {
    doc,
    init() {
      doc.load();
      const rootId = doc.addBlock('affine:page', {});
      doc.addBlock('affine:surface', {}, rootId);
      const noteId = doc.addBlock('affine:note', {}, rootId);
      doc.addBlock('affine:paragraph', {}, noteId);
      return doc;
    },
  };
}
