<script setup lang="ts">
import {RouterView} from 'vue-router'

const props = defineProps({
  name: String,
})

</script>

<template>
  <router-view v-slot="{Component}" :name="props.name">
    <transition mode="out-in" appear
                :enter-active-class="$style.FadeActive"
                :leave-active-class="$style.FadeActive"
                :enter-from-class="$style.FadeApply"
                :leave-to-class="$style.FadeApply">
      <slot v-if="Component" :Component="Component">
        <component :is="Component"/>
      </slot>
      <slot v-else name="placeholder">
        <div style="display: none;"/>
      </slot>
    </transition>
  </router-view>
</template>

<style module lang="scss">
@use "@/styles/variables.scss" as v;

.FadeActive {
  transition: opacity v.$transition-duration v.$transition-timing-fn;

  * {
    transition: background-color v.$transition-duration v.$transition-timing-fn;
  }
}

.FadeApply {
  opacity: 0;
}
</style>