export type Contributions = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number
        weeks: {
          contributionDays: {
            date: string
            contributionCount: number
          }[]
        }[]
      }
    }
  }
}
