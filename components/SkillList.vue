<script setup lang="ts">
import type { SkillEntry } from '~/@types/contentful'

const props = defineProps<{
  genre: string
}>()

// ローディングを見せたいので画面に入ってから読み込む。
// 全ジャンルの表が同じ1回の取得結果を使う
const { data, loading, error } = useLoadOnVisible<{
  skills: SkillEntry[]
  maxMonths: number
}>(
  useTemplateRef('root'),
  async () => ({
    skills: await fetchSkills(props.genre),
    maxMonths: await getMaxMonthsOfSkillsExp(),
  }),
  { skills: [], maxMonths: 100 },
)
</script>

<template>
  <table ref="root" class="table table-striped">
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col" class="text-center">得意度</th>
        <th scope="col">経験期間</th>
      </tr>
    </thead>
    <tbody v-if="loading">
      <!-- placeholder -->
      <tr v-for="len in [7, 4, 5, 9]" :key="len">
        <th scope="row"><span :class="`placeholder col-${len}`" /></th>
        <td class="rating text-center">
          <i v-for="i in 5" :key="i" class="bi bi-star" />
        </td>
        <td class="exp">
          <div class="small"><span class="placeholder col-7" /></div>
          <div
            class="progress"
            role="progressbar"
            aria-valuenow="1"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 1px"
          >
            <div class="progress-bar" :style="`width: 1%`"></div>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else-if="error">
      <tr>
        <td colspan="3"><LoadError /></td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="{ fields, sys } in data.skills" :key="sys.id">
        <th scope="row">{{ fields.name }}</th>
        <td
          class="rating text-center"
          :aria-label="`5段階評価で${fields.rate || 0}`"
        >
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
            :aria-valuenow="(fields.monthsOfExperience * 100) / data.maxMonths"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 1px"
          >
            <div
              class="progress-bar"
              :style="`width: ${(fields.monthsOfExperience * 100) / data.maxMonths}%`"
            ></div>
          </div>
        </td>
        <td v-else class="exp">習得中...</td>
      </tr>
    </tbody>
  </table>
</template>

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
