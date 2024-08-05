<template>
  <div>
    <!--    <div style="width: 450px">
      <mahdaad-date-picker :onChange="handleChange" :time="null" date=""></mahdaad-date-picker>
    </div>-->
    <div class="vue-block-board-editor">
      <div ref="refEditor" :class="[props.isBoardView ? 'board' : 'editor']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css'
import { PageEditor, EdgelessEditor } from '@blocksuite/presets'
import { createEmptyDoc } from './helpers'
import { type BlockModel, Doc, DocCollection, Job } from '@blocksuite/store'
import { onMounted, ref, watch } from 'vue'
import { replaceIdMiddleware } from '@blocksuite/blocks'
import 'tippy.js/dist/tippy.css'
import './web-component/index'
const refEditor = ref<HTMLElement | null>(null)
let currentDocument: Doc | null = null
let myCollection: DocCollection | null = null

/*function handleChange(date:string,time:string|null){
  console.log("this is change in web component",date,time);
}*/

interface Props {
  isBoardView?: boolean
  mentionUserList?: any[]
  uploadUrl?: string
  storageUrl?: string
  apiToken?: string
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
  mentionUserList: () => []
})

const emit = defineEmits<{
  (e: 'change', val: IBlockChange): void
  (e: 'addBlock', val: IBlockChange): void
  (e: 'deleteBlock', val: IBlockChange): void
  (e: 'updateBlock', val: IBlockChange): void
  (e: 'addObjectLink', val: IBlockChange): void
  (e: 'deleteObjectLink',val: IBlockChange): void
}>()

