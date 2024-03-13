import 'dotenv/config'
import type { Contributions } from '../@types/github'
import { Octokit } from 'octokit'
import { writeFile } from 'fs/promises'

const auth = process.env.GITHUB_TOKEN
if (!auth) {
  throw new Error('GITHUB_TOKEN is not set')
}

async function main(): Promise<void> {
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
  writeFile(
    './public/contribution-calendar.json',
    JSON.stringify(contributionCalendar),
  )
}

main()
