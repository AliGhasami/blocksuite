<template>
  <div>
<!--        <Button @click="handleClick">start collabration</Button>-->
    <!--    {{ schemas.length }}-->
    <div class="vue-block-board-editor">
      <div ref="refEditor" :class="[props.isBoardView ? 'board' : 'editor']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css'
import { EdgelessEditor, PageEditor } from '@blocksuite/presets'
//import { createEmptyDoc } from './helpers'
import {
  Block,
  type BlockCollection,
  type BlockModel,
  Doc,
  DocCollection,
  type DocCollectionOptions,
  IdGeneratorType,
  Job,
  Schema,
  Text
} from "@blocksuite/store";
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, toRaw, unref, watch } from "vue";
import { AffineSchemas, replaceIdMiddleware, toolsList } from '@blocksuite/blocks'
import 'tippy.js/dist/tippy.css'
import resources from './locale/resources'
import i18next from 'i18next'
import { initLitI18n } from 'lit-i18n'
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBDocSource
} from '@blocksuite/sync'
import { WebSocketDocSource } from '@blocksuite/playground/apps/_common/sync/websocket/doc'
import { WebSocketAwarenessSource } from '@blocksuite/playground/apps/_common/sync/websocket/awareness'
import { assertExists } from '@blocksuite/global/utils'
/*import {
  mockDocModeService,
  mockNotificationService,
  mockQuickSearchService
} from "@blocksuite/playground/apps/_common/mock-services";
import { getExampleSpecs } from "@blocksuite/playground/apps/default/specs-examples";
import type { BlockSpec, EditorHost } from "@blocksuite/block-std";*/
//import { useRouter } from 'vue-router'
import { get } from "lodash";
//import { useWebSocket } from "@vueuse/core";
//import router from "@/router";
//import { LeftSidePanel } from "@blocksuite/playground/apps/_common/components/left-side-panel";
//import { DocsPanel } from "@blocksuite/playground/apps/_common/components/docs-panel";
//import { QuickEdgelessMenu } from "@blocksuite/playground/apps/_common/components/quick-edgeless-menu";

const refEditor = ref<HTMLElement | null>(null)
const currentDocument = ref<Doc | null>(null)
const editorElement = ref<EdgelessEditor | PageEditor | null>(null)
const isEmpty = ref<boolean>(false)
let myCollection: DocCollection | null = null
/*window.$blockEditor = {
}*/

interface Props {
  isBoardView?: boolean
  mentionUserList?: any[]
  uploadUrl?: string
  storageUrl?: string
  apiToken?: string
  readonly?: boolean
  locale?: 'fa' | 'en'
  disableTools?: string[]
  objectId?: string | null
  userId?: string | null
  userColor?: string | null
  isCollaboration?:boolean
}

type IBlockChange =
  | {
      type: 'add'
      id: string
      flavour: string
    }
  | {
      type: 'delete'
      id: string
      flavour: string
      parent: string
      model: BlockModel
    }
  | {
      type: 'update'
      id: string
      flavour: string
      props: { key: string }
    }

const props = withDefaults(defineProps<Props>(), {
  isBoardView: false,
  readonly: false,
  mentionUserList: () => [],
  locale: 'en',
  disableTools: () => [],
  isCollaboration:false
})

i18next.use(initLitI18n).init({
  lng: props.locale ?? 'en',
  resources
})

watch(
  () => props.objectId,
  () => {
    if (props.objectId) {
      if (currentDocument.value) {
        myCollection?.setDocMeta(currentDocument.value.id, { object_id: props.objectId })
        //console.log("rrrrrrrrrrrrr",props.objectId,currentDocument.value);
      }
    }
  },
  { immediate: true }
)

watch(currentDocument, () => {
  if (props.objectId) {
    myCollection?.setDocMeta(currentDocument.value.id, { object_id: props.objectId })
  }
})

watch(
  [() => props.userId, () => props.userColor],
  () => {
    if (myCollection) {
      if (props.userId) {
        myCollection.awarenessStore.awareness.setLocalStateField('user', {
          user_id: props.userId,
          color: props.userColor
        })
      } else {
        myCollection.awarenessStore.awareness.setLocalStateField('user', { user_id: null })
      }
    }
  },
  { immediate: true }
)

const emit = defineEmits<{
  (e: 'change', val: IBlockChange): void
  (e: 'addBlock', val: IBlockChange): void
  (e: 'deleteBlock', val: IBlockChange): void
  (e: 'updateBlock', val: IBlockChange): void
  (e: 'addObjectLink', val: IBlockChange): void
  (e: 'deleteObjectLink', val: IBlockChange): void
}>()

