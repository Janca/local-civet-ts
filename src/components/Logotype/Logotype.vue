<script setup lang="ts">

import {useRouter} from 'vue-router'
import useBreakpoints from '@/compositions/useBreakpoints'

const router = useRouter()
const breakpoints = useBreakpoints()
const {
  smallerThan
} = breakpoints

const isSmallerThanSm = smallerThan('sm')

function onClick() {
  router.push({name: 'home'})
}

</script>

<template>
  <div :class="[$style.Logotype]" @click="onClick">
    <div :class="[$style.LogotypeFK]">
      <span>F</span>
      <span>K</span>
    </div>
    <div v-show="!isSmallerThanSm">
      <span>Models</span>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.Logotype {
  font-weight: 700;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: variables.$unit-5;

  line-height: 0.75;
  font-size: variables.$unit-10;

  cursor: pointer;
}

.LogotypeFK {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  height: variables.$unit-15;
  width: variables.$unit-15;

  color: variables.$primary-color;
  background-color: variables.$body-color-v-depth-4;
  border-radius: variables.$border-radius;
  padding: variables.$unit-4 variables.$unit-4;
  font-weight: 900;
  font-size: variables.$unit-10;
  line-height: 1;

  transition-property: width, height, margin;
  transition-duration: variables.$transition-duration;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  span:first-child {
    display: inline-block;
    transform: scaleX(-1);
    margin-right: -0.5ch;
    margin-left: -0.15ch;
  }
}
</style>