import type { PortfolioConfig } from './types.ts'

const PLACEHOLDER = /example\.com|your-username|your-profile|your-resume|TODO/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Dev-only: warns about placeholder or malformed config values. */
export function validateConfig(config: PortfolioConfig) {
  const issues: string[] = []
  const check = (path: string, value: string | undefined) => {
    if (value === undefined) return
    if (!value.trim()) issues.push(`${path} is empty`)
    else if (PLACEHOLDER.test(value)) issues.push(`${path} still looks like a placeholder: ${value}`)
  }

  if (!EMAIL.test(config.email)) issues.push(`email is malformed: ${config.email}`)
  check('email', config.email)
  check('resumeUrl', config.resumeUrl)
  check('socials.github', config.socials.github)
  check('socials.linkedin', config.socials.linkedin)
  check('seo.siteUrl', config.seo.siteUrl)
  if (config.github.enableLiveStats) check('github.username', config.github.username ?? '')

  const ids = new Set<string>()
  config.projects.forEach((p, i) => {
    if (ids.has(p.id)) issues.push(`projects[${i}].id "${p.id}" is duplicated`)
    ids.add(p.id)
    check(`projects[${i}].liveUrl`, p.liveUrl)
    check(`projects[${i}].repoUrl`, p.repoUrl)
  })

  if (issues.length) {
    console.warn(`[portfolio config] ${issues.length} item(s) to update in src/config/portfolio.ts:\n- ${issues.join('\n- ')}`)
  }
}
