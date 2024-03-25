<template>
  <div style="padding-top: 30px">
    <div>
      <button @click="handleAddDivider">Add Divider</button>
<!--      <button @click="handleSetData">set data</button>-->
    </div>
    <main style="height: 450px" >
      <!--    this is editor-->
      <div ref="refEditor" class="editor"></div>
    </main>
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
  const paragraphs = doc.getBlockByFlavour('affine:paragraph');
  const paragraph = paragraphs[0];
  doc.updateBlock(paragraph, { text: new Text('Hello World!') });
})


function handleAddDivider(){
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

}




</script>

<style>
.editor{
  display: block;
  height: 650px;
}
</style>


