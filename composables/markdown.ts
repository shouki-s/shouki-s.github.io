import { marked } from 'marked'

/** Contentful に書いた Markdown を HTML にする */
export function mdToHtml(md: string): string {
  return marked.parse(md) as string
}
