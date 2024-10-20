<template>
  <div style="padding-top: 30px">
    <div>
      <!--      style="height: 350px;width: fit-content"-->
      <!--      <current-time id="sample"></current-time>-->
      <!--      <CurrentTimeElement />-->
      <!--      <current-time-1 id="sample"></current-time-1>
      <my-vue-element></my-vue-element>-->
      <!--      <Button>111111</Button>-->
      <!--      <div>
        <my-foo ></my-foo>
        <my-custom-element></my-custom-element>
      </div>
      <select-hint-type></select-hint-type>-->
      <!--      <div>11111</div>
      <my-bar ></my-bar>-->
      <!--      <select-hint-type @change="handleChange"></select-hint-type>-->
    </div>
    <button @click="handleGetData">get data</button>
    <button @click="handleSetData">set data</button>
    <button @click="handleSetFocus">set focus</button>
    <button @click="handleAddUserMention">Add user Mention</button>
    <button @click="handleRest">Rest Data</button>
    <!--    <button @click="handleStartCollaboration">start collaboration</button>-->
    <input style="margin-left: 30px" id="input" @keydown.enter="handleSetFocus" />
    <!--    <button @click="handleSetData2">set data 2</button>-->
    <!--    min-height: 450px;max-height: 450px;ov erflow-y: scroll-->
    <BoardEditor
      api-token="Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiYzFhZmYzMDVjNWI2MmE2MWJjMzQiXSwiZGlzcGxheU5hbWUiOiLYudmE24wg2YLYs9in2YXbjCIsImV4cCI6MTcyMTMwNzYxNywiaWF0IjoxNzIwNzAyODE3LCJpZCI6ImUzZmEyMWQ4LTc1ZDMtNDczYy1iMzRlLTU1ZjQ2OTJmYzUxZCIsImlzcyI6Imh0dHBzOi8vYXVodC5kZXYubWlzZGMuY29tIiwianRpIjoiYWRtaW4vMTY4YzUyMjUtNTkyMi00NzAzLWI2NzItNjVkZWM2ZmYzNjdkIiwibmJmIjoxNzIwNzAyODE3LCJub25jZSI6IiIsIm93bmVyIjoibWFoZGFhZCIsInNjb3BlIjoicHJvZmlsZSIsInN1YiI6ImUzZmEyMWQ4LTc1ZDMtNDczYy1iMzRlLTU1ZjQ2OTJmYzUxZCIsInRhZyI6IiIsInRva2VuVHlwZSI6ImFjY2Vzcy10b2tlbiJ9.mFZlPCyDdB-X2r6XHXPon4aP_kKuZd2WWq88IZc2A2HIPDcJg_oGBi5S9hfsEd_nRpvCxu-JO6tzSyyLAGkD9-JGAHiALCXRTEvFTNSADE1YDl32OBJuBmbCnxt8foYUphPyOKX-NJ1PQh1z2lUaDnuZoO93MH0lYh3ej7npq5EHBrvfCC5TXltes2aLLvf0o2nTORI9-D7VKSJiy2oWa8T36B0dQDhtPnRwWZtC25v6lA0OH2gMffCiAzfllaLpORtoVDGoIh7XXd6-GoBxH4Va475vL1LxGwFTMJddyo51I6ppNtvJ5NHUaVBl7FahcGCf7CNn7UwKIBLwFtO4p7rmTTD-5AIBkn5n5tE32PfB8dxT-0RakJXMKIObblETv4GEqjs_-EUox86ODUsFZnBwOY4j2HEMFgqKCpOI5K2swEgQcFOosLcorLYe6jiRcKMkb6SpMVE8wUviKlHQ0ZtSdg3pzakx_7adehebRGU3YcRfORyUsjIHQP2QP8WHrvypTRZK8DpsW5gnOWYcRF5ZyuUl1KAVVRV14TfP9_r1V8jbHz_Xqt7-tvEzm9XVfE6UrsoE_Hbdtj7mMCYaza0L-rITT3QUOCj--zgz4HMdHjrJXG--TXUdVbT5d263xfPJrm8mxLAQttJzrVoV4zH9_cRjDeSoh9-aBK-FQOQ"
      storage-url="https://clourage.dev.misdc.com/v2/"
      upload-url="https://clourage.dev.misdc.com/v2/file/upload"
      :mention-user-list="userMentionList"
      ref="refEditor"
      style="border: 1px solid pink; min-height: 600px; padding-left: 0px"
      @change="handleChange"
      @update-block="handleUpdateBlock"
      @add-block="handleAddBlock"
      @delete-block="handleDeleteBlock"
    />
  </div>
