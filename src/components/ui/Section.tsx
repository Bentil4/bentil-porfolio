import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

/** Page section with consistent spacing, container width and heading link. */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
