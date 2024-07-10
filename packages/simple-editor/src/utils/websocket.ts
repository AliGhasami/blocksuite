import {
  DocCollection,
  type DocCollectionOptions,
  Generator,
  Schema,
  type StoreOptions,
} from "@blocksuite/store";
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  IndexedDBDocSource
} from "@blocksuite/sync";
import { WebSocketDocSource } from "@/utils/websocket/doc";
import { WebSocketAwarenessSource } from "@/utils/websocket/awareness";
import { AffineSchemas } from "@blocksuite/blocks";


export async function initCollaborate() {
  let docSources: StoreOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: StoreOptions['awarenessSources'];

    const ws = new WebSocket(new URL(`?u=aaa-${Math.random()}&r=salam`, 'wss://collab.claytap.com'));
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    })
      .then(() => {
        docSources = {
          main: new IndexedDBDocSource('claytap'),
          shadows: [new WebSocketDocSource(ws)],
        };
        awarenessSources = [new WebSocketAwarenessSource(ws)];
      })
      .catch(() => {
        docSources = {
          main: new IndexedDBDocSource('claytap'),
          shadows: [new BroadcastChannelDocSource()],
        };
        awarenessSources = [
          new BroadcastChannelAwarenessSource('quickEdgeless'),
        ];
      });


    return [docSources, awarenessSources];
}

export async function createDefaultDocCollection() {
  const idGenerator: Generator = Generator.NanoID;
  const schema = new Schema();
  schema.register(AffineSchemas);

  const params = new URLSearchParams(location.search);
  let docSources: StoreOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: StoreOptions['awarenessSources'];
  const room = params.get('room');
  // TODO: must be remove
  if (room) {
    const ws = new WebSocket(
      // TODO ENV variable
      new URL(`?r=${room}&u=u-${Math.random()}`, 'wss://collab.claytap.com')
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
  return collection;
}


