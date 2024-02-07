<template>
  <div v-intersection-observer="onIntersection">
    <div v-if="loading">
      <div v-for="i in 2" :key="i">
        <h3><span class="placeholder col-7" /></h3>
        <div>
          <ul>
            <li><span class="placeholder col-9" /></li>
            <li><span class="placeholder col-7" /></li>
            <li><span class="placeholder col-10" /></li>
          </ul>
        </div>
        <p class="d-flex flex-wrap gap-2">
          <span v-for="j in [5, 6, 8, 3, 10]" :key="j" class="badge dummy">
            <span class="placeholder" :style="`width: ${j}em`" />
          </span>
        </p>
      </div>
    </div>
    <div v-for="{ fields, sys } in works" :key="sys.id">
      <h3>
        {{ fields.name }} （{{ getYears(fields.startDate, fields.endDate) }}）
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="mdToHtml(fields.description)" />
      <p class="d-flex flex-wrap gap-2 pb-2">
        <span
          v-for="skill in fields.skills"
          :key="skill.sys.id"
          class="badge"
          :class="skill.fields.genre"
        >
          {{ skill.fields.name }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkEntry } from '~/@types/contentful'
import dayjs from 'dayjs'
import { marked } from 'marked'
import sleep from 'sleep-promise'
import { vIntersectionObserver } from '@vueuse/components'

const works = ref([]) as Ref<WorkEntry[]>
const intersected = ref(false)
const loading = ref(true)

// ローディングを見えたいので画面に入ってからfetch開始
async function onIntersection([
  { isIntersecting },
]: IntersectionObserverEntry[]): Promise<void> {
  if (!isIntersecting || intersected.value) {
    return
  }
  intersected.value = true

  loading.value = true
  try {
    await sleep(200) // ローディングを見せたいのであえてスリープ
    works.value = await fetchWorks()
  } finally {
    loading.value = false
  }
}

function getYears(startDate: string, endDate: string): string {
  const start = dayjs(startDate).year()
  const end = dayjs(endDate).year()
  if (start === end) {
    return `${start}年`
  } else {
    return `${start}年〜${end}年`
  }
}

function mdToHtml(md: string): string {
  return marked.parse(md) as string
}
</script>

<style lang="scss" scoped>
.badge {
  &.language {
    background-color: #1e88e5;
  }
  &.framework {
    background-color: #0097a7;
  }
  &.os {
    background-color: #9e9d24;
  }
  &.tool {
    background-color: #ff6f00;
  }
  &.process {
    background-color: #d32f2f;
  }
  &.dummy {
    background-color: #999;
  }
}
</style>
