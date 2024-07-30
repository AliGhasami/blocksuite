<template>
  <div>this is test
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

</script>
