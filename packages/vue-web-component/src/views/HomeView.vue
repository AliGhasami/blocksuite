<template>
  <div>
    this is web component
    <sample-simple-com />
  </div>
</template>

<script setup lang="ts">
import { defineCustomElement } from 'vue';
import SampleSimple from '../components/SampleSimple.ce.vue'
const sample = defineCustomElement(SampleSimple)
if(!customElements.get('sample-simple-com')){
  customElements.define('sample-simple-com', sample,{})
}
</script>

<style>
</style>


