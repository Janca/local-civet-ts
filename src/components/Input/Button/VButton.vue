<script setup lang="ts">

import {computed, toRefs, useCssModule} from "vue";
import {MaterialSymbol} from "@/components/MaterialSymbol";

interface VButton {
  'text'?: string | undefined

  'icon:prefix'?: string | undefined
  'icon:suffix'?: string | undefined

  'color:primary'?: boolean
  'color:secondary'?: boolean

  'style:link'?: boolean
  'style:text'?: boolean
  'style:fab'?: boolean
}

const props = defineProps<VButton>()

const {
  text,
  'icon:prefix': iconPrefix,
  'icon:suffix': iconSuffix,

  'style:fab': styleFab,

  'color:primary': colorPrimary,
  'color:secondary': colorSecondary
} = toRefs(props)

const style = useCssModule()
const computedClasses = computed(() => {
  return {
    [style.StyleFab]: styleFab.value,
    [style.ColorPrimary]: colorPrimary.value
  }
})

</script>

<template>
  <button :class="[$style.VButton, computedClasses]">
    <slot name="prefix">
      <MaterialSymbol v-if="iconPrefix" :icon="iconPrefix"/>
    </slot>
    <slot>
      <span v-if="text || $slots.default" v-text="text"/>
    </slot>
    <slot name="suffix">
      <MaterialSymbol v-if="iconSuffix" :icon="iconSuffix"/>
    </slot>
  </button>
</template>

<style module lang="scss">
@use "@/styles/variables";

.VButton {
  display: flex;
  flex-flow: row nowrap;
  gap: variables.$unit-5;

  white-space: nowrap;

  align-items: center;
  justify-content: center;

  appearance: none;
  outline: none;
  cursor: pointer;

  font-weight: 700;
  font-size: variables.$unit-9;

  border: 1px solid variables.$border-color;
  border-radius: variables.$border-radius;

  background-color: variables.$body-color-v-depth-1;
  color: variables.$interactive-text-color;

  padding: variables.$unit-6 variables.$unit-8;

  transition-property: background-color, color, font-size, font-weight, box-shadow, outline, border;
  transition-duration: variables.$transition-duration;
  transition-timing-function: variables.$transition-timing-fn;

  &:hover {
    background-color: variables.$body-color-v-depth-2;
  }

  &:focus {
    background-color: variables.$body-color-v-depth-3;
    box-shadow: 0 0 0 variables.$unit-0 currentColor;
  }

  &:active {
    background-color: variables.$body-color-v-depth-5;
  }
}

.StyleFab {
  width: 2.5em;
  height: 2.5em;
  font-size: 1em;
  border-radius: 100%;
}

.ColorPrimary {
  border: none;
  background-color: variables.$primary-color;

  &:hover {
    background-color: variables.$primary-color-v-depth-2;
  }

  &:focus {
    background-color: variables.$primary-color-v-depth-3;
    box-shadow: 0 0 0 variables.$unit-0 currentColor;
  }

  &:active {
    background-color: variables.$primary-color-v-depth-5;
  }
}
</style>