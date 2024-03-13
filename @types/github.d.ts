export type Contributions = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: {
          contributionDays: [
            {
              date: string
              contributionCount: number
            },
          ]
        }[]
      }
    }
  }
}
