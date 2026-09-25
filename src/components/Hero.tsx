import { ArrowRight } from 'lucide-react'
import { m } from 'motion/react'
import { config } from '../config'
import { GitHubIcon, LinkedInIcon } from './icons'
import { ButtonLink } from './ui/Button'
import { SocialIcon } from './ui/SocialIcon'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const { name, title, summary, socials } = config

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Decorative grid + glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[56rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(198_255_61/0.14),rgb(91_157_255/0.08)_55%,transparent)] blur-2xl"
      />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <m.p {...fadeUp(0)} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          Available for new opportunities
        </m.p>

        <m.h1
          {...fadeUp(0.08)}
          id="hero-heading"
          className="max-w-4xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Hi, I’m <span className="text-lime">{name}</span>,
          <br className="hidden sm:block" /> a{' '}
          <span className="bg-gradient-to-r from-ink to-muted bg-clip-text text-transparent">{title}</span>.
        </m.h1>

        <m.p {...fadeUp(0.16)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {summary[0]} {summary[1]}
        </m.p>

        <m.div {...fadeUp(0.24)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#projects" variant="primary">
            View Work
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="#contact" variant="outline">
            Let’s Connect
          </ButtonLink>

          <div className="flex items-center gap-2 sm:ml-4">
            <SocialIcon href={socials.github} label="GitHub profile">
              <GitHubIcon size={20} />
            </SocialIcon>
            {socials.linkedin && (
              <SocialIcon href={socials.linkedin} label="LinkedIn profile">
                <LinkedInIcon size={20} />
              </SocialIcon>
            )}
          </div>
        </m.div>
      </div>
    </section>
  )
}