const schemas = computed(() => {
  const temp = props.disableTools.map((item) => toolsList[item])
  return AffineSchemas.filter((item) => !temp.includes(item.model.flavour))
})

function handleClick() {

  init()

 /* console.log('current docsss', myCollection?.docs)
  console.log('current doc', currentDocument.value)*/
  /*if(myCollection){
    //myCollection.docSync.shadows=[]
  }*/

  /*************************/
  //currentDocument.value?.addBlock
  //const { doc } = window;
  /*const rootId = doc.addBlock('affine:page', {
    title: new doc.Text(),
  });*/
  //const note =  doc.addBlock('affine:note', {}, rootId);
  /*const doc=unref(toRaw(currentDocument.value))
  //console.log("currentDocument",currentDocument.value);
  //console.log("this is temp",temp);
  const noteList = doc.getBlockByFlavour('affine:note')
  const note = noteList.length ? noteList[0] : null
  console.log("note",note);
  if(note){
    const delta = [
      { insert: ' ', attributes: { date:{
            date: '2024/05/06',
            time: null,
            id: '111111',
          } } },
      { insert: '2', attributes: { bold: true, underline: true } },
      { insert: '3', attributes: { bold: true, code: true } },
    ];
    const text =  doc.Text.fromDelta(delta);
    //note
    doc.addBlock('affine:paragraph', { text },note.id );*/
  // }
  /*******************************/
  //console.log("editor",editor.specs);
  //editorElement.value = new PageEditor()
  //  const temp= editorElement.value.specs.filter(item=> item.schema.model.flavour!='affine:mahdaad-object')
  //affine:page
  //  console.log("1111",temp);
  //console.log("2222",temp);
  //  editorElement.value.specs = temp

  //editorElement.value.doc=currentDocument.value
  //appendTODOM(editorElement.value)
  //editorElement.value?.doc.clear()
  //editorElement.value.doc= currentDocument.value
  //editorElement.value?.updateComplete
  //console.log("111",editorElement.value);
  //console.log("1111",currentDocument.value);
  //editorElement.value.doc= currentDocument.value
  //currentDocument.value?.
  // appendTODOM(editorElement.value)
}

watch(
  () => props.isBoardView,
  () => {
    // init()
  }
)

watch(
  () => props.locale,
  () => {
    i18next.changeLanguage(props.locale)
  },
  { immediate: true }
)

watch(
  () => [props.uploadUrl, props.storageUrl, props.apiToken, props.locale],
  () => {
    const temp = {
      uploadUrl: props.uploadUrl ?? '',
      storageUrl: props.storageUrl ?? '',
      apiToken: props.apiToken ?? '',
      locale: props.locale ?? 'en'
    }

    if (window.$blockEditor) {
      Object.assign(window.$blockEditor, temp)
    } else {
      window.$blockEditor = temp
    }
  },
  { immediate: true }
)


async function getData() {
  if (myCollection) {
    return await exportData(myCollection, [currentDocument.value])
  }
  return null
}

watch(
  () => props.readonly,
  () => {
    checkReadOnly()
  },
  { immediate: true }
)

function checkReadOnly() {
  if (currentDocument.value) {
    currentDocument.value.awarenessStore.setReadonly(
      currentDocument.value.blockCollection,
      props.readonly
    )
  }
}


async function setData(data: any, clear_history?: boolean = true) {
  console.log("this is data",data);
  if(myCollection && currentDocument.value){
    //debugger
    //myCollection.
    const doc=toRaw(unref(currentDocument.value)) //currentDocument.value as Doc
    console.log("this is doc",doc);
    const blocks = get(data, 'blocks.children', []);
    const note = blocks.find(item => item.flavour == 'affine:note');
    const noteChildren = get(note, 'children', []);
    if (noteChildren.length > 0) {
      //todo ali ghasami for user schemas.value
      const schema = new Schema().register(AffineSchemas);
      const collection = new DocCollection({ schema });
      const job = new Job({
        collection: collection,
        middlewares: [replaceIdMiddleware],
      });
      const notes :BlockModel[] = doc.getBlocksByFlavour('affine:note');
      //const id = doc.
      //console.log("|1111",notes,notes[0].id);
      let index=1
      //doc.load()
      if (notes.length > 0) {
        console.log("11111",notes[0]);
        notes[0].model.children.forEach(item=>{
          doc.deleteBlock(item)
        })
        for (const item of noteChildren) {
          await job.snapshotToBlock(item, doc,notes[0].id,index++); // parent.id, insertIndex++
        }
        //const parent = doc.getParent(this.model);
       /* if (parent) {
          const targetIndex =
            parent.children.findIndex(({ id }) => id === this.model.id) ?? 0;
          let insertIndex = targetIndex + 1; //place === 'before' ? targetIndex :

        }*/
      }
    }
    //const doc = this.model.doc;
    ///console.log('14141444', content);
  }
  //old method (before collabration)
  /*if (myCollection) {
    if (props.isBoardView) {
      editorElement.value = new EdgelessEditor()
    } else {
      editorElement.value = new PageEditor()
    }
    const job = new Job({ collection: myCollection, middlewares: [replaceIdMiddleware] })
    const new_doc = await job.snapshotToDoc(data)
    bindEvent(new_doc)
    editorElement.value.doc = new_doc
    currentDocument.value = new_doc
    checkIsEmpty()
    if (clear_history) {
      new_doc?.resetHistory()
    }
    appendTODOM(editorElement.value)
    checkNotEmptyDocBlock(currentDocument.value)
    checkReadOnly()
  }*/
}

