<script setup lang="ts">

import {ImageMeta} from '@/types'
import {toRefs} from 'vue'

interface ImageGallery {
  images: Array<ImageMeta | string> | undefined
}

const props = defineProps<ImageGallery>()
const {
  images
} = toRefs(props)

function getImageUrl(image: ImageMeta | string) {
  return typeof image === 'string' ? image : image.url
}

</script>

<template>
  <div :class="[$style.ImageGallery]">
    <div :class="[$style.ImageGalleryFlexGrid]">
      <div v-for="(image, i) in images" :class="[$style.ImageGalleryImageWrapper]">
        <img :src="getImageUrl(image)"
             :alt="`preview image ${i}`"
             :class="[$style.ImageGalleryImage]"/>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ImageGallery {
  width: 100%;
  border-radius: variables.$border-radius;
  padding-bottom: variables.$unit-2;
}

.ImageGalleryFlexGrid {
  display: flex;
  flex-flow: row nowrap;
  gap: variables.$unit-5;
}

.ImageGalleryImageWrapper {
  //height: 320px;
}

.ImageGalleryImage {
  display: block;

  height: 320px;
  width: auto;

  object-fit: cover;

  border-radius: variables.$border-radius;
  overflow: hidden;
}
</style>