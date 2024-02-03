<template>
  <div
    class="card shadow animate__animated animate__fadeInDown"
    :style="scaleStyle"
  >
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

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const scale = ref(0.00001)

const scaleStyle = computed(() => {
  return `scale: ${scale.value}`
})

onMounted(() => {
  scale.value = getDesiredScale()
  console.log(`The initial count is ${scale.value}.`)
  window.addEventListener('resize', getDesiredScale)
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
@import '~/assets/stylesheets/variables.scss';

.card {
  width: 726px;
  height: 438px;
}
.card-img-top {
  border-bottom: 16px solid $primary;
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
