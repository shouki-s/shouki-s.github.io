<template>
  <div v-for="{ fields, sys, metadata } in works" :key="sys.id">
    <h3>
      {{ fields.name }} （{{ getYears(fields.startDate, fields.endDate) }}）
    </h3>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="mdToHtml(fields.description)" />
    <!-- <div>
      <span v-for="tag in metadata.tags" class="badge text-bg-primary">{{tag}}</span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { WorkEntry } from '~/@types/contentful'
import { marked } from 'marked'
import moment from 'moment'

const works = ref([]) as Ref<WorkEntry[]>

onMounted(async () => {
  works.value = await fetchWorks()
  console.log(works.value)
})

function getYears(startDate: string, endDate: string): string {
  const start = moment(startDate).year()
  const end = moment(endDate).year()
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
