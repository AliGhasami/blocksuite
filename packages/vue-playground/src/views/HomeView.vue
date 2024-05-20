<template>
  <div style="padding-top: 30px;">
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
    <button @click="handleStartCollaboration">start collaboration</button>
    <input style="margin-left: 30px" id="input" @keydown.enter="handleSetFocus"  />
<!--    <button @click="handleSetData2">set data 2</button>-->
<!--    min-height: 450px;max-height: 450px;ov erflow-y: scroll-->
    <Editor :mention-user-list="userMentionList" ref="refEditor"  style="border:1px solid pink;min-height: 600px;padding-left: 0px" @change="handleChange" @update-block="handleUpdateBlock"  @add-block="handleAddBlock" @delete-block="handleDeleteBlock" />
  </div>
</template>

<script setup lang="ts">
import {Editor} from "alighasami_vue-block-editor";
import 'alighasami_vue-block-editor/dist/style.css'
import {ref} from "vue";
import {data} from "../my_temp/template/tempData";
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
const refEditor=ref(null)
const userMentionList=ref<UserMention[]>([{id:'1',name:'test 1'}])
async function handleGetData(){
  const temp=  await refEditor?.value?.getData()
  console.log("this is temp",temp);
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

function handleAddUserMention(){
  userMentionList.value.push({name:'test is test2',id:'2'})
}


async function  handleStartCollaboration(){
  if (window.wsProvider) {
    /*notify('There is already a websocket provider exists', 'neutral').catch(
      console.error
    );*/
    return;
  }

  const params = new URLSearchParams(location.search);
  const id = params.get('room') || (await generateRoomId());

  params.set('room', id);
  const url = new URL(location.href);
  url.search = params.toString();
  location.href = url.href;
}

async function generateRoomId(): Promise<string> {
  return fetch(new URL('/room/', 'https://blocksuite-playground.toeverything.workers.dev'), {
    method: 'post',
  })
    .then(res => res.json())
    .then(({ id }) => id);
}



/*
async function handleSetData2(){
  await refEditor?.value?.setData(2)
}
*/

function handleChange(data){
  //console.log("this is data",data)
 // alert("111")
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

/*select-hint-type{
  //display: none;
  background-color: gold !important;
}*/
</style>


