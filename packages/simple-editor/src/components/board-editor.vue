<template>
  <div>
<!--    <Button @click="handleClick">change schema</Button>-->
<!--    {{ schemas.length }}-->
    <div class="vue-block-board-editor">
      <div ref="refEditor" :class="[props.isBoardView ? 'board' : 'editor']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css'
import { PageEditor, EdgelessEditor, AffineEditorContainer } from "@blocksuite/presets";
import { createEmptyDoc } from './helpers'
import {
  type BlockCollection,
  type BlockModel,
  Doc,
  DocCollection,
  type DocCollectionOptions,
  IdGeneratorType,
  Job,
  Schema
} from "@blocksuite/store";
import { computed, onMounted, onUnmounted, ref, toRaw, unref, watch } from "vue";
import {
  AffineSchemas,
  type DocModeService,
  type PageRootService,
  replaceIdMiddleware,
  toolsList
} from "@blocksuite/blocks";
import 'tippy.js/dist/tippy.css'
import resources from './locale/resources'
import i18next from 'i18next';
import { initLitI18n } from 'lit-i18n';
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  IndexedDBDocSource,
} from "@blocksuite/sync";
import { WebSocketDocSource } from "@blocksuite/playground/apps/_common/sync/websocket/doc";
import { WebSocketAwarenessSource } from "@blocksuite/playground/apps/_common/sync/websocket/awareness";
import { assertExists } from "@blocksuite/global/utils";
import {
  mockDocModeService,
  mockNotificationService,
  mockQuickSearchService
} from "@blocksuite/playground/apps/_common/mock-services";
import { getExampleSpecs } from "@blocksuite/playground/apps/default/specs-examples";
import type { BlockSpec, EditorHost } from "@blocksuite/block-std";
//import { LeftSidePanel } from "@blocksuite/playground/apps/_common/components/left-side-panel";
//import { DocsPanel } from "@blocksuite/playground/apps/_common/components/docs-panel";
//import { QuickEdgelessMenu } from "@blocksuite/playground/apps/_common/components/quick-edgeless-menu";

const refEditor = ref<HTMLElement | null>(null)
const currentDocument  = ref<Doc | null>(null)
const editorElement=ref<EdgelessEditor | PageEditor |null>(null)
const isEmpty=ref<boolean>(false)
let myCollection: DocCollection | null = null
window.$blockEditor = {}

interface Props {
  isBoardView?: boolean
  mentionUserList?: any[]
  uploadUrl?: string
  storageUrl?: string
  apiToken?: string
  readonly ?:boolean,
  locale?:'fa' | 'en'
  disableTools?:string[]
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
  readonly:false,
  mentionUserList: () => [],
  locale:'en',
  disableTools:()=>[]
})

i18next.use(initLitI18n).init({
  lng: props.locale ?? 'en',
  resources
});


const emit = defineEmits<{
  (e: 'change', val: IBlockChange): void
  (e: 'addBlock', val: IBlockChange): void
  (e: 'deleteBlock', val: IBlockChange): void
  (e: 'updateBlock', val: IBlockChange): void
  (e: 'addObjectLink', val: IBlockChange): void
  (e: 'deleteObjectLink',val: IBlockChange): void
}>()



const schemas=computed(()=>{
  const temp=props.disableTools.map(item=> toolsList[item])
  return AffineSchemas.filter(item=> !temp.includes(item.model.flavour))
})


function handleClick(){
  /*************************/
  //currentDocument.value?.addBlock
  //const { doc } = window;
  /*const rootId = doc.addBlock('affine:page', {
    title: new doc.Text(),
  });*/
  //const note =  doc.addBlock('affine:note', {}, rootId);
  //debugger
  const doc=unref(toRaw(currentDocument.value))
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
    doc.addBlock('affine:paragraph', { text },note.id );
  }
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


/*watch(
  () => props.isBoardView,
  () => {
    init()
  }
)*/

