<script setup lang="ts">
import {ModelGallery} from '@/components/Model/Gallery'
import useModelRepository from '@/compositions/useModelRespository'
import useTheme from '@/compositions/useTheme'
import {onMounted} from 'vue'

const {
  primary
} = useTheme()

const {
  models
} = useModelRepository()

</script>

<template>
  <div :class="[$style.ModelGalleryView]">
    <ModelGallery :models="models">
      <template #header>
        <h1>Models</h1>
      </template>
    </ModelGallery>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables" as v;

.ModelGalleryView {
  margin: 0 auto;
  width: 100%;
}


.FadeActive {
  transition: opacity v.$transition-duration v.$transition-timing-fn;
}

.FadeApply {
  opacity: 0;
}
</style>