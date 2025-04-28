<template>
  <div>
<!--    {{ webSocketStatus }}-->
    <!--         <div class="flex-1 ps-6">
       <iframe id="myIframe" ></iframe>
     </div>-->
    <!--     <Button @click="handleClick">export pdf</Button>-->
    <!--    {{ props.objectId }}-->
    <!--    <span v-if="currentDocument">{{ currentDocument.meta }}</span>-->
    <div class="vue-block-board-editor">
      <div ref="refEditor" :class="[props.isBoardView ? 'board' : 'editor']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import '@blocksuite/presets/themes/affine.css'
import '@toeverything/theme/style.css'
import { EdgelessEditor, MahdaadEditorContainer, PageEditor } from '@blocksuite/presets'
//import { createEmptyDoc } from './helpers'
import {
  type BlockCollection,
  type BlockModel,
  Doc,
  DocCollection,
  type DocCollectionOptions,
  type DocSnapshot,
  IdGeneratorType,
  Job,
  Schema
} from '@blocksuite/store'
import { computed, nextTick, onMounted, onUnmounted, ref, toRaw, unref, watch } from 'vue'
/** @alighasami for check merge **/
import {
  AffineSchemas,
  docLinkBaseURLMiddleware,
  DocModeExtension,
  MahdaadHtmlAdapter,
  RefNodeSlotsExtension,
  replaceIdMiddleware,
  titleMiddleware,
  NoteDisplayMode
} from '@blocksuite/blocks' //toolsList
import 'tippy.js/dist/tippy.css'
import resources from './locale/resources'
import i18next from 'i18next'
import { initLitI18n } from 'lit-i18n'
import Dexie from 'dexie'
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource, DocEngineStep,
  //DEFAULT_DB_NAME,
  IndexedDBDocSource
} from "@blocksuite/sync";
import { WebSocketDocSource } from '@blocksuite/playground/apps/_common/sync/websocket/doc'
import { WebSocketAwarenessSource } from '@blocksuite/playground/apps/_common/sync/websocket/awareness'
import { assertExists } from '@blocksuite/global/utils'
import { get } from 'lodash'
import { effects as blocksEffects } from '@blocksuite/blocks/effects'
import { effects as presetsEffects } from '@blocksuite/presets/effects'
import { getExampleSpecs } from '@blocksuite/playground/apps/default/specs-examples'
import type { ExtensionType } from '@blocksuite/block-std'
import { mockDocModeService } from '@blocksuite/playground/apps/_common/mock-services'
import { getHeadingBlocksFromDoc } from './helpers/global.js';
import { useWebSocket } from '@vueuse/core'
import { watchDebounced } from '@vueuse/core'

if (!window.$blockEditor) {
  window.$blockEditor = {}
}
if (!Object.hasOwn(window.$blockEditor, 'wsMap')) {
  Object.assign(window.$blockEditor, { wsMap: new Map() })
}


if (!window.$blockEditor.is_loaded_custom_elements) {
  blocksEffects()
  presetsEffects()
  Object.assign(window.$blockEditor, { is_loaded_custom_elements: true })
}

const refEditor = ref<HTMLElement | null>(null)
const currentDocument = ref<Doc | null>(null)
const editorElement = ref<EdgelessEditor | PageEditor | null>(null)
const isEmpty = ref<boolean>(false)
let myCollection: DocCollection | null = null
const stopEvent = ref<boolean>(false)
const lastDocSyncStatus=ref<DocEngineStep | null>(null)
const webSocketStatus=ref<'offline' | 'saving'|'synced' | null>(null)
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
  isCollaboration?: boolean
  websocketUrl?: string
  data?: any
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
  isCollaboration: false
})
const loading = ref(true)
//let webSocketDocSource = null
const emit = defineEmits<{
  (e: 'change', val: IBlockChange): void
  (e: 'addBlock', val: IBlockChange): void
  (e: 'deleteBlock', val: IBlockChange): void
  (e: 'updateBlock', val: IBlockChange): void
  (e: 'addObjectLink', val: IBlockChange): void
  (e: 'deleteObjectLink', val: IBlockChange): void
  (e: 'loading', val: boolean): void
}>()

