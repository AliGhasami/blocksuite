<template>
  <div ref="container" class="hint-select">
    <div v-html="temp">
    </div>
    <StyleProvider :cache="cache">
      <Select  v-model:value="val" :bordered="false" style="width: 120px" :getPopupContainer="()=>{
        return container
      }">
        <SelectOption v-for="item in options" :value="item.value">
          <div class="select-option">
            <img :src="item.icon" class="icon" />
            <span>{{ item.label }}</span>
          </div>
        </SelectOption>
      </Select>
    </StyleProvider>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {  createCache, StyleProvider,extractStyle ,Select,SelectOption} from 'ant-design-vue';
import Success from './assets/success.svg'
import Error from './assets/error.svg'
import Warning from './assets/warning.svg'
import Default from './assets/default.svg'
import Info from './assets/info.svg'
const container=ref()

interface Props{
  type?:string
}
const emits=defineEmits<{
  (e:'change',val:string):void
  (e:'update:value',val:string):void
}>()
const props=withDefaults(defineProps<Props>(),{})
const val = ref()
const cache = createCache()

const temp=ref('')

onMounted(()=>{
  temp.value=extractStyle(cache)
})


watch(()=>props.type,()=>{
  if(props.type)
    val.value=props.type
  //emits('change',val.value)
},{immediate:true})


watch(val,()=>{
  emits('update:value',val.value)
  emits('change',val.value)
})

const options = [
  {label:'Success',icon:Success,value:'success'},
  {label:'Danger',icon:Error,value:'error'},
  {label:'Warning',icon:Warning,value:'warning'},
  {label:'Info',icon:Info,value:'info'},
  {label:'Hint',icon: Default,value:'default'},
]
</script>

<style lang="less">

.hint-select{
  .select-option{
    @apply flex items-center gap-2;

    .icon {
      width: @size-4;
      height: @size-4;
    }

  }
}

/*.text-red
{
  background-color: @red-5;
}*/

/* TODO Ali Ghasami for fix variable and convert to token   **/
/*.SelectTrigger{
  cursor: pointer;
  height: 24px;
  padding: 0  @space-4;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: @space-2;
}

.SelectItem{
  cursor: pointer;
}

div[data-radix-popper-content-wrapper]{
@apply bg-white shadow-floated;
  padding:@space-3;
  border-radius:@roundness-3;
}*/


</style>


