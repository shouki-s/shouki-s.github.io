<template>
  <div class="card" :style="scaleStyle" :class="{ show }">
    <img src="assets/images/kanagawaoki.png" class="card-img-top" />
    <div class="card-body d-flex flex-column justify-content-between">
      <span class="job-title">
        フリーランス<br />
        システムエンジニア／プログラマー
      </span>
      <div class="card-title d-inline-flex align-items-end">
        <h1 class="">坂本 鐘期</h1>
        <span class="roman">Shouki SAKAMOTO</span>
      </div>
      <div class="spacer" />
      <span>システム開発全般を承ります</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

const show = ref(false)
const scale = ref(0.1)

const scaleStyle = computed(() => {
  return `transform: scale(${scale.value})`
})

onMounted(async () => {
  scale.value = getDesiredScale()
  console.log(`The initial count is ${scale.value}.`)
  window.addEventListener('resize', getDesiredScale)
  await nextTick()
  show.value = true
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', getDesiredScale)
})

/** 横幅を拡縮するためのスケールを計算する */
function getDesiredScale(): number {
  return Math.min(window.innerWidth * 0.95, 363) / 726
}
</script>

<style lang="scss" scoped>
.card {
  width: 726px;
  height: 438px;
  visibility: hidden;
  &.show {
    visibility: visible;
  }
}
.card-img-top {
  border-bottom: 16px solid #23334a;
}
.card-body {
  padding: 38px 38px 30px 38px;
}
.job-title {
  font-family: serif;
  font-weight: bold;
}
.card-title {
  h1 {
    margin: 0;
    padding: 0;
    font-size: 48px;
    font-family: serif;
    font-weight: bolder;
    letter-spacing: 0.25em;
  }
  .roman {
    font-size: 1.3rem;
    font-family: serif;
    padding-left: 16px;
    padding-bottom: 4px;
    letter-spacing: 1px;
  }
}
</style>
