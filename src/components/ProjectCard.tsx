import { ExternalLink, Lock } from 'lucide-react'
import type { Project } from '../config'
import { GitHubIcon } from './icons'
import { ButtonLink } from './ui/Button'
import { Pill } from './ui/Pill'

const STAR_ROWS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
] as const

export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.id}`

  return (
    <article
      id={project.id}
      aria-labelledby={headingId}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_20px_60px_-20px_rgba(198,255,61,0.25)] sm:p-8"
    >
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <h3 id={headingId} className="font-display text-2xl font-bold tracking-tight text-ink">
          {project.title}
        </h3>
        <span className="rounded-md border border-blue/30 bg-blue/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-blue">
          {project.category}
        </span>
      </header>

      <dl className="space-y-4">
        {STAR_ROWS.map(({ key, label }) => {
          const isResult = key === 'result'
          return (
            <div
              key={key}
              className={`grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4 ${
                isResult ? 'rounded-lg border border-lime/25 bg-lime/[0.06] p-3 sm:-mx-3' : ''
              }`}
            >
              <dt
                className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider sm:items-start sm:pt-0.5 ${
                  isResult ? 'text-lime' : 'text-muted'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-5 shrink-0 place-items-center rounded text-[0.65rem] font-medium ${
                    isResult ? 'bg-lime text-bg' : 'bg-white/5 text-ink/70'
                  }`}
                >
                  {label[0]}
                </span>
                {label}
              </dt>
              <dd className={`text-[0.95rem] leading-relaxed ${isResult ? 'font-medium text-ink' : 'text-ink/80'}`}>
                {project.star[key]}
              </dd>
            </div>
          )
        })}
      </dl>

      <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t}>
            <Pill>{t}</Pill>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {project.liveUrl && (
          <ButtonLink href={project.liveUrl} external size="sm" variant="primary">
            <ExternalLink size={16} aria-hidden="true" />
            Live Demo
          </ButtonLink>
        )}
        {project.repoUrl ? (
          <ButtonLink href={project.repoUrl} external size="sm" variant="outline">
            <GitHubIcon size={16} />
            GitHub Repo
          </ButtonLink>
        ) : project.repoPrivate ? (
          <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-line px-3.5 text-sm text-muted">
            <Lock size={14} aria-hidden="true" />
            Private repo
          </span>
        ) : null}
      </div>
    </article>
  )
}
