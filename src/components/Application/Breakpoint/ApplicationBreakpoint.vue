<script setup lang="ts">
import useBreakpoints from '@/compositions/useBreakpoints'
import {computed} from 'vue'

const breakpoints = useBreakpoints()

const {
  active,
  smallerThan,
  largerThan,
  between
} = breakpoints

const isSmallerThanMd = smallerThan('md')
const isLargerThanXxl = largerThan('xxl')

const computedStyle = computed(() => {
  let _width: string = '90%'
  let _margin: string | undefined = undefined

  if (isSmallerThanMd.value || isLargerThanXxl.value) {
    _width = '100%'
  }

  if (isSmallerThanMd.value) {
    _margin = '0 1rem'
  }

  return {
    width: _width,
    margin: _margin
  }
})

</script>

<template>
  <div :class="[$style.ApplicationBreakpoint]">
    <div :class="[$style.ApplicationBreakpointContent]" :style="computedStyle">
      <slot/>
    </div>
  </div>
</template>

<style module lang="scss">
.ApplicationBreakpoint {
  display: flex;
  margin: 0 auto;
  width: 100%;
}

.ApplicationBreakpointContent {
  max-width: 1920px;
  margin: 0 auto;
}
</style>