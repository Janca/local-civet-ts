<script setup>

import {computed} from "vue";

const props = defineProps({
  'icon': String,
  'style:outlined': Boolean,
  'style:rounded': Boolean,
  'style:sharp': Boolean
})

const computedClasses = computed(() => {
  const materialClass = () => {
    if (props['style:outlined']) return 'outlined'
    if (props['style:rounded']) return 'rounded'
    if (props['style:sharp']) return 'sharp'
    return 'outlined'
  }

  const _class = materialClass()
  return `material-symbols-${_class}`
})

</script>

<template>
  <span :class="[computedClasses]">
    <slot>{{ icon }}</slot>
  </span>
</template>

<style module lang="scss">

</style>