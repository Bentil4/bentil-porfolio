import { config } from '../config'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionHeading } from './ui/SectionHeading'

export function About() {
  const { about, title } = config

  return (
    <Section id="about" className="border-t border-line">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <SectionHeading id="about-heading" eyebrow="about" title="Engineer first, shipper always." />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted">
            {about?.bio ?? `${title} focused on building fast, reliable software.`}
          </p>
          {about?.facts.length ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink"
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-lime" />
                  {fact}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </Section>
  )
}
