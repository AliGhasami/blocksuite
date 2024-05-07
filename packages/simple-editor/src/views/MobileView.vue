<template>
  <div style="padding-top: 30px;">
<!--    <current-time></current-time>-->
<!--    1111 -->
    <button @click="handleGetData">get data</button>
    <button @click="handleSetData">set data</button>
    <button @click="handleSetFocus">set focus</button>
    <input id="input" @keydown.enter="handleSetFocus"  />
<!--    <button @click="handleSetData2">set data 2</button>-->
<!--    min-height: 450px;max-height: 450px;ov erflow-y: scroll-->
    <MobileEditor  />
  </div>
</template>

<script setup lang="ts">
import {defineCustomElement, ref} from "vue";
import {data} from "@/components/template/tempData";
import MobileEditor from "@/components/MobileEditor.vue";
//import { defineCustomElement } from 'vue'
//import CurrentTime from '@/components/web-component/CurrentTime.ce.vue'
//const CurrentTimeElement = defineCustomElement(CurrentTime)
//customElements.define('current-time', CurrentTimeElement)
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


