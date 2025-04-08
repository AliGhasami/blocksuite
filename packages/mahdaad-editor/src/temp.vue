<template>
  <div>this is temp</div>
</template>

<script setup lang="ts">


  import { onMounted } from 'vue'
  import {
    createStarterDocCollection,
    initStarterDocCollection,
  } from '@blocksuite/playground/apps/starter/utils/collection.ts'
  import * as store from '@blocksuite/affine/store'
  import * as databaseBlocks from '@blocksuite/affine/blocks/database'
  import * as noteBlocks from '@blocksuite/affine/blocks/note'
  import * as globalUtils from '@blocksuite/affine/global/utils'
  import * as services from '@blocksuite/affine/shared/services'
  import * as editor from '@blocksuite/integration-test'
  import * as blockStd from '@blocksuite/affine/block-std'
  import { prepareTestApp } from '@blocksuite/playground/apps/starter/utils/test.ts'
  import { mountDefaultDocEditor } from '@blocksuite/playground/apps/starter/utils/setup-playground.ts'

  onMounted(async ()=>{
    const collection = createStarterDocCollection();
    await initStarterDocCollection(collection);
    await mountDefaultDocEditor(collection);
  })

</script>

<style  lang="less">

</style>
