<template>
  <div id="qaz">this is temp</div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { effects as blocksEffects } from '@blocksuite/affine/effects'
  import {createStarterDocCollection,initStarterDocCollection} from './setupEditor.ts'

  import { mountDefaultDocEditor } from '@blocksuite/playground/apps/starter/utils/setup-playground.ts'
  import { effects as presetsEffects } from '@blocksuite/integration-test/effects'
  import { effects as commentEffects } from '@blocksuite/playground/apps/comment/effects.ts'
  /**
   * register all web component and custom element
   */
  if(!window.mahdaadEditor){
    window.mahdaadEditor={}
    blocksEffects();
    presetsEffects();
    commentEffects();
  }

  onMounted(async ()=>{
    const collection = createStarterDocCollection();
    await initStarterDocCollection(collection);
    await mountDefaultDocEditor(collection);
  })

</script>

<style  lang="less">

</style>
<style>
  @import '@toeverything/theme/style.css';
</style>
