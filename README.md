# shouki-s.github.io

[![CI](https://github.com/shouki-s/shouki-s.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/shouki-s/shouki-s.github.io/actions/workflows/ci.yml)
[![Deploy Nuxt site to Pages](https://github.com/shouki-s/shouki-s.github.io/actions/workflows/github-pages.yml/badge.svg)](https://github.com/shouki-s/shouki-s.github.io/actions/workflows/github-pages.yml)

Source of my portfolio site, <https://shouki-s.github.io/>. It is a [Nuxt 4](https://nuxt.com/docs/getting-started/introduction) single-page app, built as static files and deployed to GitHub Pages.

- The profile, career and other fixed text are written in the components.
- Work history, products and skills are managed in [Contentful](https://www.contentful.com/) and fetched in the browser.
- The GitHub contribution calendar is fetched at build time by `scripts/contribution-calendar.ts` and served as `public/contribution-calendar.json`.

## Setup

Use the Node.js version in `.node-version`. The pnpm version is pinned by `packageManager` in `package.json`.

```bash
pnpm install
cp .env.sample .env
```

`.env` holds:

| Variable                                                                                                     | Used for                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_CONTENTFUL_SPACE_ID`<br>`NUXT_PUBLIC_CONTENTFUL_ENVIRONMENT`<br>`NUXT_PUBLIC_CONTENTFUL_APIKEY` | Contentful Delivery API. The token is read-only and is shipped to the browser anyway, so the values in `.env.sample` work as is.                                                 |
| `NUXT_PUBLIC_GTAG_ID`                                                                                        | Google Analytics                                                                                                                                                                 |
| `GITHUB_TOKEN`                                                                                               | Fetching the contribution calendar. It only reads public data, so a personal access token with no extra scopes is enough. Optional for `pnpm dev`, required for `pnpm generate`. |

## Commands

| Command          | What it does                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`       | Starts the development server on <http://localhost:3000>. Without `GITHUB_TOKEN`, the contribution calendar is skipped. |
| `pnpm generate`  | Builds the static site into `.output/public` (`dist` links to it).                                                      |
| `pnpm lint`      | Runs ESLint, including Prettier formatting.                                                                             |
| `pnpm typecheck` | Type-checks with `nuxt typecheck`.                                                                                      |

## CI and deployment

- `.github/workflows/ci.yml` runs lint, type-check and the build on every pull request and on `main`.
- `.github/workflows/github-pages.yml` builds and deploys to GitHub Pages on every push to `main`, and once a day so the contribution calendar stays current.
- Dependabot opens weekly pull requests for npm minor and patch updates (grouped, 7 days after release) and for GitHub Actions. npm major updates are ignored and done by hand; security updates still arrive.
