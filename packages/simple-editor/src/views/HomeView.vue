<template>
  <div style="padding-top: 30px;">
    <button @click="handleGetData">get data</button>
    <button @click="handleSetData">set data</button>
    <button @click="handleSetFocus">set focus</button>
    <input style="margin-left: 30px" id="input" @keydown.enter="handleSetFocus"  />
<!--    <button @click="handleSetData2">set data 2</button>-->
<!--    min-height: 450px;max-height: 450px;ov erflow-y: scroll-->
    <Editor ref="refEditor"  style="border:1px solid pink;min-height: 600px;padding-left: 0px" @change="handleChange" @update-block="handleUpdateBlock"  @add-block="handleAddBlock" @delete-block="handleDeleteBlock" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {ref} from "vue";
import {data} from "@/components/template/tempData";

const refEditor=ref(null)
async function handleGetData(){
    await refEditor?.value?.getData()
}

async function handleSetData(){
  await refEditor?.value?.setData(data)
}


async function handleSetFocus(){
   refEditor?.value?.setFocus()
    //document.querySelector('#input').focus();
    //document.querySelector('affine-note').focus();
  //console.log("1111",document.querySelector('rich-text')?.inlineEditor)
  //document.querySelector('rich-text')?.inlineEditor.focusEnd()
}

/*
async function handleSetData2(){
  await refEditor?.value?.setData(2)
}
*/

function handleChange(data){
  //console.log("this is change event",data)
}

function handleAddBlock(data){
  //console.log("this is add block event",data)
}

function handleDeleteBlock(data){
  //console.log("this is delete block event",data)
}

function handleUpdateBlock(data){
  //console.log("this is update block event",data)
}

</script>

<style>
</style>


