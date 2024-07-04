<template>
  <div class="vue-block-board-editor">
    <div ref="refEditor" :class="[props.isBoardView ? 'board':'editor']"></div>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css';
import { PageEditor ,EdgelessEditor} from '@blocksuite/presets';
import {createEmptyDoc} from './helpers'
import {type BlockModel, Doc, DocCollection, Job} from '@blocksuite/store';
import { defineCustomElement, onMounted, ref, watch } from "vue";
import {replaceIdMiddleware} from "@blocksuite/blocks";
import 'tippy.js/dist/tippy.css';
const refEditor = ref<HTMLElement | null>(null)
let  currentDocument : Doc | null=null
let myCollection: DocCollection | null = null
import SelectHintTypeComponent from '@/components/web-component/SelectHintType.ce.vue'
import DatePickerComponent from '@/components/web-component/DatePicker.ce.vue'

//TODO ali ghasami for add function add and check web component
const SelectHintType = defineCustomElement(SelectHintTypeComponent)
if(!customElements.get('select-hint-type')){
  customElements.define('select-hint-type', SelectHintType,{})
}

const DatePicker = defineCustomElement(DatePickerComponent)
if(!customElements.get('mahdaad-date-picker')){
  customElements.define('mahdaad-date-picker', DatePicker,{})
}


interface Props{
  isBoardView?:boolean,
  mentionUserList?:any[]
  uploadUrl?:string
  storageUrl?:string
  apiToken?:string
}

type IBlockChange= {
  type: 'add';
  id: string;
  flavour: string;
}
    | {
  type: 'delete';
  id: string;
  flavour: string;
  parent: string;
  model: BlockModel;
}
    | {
  type: 'update';
  id: string;
  flavour: string;
  props: { key: string };
}

const props=withDefaults(defineProps<Props>(),{
  isBoardView:false,
  mentionUserList:()=>[]
})

const emit=defineEmits<{
  (e:'change',val:IBlockChange):void
  (e:'addBlock',val:IBlockChange):void
  (e:'deleteBlock',val:IBlockChange):void
  (e:'updateBlock',val:IBlockChange):void
}>()


watch(()=>[props.uploadUrl,props.storageUrl,props.apiToken],()=>{
  const temp={
    uploadUrl:props.uploadUrl ?? '',
    storageUrl:props.storageUrl ?? '',
    apiToken:props.apiToken ?? ''
  }


  if(window.$blockEditor){
    Object.assign(window.$blockEditor,temp)
  }else{
    window.$blockEditor=temp
  }

},{immediate:true})


async function getData(){
  if(myCollection){
    return  await exportData(myCollection, [currentDocument])
  }
  return null
}

