<template>
  <div class="vue-block-editor">
<!--    <div>-->
<!--      <button @click="handleAddDivider">Add Divider</button>-->
<!--      <button @click="handleSetData">set data</button>-->
<!--    </div>-->
<!--    <main style="height: 450px" >-->
      <!--    this is editor-->
      <div ref="refEditor" class="editor"></div>
<!--    </main>-->
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css';
import { PageEditor } from '@blocksuite/presets';
import {createEmptyDoc} from './helpers'
import {Doc, Text} from '@blocksuite/store';
import {onMounted, ref} from "vue";
///import {AffineSchemas} from "@blocksuite/blocks";
//import sampleData from "./data"
const refEditor = ref<HTMLElement | null>(null)

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
let  myDoc : Doc | null=null
let myNoteId : string | null=null
onMounted(async ()=>{
  const {doc,noteId} = createEmptyDoc().init();
  myDoc=doc
  myNoteId=noteId
  const editor = new PageEditor();
  editor.doc = doc;
  //document.body.appendChild(editor);
  if(refEditor.value){
    refEditor.value.appendChild(editor);
  }
  // Update block node with some initial text content
  //const paragraphs = doc.getBlockByFlavour('affine:paragraph');
  //const paragraph = paragraphs[0];
  //doc.updateBlock(paragraph, { text: new Text('Hello World!') });
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

.vue-block-editor{

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

  .place-holder{
    @apply text-neutral-4;
    transition: all 0.3s ease-in-out;
    //background-color: red;
    .short-code{
      border-radius: 4px;
      @apply bg-neutral-1 p-1 w-6 h-6 inline-flex items-center justify-center;
    }

    & .hover{
      color:red;
    }

    &:hover{
      color: red;
      background-color:red;
    }

  }

  /*.editor{
      display: block;
      height: 650px;
  }*/
}

/*.slash-menu{
  @apply pt-3 pb-1 shadow-floated border-roundness bg-white;
  border-radius: var(--mt-roundness-3);

  .group-title {
    @apply mt-footnote text-neutral-5 block my-2;
  }

  .title{
    @apply mt-overline;
  }

  .item-title{
    @apply py-2 flex flex-col ;//gap-2
  }

  .description{
     @apply mt-footnote text-neutral-5;
  }

  .claytap-slash-menu {
    @apply flex flex-col gap-2;
    //width: 260px;
  }

  .claytap-slash-menu-item {
    @apply py-1 gap-4 items-center flex px-2 cursor-pointer;
    border-radius: 4px;
    &:hover{
    background: #F4F4F5;
    }
  }
}*/



</style>


