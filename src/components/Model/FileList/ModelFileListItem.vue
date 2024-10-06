<script setup lang="ts">
import {DownloadMeta} from '@/types'
import {computed, toRefs} from 'vue'
import toComputedRef from '@/compositions/toComputedRef'

interface ModelFileListItem {
  download: DownloadMeta
}

const props = defineProps<ModelFileListItem>()
const {
  download
} = toRefs(props)

const url = toComputedRef(download, 'url')
const info = toComputedRef(download, 'info')
const type = toComputedRef(download, 'type')
const primary = toComputedRef(download, 'primary')

const name = computed(() => {
  let _name = download.value.name
  if (_name != null && _name.length > 0) {
    return _name
  }

  _name = ''
  if (primary.value) {
    _name = 'Primary'
  }

  const _type = type.value?.toLowerCase()
  if (_type === 'safetensors') _name += ' Model'
  else if (_type === 'yaml') _name += ' Configuration File'

  return _name
})

</script>

<template>
  <li :class="[$style.ModelFileListItem]">
    <div :class="[$style.Header]">
      <span v-text="name"/>
      <a :class="[$style.DownloadLink]" :href="url">Download</a>
    </div>
    <div>
      <span/>
      <span :class="[$style.DownloadType]" v-text="type"/>
    </div>
  </li>
</template>

<style module lang="scss">
@use "@/styles/variables";

.ModelFileListItem {
  display: flex;
  flex-flow: column nowrap;
  padding: variables.$unit-5;

  border-radius: variables.$border-radius;
  background-color: variables.$body-color-v-depth-1;

  > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
}

.Header {
  font-size: variables.$unit-8;
  font-weight: 500;
}

.DownloadLink {
  font-weight: 500;
  font-size: variables.$unit-6;
  color: variables.$primary-color-alt-1;
  text-decoration: none;

  transition: color variables.$transition-duration variables.$transition-timing-fn;

  &:hover {
    color: variables.$primary-color-alt-2;
  }

  &:active {
    color: variables.$primary-color-alt-3;
  }
}

.DownloadType {
  font-weight: 400;
  font-size: variables.$unit-5;
  font-style: oblique;
  color: variables.$secondary-text-color;
}
</style>