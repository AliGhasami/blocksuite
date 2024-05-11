<template>
  <div class="vue-block-editor">
    <div ref="refEditor" class="editor"></div>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css';
import { PageEditor } from '@blocksuite/presets';
import {createEmptyDoc} from './helpers'
import {type BlockModel, Doc, DocCollection, Job} from '@blocksuite/store';
import {defineCustomElement, onMounted, ref} from "vue";
import {replaceIdMiddleware} from "@blocksuite/blocks";
const refEditor = ref<HTMLElement | null>(null)
let  currentDocument : Doc | null=null
//let editor: any = null
let myCollection: DocCollection | null = null
import 'tippy.js/dist/tippy.css';
import SelectHintTypeComponent from '@/components/web-component/SelectHintType.ce.vue'
const SelectHintType = defineCustomElement(SelectHintTypeComponent)
if(!customElements.get('select-hint-type')){
  customElements.define('select-hint-type', SelectHintType,{})
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


const emit=defineEmits<{
  (e:'change',val:IBlockChange):void
  (e:'addBlock',val:IBlockChange):void
  (e:'deleteBlock',val:IBlockChange):void
  (e:'updateBlock',val:IBlockChange):void
}>()


async function getData(){
  if(myCollection){
    return  await exportData(myCollection, [currentDocument])
  }
  return null
  //console.log("this is temp",temp)
  //console.log("ref editor",refEditor.value)
}

//TODO(@ali ghasami) for fix after and check performance
async function setData(data:any){
 // console.log("this is set data",data)
  if(myCollection){
    const editor = new PageEditor();
    const job = new Job({ collection: myCollection, middlewares: [
        replaceIdMiddleware
      ]})
     const new_doc = await job.snapshotToDoc(data)
   // console.log("this is doc",new_doc)
    bindEvent(new_doc)
    //console.log("this is doc",new_doc)
    //console.log("this is collcetion",myCollection)
    //console.log("this is new doc",new_doc)
    //myCollection
    //const _collection = editor.doc.collection;
    //console.log("11111",_collection)
    //const docs = [..._collection.docs.values()];
    editor.doc = new_doc
    currentDocument=new_doc
    //editor.doc.load();
    //editor.doc.resetHistory();
    //currentDocument = editor.doc
    if (refEditor.value) {
      //debugger
      const children = refEditor.value.children
      //console.log('refEditor', refEditor.value.children)
      if (children.length) {
       refEditor.value.removeChild(children[0])
      }
      refEditor.value.appendChild(editor)
      //const childs = refEditor.value //refEditor.value.removeChild(ed)
      //.appendChild(editor)
    }
    //return
    //editor = new PageEditor()
    //new_doc.load()
    //editor.doc.load();
    //editor.doc.resetHistory();
    //editor.doc.
    //console.log('this is set data', data)
    //currentDocument = editor.doc
    //bindEvent(editor.doc)
    //editor.doc.load()
    //editor.doc.resetHistory()
  }
}

function bindEvent(doc:Doc){
  doc.slots.blockUpdated.on((data)=>{
    emit('change',data)
    if(data.type=='add')
      emit('addBlock',data)
    if(data.type=='delete')
      emit('deleteBlock',data)
    if(data.type=='update')
      emit('updateBlock',data)
    //console.log("block updated",data)
  })
}


/*
function handleGetData(){
  //console.log("1111")
}
function handleSetData(){
}
*/
/*onMounted(()=>{
  const doc = createEmptyDoc().init();
  //const editor = new EdgelessEditor();
  const editor = new PageEditor();
  //const editor = new AffineEditorContainer();
  editor.doc = doc;
  //document.body.appendChild(editor);
  if(refEditor.value){
    refEditor.value.appendChild(editor);
  }
  // Update block node with some initial text content
  const paragraphs = doc.getBlockByFlavour('affine:paragraph');
  const paragraph = paragraphs[0];
  doc.updateBlock(paragraph, { text: new Text('Hello World!') });
  console.log("this is doc",doc)
})*/

onMounted(async ()=>{
  const {doc,collection} = createEmptyDoc().init();
  myCollection= collection
  currentDocument=doc
  //myNoteId=noteId
  const editor = new PageEditor();
  editor.doc = doc;
  //document.body.appendChild(editor);
  if(refEditor.value){
    refEditor.value.appendChild(editor);
  }
  bindEvent(doc)
  //console.log("1111",editor)
  //console.log("2222",doc)
  //const a=doc.getBlockByFlavour('affine:paragraph')
  //console.log("this is a",a[0])
  //console.log("editor",editor,editor.slots)
  //console.log("doc",doc)
  //editor.doc.destroy()
  //doc.destroy()
  // Update block node with some initial text content
  //const paragraphs = doc.getBlockByFlavour('affine:paragraph');
  //const paragraph = paragraphs[0];
  //doc.updateBlock(paragraph, { text: new Text('Hello World!') });
})

async function exportData(collection : DocCollection, docs:any[]) {
  const job = new Job({ collection })
  //job.snapshotToDoc()
  const snapshots = await Promise.all(docs.map(job.docToSnapshot))
  // console.log('this is snapShoot111', snapshots[0])
  if (snapshots.length > 0) {
    return snapshots[0]
    //return Object.assign(snapshots[0].blocks, { id: null })
  }
  return null
}

function setFocus(){
  if(refEditor.value){
    const editor=(refEditor.value as HTMLElement).querySelector('rich-text')
    if(editor && editor.inlineEditor){
      editor.inlineEditor.focusEnd()
    }
    //console.log("55555",editor)
  }
  //console.log("ggg",refEditor.value)
}

/*onMounted(()=>{
  setTimeout(()=>{
    setFocus()
  },5000)

  //console.log("111",refEditor.value)
})*/


defineExpose({
  getData,
  setData,
  setFocus
})


/*function handleAddDivider(){
  if(myDoc){
    console.log("this is doc",myDoc)
    //const noteId=doc.
    //doc.addBlock('affine:divider', {}, doc.root?.id);
    //doc.addBlock('affine:divider', {}, noteId);
    //debugger
    myDoc.addBlock('affine:divider', {},myNoteId);
    //doc.addBlocks([],)
    //const paragraphs = doc.getBlockByFlavour('affine:paragraph');
    //const paragraph = paragraphs[0];
    //doc.updateBlock(paragraph, { text: new Text('Hello World!') });
  }

}*/

</script>

<style lang="less">
/* TODO ali ghasami for fix token */
@prefix:~'vue-block-editor';
.@{prefix}{


  .place-holder{
  @apply text-neutral-4 mt-body;
    line-height: unset;
    transition: all 0.3s ease-in-out;
    //background-color: red;
    .short-code{
      border-radius: 4px;
    @apply bg-neutral-1 p-1 w-6 h-6 inline-flex items-center justify-center;
    }
  }

  /* Mention Style */
  .affine-mention{
    @apply flex-inline gap-2 mt-overline;
    color:#64428F;
    //border: 1px solid #535bf2;
    width: fit-content;
    border-radius: @roundness-sm;
    padding: 0 @space-2;
    background: @dreampurple-0;
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


  /*.with-drag-handle{
    //background-color: red;
  }*/

  /*.affine-paragraph-placeholder{
    //background-color: red;
    cursor: pointer !important;
   !* &.hover{
      //background-color: green;
    }*!
  }*/

  /* Place Holder - paragraph style */

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
  width: 200px;
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
    color:#6E737C;
    padding: @space-1;
    border-radius: @roundness-sm;
  }
}



/* TOdo ali ghasami for fix style **/
.tippy-box{
  @apply bg-white shadow-floated text-black;
  //color:red;
  border-radius: @roundness-3;
  position: relative;
}


//.slash-menu,
/*.popover-menu{
  border-radius: var(--mt-roundness-3);
  //background-color: red;
}*/

</style>


