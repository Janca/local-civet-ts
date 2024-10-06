<script setup lang="ts">
import {ApplicationBreakpoint} from '@/components/Application'
import useModelIndex from '@/compositions/useModelIndex'
import useBreakpoints from '@/compositions/useBreakpoints'
import {computed} from 'vue'
import {ImageGallery} from '@/components/ImageGallery'
import {AccordionPanel} from '@/components/AccordionPanel'
import {ModelMetaTable, ModelVersionSelector} from '@/components/Model'
import {VButton} from '@/components/Input'
import {useRouter} from 'vue-router'
import {MarkdownRenderer} from '@/components/Markdown'
import {ModelFileList} from '@/components/Model/FileList'

interface ModelView {
  modelIndex: number | string
  versionIndex: number | string
}

const props = defineProps<ModelView>()
const router = useRouter()

const model = useModelIndex(() => props.modelIndex)
const {
  name: modelName,
  description: modelDescription,
  versions: modelVersions,
  useVersionIndex
} = model

const version = useVersionIndex(() => props.versionIndex)
const {
  name: versionName,
  description: versionDescription,
  notes: versionNotes,
  images,
  downloads
} = version

const breakpoints = useBreakpoints()
const {
  smallerThan
} = breakpoints

const smallerThanLg = smallerThan('lg')
const smallerThanSm = smallerThan('md')

const computedGridLayout = computed(() => {
  let gridTemplateColumns = '7fr minmax(384px, 3fr)'
  let gridLayout = '"header header" "gallery meta" "description meta" "footer meta"'
  if (smallerThanSm.value) {
    gridTemplateColumns = '1fr'
    gridLayout = '"header" "gallery" "meta" "description" "footer"'
  } else if (smallerThanLg.value) {
    gridTemplateColumns = 'minmax(256px, 7fr) 6fr'
    gridLayout = '"header header" "gallery gallery" "description meta" "footer footer"'
  }

  return {
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateAreas: gridLayout
  }
})

const description = computed(() => {
  const _version = versionDescription.value
  if (_version == null || _version.length === 0) {
    return modelDescription.value ?? ''
  }

  return _version
})

const filesHeaderText = computed(() => {
  const _downloads = downloads.value ?? []
  const len = _downloads.length
  if (len > 1) return `${len} Files`
  return 'File'
})

function onBack() {
  router.push({name: 'home'})
}
</script>

<template>
  <div :class="[$style.ModelView]">
    <ApplicationBreakpoint>
      <div :class="[$style.ModelViewGrid]" :style="computedGridLayout">
        <div :class="[$style.ModelViewHeader]">
          <VButton icon:prefix="arrow_back" style:fab @click="onBack"/>
          <h1 v-text="modelName"/>
        </div>
        <div :class="[$style.ModelViewImageGallery]">
          <ModelVersionSelector :versions="modelVersions" :model-index="modelIndex"/>
          <div :class="[$style.ModelViewImageGalleryContent]">
            <ImageGallery :images="images"/>
          </div>
        </div>
        <div :class="[$style.ModelViewMetaPanel]">
          <VButton text="Download" icon:prefix="download" color:primary/>
          <AccordionPanel text:header="Details"
                          style:filled-on-collapsed
                          style:header:separated-on-open
                          style:body:no-padding
                          behavior:collapse-with-header
                          behavior:collapsable>
            <ModelMetaTable :model="model" :version="version"/>
          </AccordionPanel>
          <AccordionPanel :text:header="filesHeaderText"
                          behavior:collapsable
                          behavior:collapse-with-header
                          style:body:no-padding
                          style:filled-on-collapsed
                          :state:expanded="false">
            <ModelFileList :downloads="downloads"/>
          </AccordionPanel>
          <AccordionPanel text:header="Version Notes"
                          style:filled-on-collapsed
                          style:body:filled-on-open
                          behavior:collapsable
                          behavior:collapse-with-header
                          :state:expanded="false">
            <MarkdownRenderer :class="[$style.ModelViewMetaVersionNotes]"
                              :text:markdown="versionNotes"/>
          </AccordionPanel>
        </div>
        <MarkdownRenderer :class="[$style.ModelViewDescriptionPanel]"
                          :text:markdown="description"
                          text:placeholder="#### No description available"/>
        <div :class="[$style.ModelViewFooter]"></div>
      </div>
    </ApplicationBreakpoint>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables" as v;
@use "@/styles/mixins" as m;

.ModelView {
  width: 100%;
}

.ModelViewGrid {
  position: relative;

  display: grid;
  grid-template-areas: "header header"
                       "gallery meta"
                       "description meta"
                       "footer footer";

  grid-auto-rows: min-content;
  grid-template-columns: 7fr minmax(384px, 3fr);
  gap: v.$unit-5;
}

.ModelViewHeader {
  grid-area: header;
  margin-bottom: -(v.$unit-5);

  display: flex;
  flex-flow: row nowrap;
  gap: v.$unit-10;

  align-items: center;
}

.ModelViewImageGallery {
  grid-area: gallery;

  display: flex;
  flex-flow: column nowrap;
  gap: v.$unit-5;

  width: 100%;
  overflow: hidden;
}

.ModelViewImageGalleryContent {
  overflow-x: auto;
  @include m.default-scrollbars;
}

.ModelViewMetaPanel {
  grid-area: meta;
  display: flex;
  flex-flow: column nowrap;
  gap: v.$unit-5;
  margin-bottom: v.$unit-5;
}

.ModelViewMetaVersionNotes {
  font-size: v.$unit-7;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}

.ModelViewDescriptionPanel {
  grid-area: description;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  img {
    max-width: 100% !important;
    max-height: 1024px !important;
  }
}

.ModelViewFooter {
  grid-area: footer;
}
</style>