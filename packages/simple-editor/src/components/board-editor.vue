<template>
  <div>
<!--        <Button @click="handleClick">export pdf</Button>-->
<!--    {{ props.objectId }}-->
<!--    <span v-if="currentDocument">{{ currentDocument.meta }}</span>-->
    <div class="vue-block-board-editor">
      <div ref="refEditor" :class="[props.isBoardView ? 'board' : 'editor']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import '@blocksuite/presets/themes/affine.css'
import { EdgelessEditor, PageEditor } from '@blocksuite/presets'
//import { createEmptyDoc } from './helpers'
import {
  type BlockCollection,
  type BlockModel,
  Doc,
  DocCollection,
  type DocCollectionOptions,
  IdGeneratorType,
  Job,
  Schema,
} from "@blocksuite/store";
import { computed, onMounted, onUnmounted, ref, toRaw, unref, watch } from "vue";
/** @alighasami for check merge **/
import { AffineSchemas, replaceIdMiddleware,  } from '@blocksuite/blocks' //toolsList
import 'tippy.js/dist/tippy.css'
import resources from './locale/resources'
import i18next from 'i18next'
import { initLitI18n } from 'lit-i18n'
import Dexie from 'dexie'
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,  DEFAULT_DB_NAME,
  IndexedDBDocSource
} from "@blocksuite/sync";
import { WebSocketDocSource } from '@blocksuite/playground/apps/_common/sync/websocket/doc'
import { WebSocketAwarenessSource } from '@blocksuite/playground/apps/_common/sync/websocket/awareness'
import { assertExists } from '@blocksuite/global/utils'
import { get } from "lodash";
import { effects as blocksEffects } from "@blocksuite/blocks/effects";
import { effects as presetsEffects } from "@blocksuite/presets/effects";

blocksEffects();
presetsEffects();

const refEditor = ref<HTMLElement | null>(null)
const currentDocument = ref<Doc | null>(null)
const editorElement = ref<EdgelessEditor | PageEditor | null>(null)
const isEmpty = ref<boolean>(false)
let myCollection: DocCollection | null = null

interface Props {
  isBoardView?: boolean
  //mentionUserList?: any[]
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
  websocketUrl?:string
  data?:any
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
  //mentionUserList: () => [],
  locale: 'en',
  disableTools: () => [],
  isCollaboration:false
})
const loading=ref(true)
const emit = defineEmits<{
  (e: 'change', val: IBlockChange): void
  (e: 'addBlock', val: IBlockChange): void
  (e: 'deleteBlock', val: IBlockChange): void
  (e: 'updateBlock', val: IBlockChange): void
  (e: 'addObjectLink', val: IBlockChange): void
  (e: 'deleteObjectLink', val: IBlockChange): void
  (e: 'loading', val: boolean): void
}>()

watch(loading,()=>{
    emit('loading',loading.value)
},{immediate:true})

i18next.use(initLitI18n).init({
  lng: props.locale ?? 'en',
  resources
})

const schemas = computed(() => {
  /** @alighasami for check merge **/
  //const temp = props.disableTools.map((item) => toolsList[item])
  return AffineSchemas //.filter((item) => !temp.includes(item.model.flavour))
})


watch(
  () => props.objectId,
  async () => {
    if (props.objectId) {
      console.log("==>this is object id in watch and call init function ",props.objectId);
     await init()
      if (currentDocument.value) {
        myCollection?.setDocMeta(currentDocument.value.id, { object_id: props.objectId })
      }
    }
  },
  //{ immediate: true }
)

/*watch(()=>{

})*/


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



watch(
  () => props.readonly,
  () => {
    checkReadOnly()
  },
  { immediate: true }
)



async function getData() {
  if (myCollection) {
    return await exportData(myCollection, [currentDocument.value])
  }
  return null
}


function checkReadOnly() {
  if (currentDocument.value) {
    const doc=toRaw(unref(currentDocument.value))
    doc.awarenessStore.setReadonly(
      doc,
      props.readonly
    )
  }
}


