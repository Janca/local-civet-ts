<script setup lang="ts">
import {MaterialSymbol} from "@/components/MaterialSymbol";
</script>

<template>
  <div :class="[$style.ModelGallerySearch]">
    <div :class="[$style.ModelGallerySearchContent]">
      <div :class="[$style.ModelSearchTypeSelect]">
        <select ref="selectRef">
          <option>Name</option>
          <option>Name</option>
        </select>
        <MaterialSymbol icon="expand_more"/>
      </div>
      <input :class="[$style.ModelSearchQueryInput]" type="text" placeholder="Search repository..."/>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/styles/variables.scss";

.ModelGallerySearch {
  display: flex;
  justify-content: center;
  width: 100%;

  font-size: variables.$unit-8;

  select, option, input {
    color: variables.$primary-text-color;

    padding: variables.$unit-3 variables.$unit-4;

    appearance: none;
    border: 0;
    outline: 0;
    background: transparent;
  }

  select {
    position: relative;
  }

  &:hover {
    select, option, input {
    }

    .ModelGallerySearchContent {
      background-color: variables.$body-color-v-depth-3;
    }
  }

  &:focus-within {
    option, input {
      background-color: variables.$body-color-v-depth-2;
    }

    .ModelSearchTypeSelect {
      background-color: variables.$body-color-v-depth-2;
    }
  }
}

@mixin fx() {
  transition-property: color, background-color;
  transition-duration: variables.$transition-duration;
  transition-timing-function: variables.$transition-timing-fn;
}

.ModelGallerySearchContent {
  display: flex;
  flex-flow: row nowrap;
  border-radius: variables.$border-radius;
  overflow: hidden;
  max-width: 720px;
  width: 100%;

  //border: 1px solid variables.$border-color;
  background-color: variables.$body-color-v-depth-2;
  @include fx;
}

.ModelSearchTypeSelect {
  display: none;
  //display: flex;
  flex-flow: row nowrap;
  width: min-content;
  white-space: nowrap;

  align-items: center;
  justify-content: space-between;

  @include fx;

  select {
    padding-right: variables.$unit-0 * 20;
  }

  span {
    display: inline-block;
    margin-left: -1.5em;
    padding-right: 0.5em;
  }

  &:focus-within {
    background-color: variables.$body-color-v-depth-4 !important;
  }
}

.ModelSearchQueryInput {
  //border-left: 1px solid variables.$border-color !important;
  width: 100%;
  @include fx;

  &:focus {
    background-color: variables.$body-color-v-depth-4 !important;
  }
}
</style>