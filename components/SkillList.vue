<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col" class="text-center">得意度</th>
        <th scope="col">経験期間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ fields, sys } in skills" :key="sys.id">
        <th scope="row">{{ fields.name }}</th>
        <td class="rating text-center">
          <i
            v-for="i in fields.rate || 0"
            :key="`${sys.id}_${i}`"
            class="bi bi-star-fill"
          />
          <i
            v-for="i in 5 - (fields.rate || 0)"
            :key="`${sys.id}_${i}`"
            class="bi bi-star"
          />
        </td>
        <td v-if="fields.monthsOfExperience !== 0" class="exp">
          <div class="small">{{ fields.monthsOfExperience }}ヶ月</div>
          <div
            class="progress"
            role="progressbar"
            :aria-label="fields.name"
            :aria-valuenow="(fields.monthsOfExperience * 100) / maxMonths"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 1px"
          >
            <div
              class="progress-bar"
              :style="`width: ${(fields.monthsOfExperience * 100) / maxMonths}%`"
            ></div>
          </div>
        </td>
        <td v-else class="exp">習得中...</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { SkillEntry } from '~/@types/contentful'

const props = defineProps<{
  genre: string
  maxMonths: number
}>()

const skills = ref([] as SkillEntry[])

onMounted(async () => {
  skills.value = await fetchSkills(props.genre)
})
</script>

<style lang="scss" scoped>
.rating {
  color: #fbc634 !important;
  width: 6em;
  vertical-align: middle;
}
.exp {
  vertical-align: middle;
  width: 30%;
}
</style>
