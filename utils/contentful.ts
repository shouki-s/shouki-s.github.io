import * as contentful from 'contentful'
import type { SkillEntry, SkillSkeleton } from '~/@types/contentful'

const runtimeConfig = useRuntimeConfig().public
const contentfulClient = contentful.createClient({
  space: runtimeConfig.contentfulSpaceId,
  environment: runtimeConfig.contentfulEnvironment,
  accessToken: runtimeConfig.contentfulApikey,
})

export async function fetchSkills(genre: string): Promise<SkillEntry[]> {
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    'fields.genre': genre,
    order: ['-fields.rate'],
  })
  return items
}

export async function getMaxMonthsOfSkillsExp(): Promise<number> {
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    order: ['-fields.monthsOfExperience'],
    limit: 1,
  })
  return items[0]?.fields.monthsOfExperience || 100
}
