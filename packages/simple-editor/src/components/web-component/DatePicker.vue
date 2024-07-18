<template>
    <Calendar  :fullscreen="false" />
</template>
<script setup lang="ts">
import { Calendar} from 'ant-design-vue';
/*
import { onMounted, ref, watch } from 'vue';

interface Props{
  type?:string
}
const emits=defineEmits<{
  (e:'change',val:string):void
  (e:'update:value',val:string):void
}>()
const props=withDefaults(defineProps<Props>(),{})
const val = ref()


watch(()=>props.type,()=>{
  if(props.type)
    val.value=props.type
  //emits('change',val.value)
},{immediate:true})


watch(val,()=>{
  emits('update:value',val.value)
  emits('change',val.value)
})
*/


</script>

<style lang="less">
</style>


