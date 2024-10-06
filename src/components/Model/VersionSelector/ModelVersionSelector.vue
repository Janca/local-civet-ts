<script setup lang="ts">
import {ModelVersionMeta} from '@/types'
import {toRefs} from 'vue'

interface ModelVersionSelector {
  modelIndex: string | number,
  versions: ModelVersionMeta[] | undefined
}

const props = defineProps<ModelVersionSelector>()

const {
  modelIndex,
  versions
} = toRefs(props)

function toRoute(version: ModelVersionMeta) {
  return {name: 'model-details', params: {modelIndex: modelIndex.value, versionIndex: version.index}}
}

</script>

<template>
  <div :class="[$style.ModelVersionSelector]">
    <router-link v-for="version in versions"
                 :to="toRoute(version)"
                 :active-class="$style.Active"
                 :class="[$style.ModelVersionTag]"
                 v-text="version.name"/>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ModelVersionSelector {
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: baseline;
  width: min-content;
  gap: variables.$unit-2;
  font-weight: 700;
  font-size: variables.$unit-7;
}

.ModelVersionTag {
  text-decoration: none;
  color: variables.$interactive-text-color;
  background-color: variables.$body-color-v-depth-2;
  border-radius: variables.$unit-1;
  padding: variables.$unit-2 variables.$unit-4;
}

.Active {
  cursor: default;
  pointer-events: none;
  background-color: variables.$primary-color;
}
</style>