/**
 * @deprecated
 */
function reset() {
  //init()
}

function bindEvent(doc: Doc) {
  doc.slots.blockUpdated.on((data) => {
    checkNotEmptyDocBlock(doc)
    checkIsEmpty()
    emit('change', data)
    if (data.type == 'add') {
      if (data.flavour == 'affine:mahdaad-object') {
        emit('addObjectLink', data)
      }
      emit('addBlock', data)
    }
    if (data.type == 'delete') {
      if (data.flavour == 'affine:mahdaad-object') {
        emit('deleteObjectLink', data)
      }
      emit('deleteBlock', data)
    }
    if (data.type == 'update') emit('updateBlock', data)
  })
}

function checkNotEmptyDocBlock(doc: Doc) {
  const noteList = doc.getBlockByFlavour('affine:note')
  const note = noteList.length ? noteList[0] : null
  if (note) {
    if (
      note.children.length == 0 ||
      (note.children.length > 0 &&
        note.children[note.children.length - 1].flavour != 'affine:paragraph') ||
      (note.children.length > 0 &&
        note.children[note.children.length - 1].flavour == 'affine:paragraph' &&
        note.children[note.children.length - 1].text?.length != 0)
    ) {
      doc.addBlock('affine:paragraph', {}, note)
      doc.addBlock('affine:paragraph', {}, note)
      /*nextTick(()=>{
      })*/
      //doc.addBlock('affine:paragraph', {}, note)
    }
  }
}

function appendTODOM(element: HTMLElement) {
  if (refEditor.value) {
    const children = refEditor.value.children
    if (children.length) {
      refEditor.value.removeChild(children[0])
    }
    refEditor.value.appendChild(element)
  }
}

/**
 * @deprecated
 */
/*watch(
  () => props.mentionUserList,
  () => {
    updateMentionList()
  },
  { deep: true }
)*/
//todo ali ghasami
/*watch(()=>props.objectId,()=>{
  console.log("this is object id 22222222222222");
  //console.log("100000");

})*/

//const router = useRouter()
/*watch(()=>router.currentRoute.value.query.id,()=>{
  if(router.currentRoute.value.query.id){
    console.log("this is object id 111111",myCollection);
    init()
  }

})*/