watch(()=>props.locale,()=>{
  i18next.changeLanguage(props.locale)
},{immediate:true})

watch(
  () => [props.uploadUrl, props.storageUrl, props.apiToken,props.locale],
  () => {
    const temp = {
      uploadUrl: props.uploadUrl ?? '',
      storageUrl: props.storageUrl ?? '',
      apiToken: props.apiToken ?? '',
      locale:props.locale ?? 'en'
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

watch(()=>props.readonly,()=>{
  checkReadOnly()
},{immediate:true})

function checkReadOnly(){
  if(currentDocument.value){
    currentDocument.value.awarenessStore.setReadonly(currentDocument.value.blockCollection, props.readonly);
  }
}

//todo fix ali ghasami
async function setData(data: any,clear_history?: boolean = true) {
  console.log("this is data",data);
  //debugger
  /******************************************/
 // indexedDB.deleteDatabase('blocksuite-local')
  //return
  //debugger
  const BASE_WEBSOCKET_URL= 'wss://blocksuite-playground.toeverything.workers.dev'
  //const BASE_WEBSOCKET_URL= 'wss://sence.misdc.com'
  //const BASE_WEBSOCKET_URL= 'ws://localhost:8080'
  const schema = new Schema().register(schemas.value)
  const params = new URLSearchParams(location.search);
  let docSources: DocCollectionOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: DocCollectionOptions['awarenessSources'];
  const room = params.get('room');
  if (room) {
    const ws = new WebSocket(new URL(`/room/${room}`, BASE_WEBSOCKET_URL));
    //console.log("1111",`${BASE_WEBSOCKET_URL}?r=${room}&u=1`);
    //const ws = new WebSocket(`${BASE_WEBSOCKET_URL}?r=${room}&u=1`); //new URL(`?r=${room}&u=1`, BASE_WEBSOCKET_URL)
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
  myCollection = new DocCollection({
    id: 'quickEdgeless',
    schema,
    //idGenerator,
    docSources,
    awarenessSources,
    defaultFlags: {
      enable_synced_doc_block: true,
      enable_pie_menu: true,
      enable_lasso_tool: true,
    }, })
  console.log("200000",myCollection);

 // myCollection.start();
  //await myCollection.waitForSynced();

  //const doc_id=data.meta.id
  //console.log("111111",myCollection);

  //debugger
  //const temp= myCollection.docs.get(doc_id)
  //debugger

  //myCollection.docs.delete(doc_id)
  //myCollection.start();
  //await myCollection.waitForSynced();

  myCollection.meta.initialize()

  //console.log("this is temp",temp);
  //myCollection.docs.delete(0)
  //debugger
  /*if(myCollection.get(doc_id)){
    debugger
  }*/
  const job = new Job({ collection: myCollection }) // middlewares: [replaceIdMiddleware]
  const doc = await job.snapshotToDoc(data)
  //doc.load();
  console.log("1111",doc);
  myCollection.start();
  await myCollection.waitForSynced();

  /*let doc=null
  if(myCollection.docs.size === 0){
    // debugger
    // collection.docs.size === 0
    myCollection.meta.initialize()
    const job = new Job({ collection: myCollection }) // middlewares: [replaceIdMiddleware]
    //console.log("this is data",data);
    doc = await job.snapshotToDoc(data)
    doc.resetHistory();
    //console.log("this is doc",new_doc);
    /!*doc = myCollection.createDoc({ id: 'doc:home' })
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      //userList:['1','2','3','4','5']
    })
    doc.addBlock('affine:surface', {}, rootId)
    //if (!isBoard) {
    const noteId = doc.addBlock('affine:note', {}, rootId)
    doc.addBlock('affine:paragraph', {}, noteId)
    //}
    doc.resetHistory();*!/
  }else{
    //doc=collection.doc.get()

    const firstPageId =
      myCollection.docs.size > 0
        ? myCollection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          myCollection.slots.docAdded.once(id => resolve(id))
        );
    if (!firstPageId) {
      throw new Error('No first page id found');
    }
    doc = myCollection.getDoc(firstPageId);
    //console.log("9999",doc);
    assertExists(doc);
    doc.load();
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
  }*/
  console.log("this is doc",doc.id);
  /******************************************/
  //return
  //debugger
  //console.log("30000");
  if (myCollection) {
    /*if (props.isBoardView) {
      editorElement.value = new EdgelessEditor()
    } else {
      editorElement.value = new PageEditor()
    }*/
    editorElement.value = new PageEditor()
    //console.log("1111",myCollection);
   // const job = new Job({ collection: myCollection }) // middlewares: [replaceIdMiddleware]
    //console.log("this is data",data);
    //const new_doc = await job.snapshotToDoc(data)
    //console.log("this is doc",new_doc);
    //debugger
    bindEvent(doc)
    editorElement.value.doc = doc
    currentDocument.value = doc
   // checkIsEmpty()
    /*if(clear_history){
      new_doc?.resetHistory()
    }*/
    appendTODOM(editorElement.value)
   // checkNotEmptyDocBlock(currentDocument.value)
    //checkReadOnly()
  }
}

//todo back ali ghasami
function reset() {
 // init()
}

function bindEvent(doc: Doc) {
  doc.slots.blockUpdated.on((data) => {
    checkNotEmptyDocBlock(doc)
    checkIsEmpty()
    emit('change', data)
    if (data.type == 'add') {
      if(data.flavour=='affine:mahdaad-object'){
        emit('addObjectLink', data)
      }

      emit('addBlock', data)
    }
    if (data.type == 'delete') {
      if(data.flavour=='affine:mahdaad-object'){
        emit('deleteObjectLink',data)
      }
      emit('deleteBlock', data)
    }
    if (data.type == 'update') emit('updateBlock', data)
  })
}

function checkNotEmptyDocBlock(doc: Doc) {
  //debugger
  const noteList = doc.getBlockByFlavour('affine:note')

  const note = noteList.length ? noteList[0] : null
  if (note) {
    if(note.children.length == 0
      ||
      (note.children.length>0 && note.children[note.children.length-1].flavour!='affine:paragraph' )
      ||
      (note.children.length>0 && note.children[note.children.length-1].flavour=='affine:paragraph' &&  note.children[note.children.length-1].text?.length!=0)
    ){
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

async function init() {
 // debugger
  return
  console.log("10000");
  /*******************************************/
  //console.log('AffineSchemas', AffineSchemas);
  //AffineSchemas
  //AffineSchemas
  const BASE_WEBSOCKET_URL= 'wss://blocksuite-playground.toeverything.workers.dev'
  //wss://sence.misdc.com
  //const BASE_WEBSOCKET_URL= 'wss://collab.claytap.com'
  const schema = new Schema().register(schemas.value)
  //const idGenerator: IdGeneratorType = IdGeneratorType.NanoID;

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
   myCollection = new DocCollection({
    id: 'quickEdgeless',
    schema,
    //idGenerator,
    docSources,
    awarenessSources,
    defaultFlags: {
      enable_synced_doc_block: true,
      enable_pie_menu: true,
      enable_lasso_tool: true,
    }, })
  console.log("200000",myCollection);
  myCollection.start();
  await myCollection.waitForSynced();
  //console.log("this is collection",collection);

  //collection.
  //collection.
  //console.log("this is collection",collection);
  let doc=null
  if(myCollection.docs.size === 0){
    // debugger
    // collection.docs.size === 0
    myCollection.meta.initialize()
    doc = myCollection.createDoc({ id: 'doc:home' })
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      //userList:['1','2','3','4','5']
    })
    doc.addBlock('affine:surface', {}, rootId)
    //if (!isBoard) {
      const noteId = doc.addBlock('affine:note', {}, rootId)
      doc.addBlock('affine:paragraph', {}, noteId)
    //}
    doc.resetHistory();
  }else{
    //doc=collection.doc.get()

    const firstPageId =
      myCollection.docs.size > 0
        ? myCollection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          myCollection.slots.docAdded.once(id => resolve(id))
        );
    if (!firstPageId) {
      throw new Error('No first page id found');
    }
    doc = myCollection.getDoc(firstPageId);
    //console.log("9999",doc);
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
  doc = blockCollection.getDoc();

  assertExists(doc.ready, 'Doc is not ready');
  assertExists(doc.root, 'Doc root is not ready');


  const app =refEditor.value  //document.getElementById('app');
  if (!app) return;
  editorElement.value = new PageEditor();
  //const editor = new AffineEditorContainer();
  /*const specs = getExampleSpecs();
  editor.pageSpecs = [...specs.pageModeSpecs].map(spec => {
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
  });*/

  editorElement.value.doc = doc;
 /* let editor=null
  if (props.isBoardView) {
    //editorElement.value = new EdgelessEditor()
    editor = new EdgelessEditor()
  } else {
    //editorElement.value = new PageEditor()
    editor = new PageEditor()
  }
  editor.doc=doc*/
  //editorElement.value.doc = doc;
  //app.append(editor);
  appendTODOM(editorElement.value)
  //await editor.updateComplete;




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

  //editorElement.value.doc =  doc
  /******************************************/
 // return
 /* console.log("this is init");
  const { doc, collection }=await createEmptyDoc(props.isBoardView,schemas.value)
  console.log("11111",doc,collection);
  //const { doc, collection } =temp.init()
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

function checkIsEmpty(){
  let res=true
  const noteList =currentDocument.value.getBlockByFlavour('affine:note')
  const note = noteList.length ? noteList[0] : null
  if (note) {
    const children=note.children
    if(children.length > 1){
      res=false
    }
    else if(children.length>0){
        const first=children[0]
        if(first.flavour!='affine:paragraph'){
          res=false
        }else{
          if(first.text?.length!=0)
            res=false
        }
    }
  }else{
    res=false
  }
  isEmpty.value= res
  return  res
}


function handleSelectAll(event : Event) {
  // Check if Ctrl (or Cmd on macOS) is pressed along with the 'A' key
  if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
    const target = event.target as HTMLElement
    if (!target.closest('page-editor')) {
      const temp = document.querySelectorAll('page-editor:not(page-editor page-editor):not(.ignore-select page-editor)')
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


async function init2() {
  return
 // console.log("5555");
  const BASE_WEBSOCKET_URL= 'wss://blocksuite-playground.toeverything.workers.dev'
  //const BASE_WEBSOCKET_URL= 'wss://collab.claytap.com'
  const idGenerator: IdGeneratorType = IdGeneratorType.NanoID;
  const schema = new Schema();
  schema.register(AffineSchemas);

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
  //console.log(666);
  const flags: Partial<BlockSuiteFlags> = Object.fromEntries(
    [...params.entries()]
      .filter(([key]) => key.startsWith('enable_'))
      .map(([k, v]) => [k, v === 'true'])
  );

  const options: DocCollectionOptions = {
    id: 'quickEdgeless',
    schema,
    idGenerator,
    /*blobSources: {
      main: new IndexedDBBlobSource('quickEdgeless'),
    },*/
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
  // debug info
 // window.collection = collection;
  //window.blockSchemas = AffineSchemas;
  //window.job = new Job({ collection });
  //window.Y = DocCollection.Y;
  //console.log(7777);
  //return collection;
  /*************************************/
 // return
  //const params = new URLSearchParams(location.search);
  //const params = new URLSearchParams(location.search);
  await collection.waitForSynced();
//  console.log(88888,collection.docs);
  const shouldInit = collection.docs.size === 0 && !params.get('room');
  if (shouldInit) {
    console.log("shouldInit");
    collection.meta.initialize();
    const doc = collection.createDoc({ id: 'doc:home' });
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      title: new Text(),
    });
    doc.addBlock('affine:surface', {}, rootId);
    doc.resetHistory();
    //console.log(8888);
  } else {
    console.log(22222);
    // wait for data injected from provider
    const firstPageId =
      collection.docs.size > 0
        ? collection.docs.keys().next().value
        : await new Promise<string>(resolve =>
          collection.slots.docAdded.once(id => resolve(id))
        );
    if (!firstPageId) {
      throw new Error('No first page id found');
    }
    const doc = collection.getDoc(firstPageId);
    //console.log("9999",doc);
    assertExists(doc);
    doc.load();
    // wait for data injected from provider
    if (!doc.root) {
      await new Promise(resolve => doc.slots.rootAdded.once(resolve));
    }
    doc.resetHistory();
    //console.log(99999);
  }

  //console.log(22222);
  /******************************************/
  //part 3
  /***********************************************/



  {

    function setDocModeFromUrlParams(service: DocModeService) {
      const params = new URLSearchParams(location.search);
      const paramMode = params.get('mode');
      if (paramMode) {
        const docMode = paramMode === 'page' ? 'page' : 'edgeless';
        service.setMode(docMode);
      }
    }

    //return
    const blockCollection = collection.docs.values().next()
      .value as BlockCollection;
    assertExists(blockCollection, 'Need to create a doc first');
    const doc = blockCollection.getDoc();

    assertExists(doc.ready, 'Doc is not ready');
    assertExists(doc.root, 'Doc root is not ready');
    //console.log("11111");
    const app =refEditor.value  //document.getElementById('app');
    if (!app) return;

    const modeService = mockDocModeService(doc.id);
    setDocModeFromUrlParams(modeService);
    const editor = new AffineEditorContainer();
    const specs = getExampleSpecs();
    editor.pageSpecs = [...specs.pageModeSpecs].map(spec => {
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
    editor.doc = doc;
    console.log("editor doc",doc);



   // editor.mode = modeService.getMode();
   /* editor.slots.docLinkClicked.on(({ docId }) => {
      const target = collection.getDoc(docId);
      if (!target) {
        throw new Error(`Failed to jump to doc ${docId}`);
      }
      target.load();
      editor.doc = target;
    });*/
    editor.slots.docUpdated.on(({ newDocId }) => {
      console.log("docUpdated");
      editor.mode = modeService.getMode(newDocId);
    });

    app.append(editor);
    await editor.updateComplete;
    //return



    //const leftSidePanel = new LeftSidePanel();

    //const docsPanel = new DocsPanel();
    //docsPanel.editor = editor;

    /*const quickEdgelessMenu = new QuickEdgelessMenu();
    quickEdgelessMenu.collection = doc.collection;
    quickEdgelessMenu.editor = editor;
    quickEdgelessMenu.leftSidePanel = leftSidePanel;
    quickEdgelessMenu.docsPanel = docsPanel;*/

   // document.body.append(leftSidePanel);
    //document.body.append(quickEdgelessMenu);

    // debug info
    //window.editor = editor;
    //window.doc = doc;
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

    return editor;

    function patchPageRootSpec(spec: BlockSpec<'affine:page', PageRootService>) {
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
    }
  }

  /****************************************************/


}


onMounted(async () => {
  //console.log("5555555555555555555555");
  await init()
  const temp=await init2()
  //console.log("tmep",temp);
  document.addEventListener('keydown', handleSelectAll);
})

onUnmounted(()=>{
  document.removeEventListener('keydown', handleSelectAll)
})





defineExpose({
  getData,
  setData,
  setFocus,
  reset,
  isEmpty,
  doc:currentDocument,
  checkIsEmpty
})
</script>

<style lang="less">

@prefix:~ 'vue-block-board-editor';
.@{prefix} {

  /****************************/
  .page-editor.page-editor-container{
    width: 100%;
    height: 100%;
  }
  /****************************/

  .affine-menu-action-text,.property-item-name,.select-input {
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
