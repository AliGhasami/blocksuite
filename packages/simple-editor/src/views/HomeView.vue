<template>
  <div style="padding-top: 30px;">
    <button @click="handleGetData">get data</button>
    <button @click="handleSetData">set data</button>
<!--    min-height: 450px;max-height: 450px;overflow-y: scroll-->
    <Editor ref="refEditor"  style="border:1px solid pink;min-height: 600px" @change="handleChange" @update-block="handleUpdateBlock"  @add-block="handleAddBlock" @delete-block="handleDeleteBlock" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {ref} from "vue";

const refEditor=ref(null)
async function handleGetData(){
    await refEditor?.value?.getData()
}




async function handleSetData(){
  await refEditor?.value?.setData()
}

function handleChange(data){
  console.log("this is change event",data)
}

function handleAddBlock(data){
  console.log("this is add block event",data)
}

function handleDeleteBlock(data){
  console.log("this is delete block event",data)
}

function handleUpdateBlock(data){
  console.log("this is update block event",data)
}






</script>

<style>
</style>