</template>

<script setup lang="ts">
import BoardEditor from '@/components/board-editor.vue'
import { ref } from 'vue'
import { data } from '../my_temp/template/tempData'
//import type { UserMention } from '@/components/types';

/*********************************/
/*import MyBarComponent from '@/components/web-component/MyBar.vue'
const MyBar = defineCustomElement(MyBarComponent)
customElements.define('my-bar', MyBar,{})*/
/***********************************/
//import CounterSFC from '@/components/web-component/CurrentTime.ce.vue'
//const Counter = defineCustomElement(CounterSFC)
//import CurrentTime from '@/components/web-component/CurrentTime.ce.vue'
//const ExampleElement = defineCustomElement(CurrentTime)
//const CurrentTimeElement = defineCustomElement(CurrentTime)
//import {HTMLElement} from "happy-dom";
//console.log(CurrentTime)
/*********************************************/
/*const MyVueElement = defineCustomElement({
  // normal Vue component options here
  //props: {},
  //emits: {},
  template: `<div>this is my vue element</div>`,
  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/!* inlined css *!/`]
})*/
//const Test = defineCustomElement(CurrentTime)
//customElements.define('my-vue-element', MyVueElement)
/*********************************************/
//console.log("111",CurrentTime)
//CurrentTime.styles=['* {  background-color:red }']
//const CurrentTimeElement = defineCustomElement(CurrentTime,)//{},{CurrentTime,styles:[]}
//CurrentTime
//{mode:'open'},
//const CurrentTimeElement = defineCustomElement(CurrentTime)//{},{CurrentTime,styles:[]}
//console.log(CurrentTimeElement())
/*customElements.define('current-time-1', CurrentTimeElement,{
  //shadow:false,
  /!*extends:{
  }*!/
})*/
/*const app = getCurrentInstance()
onMounted(()=>{
  console.log("this is app",app)
  //const element=document.getElementById('sample')
  //element.attachShadow({ mode: "open" });
  //console.log("1111",element)
})*/
/*
const temp=ref('111')

watch(temp,()=>{
  console.log("this is change temp")
})
*/
const refEditor = ref(null)
const userMentionList = ref<any[]>([{ id: '1', name: 'test 1' }])
async function handleGetData() {
  //console.log("1111",refEditor?.value.instance.getData());
  //const temp=  await refEditor?.value?.getData()
  const temp = await refEditor?.value.getData()
  console.log('this is temp', temp)
}

async function handleSetData() {
  await refEditor?.value.setData(data)
}

function handleRest() {
  refEditor?.value.reset()
}

async function handleSetFocus() {
  await refEditor?.value.setFocus()
  //document.querySelector('#input').focus();
  //document.querySelector('affine-note').focus();
  //console.log("1111",document.querySelector('rich-text')?.inlineEditor)
  //document.querySelector('rich-text')?.inlineEditor.focusEnd()
}

function handleAddUserMention() {
  userMentionList.value.push({ name: 'test is test2', id: '2' })
}
/*
async function handleSetData2(){
  await refEditor?.value?.setData(2)
}
*/

function handleChange(data) {
  //console.log("this is data",data)
  // alert("111")
  //console.log("this is change event",data)
}

function handleAddBlock(data) {
  //console.log("this is add block event",data)
}

function handleDeleteBlock(data) {
  //console.log("this is delete block event",data)
}

function handleUpdateBlock(data) {
  //console.log("this is update block event",data)
}
</script>

<style>
/*select-hint-type{
  //display: none;
  background-color: gold !important;
}*/
</style>
