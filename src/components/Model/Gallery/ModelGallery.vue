<script setup lang="ts">
import {ModelCard} from '@/components/Model/Card'
import {ModelMeta} from '@/types'
import {computed, onMounted, Ref, ref, toRefs, toValue} from 'vue'
import useRootEmToPixels from '@/compositions/useRootEmToPixels'
import {useEventListener} from '@vueuse/core'

interface ModelGalleryProps {
  models: ModelMeta[]
  'text:header'?: String

  'card:width'?: number
  'card:height'?: number
}

const props = withDefaults(
    defineProps<ModelGalleryProps>(),
    {
      'card:width': 320,
      'card:height': 412
    }
)

const {
  'text:header': textHeader,
  'card:width': cardWidth,
  'card:height': cardHeight
} = toRefs(props)

const modelsLength = computed(() => props.models.length)
const modelGallery: Ref<HTMLElement | undefined> = ref()
const galleryWidth = ref()

function updateGallery() {
  const element = toValue(modelGallery)
  if (element === undefined) return

  const {
    width
  } = element.getBoundingClientRect()

  galleryWidth.value = Math.min(width, 1920)
}

const gridGap = useRootEmToPixels(0.5)
const totalCardWidth = computed(() => cardWidth.value + gridGap.value)

const maxCardColumns = computed(() => {
  const _totalCardWidth = totalCardWidth.value
  const _galleryWidth = galleryWidth.value
  const _contentWidth = _galleryWidth - gridGap.value
  return Math.floor(_contentWidth / _totalCardWidth)
})

const computedFlexGridStyle = computed(() => {
  const _maxColumns = Math.min(maxCardColumns.value, modelsLength.value)
  if (_maxColumns <= 0) {
    return {
      justifyContent: 'left',
    }
  }

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${_maxColumns}, min-content)`,
    width: 'min-content'
  }
})

onMounted(updateGallery)
useEventListener('resize', updateGallery)

</script>

<template>
  <div ref="modelGallery" :class="[$style.ModelGallery]">
    <div :class="[$style.ModelGalleryFlexGrid]"
         :style="computedFlexGridStyle">
      <div v-if="textHeader || $slots.header"
           :class="[$style.ModelGalleryHeader]">
        <slot name="header">
          <h1>{{ textHeader }}</h1>
        </slot>
      </div>
      <ModelCard v-for="model in models"
                 :model="model"
                 :width="cardWidth"
                 :height="cardHeight"
                 link/>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables" as v;

.ModelGallery {
  width: 100%;
  overflow: hidden;
  background-color: var(--body-color-1);
  padding-bottom: v.$unit-10;
}

.ModelGalleryHeader {
  grid-column: 1 / -1;
  flex: 1 0 100%;

  margin-bottom: -(v.$unit-5);
}

.ModelGalleryFlexGrid {
  display: flex;
  flex-flow: row wrap;

  margin: 0 auto;
  padding: 0 v.$unit-5;

  width: auto;
  max-width: 1920px;

  gap: v.$unit-5;
}
</style>