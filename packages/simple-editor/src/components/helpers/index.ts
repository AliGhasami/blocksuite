import { AffineSchemas } from "@blocksuite/blocks/schemas";
import { DocCollection, type DocCollectionOptions, Schema, Text } from "@blocksuite/store";
import { assertExists } from "@blocksuite/global/utils";

export async function initDefaultDocCollection(collection: DocCollection) {
  const params = new URLSearchParams(location.search);
  await collection.waitForSynced();
  // TODO: must be change with
  const shouldInit = collection.docs.size === 0 && !params.get("room");
  if (shouldInit) {
    collection.meta.initialize();
    // TODO: fix id doc
    const doc = collection.createDoc({ id: "salam" });
    doc.load();
    // TODO: fix edgeless and page customize
    const rootId = doc.addBlock("affine:page", {
      //userList:['1','2','3','4','5']
    });
    //console.log("this is root id",rootId)
    doc.addBlock("affine:surface", {}, rootId);
    const noteId = doc.addBlock("affine:note", {}, rootId);
    doc.addBlock("affine:paragraph", {}, noteId);
    doc.addBlock("affine:surface", {}, rootId);
    doc.resetHistory();
  } else {
    // wait for data injected from provider
    const firstPageId =
      collection.docs.size > 0
        ? collection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          collection.slots.docAdded.once(id => resolve(id))
        );
    const doc = collection.getDoc(firstPageId);
    assertExists(doc);
    doc.load();
    doc.awarenessStore.awareness.states.set(doc.awarenessStore.awareness.clientID,
      {
        user: {
          // TODO: must be change
          name: "Ahmadreza Azizan",
          email: "ar.azizan@gmail.com"
        }
      });
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
  }
}

export function createEmptyDoc(isBoard: boolean = false, options: DocCollectionOptions) {
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  const schema = new Schema().register(AffineSchemas);
  //console.log("this is schema",schema)
  const collection = new DocCollection({ ...options, schema });
  collection.start();
  collection.meta.initialize();
  //collection.
  const doc = collection.createDoc({ id: "salam" });//{ id: 'page1' }
  //console.log( await collection.importDocSnapshot(data,'11111125'))
  /*collection.importDocSnapshot(data,'11111125').then(()=>{
    console.log("1111")
  })*/
  //const doc =  await collection.importDocSnapshot(data,'11111125')

  return {
    doc,
    init() {
      doc.load();
      // doc.load(()=>{
      //
      //   const rootId = doc.addBlock('affine:page', {
      //     //userList:['1','2','3','4','5']
      //   });
      //   //console.log("this is root id",rootId)
      //   doc.addBlock('affine:surface', {}, rootId);
      //   if(!isBoard)
      //   {
      //     const noteId = doc.addBlock('affine:note', {}, rootId);
      //     doc.addBlock('affine:paragraph', {}, noteId);
      //   }
      // });
      //console.log("this is doc",doc)

      //console.log("this is note id",noteId)

      //doc.addBlock('affine:hint', {title: new Text('this is title'),description:new Text('this is description'),type:'success'}, noteId);
      /*doc.addBlock('affine:paragraph', {text: new Text('1')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('2')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('3')}, noteId);

      doc.addBlock('affine:paragraph', {text: new Text('4')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('5')}, noteId);*/

      return { doc, collection };
    }
  };
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
