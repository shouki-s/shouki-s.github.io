<script setup lang="ts">
import type { Contributions } from '~/@types/github'

type ContributionCalendar =
  Contributions['user']['contributionsCollection']['contributionCalendar']

const loading = ref(false)
const contributionCalendar = ref<ContributionCalendar | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('contribution-calendar.json')
    contributionCalendar.value = await response.json()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div />
</template>

<style lang="scss" scoped></style>
