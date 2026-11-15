import 'dotenv/config'
import type { Contributions } from '../@types/github'
import { Octokit } from 'octokit'
import { writeFile } from 'fs/promises'

const OUTPUT = './public/contribution-calendar.json'

// `--optional` を付けると、トークンがないときは取得を飛ばす（ローカルでの開発用）
const optional = process.argv.includes('--optional')

async function main(): Promise<void> {
  const auth = process.env.GITHUB_TOKEN
  if (!auth) {
    if (optional) {
      console.warn(
        'GITHUB_TOKEN is not set; skipping the contribution calendar',
      )
      return
    }
    throw new Error('GITHUB_TOKEN is not set')
  }

  const octokit = new Octokit({ auth })

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    user: {
      contributionsCollection: { contributionCalendar },
    },
  } = await octokit.graphql<Contributions>(`
      query {
        user(login: "shouki-s") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `)
  await writeFile(OUTPUT, JSON.stringify(contributionCalendar))
}

main().catch((e: unknown) => {
  console.error(e)
  process.exitCode = 1
})
