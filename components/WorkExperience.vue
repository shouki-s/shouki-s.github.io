<script setup lang="ts">
import type { WorkEntry } from '~/@types/contentful'
import dayjs from 'dayjs'

// ローディングを見せたいので画面に入ってから読み込む
const {
  data: works,
  loading,
  error,
} = useLoadOnVisible<WorkEntry[]>(useTemplateRef('root'), fetchWorks, [])

function getYears(startDate: string, endDate: string): string {
  const start = dayjs(startDate).year()
  const end = dayjs(endDate).year()
  if (start === end) {
    return `${start}年`
  } else {
    return `${start}年〜${end}年`
  }
}
</script>

<template>
  <div ref="root">
    <LoadError v-if="error" />
    <div v-else-if="loading">
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
      <div v-if="fields.description" v-html="mdToHtml(fields.description)" />
      <p class="d-flex flex-wrap gap-2 pb-2">
        <SkillBadge
          v-for="skill in resolvedEntries(fields.skills)"
          :key="skill.sys.id"
          :skill="skill"
        />
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge.dummy {
  background-color: #999;
}
</style>
