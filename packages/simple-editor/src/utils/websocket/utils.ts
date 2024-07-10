import { DocCollection, Text } from "@blocksuite/store";
import { assertExists } from "@blocksuite/global/utils";

const BASE_URL = new URL(import.meta.env.PLAYGROUND_SERVER);
export async function generateRoomId(): Promise<string> {
  return fetch(new URL('/room/', BASE_URL), {
    method: 'post',
  })
    .then(res => res.json())
    .then(({ id }) => id);
}



export async function initDefaultDocCollection(collection: DocCollection) {
  const params = new URLSearchParams(location.search);
  await collection.waitForSynced();
  const shouldInit = collection.docs.size === 0 && !params.get('room');
  if (!shouldInit) {
    collection.meta.initialize();
    const doc = collection.createDoc({ id: 'doc:home' });
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      title: new Text(),
    });
    doc.addBlock('affine:surface', {}, rootId);
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
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
  }
}