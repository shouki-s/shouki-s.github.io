<template>
  <div>
    <div v-for="{ fields, sys } in works" :key="sys.id">
      <h3>
        {{ fields.name }} （{{ getYears(fields.startDate, fields.endDate) }}）
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="mdToHtml(fields.description)" />
      <div class="d-flex flex-wrap gap-2">
        <span
          v-for="skill in fields.skills"
          :key="skill.sys.id"
          class="badge"
          :class="skill.fields.genre"
        >
          {{ skill.fields.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkEntry } from '~/@types/contentful'
import dayjs from 'dayjs'
import { marked } from 'marked'

const works = ref([]) as Ref<WorkEntry[]>

onMounted(async () => {
  works.value = await fetchWorks()
})

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
}
</style>
