<script lang="ts" setup>
import {TransitionedRouterView} from '@/components/TransitionedRouterView'
</script>

<template>
  <div :class="[$style.AppView]">
    <TransitionedRouterView/>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.AppView {
  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
}
</style>
