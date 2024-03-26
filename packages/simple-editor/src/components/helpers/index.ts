import { AffineSchemas } from '@blocksuite/blocks/schemas';
import {DocCollection, Schema, Text} from '@blocksuite/store';

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
      //console.log("this is root id",rootId)
      doc.addBlock('affine:surface', {}, rootId);
      const noteId = doc.addBlock('affine:note', {}, rootId);
      //console.log("this is note id",noteId)
      doc.addBlock('affine:paragraph', {}, noteId);
      //doc.addBlock('affine:paragraph', {text: new Text('Hello World!')}, noteId);
      //doc.addBlock('affine:paragraph', {text: new Text('Hello World!')}, noteId);
      //doc.addBlock('affine:paragraph', {text: new Text('Hello World!')}, noteId);
      //doc.addBlock('affine:paragraph', {text: new Text('Hello World!')}, noteId);
      //doc.addBlock('affine:divider', {}, noteId);
      return {doc,noteId};
    },
  };
}
