<script setup lang="ts">
import {Logotype} from "@/components/Logotype";
import {TransitionedRouterView} from "@/components/TransitionedRouterView";
</script>

<template>
  <div :class="[$style.ApplicationBar]">
    <div :class="[$style.ApplicationBarContent]">
      <div :class="[$style.ApplicationBarSection]">
        <Logotype/>
      </div>
      <div :class="[$style.ApplicationBarSection]">
        <TransitionedRouterView name="applicationBar"/>
      </div>
      <div :class="[$style.ApplicationBarSection]"/>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ApplicationBar {
  height: 2.75rem;
  background-color: variables.$body-color;
}

.ApplicationBarContent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: center;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 0 variables.$unit-5;
}

.ApplicationBarSection {
  &:first-child {
    margin-left: 0;
    width: unset;
  }

  margin: 0 auto;
  width: 100%;

  &:last-child {
    margin-right: 0;
    width: unset;
  }
}
</style>