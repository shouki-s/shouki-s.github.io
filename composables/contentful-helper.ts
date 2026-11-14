import * as contentful from 'contentful'
import type {
  ProductEntry,
  ProductSkeleton,
  SkillEntry,
  SkillSkeleton,
  WorkEntry,
  WorkSkeleton,
} from '~/@types/contentful'

let contentfulClient: contentful.ContentfulClientApi<undefined> | undefined

function getContentfulClient(): contentful.ContentfulClientApi<undefined> {
  if (!contentfulClient) {
    const runtimeConfig = useRuntimeConfig().public
    contentfulClient = contentful.createClient({
      space: runtimeConfig.contentfulSpaceId,
      environment: runtimeConfig.contentfulEnvironment,
      accessToken: runtimeConfig.contentfulApikey,
    })
  }
  return contentfulClient
}

/**
 * リンク先のエントリのうち、解決できたものだけを返す。
 * 非公開・削除済みのエントリへのリンクは `fields` を持たないリンクのまま返ってくるため除く。
 */
export function resolvedEntries<T extends { fields: unknown }>(
  items: (T | contentful.UnresolvedLink<'Entry'>)[] | undefined,
): T[] {
  return (items ?? []).filter((item): item is T => 'fields' in item)
}

let allSkills: Promise<SkillEntry[]> | undefined

/**
 * スキルを得意度の高い順にすべて取得する。
 * ジャンル別の表もバーの最大値も同じ一覧から作るので、1回だけ取得して使い回す。
 * 失敗したときは次の呼び出しで取得し直す。
 */
function fetchAllSkills(): Promise<SkillEntry[]> {
  allSkills ??= getContentfulClient()
    .getEntries<SkillSkeleton>({
      content_type: 'skill',
      order: ['-fields.rate'],
      limit: 1000, // Delivery API の上限
    })
    .then(({ items }) => items)
    .catch((e: unknown) => {
      allSkills = undefined
      throw e
    })
  return allSkills
}

/** スキル一覧に載せるスキルを、得意度の高い順に返す */
export async function fetchSkills(genre: string): Promise<SkillEntry[]> {
  const skills = await fetchAllSkills()
  return skills.filter(
    ({ fields }) => fields.genre === genre && fields.showInSkillList === true,
  )
}

/** 経験期間のバーの長さの基準にする、全スキル中で最長の経験月数 */
export async function getMaxMonthsOfSkillsExp(): Promise<number> {
  const skills = await fetchAllSkills()
  const max = Math.max(
    0,
    ...skills.map(({ fields }) => fields.monthsOfExperience ?? 0),
  )
  return max || 100
}

export async function fetchWorks(): Promise<WorkEntry[]> {
  const { items } = await getContentfulClient().getEntries<WorkSkeleton>({
    content_type: 'work',
    order: ['-fields.endDate'],
  })
  return items
}

export async function fetchProducts(): Promise<ProductEntry[]> {
  const { items } = await getContentfulClient().getEntries<ProductSkeleton>({
    content_type: 'product',
    order: ['-fields.releaseDate'],
  })
  return items
}
