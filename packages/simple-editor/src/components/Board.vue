<template>
    <Common :is-board-view="true"  ref="refElement"/>
</template>

<script setup>

import Common from "@/components/Common.vue";
import { ref } from "vue";

const refElement =ref(null)

defineExpose({
  instance:refElement
  //getData,
  //setData,
  //setFocus
})



</script>


<style>
  .board{
    width: 100%;
    height: 600px;
  }
</style>