watch(
  () => [props.uploadUrl, props.storageUrl, props.apiToken],
  () => {
    const temp = {
      uploadUrl: props.uploadUrl ?? '',
      storageUrl: props.storageUrl ?? '',
      apiToken: props.apiToken ?? ''
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
    return await exportData(myCollection, [currentDocument])
  }
  return null
}

//TODO(@ali ghasami) for fix after and check performance
async function setData(data: any) {
  if (myCollection) {
    //const editor = new PageEditor();
    let editor = null
    if (props.isBoardView) {
      editor = new EdgelessEditor()
    } else {
      editor = new PageEditor()
    }
    const job = new Job({ collection: myCollection, middlewares: [replaceIdMiddleware] })
    const new_doc = await job.snapshotToDoc(data)
    bindEvent(new_doc)
    editor.doc = new_doc
    currentDocument = new_doc
    appendTODOM(editor)
    checkNotEmptyDocBlock(currentDocument)
    /*if (refEditor.value) {
      const children = refEditor.value.children
      if (children.length) {
       refEditor.value.removeChild(children[0])
      }
      refEditor.value.appendChild(editor)
    }*/
  }
}

function reset() {
  init()
}

function bindEvent(doc: Doc) {
  /*console.log("11111",doc);

  doc.slots.yBlockUpdated.on((data)=>{
    console.log("this iis yBlockUpdated",data);
  })

  doc.slots.blockUpdated.on((data)=>{
    console.log("this iis yBlockUpdated",data);
  })*/

  /*doc.slots.dateTimeEvent.on((data)=>{
    console.log("this is data",data);
  })*/

  /*doc.slots.yBlockUpdated.on((data)=>{
    console.log("1111",data)
  })

  doc.slots.rootAdded.on((data)=>{
    console.log("doc.slots.rootAdded",data)
  })*/
  /*doc.slots.yBlockUpdated.on((data)=>{
    console.log("this is update yBlockUpdated",data)
  })*/

  doc.slots.blockUpdated.on((data) => {
    //console.log("this is event",data);
    checkNotEmptyDocBlock(doc)
    emit('change', data)
    if (data.type == 'add') {
      if(data.flavour=='affine:mahdaad-object'){
        //console.log("this is add affine:mahdaad-object",data)
        /*setTimeout(()=>{
          data.model.type='544545545'
        },8000)*/
        emit('addObjectLink', data)
      }
      //data.model.propsUpdated.
      //data.model.type='25300000'
      //console.log("this is model",data.model)
      //setData()
      /*setTimeout(()=>{
        data.model.type='25300000'
        data.model.object_id='25300000'
      },8000)*/
      emit('addBlock', data)
      //checkNotEmptyDocBlock(doc)
    }
    if (data.type == 'delete') {
      if(data.flavour=='affine:mahdaad-object'){
        //console.log("this is delete affine:mahdaad-object",data)
        emit('deleteObjectLink',data)
      }
      //checkNotEmptyDocBlock(doc)
      emit('deleteBlock', data)
    }
    if (data.type == 'update') emit('updateBlock', data)
  })
}

function checkNotEmptyDocBlock(doc: Doc) {
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

watch(
  () => props.isBoardView,
  () => {
    init()
  }
)

watch(
  () => props.mentionUserList,
  () => {
    updateMentionList()
  },
  { deep: true }
)

function init() {
  const { doc, collection } = createEmptyDoc(props.isBoardView).init()
  myCollection = collection
  currentDocument = doc
  //myNoteId=noteId
  let editor = null
  if (props.isBoardView) {
    editor = new EdgelessEditor()
  } else {
    editor = new PageEditor()
  }
  editor.doc = doc
  appendTODOM(editor)
  /*if(refEditor.value){
    refEditor.value.appendChild(editor);
  }*/
  bindEvent(doc)
  updateMentionList()
}

async function exportData(collection: DocCollection, docs: any[]) {
  const job = new Job({ collection })
  //job.snapshotToDoc()
  const snapshots = await Promise.all(docs.map(job.docToSnapshot))
  if (snapshots.length > 0) {
    return snapshots[0]
    //return Object.assign(snapshots[0].blocks, { id: null })
  }
  return null
}

function updateMentionList() {
  const root = currentDocument?.getBlocksByFlavour('affine:page')
  if (root && root.length > 0) {
    currentDocument?.updateBlock(root[0].model, { mentionUserList: props.mentionUserList })
  }
}

function setFocus() {
  if (refEditor.value) {
    const editor = (refEditor.value as HTMLElement).querySelector('rich-text')
    if (editor && editor.inlineEditor) {
      editor.inlineEditor.focusEnd()
    }
  }
}

onMounted(async () => {
  init()
})

defineExpose({
  getData,
  setData,
  setFocus,
  reset
})
</script>

<style lang="less">
/*.affine-block-children-container:not(:has(.with-drag-handle))
    > affine-paragraph:last-child
    .affine-paragraph-placeholder {
    display: block;
  }*/

/*rich-text *{
   color:red;
   //font-family: var(--base-font-family), tahoma, serif;
   font-family: "blocksuite:surface:Poppins";
 }*/

/* TODO ali ghasami for fix token */
@prefix:~ 'vue-block-board-editor';
.@{prefix} {
  .affine-menu-action-text {
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
  .affine-mention {
  @apply flex-inline gap-2 mt-overline cursor-pointer text-neutral-8 bg-gray-1;
    width: fit-content;
    border-radius: @roundness-sm;
    padding: 0 @space-2;
    &:hover,
    &[data-selected='true'] {
      background: #f7f6fe;
      color: #64428f;
    }
  }

  /* Hint Style */
  .affine-hint-container {
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
@apply pt-3 pb-1 shadow-floated border-roundness bg-white;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  //font-size: var(--affine-font-base);
  //padding: 12px 0;
  display: flex;
  //background: var(--affine-background-overlay-panel-color);
  //box-shadow: var(--affine-shadow-2);
  border-radius: 12px;
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

.@{prefix}-object-link-popover{
  //background-color: red;
  padding: 0;

  .@{prefix}-popover-container{
    padding: 0;
    min-height: 30px;
    min-width: 250px;
    width: auto;
  }

}


/* slash Menu Style */
.@{prefix}-slash-menu {
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
      background: #f4f4f5;
    }
  }
}

/* Mention menu Style */
.@{prefix}-mention-menu-container {
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
}

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
