<template>
  <div @click="test">
<!--  emit('select','gggg')  -->
    this is test

    {{ props.searchText }}
  </div>
</template>

<style >

</style>

<script setup lang="ts">

    interface Props{
      text: string
      searchText:string
    }

    const props = withDefaults(defineProps<Props>(), {})
    const emit=defineEmits<{
      (e:'select',data:any):void
    }>()

    function test(){
      alert('11111')
      console.log("this is test")
    }


</script>
