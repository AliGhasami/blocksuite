//import { AffineSchemas } from '@blocksuite/blocks/schemas'
import { type BlockSchema, DocCollection, Schema, Text } from "@blocksuite/store";
import type { z } from "zod";
export function createEmptyDoc(isBoard: boolean = false,schemas: z.infer<typeof BlockSchema>[]=[]) {
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  //AffineSchemas
  const schema = new Schema().register(schemas)
  //console.log("this is schema",schema)
  const collection = new DocCollection({ schema })
  //console.log("11111",collection);
  collection.meta.initialize()
  //collection.
  //collection.
  const doc = collection.createDoc() //{ id: 'page1' }
  //doc.readonly=true
  //console.log( await collection.importDocSnapshot(data,'11111125'))
  /*collection.importDocSnapshot(data,'11111125').then(()=>{
    console.log("1111")
  })*/
  //const doc =  await collection.importDocSnapshot(data,'11111125')

  return {
    doc,
    init() {
      doc.load(() => {
        //doc.awarenessStore.setFlag('readonly', true);
        /*doc.updateBlock()*/
        const rootId = doc.addBlock('affine:page', {
          //userList:['1','2','3','4','5']
        })
        //doc.addBlocks([],)
        //console.log("this is root id",rootId)
        doc.addBlock('affine:surface', {}, rootId)
        if (!isBoard) {
          const noteId = doc.addBlock('affine:note', {}, rootId)
          doc.addBlock('affine:paragraph', {}, noteId)
          /*********************************/
         /* const delta = [
            { insert: '1', attributes: { bold: true, italic: true } },
            { insert: '2', attributes: { bold: true, underline: true } },
            { insert: '3', attributes: { bold: true, code: true } },
          ];*/
         // const text =  doc.Text.fromDelta(delta);
          //note
         // doc.addBlock('affine:paragraph', {text },noteId);
          /********************************/
          //doc.updateBlock(,{})
         /* doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:paragraph', {}, noteId)*/
        }
      })
      //console.log("this is doc",doc)

      //console.log("this is note id",noteId)

      //doc.addBlock('affine:hint', {title: new Text('this is title'),description:new Text('this is description'),type:'success'}, noteId);
      /*doc.addBlock('affine:paragraph', {text: new Text('1')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('2')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('3')}, noteId);

      doc.addBlock('affine:paragraph', {text: new Text('4')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('5')}, noteId);*/

      return { doc, collection }
    }
  }
}

/*const editor = new AffineEditorContainer();
  editor.doc = doc;
  editor.slots.docLinkClicked.on(({ docId }) => {
    const target = <Doc>collection.getDoc(docId);
    editor.doc = target;
  });
  return { editor, collection };
}
*/
