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
    <button @click="handleSwitchBoard">switch board-editor</button>
    <input style="margin-left: 30px" id="input" @keydown.enter="handleSetFocus" />
    <!--    <button @click="handleSetData2">set data 2</button>-->
    <!--    min-height: 450px;max-height: 450px;ov erflow-y: scroll-->
    <BoardEditor
      api-token="Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiYzFhZmYzMDVjNWI2MmE2MWJjMzQiXSwiZGlzcGxheU5hbWUiOiLYudmE24wg2YLYs9in2YXbjCIsImV4cCI6MTcxODUxNzE2OCwiaWF0IjoxNzE3OTEyMzY4LCJpZCI6ImUzZmEyMWQ4LTc1ZDMtNDczYy1iMzRlLTU1ZjQ2OTJmYzUxZCIsImlzcyI6Imh0dHBzOi8vcG0uc3RnLm1pc2RjLmNvbSIsImp0aSI6ImFkbWluLzM4MDE0ODFhLWQzNmItNDZkMC04Y2M5LTAzOGJhYjMzMDM2YiIsIm5iZiI6MTcxNzkxMjM2OCwibm9uY2UiOiIiLCJvd25lciI6Im1haGRhYWQiLCJzY29wZSI6InByb2ZpbGUiLCJzdWIiOiJlM2ZhMjFkOC03NWQzLTQ3M2MtYjM0ZS01NWY0NjkyZmM1MWQiLCJ0YWciOiIiLCJ0b2tlblR5cGUiOiJhY2Nlc3MtdG9rZW4ifQ.QM-u9ZfDLHcCVVYKPoGoKdZ_cjMUtPRbSSXanyEUcCvPqrl_IJ6adYSksNoPEAFWe4KqSarvfI7CI5kB-7jpQfOnWz_ZnxD1dKBPlKpoBIE_L--co-7aBIoMgdECKDhgySviSyGgK5z9o8gJdECI0QNHBoKA3JCcEAmNOQqj6aAAr1CcJZke-C8g1kYZM5f2eLFP-bK5Ulqxy1JNGtUEzjZ5mE8YgeIgtoD3BdrYa4j3VvXPnKmCtG3dyWUkaV3L4zzai-39lkh56CjxyvTHuhtfXlWzqq6ZTGvP_MDjjZv-h7fWq8ZrbgekAlTgjig_Nm_GX4GJ_TziviuKnPosRecZgEUJKlhOqFg0dUMrot77zQaPa0rKX0qB7eCnP9Rv_wm7sc1eO18lqNn6BRtTf-TgJ8wqXN_XmB2dSrzNrcJ7aZei9VhuIYY8vlYszCLed11hipZPDz8MIG6rcg7SVYcwMY1cxpXn1zLYOhmmJRzT_JL0aSzRmihskkGukRqX3oQEQupcIyBjR7Z3GGqrwLkDL8Qv2HtEscu55HxrQISyERDcXJlrLP0zf-aPSfU81twHv2Yi2ODE_5i_qQPTbjpJMp1N3UsqWsEVh-rk2JQgG0RVh-jbs4NRdjesgE-8Own12gRtYHD-GHtn0V5l19UJHiKx5gAyqN3bbRvB5i8"
      storage-url="https://clourage.dev.misdc.com/v2/"
      upload-url="https://clourage.dev.misdc.com/v2/file/upload"
      :is-board-view="isBoard"
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
const isBoard = ref<boolean>(true)
const userMentionList = ref<any[]>([{ id: '1', name: 'test 1' }])
async function handleGetData() {
  const temp = await refEditor?.value.getData()
  console.log('this is temp', temp)
}

async function handleSetData() {
  await refEditor?.value?.setData(data)
}

async function handleSwitchBoard() {
  isBoard.value = !isBoard.value
}

async function handleSetFocus() {
  refEditor?.value?.setFocus()
  //document.querySelector('#input').focus();
  //document.querySelector('affine-note').focus();
  //console.log("1111",document.querySelector('rich-text')?.inlineEditor)
  //document.querySelector('rich-text')?.inlineEditor.focusEnd()
}

function handleAddUserMention() {
  userMentionList.value.push({ name: 'test is test2', id: '2' })
}

async function handleStartCollaboration() {
  /*if (window.wsProvider) {
    /!*notify('There is already a websocket provider exists', 'neutral').catch(
      console.error
    );*!/
    return;
  }

  const params = new URLSearchParams(location.search);
  const id = params.get('room') || (await generateRoomId());

  params.set('room', id);
  const url = new URL(location.href);
  url.search = params.toString();
  location.href = url.href;*/
}

function handleChange(data) {
  // console.log("this is handle change",data)
  // alert("111")
  //console.log("this is change event",data)
}

function handleAddBlock(data) {
  // console.log("this is add block event",data)
}

function handleDeleteBlock(data) {
  //console.log("this is delete block event",data)
}

function handleUpdateBlock(data) {
  // console.log("this is update block event",data)
}
</script>

<style>
/*select-hint-type{
  //display: none;
  background-color: gold !important;
}*/
</style>
