<template>
  <p>こん</p>
</template>

<script setup lang="ts">
import type { WorkEntry } from '~/@types/contentful'

const works = ref([] as WorkEntry[])

onMounted(async () => {
  works.value = await fetchWorks()
})
</script>
