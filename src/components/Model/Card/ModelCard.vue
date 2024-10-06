<script setup lang="ts">
import {ModelMeta} from '@/types'
import {computed, toRefs} from 'vue'
import useModel from '@/compositions/useModel'

interface ModelCard {
  model: ModelMeta

  link: boolean

  width?: number
  height?: number
}

const props = withDefaults(
    defineProps<ModelCard>(),
    {
      link: false,
      width: 320,
      height: 412
    }
)

const {
  model,
  link,
  width,
  height
} = toRefs(props)

const {
  index: modelIndex,
  name,
  authorName,
  authorAvatarImageUrl,
  versionCount,
  useVersionIndex
} = useModel(model)

const {
  index: versionIndex,
  images
} = useVersionIndex(() => Math.max(versionCount.value - 1, 0))

const firstImage = computed(() => images.value?.[0])
const previewImageUrl = computed(() => firstImage.value?.url)
const previewImageAlt = computed(() => undefined)

const contentTag = computed(() => link.value ? 'router-link' : 'div')
const routerLinkTo = computed(() => link.value ? {
  name: 'model-details',
  params: {
    modelIndex: modelIndex.value,
    versionIndex: versionIndex.value
  }
} : undefined)

const computedImageStyle = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`
  }
})

</script>

<template>
  <div :class="[$style.ModelCard]">
    <component :is="contentTag"
               :to="routerLinkTo"
               :class="[$style.ModelCardContent]">
      <div :class="[$style.ModelCardImageWrapper]" :style="computedImageStyle">
        <img :src="previewImageUrl" :alt="previewImageAlt"/>
        <div :class="[$style.ImageGradientOverlay]"/>
      </div>
      <div :class="[$style.ModelCardMetaWrapper]">
        <div :class="[$style.MetaAuthor]">
          <div :class="[$style.MetaAuthorAvatar]">
            <img :src="authorAvatarImageUrl" :alt="authorName"/>
          </div>
          <div :class="[$style.MetaAuthorName]" v-text="authorName"/>
        </div>
        <div :class="[$style.MetaTitle]" v-text="name"/>
      </div>
    </component>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ModelCard {
  transition-property: all;
  transition-duration: variables.$transition-duration;
  transition-timing-function: variables.$transition-timing-fn;
}

.ModelCardContent {
  position: relative;
  display: flex;

  &:hover {
    .ModelCardImageWrapper {
      img {
        transform: scale(1.05);
      }
    }
  }
}

.ModelCardImageWrapper {
  position: relative;
  border-radius: variables.$border-radius;
  overflow: hidden;

  img {
    display: inline-block;

    position: relative;
    object-fit: cover;
    object-position: center;

    width: 100%;
    height: 100%;

    transition: transform variables.$transition-duration variables.$transition-timing-fn;
  }
}

.ImageGradientOverlay {
  position: absolute;
  content: '';

  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  background-color: transparent;
  background-image: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.75));
}

.ModelCardMetaWrapper {
  display: flex;
  flex-flow: column wrap;
  gap: variables.$unit-3;

  padding: variables.$unit-5 variables.$unit-6;
  position: absolute;
  bottom: 0;

  color: variables.$interactive-text-color;
}

.MetaTitle {
  font-weight: 700;
  font-size: variables.$unit-9;
}

.MetaAuthor {
  display: flex;
  flex-flow: row nowrap;
  gap: variables.$unit-3;
  align-items: center;
}

.MetaAuthorName {
  font-weight: 500;
  font-size: variables.$unit-7;
}

.MetaAuthorAvatar {
  img {
    border-radius: 50%;

    height: variables.$unit-0 * 12.5;
    width: variables.$unit-0 * 12.5;

    object-fit: cover;
    object-position: center;
  }
}
</style>