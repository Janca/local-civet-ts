<script setup lang="ts">

import {ModelMeta, ModelVersionMeta} from '@/types'
import useModel from '@/compositions/useModel'
import useModelVersion from '@/compositions/useModelVersion'
import {computed} from 'vue'
import ModelMetaTableRow from "@/components/Model/MetaTable/ModelMetaTableRow.vue";

interface ModelMetaTable {
  model: ModelMeta
  version: ModelVersionMeta
}

const props = defineProps<ModelMetaTable>()

const model = useModel(() => props.model)
const version = useModelVersion(() => props.version)

const {
  published: modelPublished,
  updated: modelUpdated,
  base: modelBase
} = model

const {
  published: versionPublished,
  updated: versionUpdated,
    base: versionBase
} = version

const published = computed(() => versionPublished.value ?? modelPublished.value)
const updated = computed(() => versionUpdated.value ?? modelUpdated.value)

const base = computed(() => versionBase.value ?? modelBase.value)

</script>

<template>
  <table :class="[$style.MetaModelTable]">
    <tbody>
    <tr>
      <th>Type</th>
      <td>Checkpoint</td>
    </tr>
    <ModelMetaTableRow text:header="Published" :text:value="published"/>
    <ModelMetaTableRow text:header="Updated" :text:value="updated"/>
    <ModelMetaTableRow text:header="Base" :text:value="base"/>
    <ModelMetaTableRow text:header="Triggers">
      &nbsp;
    </ModelMetaTableRow>
    </tbody>
  </table>
</template>

<style module lang="scss">
@use "@/styles/variables";

.MetaModelTable {
  border-collapse: collapse;
  appearance: none;
  font-size: variables.$unit-8;

  th, td {
    border-collapse: collapse;
    appearance: none;
    text-align: left;
    border-top: 1px solid variables.$border-color;
  }

  th {
    font-weight: 500;
    padding: variables.$unit-6 variables.$unit-10;
    background-color: variables.$body-color-v-depth-1;
    border-right: 1px solid variables.$border-color;
    min-width: 112px;
  }

  td {
    width: 100%;
    padding-left: variables.$unit-8;
  }

  tr:first-of-type {
    th, td {
      border-top: 0;
    }
  }
}
</style>