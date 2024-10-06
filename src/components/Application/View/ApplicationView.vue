<script setup lang="ts">
import {ApplicationBar} from '@/components/Application/Bar'
</script>

<template>
  <div :class="[$style.ApplicationView]">
    <div :class="[$style.ApplicationViewHeaderContent]">
      <ApplicationBar/>
    </div>
    <div :class="[$style.ApplicationViewMainContent]">
      <slot/>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables" as v;

.ApplicationView {
  position: relative;
  display: flex;
  flex-flow: column;
}

.ApplicationViewHeaderContent {
  position: sticky;

  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  z-index: 1;

  border-bottom:1px solid v.$border-color;
}

.ApplicationViewMainContent {
  z-index: 0;
}
</style>