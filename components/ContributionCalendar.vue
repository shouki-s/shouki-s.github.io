<script setup lang="ts">
import type { Contributions } from '~/@types/github'

type ContributionCalendar =
  Contributions['user']['contributionsCollection']['contributionCalendar']

const loading = ref(false)
const contributionCalendar = ref<ContributionCalendar | null>(null)

const contributionMax = computed<number>(() => {
  if (!contributionCalendar.value) {
    return 0
  }
  return Math.max(
    ...contributionCalendar.value.weeks.map((week) =>
      Math.max(...week.contributionDays.map((day) => day.contributionCount)),
    ),
  )
})

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
  <div
    v-if="contributionCalendar"
    class="d-flex flex-row-reverse overflow-x-scroll"
  >
    <div
      v-for="(week, i) in contributionCalendar.weeks"
      :key="i"
      class="d-flex flex-column"
    >
      <div
        v-for="{ date, contributionCount } in week.contributionDays"
        :key="date"
        class="day"
        :title="`${date}: ${contributionCount}`"
      >
        <div
          class="kusa"
          :class="`kusa-${Math.ceil((contributionCount * 4) / contributionMax)}`"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.day {
  background-color: rgb(235, 237, 240);
  margin: 2px;
  border-radius: 1px;
  .kusa {
    height: 10px;
    width: 10px;
  }
  .kusa-1 {
    background-color: rgb(155, 233, 168);
  }
  .kusa-2 {
    background-color: rgb(64, 196, 99);
  }
  .kusa-3 {
    background-color: rgb(48, 161, 78);
  }
  .kusa-4 {
    background-color: rgb(33, 110, 57);
  }
}
</style>