onBeforeUnmount(() => {
  myCollection?.waitForGracefulStop()
  myCollection?.forceStop()
  //myCollection?.forceStop()
})
//let status=false
async function init() {
  /* const request = indexedDB.open("blocksuite-local", 1);

  request.onerror = function(event) {
    console.error("Database error: ", event.target.error);
  };

  request.onsuccess = function(event) {
    console.log("Database opened successfully");
    const db = event.target.result;
  };*/

  //indexedDB.deleteDatabase('')
  /*let request = indexedDB.deleteDatabase('blocksuite-local');
  request.onsuccess = function () {
    console.log("Database deleted successfully");
  };

  request.onerror = function (event) {
    console.error("Error deleting database:", event.target.error);
  };

  request.onblocked = function () {
    console.warn("Database deletion blocked. Close all connections.");
  };*/

  //return
  //todo remove ali ghasami
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  const objectId = props.objectId
  const edgelessId = `edgeless_${objectId}`
  //const room = objectId
  //params.get('id');
  //console.log('object id', objectId)

  /*const dbRequest = indexedDB.open("blocksuite-local", 1);

  dbRequest.onerror = function(event) {
    console.error("Database error:");
  };

  dbRequest.onsuccess = function(event) {
    const db = event.target.result;
    console.log("Database connected successfully");

    // حذف رکورد با استفاده از کلید
    //deleteRecord(db, "collection", objectId);
    //deleteRecord(db, "collection", edgelessId);
  };

// تابعی برای حذف رکورد بر اساس کلید
  function deleteRecord(db, storeName, key) {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const deleteRequest = store.delete(key);

    deleteRequest.onsuccess = function() {
      console.log("Record deleted successfully");
    };

    deleteRequest.onerror = function(event) {
      console.error("Error deleting record:", event.target.error);
    };
  }*/

  //return

  /*await new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(true)
    },50000)
  })*/

  // Function to clear all records in the specified object store
  /* function clearObjectStore(db, storeName) {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const clearRequest = store.clear();

    clearRequest.onsuccess = function() {
      console.log("Object store cleared successfully");
    };

    clearRequest.onerror = function(event) {
      console.error("Error clearing object store:", event.target.error);
    };
  }*/
  //return

  //console.log("this is init");
  /****************************************************/
  //const BASE_WEBSOCKET_URL = 'wss://blocksuite-playground.toeverything.workers.dev'
  //const BASE_WEBSOCKET_URL = 'wss://collab.claytap.com'

  //return
  //const BASE_WEBSOCKET_URL = 'ws://localhost:8080'
  const BASE_WEBSOCKET_URL = 'wss://sence.misdc.com'
  /* if(!window.$blockEditor.wss){
    const { status, data, send, open, close,ws } = useWebSocket(`${BASE_WEBSOCKET_URL}?r=${room}&u=${Math.ceil(Math.random()*50)}`)
    window.$blockEditor.wss= ws.value
  }*/

  const idGenerator: IdGeneratorType = IdGeneratorType.NanoID
  const schema = new Schema()
  schema.register(schemas.value)
  //schema.register(AffineSchemas)

  //const params = new URLSearchParams(location.search);
  let docSources: DocCollectionOptions['docSources'] = {
    main: new IndexedDBDocSource()
  }
  let awarenessSources: DocCollectionOptions['awarenessSources']

  if (objectId) {
    //const ws = new WebSocket(new URL(`/room/${room}`, BASE_WEBSOCKET_URL));
    //const ws = new WebSocket(`${BASE_WEBSOCKET_URL}?r=${room}&u=test`)
    //console.log("windowsssss",window.$blockEditor);
    if (
      !window.$blockEditor.wss ||
      (window.$blockEditor.wss && window.$blockEditor.wss.readyState === WebSocket.CLOSED)
    ) {
      //const {  data, send, open, close,ws,status } = useWebSocket(`${BASE_WEBSOCKET_URL}?r=${room}&u=${Math.ceil(Math.random()*50)}`)
      window.$blockEditor.wss = new WebSocket(
        `${BASE_WEBSOCKET_URL}?r=${objectId}&u=${Math.ceil(Math.random() * 50)}`
      )
    }
    const web_socket: WebSocket = window.$blockEditor.wss
    //console.log("status",web_socket.OPEN);
    //console.log();
    //ws.close()
    //console.log("this is ws",ws);
    //ws.close()

    const  InitDoc = async () =>{
      console.log('start initttttt doc')
      console.log('this is find doc', myCollection.getDoc(objectId))
      //console.log('this is block size', myCollection.getDoc(objectId)?.blockSize)
      //const shouldInit = myCollection.docs.size === 0 //&& !params.get('id');
      const shouldInit = !myCollection.getDoc(objectId)
      console.log('shouldInit', shouldInit)
      //myCollection.meta.initialize();
      if (shouldInit) {
        myCollection.meta.initialize()
        const doc = myCollection.createDoc({ id: objectId }) //'doc:home'
        //myCollection.docSync()
        //myCollection.
        doc.load()
        //collection.docs.
        const rootId = doc.addBlock('affine:page', {
          //title: new Text()
        })
        doc.addBlock('affine:surface', {}, rootId)
        if (!props.isBoardView) {
          const noteId = doc.addBlock('affine:note', {}, rootId)
          doc.addBlock('affine:paragraph', {}, noteId)
        }
        doc.resetHistory()
      } else {
        // debugger
        // wait for data injected from provider
        /*const firstPageId =
          myCollection.docs.size > 0
            ? myCollection.docs.keys().next().value
            : await new Promise<string>(resolve =>
              myCollection.slots.docAdded.once(id => resolve(id))
            );*/
        const doc = myCollection.getDoc(objectId)
        console.log('this is original doc for set ', doc)
        assertExists(doc)
        doc.load()
        // wait for data injected from provider
        if (!doc.root) {
          await new Promise((resolve) => doc.slots.rootAdded.once(resolve))
        }
        doc.resetHistory()
      }

      const blockCollection = myCollection.docs.values().next().value as BlockCollection
      assertExists(blockCollection, 'Need to create a doc first')
      const doc = blockCollection.getDoc()
      assertExists(doc.ready, 'Doc is not ready')
      assertExists(doc.root, 'Doc root is not ready')

      //const app = document.getElementById('app');
      /* const app = refEditor.value;
       if (!app) return;*/
      if (props.isBoardView) {
        editorElement.value = new EdgelessEditor()
      } else {
        editorElement.value = new PageEditor()
      }
      console.log('this is set  doc', doc)
      //myCollection.awarenessStore.awareness.setLocalStateField('user',{name:'ali ghasami'})
      myCollection.awarenessStore.awareness.setLocalStateField('user', {
        user_id: props.userId,
        color: props.userColor
      })
      currentDocument.value = doc
      editorElement.value.doc = doc
      checkIsEmpty()
      //console.log('111111', doc.blockSize)
      //todo ali ghasami for remove after
      const temp = await exportData(myCollection, [currentDocument.value])
      console.log('this is snap shoot ', temp)
      bindEvent(doc)
      appendTODOM(editorElement.value)
      checkNotEmptyDocBlock(currentDocument.value)
      checkReadOnly()
    }

    await new Promise((resolve, reject) => {
      //console.log("1111",web_socket.OPEN);
      if (web_socket.readyState === WebSocket.OPEN) resolve(true)
      // console.log("2222");
      web_socket.addEventListener('open', resolve)
      web_socket.addEventListener('error', reject)
      //web_socket.ope
    })
      .then(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(web_socket, objectId, InitDoc)]
        }
        awarenessSources = [new WebSocketAwarenessSource(web_socket)]
      })
      .catch(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new BroadcastChannelDocSource()]
        }
        awarenessSources = [
          //new BroadcastChannelAwarenessSource('quickEdgeless'),
          new BroadcastChannelAwarenessSource(edgelessId)
        ]
      })
  }

  /*const flags: Partial<BlockSuiteFlags> = Object.fromEntries(
    [...params.entries()]
      .filter(([key]) => key.startsWith('enable_'))
      .map(([k, v]) => [k, v === 'true'])
  );*/

  const options: DocCollectionOptions = {
    //id: 'quickEdgeless',
    id: edgelessId,
    schema,
    idGenerator,
    /*blobSources: {
      main: new IndexedDBBlobSource('quickEdgeless'),
      //main: new IndexedDBBlobSource(edgelessId),
    },*/
    docSources,
    awarenessSources,
    defaultFlags: {
      enable_synced_doc_block: true,
      enable_pie_menu: true,
      enable_lasso_tool: true
      // ...flags,
    }
  }
  myCollection = new DocCollection(options)
  myCollection.start()
  //myCollection.
  // debug info
  /* window.collection = collection;
  window.blockSchemas = AffineSchemas;
  window.job = new Job({ collection });
  window.Y = DocCollection.Y;*/

  //const params = new URLSearchParams(location.search);
  console.log('before waitForSynced')
  await myCollection.waitForSynced()
  console.log('after waitForSynced')
  /*await new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(true)
    },5000)
  })*/

  /*console.log("this is find doc",myCollection.getDoc(objectId));
  console.log("this is block size",myCollection.getDoc(objectId)?.blockSize);
  //const shouldInit = myCollection.docs.size === 0 //&& !params.get('id');
  const shouldInit = !myCollection.getDoc(objectId)
  console.log("shouldInit",shouldInit);
  //myCollection.meta.initialize();
  if (shouldInit) {
    myCollection.meta.initialize();
    const doc = myCollection.createDoc({ id:objectId });//'doc:home'
    //myCollection.docSync()
    //myCollection.
    doc.load();
    //collection.docs.
    const rootId = doc.addBlock('affine:page', {
      title: new Text(),
    });
    const noteId = doc.addBlock('affine:note', {}, rootId)
    doc.addBlock('affine:paragraph', {}, noteId)
    doc.addBlock('affine:surface', {}, rootId);
    doc.resetHistory();
  } else {
   // debugger
    // wait for data injected from provider
    /!*const firstPageId =
      myCollection.docs.size > 0
        ? myCollection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          myCollection.slots.docAdded.once(id => resolve(id))
        );*!/
    const doc = myCollection.getDoc(objectId);
    console.log("this is original doc for set ",doc);
    assertExists(doc);
    doc.load();
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
  }

  const blockCollection = myCollection.docs.values().next()
    .value as BlockCollection;
  assertExists(blockCollection, 'Need to create a doc first');
  const doc = blockCollection.getDoc();
  assertExists(doc.ready, 'Doc is not ready');
  assertExists(doc.root, 'Doc root is not ready');

  //const app = document.getElementById('app');
 /!* const app = refEditor.value;
  if (!app) return;*!/
  if (props.isBoardView) {
    editorElement.value = new EdgelessEditor()
  } else {
    editorElement.value = new PageEditor()
  }
  console.log("this is set  doc",doc);
  myCollection.awarenessStore.awareness.setLocalStateField('user',{name:'ali ghasami'})
  currentDocument.value = doc
  editorElement.value.doc =  doc
  console.log("111111",doc.blockSize);
  const temp= await exportData(myCollection, [currentDocument.value])
  console.log("this is snap shoot ",temp);

  appendTODOM(editorElement.value)
  bindEvent(doc)*/
  //const modeService = mockDocModeService(doc.id);
  //setDocModeFromUrlParams(modeService);
  //const editor = new AffineEditorContainer();
  //const specs = getExampleSpecs();
  /*editor.pageSpecs = [...specs.pageModeSpecs].map(spec => {
    if (spec.schema.model.flavour === 'affine:page') {
      spec = patchPageRootSpec(
        spec as BlockSpec<'affine:page', PageRootService>
      );
    }
    return spec;
  });
  editor.edgelessSpecs = [...specs.edgelessModeSpecs].map(spec => {
    if (spec.schema.model.flavour === 'affine:page') {
      spec = patchPageRootSpec(
        spec as BlockSpec<'affine:page', PageRootService>
      );
    }
    return spec;
  });
  editor.doc = doc;*/
  //console.log(' ===>',editor.doc);

  //editor.mode = modeService.getMode();
  /*editor.slots.docLinkClicked.on(({ docId }) => {
    const target = collection.getDoc(docId);
    if (!target) {
      throw new Error(`Failed to jump to doc ${docId}`);
    }
    target.load();
    editor.doc = target;
  });*/
  /*editor.slots.docUpdated.on(({ newDocId }) => {
    editor.mode = modeService.getMode(newDocId);
  });*/

  // app.append(editor);
  //await editor.updateComplete;
  //console.log(' ===>',editor.doc);
  //const leftSidePanel = new LeftSidePanel();
  //const docsPanel = new DocsPanel();
  //docsPanel.editor = editor;
  /*const quickEdgelessMenu = new QuickEdgelessMenu();
  quickEdgelessMenu.collection = doc.collection;
  quickEdgelessMenu.editor = editor;
  quickEdgelessMenu.leftSidePanel = leftSidePanel;
  quickEdgelessMenu.docsPanel = docsPanel;*/
  ///document.body.append(leftSidePanel);
  //document.body.append(quickEdgelessMenu);

  // debug info
  /*window.editor = editor;
  window.doc = doc;*/
  /*Object.defineProperty(globalThis, 'host', {
    get() {
      return document.querySelector<EditorHost>('editor-host');
    },
  });
  Object.defineProperty(globalThis, 'std', {
    get() {
      return document.querySelector<EditorHost>('editor-host')?.std;
    },
  });*/

  //return editor;

  /*function patchPageRootSpec(spec: BlockSpec<'affine:page', PageRootService>) {
    const setup = spec.setup;
    const newSpec: typeof spec = {
      ...spec,
      setup: (slots, disposable) => {
        setup?.(slots, disposable);
        slots.mounted.once(({ service }) => {
          const pageRootService = service as PageRootService;
          pageRootService.notificationService =
            mockNotificationService(pageRootService);
          pageRootService.quickSearchService =
            mockQuickSearchService(collection);
          pageRootService.peekViewService = {
            peek(target: unknown) {
              alert('Peek view not implemented in playground');
              console.log('peek', target);
              return Promise.resolve();
            },
          };
          pageRootService.docModeService = mockDocModeService(
            pageRootService.doc.id
          );
        });
      },
    };

    return newSpec;
  }*/

  /*******************************************************/

  /*const { doc, collection } = createEmptyDoc(props.isBoardView,schemas.value).init()
  myCollection = collection
  currentDocument.value = doc
  if (props.isBoardView) {
    editorElement.value = new EdgelessEditor()
  } else {
    editorElement.value = new PageEditor()
  }
  editorElement.value.doc =  doc
  checkIsEmpty()
  appendTODOM(editorElement.value)
  checkReadOnly()
  bindEvent(doc)*/
}

