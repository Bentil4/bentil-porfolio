/**
 * Type definitions for the portfolio config.
 * You normally don't need to edit this file — edit `portfolio.ts` instead.
 */

export type ProjectCategory =
  | 'Full-Stack'
  | 'Frontend'
  | 'Backend'
  | 'Open-Source'
  | 'DevOps'
  | 'Mobile'

export interface Project {
  /** Unique slug, used as the React key and anchor id. */
  id: string
  title: string
  category: ProjectCategory
  /** STAR methodology: what recruiters read to understand impact. */
  star: {
    situation: string
    task: string
    action: string
    result: string
  }
  tech: string[]
  /** Omit to hide the "Live Demo" button. */
  liveUrl?: string
  /** Omit to hide the "GitHub Repo" button. */
  repoUrl?: string
  /** Shows a "Private repo" label when there is no public repo link. */
  repoPrivate?: boolean
}

export interface PortfolioConfig {
  name: string
  /** Short wordmark shown in the navbar. */
  brand: string
  title: string
  /** Exactly two sentences for the hero. */
  summary: [string, string]
  about?: {
    bio: string
    facts: string[]
  }
  email: string
  /** External link to your resume (Google Drive, Dropbox, etc.). */
  resumeUrl: string
  socials: {
    github: string
    linkedin?: string
  }
  github: {
    username?: string
    /** Swap placeholders for live GitHub images. */
    enableLiveStats: boolean
    /**
     * Base URL of your self-hosted github-readme-stats instance,
     * e.g. 'https://your-stats.vercel.app'. Empty = stats & languages stay placeholders.
     */
    statsApiUrl?: string
  }
  contact: {
    /** e.g. a Formspree endpoint. Leave empty to show only direct links. */
    formEndpoint?: string
  }
  seo: {
    /** Absolute URL where the site is hosted. */
    siteUrl: string
    description: string
    /** Absolute URL to a 1200x630 social preview image. */
    ogImage?: string
  }
  projects: Project[]
  skills: {
    frontend: string[]
    backend: string[]
    devops: string[]
  }
}