function bindEvent(doc: Doc) {
  doc.slots.blockUpdated.on((data) => {
    checkNotEmptyDocBlock(doc)
    checkIsEmpty()
    emit('change', data)
    if (data.type == 'add') {
      if (data.flavour == 'affine:mahdaad-object') {
        //console.log("this is link data",data,data.model.link_id);
        //if(data.model && !data.model.link_id){
          emit('addObjectLink', data)
        //}
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
  const doc= toRaw(unref(currentDocument.value))
  const noteList = doc.getBlockByFlavour('affine:note')
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
  //reset,
  isEmpty,
  doc: currentDocument,
  checkIsEmpty
  //collection:myCollection
})

/************************************************************/

function handleClick() {
 /// console.log("1111",refEditor.value,currentDocument.value);
  //const temp=(refEditor.value as HTMLElement).querySelector('editor-host')
 /* const temp=(refEditor.value as HTMLElement).querySelector('affine-page-root')
  const service=temp.host.spec.getService('affine:page')
  service.exportManager.exportPdf().catch(console.error);*/
  //console.log("11111",);
  //console.log("222",temp.host?.spec.getService('affine:page'));
  //console.log("this is temp",temp);
}

watch(
  () => props.isBoardView,
  () => {
    // init()
  }
)

/*watch(()=>props.objectId,()=>{
  debugger
})*/


//todo ali ghasami
async function setData(data: any, clear_history?: boolean = true) {
  //return
  //console.log("2222222222222222222this is data",data);
  //init()
  /*if(myCollection && currentDocument.value){
  }*/
  //return

  //method 1
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
/*
function reset() {
  //debugger
  //init()
}
*/




const edgelessId=computed(()=>{
  return `edgeless_${props.objectId}`
})


const deleteRecordFromUnknownSchema = async (dbName, tableName, recordKey) => {
  try {
    // Open the existing database without defining the schema
    //const db = await Dexie.open(dbName);
    const db = new Dexie(dbName);
    console.log("==>database start open for delete record");
    await db.open();
    console.log("==>database is opened for delete record");

    // List available tables in the database
    console.log("==>Available tables:", db.tables.map((table) => table.name));

    // Check if the specified table exists
    const table = db.tables.find((t) => t.name === tableName);
    if (!table) {
      console.log(`==>Table "${tableName}" does not exist in the database.`);
      return;
    }

    // Delete the record by key
    await db.table(tableName).delete(recordKey);
    console.log(`==>Record with key ${recordKey} deleted from "${tableName}" table.`);
    console.log("==>start for close database in delete record");
    db.close()
    console.log("==>end close database in delete record");
  } catch (error) {
    console.error("==>Error deleting record:", error);
  }
};




async function init() {
  loading.value=true
  console.log("==>init function");
  //debugger
  //console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]");
 /* await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })*/
  //if(!props.objectId) return
  //const BASE_WEBSOCKET_URL = 'wss://blocksuite-playground.toeverything.workers.dev'
  //const BASE_WEBSOCKET_URL = 'wss://collab.claytap.com'
  //const BASE_WEBSOCKET_URL = 'ws://localhost:8080'
  /********************/
  if(props.objectId){
    console.log("==>has object id",props.objectId);
    try {
      console.log("==>run delete cord with id ", props.objectId);
      await deleteRecordFromUnknownSchema(DEFAULT_DB_NAME, "collection", props.objectId);
      console.log("==>run delete edgeless",edgelessId.value);
      await deleteRecordFromUnknownSchema(DEFAULT_DB_NAME, "collection", edgelessId.value);
    }catch (e) {
      console.log("==>error in remove recode object and edgless from collection",e);
    }
    /*const deleteRecord=async (dbName, storeName, keyToDelete)=> {
      try {
        // Open the IndexedDB database
        const db = await openDB(dbName);
        // Start a transaction
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        // Delete the record
        await objectStore.delete(keyToDelete);
        console.log('Record deleted successfully.');
        // Complete the transaction
        await transaction.complete;
        console.log('Transaction completed.');
        //resolve(true)
      } catch (error) {
        console.error('Error deleting record:', error);
        //resolve(true)
      }

       /!* return new Promise(async (resolve, reject) => {

        })*!/
    }

    const openDB=async (dbName)=> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    }


   try {
      await deleteRecord(DEFAULT_DB_NAME,'collection',props.objectId)
    }catch (e) {
      console.log("can not delete record");
    }*/




   /* const request = indexedDB.open(DEFAULT_DB_NAME, dbVersion);
    request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a transaction
      const transaction = db.transaction('collection', 'readwrite');
      const objectStore = transaction.objectStore('collection');

      // Define the key of the record you want to delete
      const keyToDelete = props.objectId; // Replace with the actual key

      // Delete the record
      const deleteRequest = objectStore.delete(keyToDelete);

      deleteRequest.onsuccess = function () {
        console.log('Record deleted successfully');
      };

      deleteRequest.onerror = function () {
        console.error('Error deleting record:', deleteRequest.error);
      };

      transaction.oncomplete = function () {
        console.log('Transaction completed.');
      };

      transaction.onerror = function (event) {
        console.error('Transaction failed:', event.target.error);
      };
    };

    request.onerror = function () {
      console.error('Error opening database:', request.error);
    };*/
  }
  /*******************/
  if(!window.$blockEditor){
    window.$blockEditor={}
  }

  const schema = new Schema()
  schema.register(schemas.value)
  let editorData= props.data
  if(editorData && editorData.meta.id && props.objectId){
    editorData.meta.id=props.objectId //temp.meta.object_id
  }
  console.log("==>data for set in editor is",editorData);
  const mountEditor=async ()=>{
    console.log("==>start for mount editor");
    const blockCollection = myCollection.docs.values().next().value as BlockCollection
    assertExists(blockCollection, '==>Need to create a doc first')
    const doc = blockCollection.getDoc()
    assertExists(doc.ready, '==>Doc is not ready')
    assertExists(doc.root, '==>Doc root is not ready')
    //const app = document.getElementById('app');
    /* const app = refEditor.value;
     if (!app) return;*/
    if (props.isBoardView) {
      editorElement.value = new EdgelessEditor()
    } else {
      editorElement.value = new PageEditor()
    }
    console.log('==>doc for mount is', doc)
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
    //const temp = await exportData(myCollection, [currentDocument.value])
    //console.log('this is snap shoot ', temp)
    bindEvent(doc)
    appendTODOM(editorElement.value)
    checkNotEmptyDocBlock(currentDocument.value)
    checkReadOnly()
    loading.value=false
  }

  //console.log("this is object id",props.objectId);
  if(props.isCollaboration && props.objectId && props.websocketUrl){
    console.log("==>is collaboration mode");
    //console.log("100000",props.objectId);
    //const objectId = props.objectId
    //const edgelessId =
    const BASE_WEBSOCKET_URL =props.websocketUrl //'ws://localhost:8080'  //'wss://sence.misdc.com'
    const idGenerator: IdGeneratorType = IdGeneratorType.NanoID
    let docSources: DocCollectionOptions['docSources'] = {
      main: new IndexedDBDocSource()
    }
    let awarenessSources: DocCollectionOptions['awarenessSources']
    //old method
    /*if (!window.$blockEditor ||
      !window.$blockEditor.wss ||
      (window.$blockEditor.wss && window.$blockEditor.wss.readyState === WebSocket.CLOSED)
    ) {
      //const {  data, send, open, close,ws,status } = useWebSocket(`${BASE_WEBSOCKET_URL}?r=${room}&u=${Math.ceil(Math.random()*50)}`)
      if(!window.$blockEditor){
        window.$blockEditor={}
      }
      window.$blockEditor.wss = new WebSocket(
        `${BASE_WEBSOCKET_URL}?r=${props.objectId}&u=${Math.ceil(Math.random() * 50)}`
      )
    }
    const web_socket: WebSocket = window.$blockEditor.wss*/
    let web_socket!: WebSocket
    if(!Object.hasOwn(window.$blockEditor,'wsMap')){
      Object.assign(window.$blockEditor,{wsMap: new Map()})
    }

    const wsMap: Map<string,any>=window.$blockEditor.wsMap;
    if(!wsMap.has(props.objectId) || (wsMap.has(props.objectId) && wsMap.get(props.objectId).readyState!=wsMap.get(props.objectId).OPEN) ){
      wsMap.set(props.objectId,new WebSocket(
        `${BASE_WEBSOCKET_URL}?r=${props.objectId}&u=${Math.ceil(Math.random() * 50)}`
      ))
    }
    web_socket=wsMap.get(props.objectId)
    console.log("==>this is list web socket is",window.$blockEditor.wsMap);
    //console.log("this is ws map",);
    const  initDoc = async () =>{
      console.log("==>start initDoc function");
      //exist:boolean
      //console.log("this is exist",exist);
     // const id=props.objectId
      console.log('==>before waitForSynced')
      await myCollection.waitForSynced()
      console.log('==>after waitForSynced')
      //console.log("2000000",objectId,);
      //console.log('start initttttt doc')
      console.log('==>find doc in collection', myCollection.getDoc(props.objectId))
      const shouldInit =!myCollection.getDoc(props.objectId)
      console.log('==>shouldInit', shouldInit)
      if (shouldInit) {
        console.log("==>start create empty doc and inject editorData");
        myCollection.meta.initialize()
        if(props.data){
          //todo ali ghasami for inject data if has bug and client id in used
          //Object.assign(temp,{})
          const job = new Job({ collection: myCollection, middlewares: [] }) //replaceIdMiddleware
          const doc=await job.snapshotToDoc(editorData)
          //const doc=await job.snapshotToDoc(props.data)
          if(doc){
            doc.load()
            doc.resetHistory()
          }

        }else{
          console.log("==>start create empty doc for new doc in collaboration mode");
           const doc = myCollection.createDoc({ id:props.objectId }) //'doc:home'
           doc.load()
           const rootId = doc.addBlock('affine:page')
           doc.addBlock('affine:surface', {}, rootId)
           if (!props.isBoardView) {
             const noteId = doc.addBlock('affine:note', {}, rootId)
             doc.addBlock('affine:paragraph', {}, noteId)
           }
           doc.resetHistory()
        }
      /*  if(!exist){
          debugger
        }else{

        }*/
      } else {
        // debugger
        // wait for data injected from provider
        /*const firstPageId =
          myCollection.docs.size > 0
            ? myCollection.docs.keys().next().value
            : await new Promise<string>(resolve =>
              myCollection.slots.docAdded.once(id => resolve(id))
            );*/
        console.log("==>doc is exist and get from collection and load");
        const doc = myCollection.getDoc(props.objectId)
        //console.log('this is original doc for set ', doc)
        assertExists(doc)
        doc.load()
        // wait for data injected from provider
        if (!doc.root) {
          await new Promise((resolve) => doc.slots.rootAdded.once(resolve))
        }
        doc.resetHistory()
      }

      await mountEditor()
    }

    await new Promise((resolve, reject) => {
      if (web_socket.readyState === WebSocket.OPEN) resolve(true)
      web_socket.addEventListener('open', resolve)
      web_socket.addEventListener('error', reject)
    })
      .then(() => {
        console.log("==>resolve websocket");
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(web_socket, props.objectId, initDoc)]
        }
        awarenessSources = [new WebSocketAwarenessSource(web_socket)]
      })
      .catch(() => {
        console.log("==>catch for open websocket and Broadcast channel");
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new BroadcastChannelDocSource()]
        }
        awarenessSources = [
          //new BroadcastChannelAwarenessSource('quickEdgeless'),
          new BroadcastChannelAwarenessSource(edgelessId.value)
        ]
      })

    const options: DocCollectionOptions = {
      //id: 'quickEdgeless',
      id: edgelessId.value,
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
    console.log("==>Init collection in collaboration mode and start")
    myCollection = new DocCollection(options)
    myCollection.start()
    //await myCollection.waitForSynced()

  }else{
    console.log("==>not collaboration mode");
    //console.log("5555555",props.data);
    myCollection = new DocCollection({schema})
    myCollection.start()
    myCollection.meta.initialize()
    if(editorData){
      //const temp=props.data
      //temp.meta.id=props.objectId //temp.meta.object_id
      const job = new Job({ collection: myCollection, middlewares: [] }) //replaceIdMiddleware
      const doc=await job.snapshotToDoc(editorData)
      if(doc){
        doc.load()
        doc.resetHistory()
      }
    }else{
      const doc = myCollection.createDoc()
      doc.load()
      const rootId = doc.addBlock('affine:page')
      doc.addBlock('affine:surface', {}, rootId)
      if (!props.isBoardView) {
        const noteId = doc.addBlock('affine:note', {}, rootId)
        doc.addBlock('affine:paragraph', {}, noteId)
      }
      doc.resetHistory()
    }
    //if()
    await mountEditor()
  }
}

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
    display: inline-block;
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
