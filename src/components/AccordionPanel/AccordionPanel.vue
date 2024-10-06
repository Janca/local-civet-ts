<script setup lang="ts">

import {MaterialSymbol} from '@/components/MaterialSymbol'
import {computed, ref, Ref, toRefs, useCssModule, useSlots} from 'vue'
import {useElementBounding} from '@vueuse/core'

interface AccordionPanel {
  'text:header'?: string
  'text:body'?: string

  'style:header:separatedOnOpen'?: boolean
  'style:filledOnCollapsed'?: boolean
  'style:body:filledOnOpen'?: boolean
  'style:body:noPadding'?: boolean
  'behavior:collapsable'?: boolean
  'behavior:collapseWithHeader'?: boolean
}

const props = defineProps<AccordionPanel>()
const {
  'text:header': textHeader,
  'text:body': textBody,
  'behavior:collapsable': behaviorCollapsable,
  'behavior:collapseWithHeader': behaviorCollapseWithHeader,
  'style:filledOnCollapsed': filledOnCollapsed,
  'style:header:separatedOnOpen': headerSeparatedOnOpen,
  'style:body:filledOnOpen': bodyFilledOnOpen,
  'style:body:noPadding': bodyNoPadding
} = toRefs(props)

const stateExpanded = defineModel<boolean>('state:expanded', {default: true})

const headerRef: Ref<HTMLElement | undefined> = ref()
const bodyRef: Ref<HTMLElement | undefined> = ref()

const {
  height: bodyHeight
} = useElementBounding(bodyRef)

const {
  height: headerHeight
} = useElementBounding(headerRef)

const totalHeight = computed(() => headerHeight.value + bodyHeight.value)
const computedStyle = computed(() => {
  if (!behaviorCollapsable.value) return undefined

  const _height = stateExpanded.value ? totalHeight.value : headerHeight.value
  if (_height <= 0) return undefined

  return {
    height: `${_height}px`
  }
})

const slots = useSlots()
const validHeader = computed(() => slots['text:header'] || textHeader.value)

const style = useCssModule()
const computedClasses = computed(() => {
  const _expanded = stateExpanded.value
  return {
    [style.StateCollapsed]: !_expanded,
    [style.StyleHeaderSeparator]: headerSeparatedOnOpen.value,
    [style.StyleBodyFilledOnOpen]: bodyFilledOnOpen.value,
    [style.StyleBodyNoPadding]: bodyNoPadding.value,
    [style.StyleFilledOnCollapsed]: filledOnCollapsed.value && !_expanded,
    [style.BehaviorCollapseWithHeader]: behaviorCollapseWithHeader.value
  }
})

function setState(collapsed: boolean) {
  if (!behaviorCollapsable.value) return
  stateExpanded.value = collapsed
}

function toggleState() {
  const _v = stateExpanded.value
  setState(!_v)
}

</script>

<template>
  <div :class="[$style.AccordionPanel, computedClasses]">
    <div :class="[$style.AccordionPanelContent]" :style="computedStyle">
      <div v-if="validHeader" ref="headerRef" :class="[$style.AccordionPanelHeader]" @click="toggleState">
        <div :class="[$style.AccordionPanelHeaderContent]">
          <slot name="text:header">
            <span :class="[$style.AccordionPanelHeaderText]" v-text="textHeader"/>
          </slot>
        </div>
        <div v-if="behaviorCollapsable" :class="[$style.AccordionPanelStateIcon]" @click="toggleState">
          <MaterialSymbol icon="expand_less"/>
        </div>
      </div>
      <div ref="bodyRef" :class="[$style.AccordionPanelBody]">
        <slot>
          <span v-text="textBody"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables";

$padding-x: variables.$unit-10;
$padding-y: variables.$unit-8;

.AccordionPanel {
  border: 1px solid variables.$border-color;
  border-radius: variables.$border-radius;
  overflow: hidden;
}

.AccordionPanelContent {
  transition-property: height, background-color;
  transition-duration: variables.$transition-duration;
  transition-timing-function: variables.$transition-timing-fn;
}

.AccordionPanelHeader {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  padding: $padding-y $padding-x;
  pointer-events: none;
}

.AccordionPanelHeaderContent {
  width: 100%;
  height: 100%;
}

.AccordionPanelHeaderText {
  font-weight: 400;
  font-size: variables.$unit-9;
  line-height: 1;
}

.AccordionPanelStateIcon {
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;

  > * {
    display: inline-block;

    height: 1em;
    width: 1em;

    line-height: 1;
    transition: transform variables.$transition-duration variables.$transition-timing-fn;
  }
}

.AccordionPanelBody {
  font-size: variables.$unit-7;
  padding: 0 $padding-x $padding-y $padding-x;
  transition: background-color variables.$transition-duration variables.$transition-timing-fn;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}

.BehaviorCollapseWithHeader {
  .AccordionPanelHeader {
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
  }

  .AccordionPanelStateIcon {
    pointer-events: none;
  }
}

.StyleHeaderSeparator {
  .AccordionPanelBody {
    padding-top: $padding-y;
    border-top: 1px solid variables.$border-color;
  }
}

.StyleBodyFilledOnOpen {
  .AccordionPanelBody {
    padding-top: $padding-y;
    background-color: variables.$body-color-v-depth-1;
  }
}

.StyleFilledOnCollapsed {
  .AccordionPanelContent {
    background-color: variables.$body-color-v-depth-1;
  }
}

.StyleBodyNoPadding {
  .AccordionPanelBody {
    padding: 0;
  }
}

.StateCollapsed {
  .AccordionPanelStateIcon {
    > * {
      transform: rotate(-180deg);
    }
  }
}
</style>