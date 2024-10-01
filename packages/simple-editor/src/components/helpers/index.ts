import { AffineSchemas } from '@blocksuite/blocks/schemas'
import { DocCollection, IdGeneratorType, Schema, Text } from '@blocksuite/store';
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  IndexedDBDocSource,
} from '@blocksuite/sync';
//import { WebSocketAwarenessSource } from '../../_common/sync/websocket/awareness';
import { WebSocketDocSource } from '@blocksuite/playground/apps/_common/sync/websocket/doc';
import { WebSocketAwarenessSource } from '@blocksuite/playground/apps/_common/sync/websocket/awareness';
//import { WebSocketDocSource } from '../../_common/sync/websocket/doc';
export async function createEmptyDoc(isBoard: boolean = false) {

  const schema = new Schema().register(AffineSchemas)

  /***************/
  const idGenerator: IdGeneratorType = IdGeneratorType.NanoID;
  const BASE_WEBSOCKET_URL='wss://collab.claytap.com'
  const params = new URLSearchParams(location.search);
  const room = params.get('room');
  let docSources: StoreOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: StoreOptions['awarenessSources'];

  if (room) {
    const ws = new WebSocket(
      new URL(`?r=${room}&u=u-${Math.random()}`, BASE_WEBSOCKET_URL)
    );
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    })
      .then(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(ws)],
        };
        awarenessSources = [new WebSocketAwarenessSource(ws)];
      })
      .catch(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new BroadcastChannelDocSource()],
        };
        awarenessSources = [
          new BroadcastChannelAwarenessSource('quickEdgeless'),
        ];
      });
  }

  const flags: Partial<BlockSuiteFlags> = Object.fromEntries(
    [...params.entries()]
      .filter(([key]) => key.startsWith('enable_'))
      .map(([k, v]) => [k, v === 'true'])
  );

  const options: DocCollectionOptions = {
    id: 'quickEdgeless',
    schema,
    idGenerator,
    blobSources: {
      main: new IndexedDBBlobSource('quickEdgeless'),
    },
    docSources,
    awarenessSources,
    defaultFlags: {
      enable_synced_doc_block: true,
      enable_pie_menu: true,
      enable_lasso_tool: true,
      ...flags,
    },
  };
  const collection = new DocCollection(options);
  collection.start();
  const shouldInit = true // collection.docs.size === 0 && !params.get('room');


  /*****************/

/*  if(shouldInit){

  }*/
  //const collection = new DocCollection({ schema })
  collection.meta.initialize()
  const doc = collection.createDoc()

  return {
    doc,
    init() {
      doc.load(() => {
        const rootId = doc.addBlock('affine:page', {
        })
        doc.addBlock('affine:surface', {}, rootId)
        if (!isBoard) {
          const noteId = doc.addBlock('affine:note', {}, rootId)
          doc.addBlock('affine:paragraph', {}, noteId)
        }
      })
      doc.resetHistory();
      return { doc, collection }
    }
  }
}
