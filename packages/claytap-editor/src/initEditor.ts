/*
import { AffineSchemas } from '@blocksuite/affine/schemas';
import { SpecProvider } from '@blocksuite/affine/shared/utils';
import { nanoid, Schema, type Store, Transformer } from '@blocksuite/affine/store'
import {
  createAutoIncrementIdGenerator,
  type DocCollectionOptions,
  TestWorkspace,
} from '@blocksuite/affine/store/test';
import {
  type BlobSource,
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  MemoryBlobSource,
} from '@blocksuite/affine/sync';
import * as Y from 'yjs';
import { MockServerBlobSource } from '../../playground/apps/_common/sync/blob/mock-server';
import type { InitFn } from '../data/utils.js';
import { DocModeProvider } from '@blocksuite/affine/shared/services';
import type { Workspace } from '@blocksuite/affine/store';
import { TestAffineEditorContainer } from '@blocksuite/integration-test';

import {
  getDocFromUrlParams,
  listenHashChange,
  setDocModeFromUrlParams,
} from '../../playground/apps/_common/history.js';
import { createTestEditor } from '../../playground/apps/starter/utils/extensions'
import { StarterDebugMenu } from '../../playground/apps/_common/components/starter-debug-menu'
import { DocsPanel } from '../../playground/apps/_common/components/docs-panel'
import { CustomFramePanel } from '../../playground/apps/_common/components/custom-frame-panel'
import { CustomOutlinePanel } from '../../playground/apps/_common/components/custom-outline-panel'
import { CustomOutlineViewer } from '../../playground/apps/_common/components/custom-outline-viewer'
import { LeftSidePanel } from '../../playground/apps/_common/components/left-side-panel'
import { CommentPanel } from '../../playground/apps/comment'
import { AttachmentViewerPanel } from '../../playground/apps/_common/components/attachment-viewer-panel'
//import { createTestApp } from '../../ ./app.js';

const params = new URLSearchParams(location.search);
const room = params.get('room');
const isE2E = room?.startsWith('playwright');
const blobSourceArgs = (params.get('blobSource') ?? '').split(',');

export async function createTestApp(doc: Store, collection: Workspace) {
  const app = document.querySelector('#qaz');
  if (!app) {
    throw new Error('Cannot find app root element(#app).');
  }
  const editor = createTestEditor(doc, collection);

  app.append(editor);
  await editor.updateComplete;

  const debugMenu = new StarterDebugMenu();
  const docsPanel = new DocsPanel();
  const framePanel = new CustomFramePanel();
  const outlinePanel = new CustomOutlinePanel();
  const outlineViewer = new CustomOutlineViewer();
  const leftSidePanel = new LeftSidePanel();
  const commentPanel = new CommentPanel();
  const attachmentViewerPanel = new AttachmentViewerPanel();

  docsPanel.editor = editor;
  framePanel.editor = editor;
  outlinePanel.editor = editor;
  outlineViewer.editor = editor;
  outlineViewer.toggleOutlinePanel = () => {
    outlinePanel.toggleDisplay();
  };

  debugMenu.collection = collection;
  debugMenu.editor = editor;
  debugMenu.outlinePanel = outlinePanel;
  debugMenu.outlineViewer = outlineViewer;
  debugMenu.framePanel = framePanel;
  debugMenu.leftSidePanel = leftSidePanel;
  debugMenu.docsPanel = docsPanel;

  debugMenu.commentPanel = commentPanel;

  commentPanel.editor = editor;

  document.body.append(attachmentViewerPanel);
  document.body.append(outlinePanel);
  document.body.append(outlineViewer);
  document.body.append(framePanel);
  document.body.append(leftSidePanel);
  document.body.append(debugMenu);

  window.editor = editor;
  window.doc = doc;
  Object.defineProperty(globalThis, 'host', {
    get() {
      return document.querySelector('editor-host');
    },
  });
  Object.defineProperty(globalThis, 'std', {
    get() {
      return document.querySelector('editor-host')?.std;
    },
  });

  return editor;
}


export function createStarterDocCollection(_options :  DocCollectionOptions) {
  //const collectionId = room ?? 'starter';
  const schema = new Schema();
  schema.register(AffineSchemas);
  const idGenerator = nanoid;

  let docSources: DocCollectionOptions['docSources'];
  if (room) {
    docSources = {
      main: new BroadcastChannelDocSource(`broadcast-channel-${room}`),
    };
  }
  const id = room ?? `starter-${Math.random().toString(16).slice(2, 8)}`;

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
 /!* collection.meta.initialize();
  await functionMap.get(init)?.(collection, 'doc:home');
  const doc = collection.getDoc('doc:home');
  if (!doc?.loaded) {
    doc?.load();
  }
  doc?.resetHistory();*!/
 /!* const init = params.get('init') || 'preset';
  if (init) {

    // use built-in init function
    /!*const functionMap = new Map<
      string,
      (collection: TestWorkspace, id: string) => Promise<void> | void
    >();
    Object.values(
      (await import('../data/index.js')) as Record<string, InitFn>
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
    }*!/
  }*!/
}



export async function mountDefaultDocEditor(collection: Workspace) {
  const app = document.getElementById('qaz');
  if (!app) return;

  const url = new URL(location.toString());
  const doc = getDocFromUrlParams(collection, url);

  const editor = await createTestApp(doc, collection);

  const modeService = editor.std.provider.get(DocModeProvider);
  editor.mode = modeService.getPrimaryMode(doc.id);
  setDocModeFromUrlParams(modeService, url.searchParams, doc.id);

  // for multiple editor
  const params = new URLSearchParams(location.search);
  const init = params.get('init');
  if (init && init.startsWith('multiple-editor')) {
    app.childNodes.forEach(node => {
      if (node instanceof TestAffineEditorContainer) {
        node.style.flex = '1';
        if (init === 'multiple-editor-vertical') {
          node.style.overflow = 'auto';
        }
      }
    });
  }

  listenHashChange(collection, editor);

  return editor;
}




*/