async function exportData(collection: DocCollection, docs: any[]) {
  const job = new Job({ collection })
  const snapshots = await Promise.all(docs.map(job.docToSnapshot))
  if (snapshots.length > 0) {
    return snapshots[0]
  }
  return null
}

function setFocus() {
  if (refEditor.value) {
    const editor = (refEditor.value as HTMLElement).querySelector('rich-text')
    if (editor && editor.inlineEditor) {
      editor.inlineEditor.focusEnd()
    }
  }
}

function checkIsEmpty() {
  let res = true
  const noteList = currentDocument.value.getBlockByFlavour('affine:note')
  const note = noteList.length ? noteList[0] : null
  if (note) {
    const children = note.children
    if (children.length > 1) {
      res = false
    } else if (children.length > 0) {
      const first = children[0]
      if (first.flavour != 'affine:paragraph') {
        res = false
      } else {
        if (first.text?.length != 0) res = false
      }
    }
  } else {
    res = false
  }
  isEmpty.value = res
  return res
}

function handleSelectAll(event: Event) {
  // Check if Ctrl (or Cmd on macOS) is pressed along with the 'A' key
  if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
    const target = event.target as HTMLElement
    if (!target.closest('page-editor')) {
      const temp = document.querySelectorAll(
        'page-editor:not(page-editor page-editor):not(.ignore-select page-editor)'
      )
      if (temp.length > 0) {
        const pageRoot = temp[temp.length - 1].querySelector('affine-page-root')
        if (pageRoot) {
          event.preventDefault()
          pageRoot.selectAllBlock()
        }
      }
    }
  }
}

