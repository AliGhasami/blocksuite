<template>
  <div>
    <!--    <div v-html="temp"></div>-->
    {{ currentDateTime }}
    <div style="background-color: darkseagreen">this is test 1</div>
    <div class="temp">this is test 2</div>
    <StyleProvider :cache="cache">
      <Button @click="handleClick">111111</Button>
      <!--      <Select>
        <SelectOption >this is first option</SelectOption>
        <SelectOption >this is second option</SelectOption>
        <SelectOption >this is third option</SelectOption>
      </Select>-->
      <Select ref="select" style="width: 120px">
        <SelectOption value="jack">Jack</SelectOption>
        <SelectOption value="lucy">Lucy</SelectOption>
        <SelectOption value="disabled" disabled>Disabled</SelectOption>
        <SelectOption value="Yiminghe">yiminghe</SelectOption>
      </Select>
    </StyleProvider>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Button,
  StyleProvider,
  createCache,
  extractStyle,
  Select,
  SelectOption
} from 'ant-design-vue'
//import useStyle  from 'ant-design-vue/es/button/style'
//import {useHead} from "@unhead/vue"
//elem
//const app = getCurrentInstance()
//console.log("777777",app)
function handleClick() {
  alert('Click')
}

const cache = createCache()
//const style=
//console.log("111",useStyle('test'))
const temp = ref({}) //true
//console.log(temp)
onBeforeUnmount(() => {
  //const temp1=extractStyle(cache)
  temp.value = extractStyle(cache)
  //console.log("temp1",temp1)
  /* useHead({
    // Titles
    title: 'Hello World',
    titleTemplate: '%s %separator %siteName',
    // Template params
    templateParams: { separator: '|', siteName: 'My App' },
    // Classes
    bodyAttrs: { class: { overflow: true } },
    // Deduping
    script: [{ key: '123', src: '/script.js' }],
    style:[temp1]
  })*/
})

onMounted(() => {
  console.log('this is ', this)
  /*useHead({
    // Titles
    title: 'Hello World',
    titleTemplate: '%s %separator %siteName',
    // Template params
    templateParams: { separator: '|', siteName: 'My App' },
    // Classes
    bodyAttrs: { class: { overflow: true } },
    // Deduping
    script: [{ key: '123', src: '/script.js' }],
    style:[temp.value]
  })*/
  /*  const temp1=extractStyle(cache)
  console.log("temp1",temp1)
  setTimeout(()=>{


    //console.log("1111",temp)
  },5000)*/
})

let currentDateTime = ref(new Date())
setInterval(() => {
  currentDateTime.value = new Date()
})
</script>

<style>
.temp {
  background-color: #bcc0ff;
}
</style>
