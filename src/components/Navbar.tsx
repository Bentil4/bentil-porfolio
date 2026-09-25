import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useActiveSection } from '../hooks/useActiveSection'
import { ButtonLink } from './ui/Button'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(NAV_LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const linkClass = (id: string) =>
    `relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-ink ${
      active === id ? 'text-ink' : 'text-muted'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-lime focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-lime font-mono text-sm text-bg transition-transform duration-300 group-hover:rotate-6"
          >
            {'</>'}
          </span>
          <span>{config.brand}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={linkClass(link.id)} aria-current={active === link.id ? 'true' : undefined}>
                  {link.label}
                  {active === link.id && (
                    <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-px bg-lime" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={config.resumeUrl} external size="sm" variant="outline" className="ml-3">
            <FileText size={16} aria-hidden="true" />
            Resume
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={closeMenu}
                className={`block rounded-lg px-3 py-3 text-base font-medium hover:bg-white/5 ${
                  active === link.id ? 'text-lime' : 'text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <ButtonLink href={config.resumeUrl} external variant="primary" className="w-full" onClick={closeMenu}>
              <FileText size={18} aria-hidden="true" />
              Download Resume
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
