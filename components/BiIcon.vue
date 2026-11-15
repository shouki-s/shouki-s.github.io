<script setup lang="ts">
// bootstrap-icons の SVG をそのまま埋め込む（アイコンフォント全体を読み込まないため）
import chevronDoubleDown from 'bootstrap-icons/icons/chevron-double-down.svg?raw'
import exclamationCircle from 'bootstrap-icons/icons/exclamation-circle.svg?raw'
import star from 'bootstrap-icons/icons/star.svg?raw'
import starFill from 'bootstrap-icons/icons/star-fill.svg?raw'

const icons = {
  'chevron-double-down': chevronDoubleDown,
  'exclamation-circle': exclamationCircle,
  'star-fill': starFill,
  star,
}

defineProps<{ name: keyof typeof icons }>()
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span class="bi-svg" aria-hidden="true" v-html="icons[name]" />
</template>

<style lang="scss" scoped>
// アイコンフォントの .bi::before と同じ大きさ・位置にする
.bi-svg :deep(svg) {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
}
</style>
