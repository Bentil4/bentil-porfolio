import type { ReactNode } from 'react'

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-ink/85 transition-colors duration-200 hover:border-lime/50 hover:text-lime ${className}`}
    >
      {children}
    </span>
  )
}
