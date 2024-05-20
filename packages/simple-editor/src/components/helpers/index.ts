import { AffineSchemas } from '@blocksuite/blocks/schemas';
import {DocCollection, Schema,Text} from '@blocksuite/store';
export function createEmptyDoc() {
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  const schema = new Schema().register(AffineSchemas);
  //console.log("this is schema",schema)
  const collection = new DocCollection({ schema });
  //collection.
  const doc = collection.createDoc();
  //console.log( await collection.importDocSnapshot(data,'11111125'))
  /*collection.importDocSnapshot(data,'11111125').then(()=>{
    console.log("1111")
  })*/
  //const doc =  await collection.importDocSnapshot(data,'11111125')

  return {
    doc,
    init() {
      doc.load();
      //console.log("this is doc",doc)
      const rootId = doc.addBlock('affine:page', {
        //userList:['1','2','3','4','5']
      });
      //console.log("this is root id",rootId)
      doc.addBlock('affine:surface', {}, rootId);
      const noteId = doc.addBlock('affine:note', {}, rootId);
      //console.log("this is note id",noteId)
      doc.addBlock('affine:paragraph', {}, noteId);
      //doc.addBlock('affine:hint', {title: new Text('this is title'),description:new Text('this is description'),type:'success'}, noteId);
      /*doc.addBlock('affine:paragraph', {text: new Text('1')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('2')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('3')}, noteId);

      doc.addBlock('affine:paragraph', {text: new Text('4')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('5')}, noteId);*/

      return {doc,noteId,collection};
    },
  };
}
