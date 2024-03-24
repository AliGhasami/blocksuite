<template>
  <div>
    <div>
      <button @click="handleGetData">get data</button>
      <button @click="handleSetData">set data</button>
    </div>
    <main style="height: 450px" >
      <!--    this is editor-->
      <div ref="refEditor" class="editor"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import '@blocksuite/presets/themes/affine.css';
import { createEmptyDoc, PageEditor,EdgelessEditor,AffineEditorContainer } from '@blocksuite/presets';
import {DocCollection, Job, Schema, Text} from '@blocksuite/store';
import {onMounted, ref} from "vue";
import {AffineSchemas} from "@blocksuite/blocks";
//import sampleData from "./data"
const refEditor = ref<HTMLElement | null>(null)

function handleGetData(){
  //console.log("1111")
}

function handleSetData(){

}


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

  const doc = createEmptyDoc().init();
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

  //return
  //const doc = createEmptyDoc().init();
  //debugger;
  //console.log('AffineSchemas', AffineSchemas);
 /* const schema = new Schema().register(AffineSchemas);
  const collection = new DocCollection({ schema });
  const doc = collection.createDoc();
  doc.load();
  const rootId = doc.addBlock('affine:page', {});
  doc.addBlock('affine:surface', {}, rootId);
  const noteId = doc.addBlock('affine:note', {}, rootId);
  doc.addBlock('affine:paragraph', {}, noteId);*/
  //const job = new Job({ collection })
  //const new_doc=await job.snapshotToDoc(sampleData)
  //console.log("new_doc",new_doc)
  /*return {
    doc,
    init() {
      doc.load();
      const rootId = doc.addBlock('affine:page', {});
      doc.addBlock('affine:surface', {}, rootId);
      const noteId = doc.addBlock('affine:note', {}, rootId);
      doc.addBlock('affine:paragraph', {}, noteId);
      return doc;
    },
  };*/
  //const editor = new EdgelessEditor();
  //const editor = new PageEditor();
  //const editor = new AffineEditorContainer();
  //editor.doc = new_doc;
  //document.body.appendChild(editor);
 /* if(refEditor.value){
    refEditor.value.appendChild(editor);
  }*/
  // Update block node with some initial text content
 /* const paragraphs = doc.getBlockByFlavour('affine:paragraph');
  const paragraph = paragraphs[0];
  doc.updateBlock(paragraph, { text: new Text('Hello World!') });
  console.log("this is doc",doc)*/
})




</script>

<style>
.editor{
  display: block;
  height: 650px;
}
</style>