watch(
  loading,
  () => {
    emit('loading', loading.value)
  },
  { immediate: true }
)
//'offline' | 'saving'|'synced
watchDebounced(
  lastDocSyncStatus,
  () => {
    if(webSocketStatus.value!='offline'){
      if(lastDocSyncStatus.value==2){
        webSocketStatus.value='synced'
      }
      if(lastDocSyncStatus.value==1){
        webSocketStatus.value='saving'
      }
      setTimeout(()=>{
        webSocketStatus.value=''
      },1000)
    }
  },
  { debounce: 1000,  },
)


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
  async (newValue, oldValue) => {
    disconnectWebsocket(oldValue)
    if (props.objectId) {
      console.log('==>this is object id in watch and call init function ', props.objectId)

      await init()
      if (currentDocument.value) {
        myCollection?.setDocMeta(currentDocument.value.id, { object_id: props.objectId })
      }
    }
  }
  //{ immediate: true }
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
    const doc = toRaw(unref(currentDocument.value))
    doc.awarenessStore.setReadonly(doc, props.readonly)
  }
}

function handleHeadingList(doc:Doc) {

  if (doc.root !== null){
      // return nothing;
    const headingBlocks = getHeadingBlocksFromDoc(
      doc,
      [NoteDisplayMode.DocAndEdgeless, NoteDisplayMode.DocOnly],
      true
    );



    const items = [
      ...(doc.meta?.title !== '' ? [doc.root] : []),
      ...headingBlocks,
    ].filter(item=> item.text.trim()!='') ;

    if (currentDocument.value && myCollection) {
        // myCollection?.setDocMeta(currentDocument.value.id, { headingList: items })
        doc.collection.setDocMeta(doc.id, {
          headingList: items,
    });
      }
  }

}