onMounted(async () => {
  init()
  document.addEventListener('keydown', handleSelectAll)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleSelectAll)
})

defineExpose({
  getData,
  setData,
  setFocus,
  reset,
  isEmpty,
  doc: currentDocument,
  checkIsEmpty
  //collection:myCollection
})
</script>

<style lang="less">
@prefix:~ 'vue-block-board-editor';
.@{prefix} {
  .affine-menu-action-text,
  .property-item-name,
  .select-input {
    @apply text-gray-8;
  }

  /**{
    font-family: "blocksuite:surface:Poppins";
  }*/

  /* edgeless-shape-text-editor *{
    font-family: unset !important;
  }
*/

  /* rich-text *{
    font-family: unset;
   //color:red;
   //font-family: var(--base-font-family), tahoma, serif;
    //font-size: 20px;
   //font-family: "blocksuite:surface:Poppins";
 }
*/

  /**{
    font-family: unset;
  }*/

  /**{
    font-family:"blocksuite:surface:Poppins"  !important;
  }*/

  /**{
    font-family:"blocksuite:surface:Poppins"  !important;
  }*/

  edgeless-block-portal-edgeless-text * {
    .claytap-h1 {
      font-family: unset;
    }

    .claytap-text {
      font-family: unset;
    }
  }

  .place-holder {
    @apply flex items-center gap-1 text-neutral-4 mt-body;
    //line-height: unset;
    transition: all 0.3s ease-in-out;
    .short-code {
      font-size: 10px;
      /* border-radius: 4px;
      @apply bg-neutral-1 p-1 w-6 h-6 inline-flex items-center justify-center;*/
      border-radius: 4px;
      border: 1px solid @neutral-3;
      background: @gray-0; // var(----mt-kbd-bg, #FFF);
      border-bottom: 3px solid @neutral-4;
      width: @size-5;
      height: @size-5;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Mention Style */
  /*.affine-mention {
    @apply flex-inline gap-2 mt-overline cursor-pointer text-neutral-8 bg-gray-1;
    width: fit-content;
    border-radius: @roundness-sm;
    padding: 0 @space-2;
    &:hover,
    &[data-selected='true'] {
      background: #f7f6fe;
      color: #64428f;
    }
  }*/

  /* Hint Style */
  /*.affine-hint-container {
    &,
    & .affine-hint {
      border-radius: @roundness-lg;
    }

    & .affine-hint {
      @apply flex  gap-2;
      padding: @space-4 @space-6 @space-4 @space-6;
      border: 1px solid @gray-2;
      .affine-content {
        @apply flex flex-col gap-2;
      }
      .affine-hint-title {
        @apply mt-section-tittle;
      }

      .affine-hint-description {
        @apply mt-overline text-gray-7 pl-;
      }
    }

    &.affine-hint-success {
      border-color: #c1ebcd;
      background: #eafaef;
      .affine-hint-title {
        @apply text-green-5;
      }
    }

    &.affine-hint-error {
      border-color: #fac7c7;
      background: #fcf2f2;
      .affine-hint-title {
        @apply text-red-5;
      }
    }
    &.affine-hint-warning {
      border-color: #fce49c;
      background: #fce49c;
      .affine-hint-title {
        color: #51555c;
      }
    }

    &.affine-hint-info {
      border-color: #afe2fd;
      background: #ebf7ff;
      .affine-hint-title {
        color: #0ba2e8;
      }
    }

    &.affine-hint-default {
      border-color: @gray-2;
      background: #fafafa;
      .affine-hint-title {
        @apply text-gray-7;
      }
    }
  }*/

  /* reset Style */
  .affine-paragraph-block-container {
    &:hover .place-holder {
      @apply text-neutral-6;
    }
    /*&:hover{
      //background-color: red;
    }*/
    /*&:active{
      background-color: red;
    }*/
  }

  /* paragraph Style */
  .claytap-text {
    //background-color: red;
    @apply text-neutral-8; //mt-body
    //line-height: unset;
  }

  .claytap-h1 {
    @apply mt-page-display text-neutral-8;
    //line-height: unset;
  }

  .claytap-h2 {
    @apply mt-page-heading text-neutral-8;
    //line-height: unset;
  }
  .claytap-h3 {
    @apply mt-page-subheading text-neutral-8;
    //line-height: unset;
  }

  /* Fix rtl - ltr Style */
  .affine-paragraph-placeholder {
  }

  /* Place Holder - paragraph style */

  /*  Board Style */
  .board {
    width: 100%;
    height: 600px;
  }

  /* */
  &-date-time {
    //@apply mt-overline;
    color: @blue-5;
    text-decoration: underline;
  }
}

/* popover Style */
.@{prefix}-popover {
  @apply pb-1 shadow-floated border-roundness bg-gray-0;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  //font-size: var(--affine-font-base);
  //padding: 12px 0;
  display: flex;
  //background: var(--affine-background-overlay-panel-color);
  //box-shadow: var(--affine-shadow-2);
  border-radius: @roundness-4;
  z-index: var(--affine-z-index-popover);
  /* transition: max-height 0.2s ease-in-out; */
}

/* popover container Style */
.@{prefix}-popover-container {
  z-index: var(--affine-z-index-popover);
  user-select: none;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 0 8px;
  width: 300px;
}

/* overlay mask */
.@{prefix}-overlay-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--affine-z-index-popover);
}

