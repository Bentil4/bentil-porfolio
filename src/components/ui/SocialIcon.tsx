import type { ReactNode } from 'react'

export function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime"
    >
      {children}
    </a>
  )
}
