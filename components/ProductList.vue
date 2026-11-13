<script setup lang="ts">
import type { ProductEntry } from '~/@types/contentful'
import { marked } from 'marked'
import sleep from 'sleep-promise'
import { vIntersectionObserver } from '@vueuse/components'

const products = ref([]) as Ref<ProductEntry[]>
const intersected = ref(false)
const loading = ref(true)

// ローディングを見せたいので画面に入ってからfetch開始
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
    products.value = await fetchProducts()
  } finally {
    loading.value = false
  }
}

function mdToHtml(md: string): string {
  return marked.parse(md) as string
}
</script>

<template>
  <div v-intersection-observer="onIntersection">
    <div v-if="loading">
      <h3><span class="placeholder col-4" /></h3>
      <p>
        <span class="placeholder col-9" /><br />
        <span class="placeholder col-7" />
      </p>
    </div>
    <div v-for="{ fields, sys } in products" :key="sys.id">
      <h3>
        <a v-if="fields.url" :href="fields.url" target="_blank" rel="noopener">
          {{ fields.name }}
        </a>
        <template v-else>{{ fields.name }}</template>
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="fields.description" v-html="mdToHtml(fields.description)" />
      <p v-if="fields.skills?.length" class="d-flex flex-wrap gap-2 pb-2">
        <SkillBadge
          v-for="skill in fields.skills"
          :key="skill.sys.id"
          :skill="skill"
        />
      </p>
    </div>
  </div>
</template>