function bindEvent(doc: Doc) {
  doc.slots.blockUpdated.on((data) => {
    if (stopEvent.value) {
      return
    }
    handleHeadingList(doc)
    checkNotEmptyDocBlock(doc)
    checkIsEmpty()
    emit('change', data)
    if (data.type == 'add') {
      if (data.flavour == 'affine:mahdaad-object') {
        if (data.model.object_id) {
          emit('addObjectLink', data)
        }
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

  myCollection?.docSync.onStatusChange.on((s)=>{
    //console.log("77777",s);
    lastDocSyncStatus.value=s.step
  })

}

function checkNotEmptyDocBlock(doc: Doc) {
  if (editorElement.value.mode == 'edgeless') {
    return
  }
  nextTick(() => {
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
        //doc.addBlock('affine:paragraph', {}, note)
        /*nextTick(()=>{
        })*/
        //doc.addBlock('affine:paragraph', {}, note)
      }
    }
  })
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

async function exportHTMLFromSnapshot(snapshot: DocSnapshot, config: any) {
  const doc = toRaw(unref(currentDocument.value))
  const job = new Job({
    collection: doc.collection
  })
  job.adapterConfigs.set('mahdaad_config', config)
  const adapter = new MahdaadHtmlAdapter(job)
  if (!snapshot) {
    return
  }
  return await adapter.fromDocSnapshot({
    snapshot
    //assets: job.assetsManager,
  })
}

async function exportHTML(config: any) {
  /*const job = new Job({ collection })
  const snapshots = await Promise.all(docs.map(job.docToSnapshot))
  if (snapshots.length > 0) {
    return snapshots[0]
  }
 return null*/
  const doc = toRaw(unref(currentDocument.value))
  const job = new Job({
    collection: doc.collection
    //middlewares: [docLinkBaseURLMiddleware, titleMiddleware],
  })
  job.adapterConfigs.set('mahdaad_config', config)
  job.adapterConfigs.set('headingList',get(doc,'meta.headingList'))
  const snapshot = job.docToSnapshot(doc)
  const adapter = new MahdaadHtmlAdapter(job)
  if (!snapshot) {
    return
  }
  /* return await adapter.fromDocSnapshot({
    snapshot
    //assets: job.assetsManager,
  })*/
  const htmlResult = await adapter.fromDocSnapshot({
    snapshot
    //assets: job.assetsManager,
  })

  /*const iframe = document.getElementById('myIframe');
  iframe.srcdoc = htmlResult.file;
  const iframeWindow = iframe.contentWindow;
  iframeWindow.print()*/

  return htmlResult
}

function setFocus(e) {
  e.preventDefault()
  e.stopPropagation()
  if (refEditor.value) {
    const editor = (refEditor.value as HTMLElement).querySelector('rich-text')
    if (editor && editor.inlineEditor) {
      editor.inlineEditor.focusEnd()
    }
  }
}

function checkIsEmpty() {
  let res = true
  const doc = toRaw(unref(currentDocument.value))
  const noteList = doc.getBlockByFlavour('affine:note')
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
    //todo for fix in ctrl + a in tiptap on comment in put
    if (target && target.classList.contains('tiptap')) {
      return
    }
    if (!target.closest('mahdaad-editor-container')) {
      const temp = document.querySelectorAll(
        'mahdaad-editor-container:not(mahdaad-editor-container mahdaad-editor-container):not(.ignore-select mahdaad-editor-container)'
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
  exportHTML,
  setFocus,
  //reset,
  isEmpty,
  doc: currentDocument,
  checkIsEmpty,
  editor: refEditor,
  exportHTMLFromSnapshot,
  webSocketStatus
  //collection:myCollection
})

/************************************************************/

//todo ali ghasami
async function setData(data: any, clear_history?: boolean = true) {
  //method 1
  if (myCollection && currentDocument.value) {
    const doc = toRaw(unref(currentDocument.value)) //currentDocument.value as Doc
    console.log('this is doc', doc)
    const blocks = get(data, 'blocks.children', [])
    const note = blocks.find((item) => item.flavour == 'affine:note')
    const noteChildren = get(note, 'children', [])
    if (noteChildren.length > 0) {
      //todo ali ghasami for user schemas.value
      const schema = new Schema().register(AffineSchemas)
      const collection = new DocCollection({ schema })
      const job = new Job({
        collection: collection,
        middlewares: [replaceIdMiddleware]
      })
      const notes: BlockModel[] = doc.getBlocksByFlavour('affine:note')
      let index = 1
      if (notes.length > 0) {
        notes[0].model.children.forEach((item) => {
          doc.deleteBlock(item)
        })
        for (const item of noteChildren) {
          await job.snapshotToBlock(item, doc, notes[0].id, index++) // parent.id, insertIndex++
        }
        //const parent = doc.getParent(this.model);
        /* if (parent) {
           const targetIndex =
             parent.children.findIndex(({ id }) => id === this.model.id) ?? 0;
           let insertIndex = targetIndex + 1; //place === 'before' ? targetIndex :
         }*/
      }
    }
  }
}

const edgelessId = computed(() => {
  return `edgeless_${props.objectId}`
})

const webSocketURL=computed(()=>{
  //const BASE_WEBSOCKET_URL = 'wss://blocksuite-playground.toeverything.workers.dev'
  //const BASE_WEBSOCKET_URL = 'wss://collab.claytap.com'
  //const BASE_WEBSOCKET_URL = 'ws://localhost:8080'
  //'ws://localhost:8080'
  // 'wss://sence.misdc.com'
  return `${ props.websocketUrl}?r=${props.objectId}&u=${Math.ceil(Math.random() * 50)}`
})


function patchPageRootSpec(spec: ExtensionType[]) {
  const setEditorModeCallBack = editorElement.value.switchEditor.bind(editorElement.value)
  const getEditorModeCallback = () => editorElement.value.mode
  const newSpec: typeof spec = [
    ...spec,
    DocModeExtension(mockDocModeService(getEditorModeCallback, setEditorModeCallBack))
    /*OverrideThemeExtension(themeExtension),
    ParseDocUrlExtension(mockParseDocUrlService(collection)),
    GenerateDocUrlExtension(mockGenerateDocUrlService(collection)),
    NotificationExtension(mockNotificationService(editor)),
    FontConfigExtension(CommunityCanvasTextFonts),
    mockPeekViewExtension(attachmentViewerPanel),*/
  ]
  return newSpec
}

const deleteRecordFromUnknownSchema = async (dbName, tableName, recordKey) => {
  try {
    // Open the existing database without defining the schema
    //const db = await Dexie.open(dbName);
    const db = new Dexie(dbName)
    console.log('==>database start open for delete record')
    await db.open()
    console.log('==>database is opened for delete record')

    // List available tables in the database
    console.log(
      '==>Available tables:',
      db.tables.map((table) => table.name)
    )

    // Check if the specified table exists
    const table = db.tables.find((t) => t.name === tableName)
    if (!table) {
      console.log(`==>Table "${tableName}" does not exist in the database.`)
      return
    }

    // Delete the record by key
    await db.table(tableName).delete(recordKey)
    console.log(`==>Record with key ${recordKey} deleted from "${tableName}" table.`)
    console.log('==>start for close database in delete record')
    db.close()
    console.log('==>end close database in delete record')
  } catch (error) {
    console.error('==>Error deleting record:', error)
  }
}
let stopWatchWs : any=null
let stopWatchStatus : any=null
//todo refactor after
function getWebSocketInstance(){
  const wsMap: Map<string, any> = window.$blockEditor.wsMap
  const socketRef=wsMap.get(props.objectId)
  if (!socketRef ||  !socketRef.ws ||  [2,3].includes(socketRef.ws.readyState) ){
    disconnectWebsocket(props.objectId)
    if(stopWatchWs){
      stopWatchWs.stop()
    }
    if(stopWatchStatus){
      stopWatchStatus.stop()
    }
    //socketRef.ws.readyState!=socketRef.ws.OPEN
    //debugger
    ////(wsMap.has(props.objectId) && (!wsMap.get(props.objectId).ws  ||) ) // && wsMap.get(props.objectId).ws.readyState != wsMap.get(props.objectId).ws.OPEN)
    //disconnectWebsocket()
    /*wsMap.set(
      props.objectId,
      new WebSocket(
        webSocketURL.value
      )
    )*/
    //console.log("create web socket");
    const { status, data, send, open, close,ws } = useWebSocket(webSocketURL.value,{
      //autoReconnect: true,
      autoReconnect: {
        //retries: 3,
        delay: 3000,
        /*onFailed() {
          alert('Failed to connect WebSocket after 3 retries')
        },*/
      },
    })
    wsMap.set(
      props.objectId,
      {ws:ws.value,close}
    )
     stopWatchStatus= watch(status,()=>{
        if(['CLOSED','CONNECTING'].includes(status.value)){
          webSocketStatus.value='offline'
        }else{
          webSocketStatus.value=''
        }
    })
     stopWatchWs = watch(ws,()=>{
      console.log("==> watch in ws",ws);
      if(ws.value){
        wsMap.set(
          props.objectId,
          {ws:ws.value,close,}
        )
      }
    })

  }
  return wsMap.get(props.objectId).ws
}

/** code Refactor  */
async function init() {
  loading.value = true
  stopEvent.value = true
  dispose()
  console.log('==>init function')
  const defaultFlags = {
    enable_synced_doc_block: true,
    enable_pie_menu: true,
    enable_lasso_tool: true,
    enable_color_picker: true
    // ...flags,
  }
  /** comment for save data  in indexDb*/
  /*if (props.objectId) {
    console.log('==>has object id', props.objectId)
    try {
      console.log('==>run delete cord with id ', props.objectId)
      await deleteRecordFromUnknownSchema(DEFAULT_DB_NAME, 'collection', props.objectId)
     console.log('==>run delete edgeless', edgelessId.value)
     await deleteRecordFromUnknownSchema(DEFAULT_DB_NAME, 'collection', edgelessId.value)
    } catch (e) {
      console.log('==>error in remove recode object and edgless from collection', e)
    }
  }*/
  const schema = new Schema()
  schema.register(schemas.value)
  let editorData = props.data
  if (editorData && editorData.meta.id && props.objectId) {
    editorData.meta.id = props.objectId //temp.meta.object_id
  }
  console.log('==>data for set in editor is', editorData)
  const mountEditor = async () => {
    console.log('==>start for mount editor')
    const blockCollection = myCollection.docs.values().next().value as BlockCollection
    assertExists(blockCollection, '==>Need to create a doc first')
    const doc = blockCollection.getDoc()
    assertExists(doc.ready, '==>Doc is not ready')
    assertExists(doc.root, '==>Doc root is not ready')
    editorElement.value = new MahdaadEditorContainer()
    const specs = getExampleSpecs()
    const refNodeSlotsExtension = RefNodeSlotsExtension()
    editorElement.value.pageSpecs = patchPageRootSpec([
      refNodeSlotsExtension,
      ...specs.pageModeSpecs
    ])
    editorElement.value.edgelessSpecs = patchPageRootSpec([
      refNodeSlotsExtension,
      ...specs.edgelessModeSpecs
    ])
    if (props.isBoardView) {
      editorElement.value.mode = 'edgeless'
    } else {
      editorElement.value.mode = 'page'
    }
    console.log('==>doc for mount is', doc)
    myCollection.awarenessStore.awareness.setLocalStateField('user', {
      user_id: props.userId,
      color: props.userColor
    })
    currentDocument.value = doc
    editorElement.value.doc = doc
    checkIsEmpty()
    //todo ali ghasami for remove after
    //const temp = await exportData(myCollection, [currentDocument.value])
    //console.log('this is snap shoot ', temp)
    bindEvent(doc)
    handleHeadingList(doc)
    appendTODOM(editorElement.value)
    checkNotEmptyDocBlock(currentDocument.value)
    checkReadOnly()
    stopEvent.value = false
    loading.value = false
  }
  if (props.isCollaboration && props.objectId && props.websocketUrl) {
    console.log('==>is collaboration mode')
    const idGenerator: IdGeneratorType = IdGeneratorType.NanoID
    let docSources: DocCollectionOptions['docSources'] = {
      main: new IndexedDBDocSource()
    }
    let awarenessSources: DocCollectionOptions['awarenessSources']
    //const wsMap: Map<string, any> = window.$blockEditor.wsMap

    /*if (
      !wsMap.has(props.objectId) ||
      (wsMap.has(props.objectId) &&
        wsMap.get(props.objectId).readyState != wsMap.get(props.objectId).OPEN)
    ) {
      /!*wsMap.set(
        props.objectId,
        new WebSocket(
          webSocketURL.value
        )
      )*!/
      //console.log("create web socket");
      const { status, data, send, open, close,ws } = useWebSocket(webSocketURL.value,{
        autoReconnect: true,
      })
      wsMap.set(
        props.objectId,
        ws.value
      )
     /!* watch(status,()=>{
        console.log("status",status);
      })*!/
     watch(ws,()=>{
       console.log("==> watch in ws",ws);
       wsMap.set(
         props.objectId,
         ws.value
       )
       /!*if(webSocketDocSource){
         webSocketDocSource.ws=ws.value
       }*!/
       //myCollection?.docSync.shadows[0].
     })
    }*/
    //const web_socket = wsMap.get(props.objectId)
    console.log('==>this is list web socket is', window.$blockEditor.wsMap)
    const initDoc = async () => {
      console.log('==>start initDoc function')
      console.log('==>before waitForSynced')
      await myCollection.waitForSynced()
      console.log('==>after waitForSynced')
      console.log('==>find doc in collection', myCollection.getDoc(props.objectId))
      const shouldInit = !myCollection.getDoc(props.objectId)
      console.log('==>shouldInit', shouldInit)
      if (shouldInit) {
        console.log('==>start create empty doc and inject editorData')
        myCollection.meta.initialize()
        if (props.data) {
          //todo ali ghasami for inject data if has bug and client id in used
          const job = new Job({ collection: myCollection, middlewares: [] }) //replaceIdMiddleware
          const doc = await job.snapshotToDoc(editorData)
          //const doc=await job.snapshotToDoc(props.data)
          if (doc) {
            doc.load()
            doc.resetHistory()
          }
        } else {
          console.log('==>start create empty doc for new doc in collaboration mode')
          const doc = myCollection.createDoc({ id: props.objectId }) //'doc:home'
          doc.load()
          const rootId = doc.addBlock('affine:page')
          doc.addBlock('affine:surface', {}, rootId)
          if (!props.isBoardView) {
            const noteId = doc.addBlock('affine:note', {}, rootId)
            doc.addBlock('affine:paragraph', {}, noteId)
            //const temp1=doc.addBlock('affine:mahdaad-callout', {}, noteId)
            //doc.addBlock('affine:paragraph', {}, temp1)
          }
          doc.resetHistory()
        }
      } else {
        console.log('==>doc is exist and get from collection and load')
        const doc = myCollection.getDoc(props.objectId)
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
    //console.log("original web socket",web_socket);
    const web_socket= getWebSocketInstance()
    await new Promise((resolve, reject) => {
      if (web_socket.readyState === WebSocket.OPEN) resolve(true)
      web_socket.addEventListener('open', resolve)
      web_socket.addEventListener('error', reject)
    })
      .then(() => {
        console.log('==>resolve websocket')
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(getWebSocketInstance, props.objectId, initDoc)]
        }
        awarenessSources = [new WebSocketAwarenessSource(getWebSocketInstance)]
      })
      .catch(() => {
        console.log('==>catch for open websocket and Broadcast channel')
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
      defaultFlags
      /*defaultFlags: {
        enable_synced_doc_block: true,
        enable_pie_menu: true,
        enable_lasso_tool: true,
        enable_color_picker: true,
        // ...flags,
      }*/
    }
    console.log('==>Init collection in collaboration mode and start')
    myCollection = new DocCollection(options)
    myCollection.start()
    //await myCollection.waitForSynced()
  } else {
    console.log('==>not collaboration mode')
    //console.log("5555555",props.data);
    myCollection = new DocCollection({ schema, defaultFlags })
    myCollection.start()
    myCollection.meta.initialize()
    if (editorData) {
      //const temp=props.data
      //temp.meta.id=props.objectId //temp.meta.object_id
      const job = new Job({ collection: myCollection, middlewares: [] }) //replaceIdMiddleware
      const doc = await job.snapshotToDoc(editorData)
      if (doc) {
        doc.load()
        doc.resetHistory()
      }
    } else {
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


function dispose(){
  if(myCollection){
    myCollection.forceStop()
    myCollection.dispose()
  }
}

function disconnectWebsocket(id:string){
  console.log("11111",id);
  const wsMap: Map<string, any> = window.$blockEditor.wsMap
  const socketRef= wsMap.get(id) //props.objectId
  if (socketRef){
    console.log("==>disconnect web socket",socketRef);
    socketRef.close()
    wsMap.delete(id) //props.objectId
    //socketRef.close(1000)
  }
}

onUnmounted(()=>{
  /*console.log("___collection",myCollection);
  console.log("___doc",currentDocument.value);
  console.log("___this is refEditor",refEditor.value);*/
  dispose()
  disconnectWebsocket(props.objectId)
})


</script>

<style lang="less">
[data-theme='light'] {
  --affine-text-primary-color: @gray-10;
  --affine-divider-color: @gray-2;
  --affine-background-primary-color: @gray-0;
  --affine-hover-color-filled: @gray-1;
  --affine-border-color: @gray-2;
  --affine-v2-layer-insideBorder-border: @gray-2;
  --affine-background-secondary-color: @gray-1;
  //--affine-background-secondary-color:@teal-5;
  --affine-v2-chip-label-teal: @teal-0;
  --affine-v2-chip-label-white: @gray-0;
  --affine-v2-chip-label-purple: @pink-1;
  --affine-v2-chip-label-grey: @gray-2;
  --affine-v2-text-primary: @gray-8;
  --affine-v2-database-textSecondary: @gray-4;
  --affine-background-overlay-panel-color: @gray-0;
  //--affine-background-overlay-panel-color:
  //--affine-tag-white:@gray-0;
}

@prefix:~ 'vue-block-board-editor';
.@{prefix} {
  .affine-menu-action-text,
  .property-item-name,
  .select-input {
    @apply text-gray-8;
  }

  .claytap-quote {
    @apply bg-gray-05;
    &::after {
      @apply bg-gray-2;
      inset-inline-start: 0;
    }
  }

  .quote-container {
    //padding: var(----pta-space-400, 8px);
    @apply flex gap-2 p-2;
    .quote-icon {
      @apply stroke-gray-5 mt-2;
    }

    .affine-paragraph-placeholder {
      //bottom: unset !important;
      @apply ps-9 text-gray-5;
    }
  }

  /* affine-database-table{
     //width: 100%;
   }*/

  /*affine-database{
    width: 90%;
    overflow-x: hidden;
  }*/

  /*.affine-block-component{
    overflow: hidden;
    width: 90%;
  }*/
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

    /*.claytap-text {
      font-family: unset;
    }*/
  }

  .place-holder {
    @apply flex items-center gap-1 text-neutral-4 mt-body;
    line-height: 32px;
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

  *[data-v-text] {
    //background-color: red;
    line-height: 32px;
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
  affine-database,
  affine-menu {
    background-color: @gray-0;
  }

  .affine-menu-button .affine-menu-action-text,
  .affine-menu-input,
  .affine-database-title,
  affine-menu {
    color: @gray-10;
  }

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

  //TODO ali ghasami for cxomment text color
  /* paragraph Style */
  .claytap-text {
    //background-color: red;
    //  @apply text-neutral-8; //mt-body
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
    color: @gray-3;
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
    //display: inline-flex;
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

/*
.editor{
  border:1px solid pink;
}
*/

/*affine-note{
  border:1px solid #d34f0b;
}*/

.affine-drag-indicator,.affine-drop-indicator{
  @apply h-100;
  background: @primary-5;

  &.vertical{
    @apply w-100 mt-1;
  }

  .circle-indicator{
    border: 2px solid @primary-5;
    width: 8px;
    height: 8px;
    display: block;
    background-color: @gray-0;
    border-radius: 50%;
    top: -3px;
    position: absolute;

    &.vertical{
      //@apply w-100;
      right: -3px;
    }

  }

}


affine-drag-preview{
  z-index: 999;
  .tooltip-message{
    @apply bg-neutral-9 shadow-floated rounded-sm text-gray-0 txs-overline;
    padding: @space-200 @space-400;
    max-width: 221px;
    margin-top:20px;
    //width: 150px;
    min-height: 30px;
    margin-inline-start:-30px;
  }

  .hint{
    @apply rounded-md shadow-sharp txs-body text-fg-subtle block;
    width: 232px; //bg-target
    padding: @space-400  @space-600;
    background: @bg-target;
  }


}
/*

affine-paragraph:hover{


  .drag-test{

    border: 1px dashed @gray-5;
    //box-shadow: 0 0 5px 5px darkblue;
    padding: var(----pta-space-200, 4px);
    opacity: 0.5;
  }
}
*/

//drag-test
.on-drag{
  position: relative;
  opacity: 0.5;
}

.on-drag::after {
  content: "";
  @apply  rounded-lg;
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 1px dashed @gray-5;
  //border-radius: 8px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.active-drop:not(affine-mahdaad-multi-column):not(affine-mahdaad-callout):not(affine-mahdaad-object):not(:has(.claytap-quote)){
  position: relative;
  //background-color: red;
  //@apply bg-primary-fill-subtle border-primary-br-subtle-target ; //border-1
  /*.affine-paragraph-block-container,.claytap-quote{
    @apply bg-primary-fill-subtle;
  }*/
  &::after{
    content: "";
    @apply  rounded   bg-primary-fill-subtle; //bg-primary-fill-subtle //bg-primary-fill-subtle
    position: absolute;
    top: 0;
    left: -4px;
    right: 0;
    bottom: 0;
    z-index: -1;
    //z-index:;
    border: 1px solid @primary-br-subtle-target;
    //border-radius: 8px;
    //opacity: 0.5;
    //transition: opacity 0.3s ease;
  }
}




/*affine-paragraph{
  position: relative;
}*/
/*
.drag-test:hover::after {
  //opacity: 1;
}
*/



/*
.group {
  position: relative;
}

.group:first-child {
  border-top: 2px solid black;
}

.group:last-child {
  border-bottom: 2px solid black;
}

.group::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  //left: -10px;
  width: calc(100% + 20px);
  height: 100%;
  border-left: 2px solid black;
}

.group:last-child::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  //left: -10px;
  width: calc(100% + 20px);
  height: 100%;
  border-right: 2px solid black;
}
*/



/*
.drag-test:before{

  content: "";
  position: absolute;
  top: -10px; !* فاصله از بالا *!
  left: -10px; !* فاصله از چپ *!
  right: -10px; !* فاصله از راست *!
  bottom: -10px; !* فاصله از پایین *!
  border: 3px solid darkblue; !* استایل حاشیه *!
  border-radius: 12px;
  opacity: 0; !* در حالت عادی دیده نشود *!
  transition: opacity 0.3s ease;

  .element:hover::after {
    opacity: 1; !* هنگام هاور، حاشیه نمایش داده شود *!
  }

 !* content: ' ';
  background-color: red;*!
  //border: 1px dashed @gray-5;
  //box-shadow: 0 0 5px 5px darkblue;
  //padding: var(----pta-space-200, 4px);
  //opacity: 0.5;
}*/



/*
.drag{
  //border: 1px dashed red !important;
  opacity: 0.5;
}*/

/*.with-drag-handle{
  background-color: yellow;
}*/
/*//.slash-menu,
!*.popover-menu{
  border-radius: var(--mt-roundness-3);
  //background-color: red;
}*!*/

.highlight-heading-animation {
  animation: blink 1.5s ease-in infinite;
  animation-fill-mode: both;
}

@keyframes blink {
  0% {
    opacity: 0;
    background-color: @primary-fill-subtle-target;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
