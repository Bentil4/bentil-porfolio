import { useState, type ReactNode } from 'react'
import { config } from '../config'
import { GitHubIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionHeading } from './ui/SectionHeading'

const THEME = 'bg_color=12141a&title_color=c6ff3d&icon_color=5b9dff&text_color=eef1f6&hide_border=true'

/** Stats and languages come from your self-hosted github-readme-stats instance (`github.statsApiUrl`). */
const liveUrls = (user: string, statsApi?: string) => {
  const api = statsApi?.replace(/\/+$/, '')
  return {
    stats: api && `${api}/api?username=${user}&show_icons=true&include_all_commits=true&${THEME}`,
    langs: api && `${api}/api/top-langs/?username=${user}&layout=donut&langs_count=6&${THEME}`,
    contributions: `https://ghchart.rshah.org/c6ff3d/${user}`,
  }
}

export function GitHubStats() {
  const { username, enableLiveStats, statsApiUrl } = config.github
  const urls = enableLiveStats && username ? liveUrls(encodeURIComponent(username), statsApiUrl) : null

  return (
    <Section id="github" className="border-t border-line">
      <Reveal>
        <SectionHeading
          id="github-heading"
          eyebrow="activity"
          title="GitHub at a glance."
          description="A live look at what I've been building, languages I reach for, and how consistently I ship."
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <Panel title="GitHub Stats">
            <LiveOrPlaceholder src={urls?.stats} alt={`GitHub stats for ${username}`} placeholder={<StatsSkeleton />} />
          </Panel>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <Panel title="Top Languages">
            <LiveOrPlaceholder src={urls?.langs} alt={`Top languages used by ${username}`} placeholder={<LanguagesSkeleton />} />
          </Panel>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-2">
          <Panel title="Contribution Graph">
            <LiveOrPlaceholder
              src={urls?.contributions}
              alt={`GitHub contribution graph for ${username}`}
              placeholder={<ContributionSkeleton />}
            />
          </Panel>
        </Reveal>
      </div>

      <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
        <GitHubIcon size={14} />
        <a href={config.socials.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-lime hover:underline">
          View full profile on GitHub<span className="sr-only"> (opens in new tab)</span>
        </a>
      </p>
    </Section>
  )
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-lime/30 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-ink">{title}</h3>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-lime/60" />
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  )
}

function LiveOrPlaceholder({ src, alt, placeholder }: { src?: string; alt: string; placeholder: ReactNode }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <>{placeholder}</>
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-auto w-full max-w-full" />
}

const Bar = ({ className }: { className: string }) => <span className={`block animate-shimmer rounded bg-white/10 ${className}`} />

function StatsSkeleton() {
  const rows = ['Total Stars', 'Total Commits', 'Pull Requests', 'Issues', 'Contributed to']
  return (
    <div role="img" aria-label="GitHub stats widget placeholder" className="flex w-full items-center gap-6">
      <ul className="flex-1 space-y-3.5">
        {rows.map((row, i) => (
          <li key={row} className="flex items-center justify-between gap-4 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue/60" />
              {row}
            </span>
            <Bar className={`h-3 ${['w-10', 'w-14', 'w-8', 'w-6', 'w-9'][i]}`} />
          </li>
        ))}
      </ul>
      <div className="hidden size-24 shrink-0 place-items-center rounded-full border-[6px] border-white/10 border-t-lime sm:grid">
        <span className="font-display text-2xl font-bold text-lime">A+</span>
      </div>
    </div>
  )
}

function LanguagesSkeleton() {
  const langs = [
    { name: 'TypeScript', pct: 42, color: '#5b9dff' },
    { name: 'JavaScript', pct: 23, color: '#c6ff3d' },
    { name: 'Python', pct: 14, color: '#a78bfa' },
    { name: 'CSS', pct: 11, color: '#f472b6' },
    { name: 'Other', pct: 10, color: '#475569' },
  ]
  let acc = 0
  const stops = langs.map((l) => `${l.color} ${acc}% ${(acc += l.pct)}%`).join(', ')

  return (
    <div role="img" aria-label="Top languages chart placeholder" className="flex w-full flex-col items-center gap-6 sm:flex-row">
      <div className="relative size-32 shrink-0 rounded-full opacity-80" style={{ background: `conic-gradient(${stops})` }}>
        <div className="absolute inset-5 rounded-full bg-surface" />
      </div>
      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-xs text-muted">
        {langs.map((l) => (
          <li key={l.name} className="flex items-center gap-2">
            <span className="size-2.5 rounded-sm" style={{ background: l.color }} />
            {l.name}
            <span className="ml-auto text-ink/50">—%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Deterministic pseudo-random intensities so the placeholder looks organic but stable.
const CELLS = Array.from({ length: 7 * 52 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1
  return v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.8 ? 2 : v < 0.93 ? 3 : 4
})
const LEVELS = ['bg-white/[0.05]', 'bg-lime/20', 'bg-lime/40', 'bg-lime/65', 'bg-lime']

function ContributionSkeleton() {
  return (
    <div role="img" aria-label="Contribution graph placeholder" className="w-full">
      <div className="grid w-full grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px]">
        {CELLS.map((level, i) => (
          <span key={i} className={`aspect-square rounded-[2px] ${LEVELS[level]}`} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[0.7rem] text-muted">
        Less
        {LEVELS.map((c) => (
          <span key={c} className={`size-2.5 rounded-[2px] ${c}`} />
        ))}
        More
      </div>
    </div>
  )
}
