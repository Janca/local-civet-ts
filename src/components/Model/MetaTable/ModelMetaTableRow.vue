<script setup lang="ts">

import {toRefs} from "vue";

interface ModelMetaTableRow {
  'text:header': string
  'text:value'?: string
}

const props = defineProps<ModelMetaTableRow>()

const {
  'text:header': textHeader,
  'text:value': textValue
} = toRefs(props)

</script>

<template>
  <tr v-if="textValue || $slots.default">
    <th>
      <slot name='header'>
        {{ textHeader }}
      </slot>
    </th>
    <td>
      <slot>
        {{ textValue }}
      </slot>
    </td>
  </tr>
</template>