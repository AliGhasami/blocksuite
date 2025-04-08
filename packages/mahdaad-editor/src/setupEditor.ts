import { nanoid, Schema, Transformer } from '@blocksuite/store'
import { AffineSchemas } from '@blocksuite/affine/schemas'
import { createAutoIncrementIdGenerator, type DocCollectionOptions, TestWorkspace } from '@blocksuite/store/test'
import {
  type BlobSource,
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  MemoryBlobSource,
} from '@blocksuite/sync'
import { MockServerBlobSource } from '@blocksuite/playground/apps/_common/sync/blob/mock-server.ts'
import { SpecProvider } from '@blocksuite/affine-shared/utils'
import * as Y from 'yjs'
import type { InitFn } from '@blocksuite/playground/apps/starter/data'

//todo ali ghasami
const params = new URLSearchParams(location.search);
export function createStarterDocCollection() {
  const blobSourceArgs = []//(params.get('blobSource') ?? '').split(',');
  const room='test_room'
  //todo ali ghasami
  const collectionId =  'starter'; //room ??
  const schema = new Schema();
  schema.register(AffineSchemas);
  const idGenerator =  nanoid; //isE2E ? createAutoIncrementIdGenerator() :
  let docSources: DocCollectionOptions['docSources'];
  if (room) {
    docSources = {
      main: new BroadcastChannelDocSource(`broadcast-channel-${room}`),
    };
  }
  const id =  `starter-${Math.random().toString(16).slice(2, 8)}`; //room ??

  const blobSources = {
    main: new MemoryBlobSource(),
    shadows: [] as BlobSource[],
  } satisfies DocCollectionOptions['blobSources'];
  if (blobSourceArgs.includes('mock')) {
    blobSources.shadows.push(new MockServerBlobSource(collectionId));
  }
  if (blobSourceArgs.includes('idb')) {
    blobSources.shadows.push(new IndexedDBBlobSource(collectionId));
  }

  const options: DocCollectionOptions = {
    id: collectionId,
    idGenerator,
    awarenessSources: [new BroadcastChannelAwarenessSource(id)],
    docSources,
    blobSources,
  };
  const collection = new TestWorkspace(options);
  collection.storeExtensions = SpecProvider._.getSpec('store').value;
  collection.start();

  // debug info
  window.collection = collection;
  window.blockSchemas = AffineSchemas;
  window.job = new Transformer({
    schema,
    blobCRUD: collection.blobSync,
    docCRUD: {
      create: (id: string) => collection.createDoc({ id }),
      get: (id: string) => collection.getDoc(id),
      delete: (id: string) => collection.removeDoc(id),
    },
  });
  window.Y = Y;

  return collection;
}

export async function initStarterDocCollection(collection: TestWorkspace) {
  // use built-in init function
  const functionMap = new Map<
    string,
    (collection: TestWorkspace, id: string) => Promise<void> | void
  >();
  Object.values(
    (await import('../../playground/apps/starter/data/index.ts')) as Record<string, InitFn>
  ).forEach(fn => functionMap.set(fn.id, fn));
  const init = params.get('init') || 'preset';
  if (functionMap.has(init)) {
    collection.meta.initialize();
    await functionMap.get(init)?.(collection, 'doc:home');
    const doc = collection.getDoc('doc:home');
    if (!doc?.loaded) {
      doc?.load();
    }
    doc?.resetHistory();
  }
}


