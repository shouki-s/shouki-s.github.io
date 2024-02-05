<template>
  <ul>
    <li v-for="skill in skills" :key="skill.sys.id">
      {{ skill.fields.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import * as contentful from 'contentful'
import { type Entry } from 'contentful'
import type { SkillSkeleton } from '~/@types/contentful'

const runtimeConfig = useRuntimeConfig().public
const contentfulClient = contentful.createClient({
  space: runtimeConfig.contentfulSpaceId,
  environment: runtimeConfig.contentfulEnvironment,
  accessToken: runtimeConfig.contentfulApikey,
})

const skills = ref([] as Entry<SkillSkeleton, undefined, string>[])

onMounted(() => {
  loadSkills()
})

async function loadSkills(): Promise<void> {
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    order: ['-fields.rate'],
  })
  skills.value = items
}
</script>
