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
    <BoardEditor :is-board-view="true" :mention-user-list="userMentionList" ref="refEditor"  style="border:1px solid pink;min-height: 600px;padding-left: 0px" @change="handleChange" @update-block="handleUpdateBlock"  @add-block="handleAddBlock" @delete-block="handleDeleteBlock" />
  </div>
</template>

<script setup lang="ts">
import  BoardEditor from "@/components/board-editor.vue";
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
const userMentionList=ref<any[]>([{id:'1',name:'test 1'}])
async function handleGetData(){
  const temp=  await refEditor?.value.getData()
  console.log("this is temp",temp);
}

async function handleSetData(){
  await refEditor?.value?.setData({
    "type": "page",
    "meta": {
      "id": "TnnBi7gmnc",
      "title": "",
      "createDate": 1716721991232,
      "tags": []
    },
    "blocks": {
      "type": "block",
      "id": "CPvkT6bOzr",
      "flavour": "affine:page",
      "version": 2,
      "props": {
        "title": {
          "$blocksuite:internal:text$": true,
          "delta": []
        }
      },
      "children": [
        {
          "type": "block",
          "id": "7i8RNtjYh4",
          "flavour": "affine:surface",
          "version": 5,
          "props": {
            "elements": {
              "D1OHM80Ilz": {
                "index": "a0",
                "seed": 1566572554,
                "points": [
                  [
                    2,
                    321
                  ],
                  [
                    2,
                    304
                  ],
                  [
                    12,
                    286
                  ],
                  [
                    15,
                    284
                  ],
                  [
                    26,
                    257
                  ],
                  [
                    43,
                    233
                  ],
                  [
                    58,
                    201
                  ],
                  [
                    74,
                    172
                  ],
                  [
                    94,
                    138
                  ],
                  [
                    110,
                    111
                  ],
                  [
                    129,
                    84
                  ],
                  [
                    144,
                    60
                  ],
                  [
                    159,
                    38
                  ],
                  [
                    170,
                    23
                  ],
                  [
                    175,
                    16
                  ],
                  [
                    180,
                    9
                  ],
                  [
                    183,
                    5
                  ],
                  [
                    184,
                    4
                  ],
                  [
                    186,
                    2
                  ],
                  [
                    191,
                    3
                  ],
                  [
                    203,
                    9
                  ],
                  [
                    213,
                    13
                  ],
                  [
                    227,
                    19
                  ],
                  [
                    250,
                    28
                  ],
                  [
                    273,
                    37
                  ],
                  [
                    295,
                    46
                  ],
                  [
                    311,
                    55
                  ],
                  [
                    321,
                    64
                  ],
                  [
                    329,
                    72
                  ],
                  [
                    337,
                    83
                  ],
                  [
                    342,
                    93
                  ],
                  [
                    349,
                    104
                  ],
                  [
                    353,
                    118
                  ],
                  [
                    359,
                    130
                  ],
                  [
                    366,
                    145
                  ],
                  [
                    371,
                    159
                  ],
                  [
                    374,
                    171
                  ],
                  [
                    378,
                    183
                  ],
                  [
                    380,
                    194
                  ],
                  [
                    381,
                    205
                  ],
                  [
                    383,
                    213
                  ],
                  [
                    383,
                    221
                  ],
                  [
                    384,
                    229
                  ],
                  [
                    385,
                    235
                  ],
                  [
                    386,
                    238
                  ],
                  [
                    387,
                    244
                  ],
                  [
                    387,
                    246
                  ],
                  [
                    389,
                    249
                  ],
                  [
                    389,
                    250
                  ],
                  [
                    387,
                    250
                  ],
                  [
                    382,
                    249
                  ],
                  [
                    377,
                    248
                  ]
                ],
                "xywh": "[-632,-194,391,323]",
                "rotate": 0,
                "color": "--affine-palette-line-black",
                "lineWidth": 4,
                "type": "brush",
                "id": "D1OHM80Ilz"
              },
              "NwLACJu6Fg": {
                "index": "a1",
                "seed": 1593069701,
                "points": [
                  [
                    2,
                    18
                  ],
                  [
                    12,
                    18
                  ],
                  [
                    30,
                    18
                  ],
                  [
                    54,
                    18
                  ],
                  [
                    87,
                    18
                  ],
                  [
                    133,
                    18
                  ],
                  [
                    174,
                    18
                  ],
                  [
                    195,
                    14
                  ],
                  [
                    220,
                    11
                  ],
                  [
                    235,
                    9
                  ],
                  [
                    245,
                    7
                  ],
                  [
                    251,
                    6
                  ],
                  [
                    256,
                    6
                  ],
                  [
                    258,
                    5
                  ],
                  [
                    262,
                    5
                  ],
                  [
                    264,
                    5
                  ],
                  [
                    267,
                    5
                  ],
                  [
                    270,
                    5
                  ],
                  [
                    271,
                    5
                  ],
                  [
                    273,
                    5
                  ],
                  [
                    276,
                    5
                  ],
                  [
                    278,
                    5
                  ],
                  [
                    280,
                    5
                  ],
                  [
                    285,
                    5
                  ],
                  [
                    289,
                    5
                  ],
                  [
                    293,
                    4
                  ],
                  [
                    297,
                    2
                  ],
                  [
                    300,
                    2
                  ],
                  [
                    302,
                    2
                  ],
                  [
                    304,
                    2
                  ],
                  [
                    308,
                    2
                  ],
                  [
                    315,
                    2
                  ],
                  [
                    320,
                    2
                  ],
                  [
                    324,
                    2
                  ],
                  [
                    327,
                    2
                  ],
                  [
                    328,
                    2
                  ]
                ],
                "xywh": "[-580,-47,330,20]",
                "rotate": 0,
                "color": "--affine-palette-line-black",
                "lineWidth": 4,
                "type": "brush",
                "id": "NwLACJu6Fg"
              }
            }
          },
          "children": []
        }
      ]
    }
  })
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

/*
async function generateRoomId(): Promise<string> {
  return fetch(new URL('/room/', 'https://blocksuite-playground.toeverything.workers.dev'), {
    method: 'post',
  })
    .then(res => res.json())
    .then(({ id }) => id);
}
*/



/*
async function handleSetData2(){
  await refEditor?.value?.setData(2)
}
*/

function handleChange(data){
  console.log("this is handle change",data)
 // alert("111")
  //console.log("this is change event",data)
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

/*select-hint-type{
  //display: none;
  background-color: gold !important;
}*/
</style>


