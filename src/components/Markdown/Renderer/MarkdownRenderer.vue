<script setup lang="ts">

import useMarkdownParser from '@/compositions/useMarkdownParser'

interface MarkdownRenderer {
  'text:markdown': string | undefined
  'text:placeholder'?: string | undefined
}

const props = defineProps<MarkdownRenderer>()

const markdown = useMarkdownParser(() => {
  const _markdown = props['text:markdown']
  if (_markdown == undefined || _markdown.length === 0) {
    return props['text:placeholder'] ?? ''
  }

  return _markdown
})
</script>

<template>
  <div v-html="markdown"/>
</template>