import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-lime text-bg hover:bg-lime-dim shadow-[0_0_0_0_rgba(198,255,61,0)] hover:shadow-[0_8px_30px_-6px_rgba(198,255,61,0.45)]',
  outline: 'border border-line bg-white/[0.02] text-ink hover:border-lime/60 hover:text-lime',
  ghost: 'text-muted hover:text-ink hover:bg-white/5',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: 'sm' | 'md'
  /** Opens in a new tab with safe rel attrs and an sr-only hint. */
  external?: boolean
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  external,
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  const sizing = size === 'sm' ? 'h-9 px-3.5 text-sm' : 'h-11 px-5 text-[0.95rem]'
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${sizing} ${variants[variant]} ${className}`}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}