//TODO(@ali ghasami) for fix after and check performance
async function setData(data:any){
  if(myCollection){
    //const editor = new PageEditor();
    let editor = null
    if(props.isBoardView){
      editor = new EdgelessEditor();
    }else{
      editor = new PageEditor();
    }
    const job = new Job({ collection: myCollection, middlewares: [
        replaceIdMiddleware
      ]})
     const new_doc = await job.snapshotToDoc(data)
    bindEvent(new_doc)
    editor.doc = new_doc
    currentDocument=new_doc
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

function reset(){
  init()
}


function bindEvent(doc:Doc){
  doc.slots.blockUpdated.on((data)=>{
    emit('change',data)
    if(data.type=='add')
      emit('addBlock',data)
    if(data.type=='delete')
    {
      checkNotEmptyDocBlock(doc)
      emit('deleteBlock',data)
    }
    if(data.type=='update')
      emit('updateBlock',data)
  })
}

function checkNotEmptyDocBlock(doc:Doc){
  const noteList = doc.getBlockByFlavour('affine:note');
  const note=noteList.length ? noteList[0] : null;
  if(note && note.children.length == 0){
    doc.addBlock('affine:paragraph', {}, note);
    /*nextTick(()=>{
      setFocus()
    })*/
  }
}



function appendTODOM(element:HTMLElement){
  if (refEditor.value) {
    const children = refEditor.value.children
    if (children.length) {
      refEditor.value.removeChild(children[0])
    }
    refEditor.value.appendChild(element)
  }
}


watch(()=>props.isBoardView,()=>{
  init()
})


watch(()=>props.mentionUserList,()=>{
  updateMentionList()
},{deep:true})

function init(){
  const {doc,collection} = createEmptyDoc(props.isBoardView).init();
  myCollection= collection
  currentDocument=doc
  //myNoteId=noteId
  let editor = null
  if(props.isBoardView){
    editor = new EdgelessEditor();
  }else{
    editor = new PageEditor();
  }
  editor.doc = doc;
  appendTODOM(editor)
  /*if(refEditor.value){
    refEditor.value.appendChild(editor);
  }*/
  bindEvent(doc)
  updateMentionList()
}



async function exportData(collection : DocCollection, docs:any[]) {
  const job = new Job({ collection })
  //job.snapshotToDoc()
  const snapshots = await Promise.all(docs.map(job.docToSnapshot))
  if (snapshots.length > 0) {
    return snapshots[0]
    //return Object.assign(snapshots[0].blocks, { id: null })
  }
  return null
}

function updateMentionList(){
  const root=currentDocument?.getBlocksByFlavour('affine:page')
  if(root && root.length > 0){
    currentDocument?.updateBlock(root[0].model,{mentionUserList:props.mentionUserList})
  }
}


function setFocus(){
  if(refEditor.value){
    const editor=(refEditor.value as HTMLElement).querySelector('rich-text')
    if(editor && editor.inlineEditor){
      editor.inlineEditor.focusEnd()
    }
  }
}


onMounted(async ()=>{
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
/* TODO ali ghasami for fix token */
@prefix:~'vue-block-board-editor';
.@{prefix}{
  .place-holder{
  @apply text-neutral-4 mt-body;
    line-height: unset;
    transition: all 0.3s ease-in-out;
    .short-code{
      border-radius: 4px;
      @apply bg-neutral-1 p-1 w-6 h-6 inline-flex items-center justify-center;
    }
  }

  /* Mention Style */
  .affine-mention{
    @apply flex-inline gap-2 mt-overline cursor-pointer text-neutral-8 bg-gray-1;
    width: fit-content;
    border-radius: @roundness-sm;
    padding: 0 @space-2;
    &:hover,&[data-selected='true'] {
      background:#F7F6FE;
      color:#64428F;
    }
  }

  /* Hint Style */
  .affine-hint-container {
    &,& .affine-hint{
      border-radius: @roundness-lg;
    }

    & .affine-hint{
      @apply flex  gap-2;
      padding: @space-4 @space-6 @space-4 @space-6;
      border: 1px solid @gray-2;
      .affine-content{
        @apply flex flex-col gap-2;
      }
      .affine-hint-title{
        @apply  mt-section-tittle ;
      }

      .affine-hint-description{
        @apply mt-overline text-gray-7 pl-;
      }
    }

    &.affine-hint-success{
      border-color: #C1EBCD;
      background: #EAFAEF;
      .affine-hint-title{
        @apply text-green-5;
      }
    }

    &.affine-hint-error{
      border-color: #FAC7C7;
      background: #FCF2F2;
      .affine-hint-title{
        @apply text-red-5;
      }
    }
    &.affine-hint-warning{
      border-color: #FCE49C;
      background: #FCE49C;
      .affine-hint-title{
        color:#51555C;
      }
    }

    &.affine-hint-info{
      border-color: #AFE2FD;
      background: #EBF7FF;
      .affine-hint-title{
        color:#0BA2E8;
      }
    }

    &.affine-hint-default{
      border-color: @gray-2;
      background: #FAFAFA;
      .affine-hint-title{
        @apply text-gray-7;
      }
    }

  }

  /* reset Style */
  .affine-paragraph-block-container{
    &:hover .place-holder{
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
  .claytap-text{
    //background-color: red;
   @apply text-neutral-8 mt-body;
    line-height: unset;
  }

  .claytap-h1{
    @apply mt-page-display text-neutral-8;
    line-height: unset;
  }

  .claytap-h2{
    @apply mt-page-heading text-neutral-8;
    line-height: unset;
  }
  .claytap-h3{
    @apply mt-page-subheading text-neutral-8;
    line-height: unset;
  }

  /* Fix rtl - ltr Style */
  .affine-paragraph-placeholder{
  }



  /* Place Holder - paragraph style */

  /*  Board Style */
  .board{
    width: 100%;
    height: 600px;
  }


}

/* popover Style */
.@{prefix}-popover{
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
.@{prefix}-popover-container{
  z-index: var(--affine-z-index-popover);
  user-select: none;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 0 8px;
  //width: 200px;
  width: 500px;
  height: 650px;
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

/* slash Menu Style */
.@{prefix}-slash-menu{
  .icon{
    width: 32px;
    height: 32px;
  }

  .group-title {
  @apply mt-footnote text-neutral-5 block my-2;
  }

  .title{
  @apply mt-overline;
  }

  .item-title{
  @apply flex flex-col mt-body;//gap-2
  }

  .description{
  @apply mt-footnote text-neutral-5;
  }

  .claytap-slash-menu {
  @apply flex flex-col gap-2;
    //width: 260px;
  }

  .claytap-slash-menu-item {
  @apply py-2 px-3 gap-2 items-center flex px-2 cursor-pointer;
    border-radius: 4px;
    &:hover,&.hover{
      background: #F4F4F5;
    }
  }
}

/* Mention menu Style */
.@{prefix}-mention-menu-container{
  @apply flex flex-col gap-2;

  .mention-item{
    @apply mt-overline cursor-pointer;
    transition: all 30ms ease-in-out;
    color:#6E737C;
    padding: @space-1;
    border-radius: @roundness-sm;

    &:hover,&.hover{
      color:#0BA2E8;
      background-color: #EBF7FF;
    }
  }
}



/* TOdo ali ghasami for fix style **/
.tippy-box{
  @apply bg-white shadow-floated text-black;
  //color:red;
  border-radius: @roundness-3;
  position: relative;
}


/*//.slash-menu,
!*.popover-menu{
  border-radius: var(--mt-roundness-3);
  //background-color: red;
}*!*/

</style>


