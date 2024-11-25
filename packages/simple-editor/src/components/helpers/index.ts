//import { AffineSchemas } from '@blocksuite/blocks/schemas'
import { type BlockSchema, DocCollection, type DocCollectionOptions, Schema, Text } from "@blocksuite/store";
import type { z } from "zod";
import { IndexedDBDocSource } from "@blocksuite/sync";
import { WebSocketDocSource } from "@blocksuite/playground/apps/_common/sync/websocket/doc";
import { WebSocketAwarenessSource } from "@blocksuite/playground/apps/_common/sync/websocket/awareness";
import { assertExists } from "@blocksuite/global/utils";
export async function createEmptyDoc(isBoard: boolean = false,schemas: z.infer<typeof BlockSchema>[]=[]) {
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  //AffineSchemas
  const BASE_WEBSOCKET_URL= 'wss://blocksuite-playground.toeverything.workers.dev'
  const schema = new Schema().register(schemas)


  const params = new URLSearchParams(location.search);
  let docSources: DocCollectionOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: DocCollectionOptions['awarenessSources'];
  const room = params.get('room');

  if (room) {
    const ws = new WebSocket(new URL(`/room/${room}`, BASE_WEBSOCKET_URL));
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    })
      .then(() => {
        console.log("the Socket connected");
        // console.log("10000");
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(ws)],
        };
        awarenessSources = [new WebSocketAwarenessSource(ws)];
      })
      .catch(() => {
        alert('this is catch')
        /*docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new BroadcastChannelDocSource()],
        };*/
        /*awarenessSources = [
          new BroadcastChannelAwarenessSource('quickEdgeless'),
        ];*/
      });
  }

  //console.log("this is schema",schema)
  const collection = new DocCollection({ schema,id:'test_id',docSources,awarenessSources,defaultFlags: {
      enable_synced_doc_block: true,
      enable_pie_menu: true,
      enable_lasso_tool: true,
    }, })
  collection.start();
  await collection.waitForSynced();
  //console.log("11111",collection);

  //collection.
  //collection.
  console.log("this is collection",collection);
  let doc=null
  if(collection.docs.size === 0){
     // debugger
   // collection.docs.size === 0
    collection.meta.initialize()
    doc = collection.createDoc({id:'page1'})
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      //userList:['1','2','3','4','5']
    })
    doc.addBlock('affine:surface', {}, rootId)
    if (!isBoard) {
      const noteId = doc.addBlock('affine:note', {}, rootId)
      doc.addBlock('affine:paragraph', {}, noteId)
    }
  }else{
    //doc=collection.doc.get()

    const firstPageId =
      collection.docs.size > 0
        ? collection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          collection.slots.docAdded.once(id => resolve(id))
        );
    if (!firstPageId) {
      throw new Error('No first page id found');
    }
    doc = collection.getDoc(firstPageId);
    //console.log("9999",doc);
    assertExists(doc);
    doc.load();
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
  }
  //const doc = collection.createDoc({id:'page1'}) //{ id: 'page1' }
  //doc.readonly=true
  //console.log( await collection.importDocSnapshot(data,'11111125'))
  /*collection.importDocSnapshot(data,'11111125').then(()=>{
    console.log("1111")
  })*/
  //const doc =  await collection.importDocSnapshot(data,'11111125')

  return {
    doc,
    collection
    /*init() {
      doc.load(() => {
        //doc.awarenessStore.setFlag('readonly', true);
        /!*doc.updateBlock()*!/
        const rootId = doc.addBlock('affine:page', {
          //userList:['1','2','3','4','5']
        })
        //doc.addBlocks([],)
        //console.log("this is root id",rootId)
        doc.addBlock('affine:surface', {}, rootId)
        if (!isBoard) {
          const noteId = doc.addBlock('affine:note', {}, rootId)
          doc.addBlock('affine:paragraph', {}, noteId)
          /!*********************************!/
         /!* const delta = [
            { insert: '1', attributes: { bold: true, italic: true } },
            { insert: '2', attributes: { bold: true, underline: true } },
            { insert: '3', attributes: { bold: true, code: true } },
          ];*!/
         // const text =  doc.Text.fromDelta(delta);
          //note
         // doc.addBlock('affine:paragraph', {text },noteId);
          /!********************************!/
          //doc.updateBlock(,{})
         /!* doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:mahdaad-object', {}, noteId)
          doc.addBlock('affine:paragraph', {}, noteId)*!/
        }
      //  doc.resetHistory();
      })
      //console.log("this is doc",doc)

      //console.log("this is note id",noteId)

      //doc.addBlock('affine:hint', {title: new Text('this is title'),description:new Text('this is description'),type:'success'}, noteId);
      /!*doc.addBlock('affine:paragraph', {text: new Text('1')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('2')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('3')}, noteId);

      doc.addBlock('affine:paragraph', {text: new Text('4')}, noteId);
      doc.addBlock('affine:paragraph', {text: new Text('5')}, noteId);*!/

      return { doc, collection }
    }*/
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