.@{prefix}-object-link-popover {
  //background-color: red;
  padding: 0;

  .@{prefix}-popover-container {
    padding: 0;
    min-height: 30px;
    min-width: 250px;
    width: auto;
  }
}

/* slash Menu Style */
/*.@{prefix}-slash-menu {
  .icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
  }

  .group-title {
    @apply mt-footnote text-neutral-5 block my-2;
  }

  .title {
    @apply mt-overline;
  }

  .item-title {
    @apply flex flex-col mt-body; //gap-2
  }

  .description {
    @apply mt-footnote text-neutral-5;
  }

  .claytap-slash-menu {
    @apply flex flex-col gap-2;
    //width: 260px;
  }

  .claytap-slash-menu-item {
    @apply py-2 px-3 gap-2 items-center flex px-2 cursor-pointer;
    border-radius: 4px;
    &:hover,
    &.hover {
      @apply bg-gray-1;
      //background: #f4f4f5;
    }
  }
}*/

/* Mention menu Style */
/*.@{prefix}-mention-menu-container {
  @apply flex flex-col gap-2;

  .mention-item {
    @apply mt-overline cursor-pointer;
    transition: all 30ms ease-in-out;
    color: #6e737c;
    padding: @space-1;
    border-radius: @roundness-sm;

    &:hover,
    &.hover {
      color: #0ba2e8;
      background-color: #ebf7ff;
    }
  }
}*/

.fill-gray-0 {
  fill: @gray-0;
}

.fill-ocean-1 {
  fill: @ocean-1;
}

.fill-ocean-8 {
  fill: @ocean-8;
}
.fill-ocean-5 {
  fill: @ocean-5;
}

.stroke-gray-0 {
  stroke: @gray-0;
}

.stroke-ocean-1 {
  stroke: @ocean-1;
}

.stroke-ocean-5 {
  stroke: @ocean-5;
}

.tippy-box[data-theme='block-editor'] {
  @apply bg-gray-0 shadow-floated  text-gray-8;
  border-radius: @roundness-3;
  position: relative;
}

/*//.slash-menu,
!*.popover-menu{
  border-radius: var(--mt-roundness-3);
  //background-color: red;
}*!*/
</style>
