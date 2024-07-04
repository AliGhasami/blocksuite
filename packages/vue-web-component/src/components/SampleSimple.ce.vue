<template>
  <div>
    <div v-html="temp">

    </div>
    <StyleProvider :cache="cache">
          <Button>this is button</Button>
    </StyleProvider>
  </div>
</template>

<script setup lang="ts">
//import { Button } from 'ant-design-vue';
import {Button,StyleProvider,createCache, extractStyle, Select,SelectOption} from "ant-design-vue"
import { onMounted, ref } from 'vue';
const cache = createCache()

const temp=ref('')
setTimeout(()=>{
  console.log('1111',extractStyle(cache))

})

onMounted(()=>{
  temp.value=extractStyle(cache)
})

</script>

<style scoped>

</style>
