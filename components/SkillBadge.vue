<script setup lang="ts">
import type { SkillEntry } from '~/@types/contentful'

defineProps<{
  skill: SkillEntry
}>()
</script>

<template>
  <span class="badge" :class="skill.fields.genre">
    {{ skill.fields.name }}
  </span>
</template>

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
