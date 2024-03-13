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
  <div v-if="contributionCalendar" class="card p-3">
    <p>
      {{ contributionCalendar.totalContributions.toLocaleString() }}
      contributions in the last year
    </p>
    <div class="d-flex flex-row-reverse overflow-x-scroll">
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
    <div
      class="d-flex inline-flex align-items-center justify-content-end my-2 mx-4"
    >
      <span class="text-secondary small mx-1">Less</span>
      <div v-for="i in 5" :key="i" class="day">
        <div class="kusa" :class="`kusa-${i - 1}`" />
      </div>
      <span class="text-secondary small mx-1">More</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.day {
  background-color: rgb(235, 237, 240);
  margin: 2px;
  border-radius: 3px;
  outline: solid 1px rgba(27, 31, 35, 0.06);
  outline-offset: -1px;

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
