import * as contentful from 'contentful'
import type {
  SkillEntry,
  SkillSkeleton,
  WorkEntry,
  WorkSkeleton,
} from '~/@types/contentful'

function getContentfulClient(): contentful.ContentfulClientApi<undefined> {
  const runtimeConfig = useRuntimeConfig().public
  const contentfulClient = contentful.createClient({
    space: runtimeConfig.contentfulSpaceId,
    environment: runtimeConfig.contentfulEnvironment,
    accessToken: runtimeConfig.contentfulApikey,
  })
  return contentfulClient
}

export async function fetchSkills(genre: string): Promise<SkillEntry[]> {
  const contentfulClient = getContentfulClient()
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    'fields.genre': genre,
    order: ['-fields.rate'],
  })
  return items
}

export async function getMaxMonthsOfSkillsExp(): Promise<number> {
  const contentfulClient = getContentfulClient()
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    order: ['-fields.monthsOfExperience'],
    limit: 1,
  })
  return items[0]?.fields.monthsOfExperience || 100
}

export async function fetchWorks(): Promise<WorkEntry[]> {
  const contentfulClient = getContentfulClient()
  const { items } = await contentfulClient.getEntries<WorkSkeleton>({
    content_type: 'work',
    order: ['-fields.endDate'],
  })
  return items
}
