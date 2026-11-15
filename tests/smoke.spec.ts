import { type Page, expect, test } from '@playwright/test'

// Contentful の応答を置き換えるための最小限のデータ
const contentType = (id: string): object => ({
  sys: { type: 'Link', linkType: 'ContentType', id },
})
const entry = (id: string, type: string, fields: object): object => ({
  sys: { id, type: 'Entry', contentType: contentType(type), locale: 'ja' },
  fields,
  metadata: { tags: [] },
})
const entryLink = (id: string): object => ({
  sys: { type: 'Link', linkType: 'Entry', id },
})

const skill = entry('skill-1', 'skill', {
  name: 'TypeScript',
  genre: 'language',
  rate: 5,
  monthsOfExperience: 60,
  showInSkillList: true,
})
const entriesByType: Record<string, object[]> = {
  skill: [skill],
  work: [
    entry('work-1', 'work', {
      name: 'テスト案件',
      startDate: '2023-04-01',
      endDate: '2024-03-31',
      description: '- 設計と実装を担当',
      skills: [entryLink('skill-1')],
    }),
  ],
  product: [
    entry('product-1', 'product', {
      name: 'テスト製品',
      description: '便利な道具',
      skills: [entryLink('skill-1')],
    }),
  ],
}

/** Contentful・草カレンダー・外部サービスへの通信をテスト用に置き換える */
async function mockNetwork(page: Page): Promise<void> {
  // Google Analytics やバッジ画像など、外部への通信は止める。
  // あとから登録した route が先に使われるので、これを最初に登録する
  await page.route(/^https?:\/\/(?!localhost[:/])/, (route) => route.abort())

  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
  }
  await page.route('https://cdn.contentful.com/**', (route) => {
    if (route.request().method() === 'OPTIONS') {
      return route.fulfill({ status: 204, headers: cors })
    }
    const type = new URL(route.request().url()).searchParams.get('content_type')
    const items = entriesByType[type ?? ''] ?? []
    return route.fulfill({
      headers: { ...cors, 'content-type': 'application/json' },
      body: JSON.stringify({
        sys: { type: 'Array' },
        total: items.length,
        skip: 0,
        limit: 100,
        items,
        includes: { Entry: [skill] },
      }),
    })
  })
  await page.route('**/contribution-calendar.json', (route) =>
    route.fulfill({
      json: {
        totalContributions: 1,
        weeks: [
          { contributionDays: [{ date: '2026-01-01', contributionCount: 1 }] },
        ],
      },
    }),
  )
}

test('トップページの各セクションが表示される', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await mockNetwork(page)

  await page.goto('/')
  await expect(page.getByRole('heading', { name: '坂本 鐘期' })).toBeVisible()

  // Contentful から読み込むセクションは、画面に入ってから中身が出る
  const sections = [
    { id: 'work-experience', text: 'テスト案件' },
    { id: 'products', text: 'テスト製品' },
    { id: 'skills', text: 'TypeScript' },
  ]
  for (const { id, text } of sections) {
    const section = page.locator('section', { has: page.locator(`#${id}`) })
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByText(text).first()).toBeVisible()
  }
  await expect(page.getByRole('alert')).toHaveCount(0)

  expect(errors).toEqual([])
})
