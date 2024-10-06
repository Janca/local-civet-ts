<script setup lang="ts">

import {DownloadMeta} from '@/types'
import ModelFileListItem from '@/components/Model/FileList/ModelFileListItem.vue'

interface ModelFileList {
  downloads: DownloadMeta[] | undefined
}

const props = defineProps<ModelFileList>()

</script>

<template>
  <ul :class="[$style.ModelFileList]">
    <ModelFileListItem v-for="download in downloads" :download="download"/>
  </ul>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ModelFileList {
  display: flex;
  flex-flow: column nowrap;
  gap: variables.$unit-2;

  list-style: none;
  padding: 0 variables.$unit-5 variables.$unit-5 variables.$unit-5;
}
</style>